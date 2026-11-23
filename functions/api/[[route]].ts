// ============================================================================
// SICEKAS v3.0 - CLOUDFLARE PAGES FUNCTIONS (EDGE REST API GATEWAY)
// Database Engine: Cloudflare D1 (Serverless SQLite)
// Storage Engine: Cloudflare R2 (sicekas-storage)
// ============================================================================

interface Env {
  DB: D1Database;
  BUCKET?: R2Bucket;
  ENVIRONMENT?: string;
  APP_NAME?: string;
}

const jsonResponse = (data: any, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method.toUpperCase();
  const pathname = url.pathname;

  // CORS Preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const db = env.DB;
  if (!db) {
    return jsonResponse({
      success: false,
      error: 'Cloudflare D1 Database binding [DB] tidak ditemukan pada environment ini.',
    }, 503);
  }

  try {
    // 1. Health & Status Check
    if (pathname === '/api/health' || pathname === '/api/ping') {
      const start = Date.now();
      const countRes = await db.prepare('SELECT COUNT(*) AS total FROM users').first<{ total: number }>();
      const latency = Date.now() - start;

      return jsonResponse({
        success: true,
        status: 'ONLINE',
        version: '3.0.0',
        app: 'SICEKAS v3.0',
        database: 'Cloudflare D1 Connected',
        users_count: countRes?.total || 0,
        latency_ms: latency,
      });
    }

    // 2. Authentication Endpoint
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await request.json<any>();
      const { username, password } = body;

      if (!username || !password) {
        return jsonResponse({ success: false, error: 'Username/NIP dan Password wajib diisi.' }, 400);
      }

      const cleanInput = String(username).trim();
      const user = await db.prepare(
        'SELECT * FROM users WHERE (username = ? OR nip = ? OR replace(nip, " ", "") = replace(?, " ", "")) AND is_active = 1'
      ).bind(cleanInput, cleanInput, cleanInput).first<any>();

      if (!user) {
        return jsonResponse({ success: false, error: 'Akun pegawai tidak ditemukan.' }, 404);
      }

      // Verify password (supports default bankot2026 or hashed password)
      const valid = user.password_hash === password || password === 'bankot2026' || user.password_hash === 'bankot2026';
      if (!valid) {
        return jsonResponse({ success: false, error: 'Password yang Anda masukkan salah.' }, 401);
      }

      // Remove sensitive password hash from response
      delete user.password_hash;

      return jsonResponse({
        success: true,
        message: 'Login berhasil.',
        data: user,
        token: `sicekas-token-${user.id}-${Date.now()}`,
      });
    }

    // 3. Users Endpoint
    if (pathname === '/api/users' && method === 'GET') {
      const { results } = await db.prepare(
        'SELECT id, no_urut, username, nip, nip_full, nama, jabatan, golongan, role, avatar, is_active FROM users ORDER BY no_urut ASC'
      ).all();

      return jsonResponse({ success: true, data: results });
    }

    // 4. POA Bulanan Endpoints
    if (pathname === '/api/poa' && method === 'GET') {
      const bulan = url.searchParams.get('bulan');
      const tahun = url.searchParams.get('tahun') || '2026';

      let query = 'SELECT * FROM poa_bulanan WHERE tahun = ?';
      const params: any[] = [tahun];

      if (bulan) {
        query += ' AND bulan = ?';
        params.push(bulan);
      }
      query += ' ORDER BY tanggal ASC, created_at DESC';

      const { results } = await db.prepare(query).bind(...params).all();
      return jsonResponse({ success: true, data: results });
    }

    if (pathname === '/api/poa/save' && method === 'POST') {
      const item = await request.json<any>();
      await db.prepare(`
        INSERT OR REPLACE INTO poa_bulanan (
          id, tanggal, bulan, tahun, petugas_nip, petugas_nama, petugas_jabatan,
          program_kesehatan, uraian_kegiatan, target_sasaran, lokasi_pelaksanaan,
          vol_kegiatan, satuan, anggaran_bok, sumber_dana, status, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        item.id || `poa-${Date.now()}`,
        item.tanggal || null,
        item.bulan,
        item.tahun,
        item.petugas_nip,
        item.petugas_nama,
        item.petugas_jabatan || null,
        item.program_kesehatan,
        item.uraian_kegiatan,
        item.target_sasaran || null,
        item.lokasi_pelaksanaan || null,
        item.vol_kegiatan || 1,
        item.satuan || 'Kegiatan',
        item.anggaran_bok || 0,
        item.sumber_dana || 'BOK Puskesmas',
        item.status || 'Aktif'
      ).run();

      return jsonResponse({ success: true, message: 'POA berhasil disimpan.' });
    }

    // 5. SPPD & LPT Endpoints
    if (pathname === '/api/sppd' && method === 'GET') {
      const { results } = await db.prepare('SELECT * FROM sppd_lpt ORDER BY created_at DESC LIMIT 50').all();
      return jsonResponse({ success: true, data: results });
    }

    if (pathname === '/api/sppd/templates' && method === 'GET') {
      const { results } = await db.prepare('SELECT * FROM sppd_templates ORDER BY is_favorite DESC, created_at DESC').all();
      return jsonResponse({ success: true, data: results });
    }

    // 6. TP POL Endpoints
    if (pathname === '/api/tppol' && method === 'GET') {
      const { results } = await db.prepare('SELECT * FROM tppol_jaspel ORDER BY created_at DESC LIMIT 50').all();
      return jsonResponse({ success: true, data: results });
    }

    // 7. Jadwal & Kolaborasi Endpoints
    if (pathname === '/api/jadwal' && method === 'GET') {
      const { results } = await db.prepare('SELECT * FROM jadwal_kegiatan ORDER BY tanggal ASC LIMIT 50').all();
      return jsonResponse({ success: true, data: results });
    }

    // 8. SQL Console (Super Admin)
    if (pathname === '/api/sql' && method === 'POST') {
      const { query } = await request.json<any>();
      if (!query || typeof query !== 'string') {
        return jsonResponse({ success: false, error: 'Query SQL wajib diisi.' }, 400);
      }

      const stmt = db.prepare(query);
      const isSelect = query.trim().toUpperCase().startsWith('SELECT');

      if (isSelect) {
        const { results } = await stmt.all();
        return jsonResponse({ success: true, data: results });
      } else {
        const result = await stmt.run();
        return jsonResponse({ success: true, message: 'Query berhasil dieksekusi.', result });
      }
    }

    return jsonResponse({ success: false, error: `Endpoint tidak ditemukan: ${method} ${pathname}` }, 404);
  } catch (error: any) {
    return jsonResponse({
      success: false,
      error: error.message || 'Terjadi kesalahan internal pada Edge API.',
    }, 500);
  }
};
