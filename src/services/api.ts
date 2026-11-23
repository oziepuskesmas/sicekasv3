// ============================================================================
// SICEKAS v3.0 - API Client Service
// ============================================================================

const BASE_URL = '/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

export const api = {
  async get<T = any>(endpoint: string, params?: Record<string, string | number>): Promise<ApiResponse<T>> {
    let url = `${BASE_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) url += `?${queryString}`;
    }

    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('SICEKAS_TOKEN') || ''}`,
        },
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal terhubung ke server API' };
    }
  },

  async post<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('SICEKAS_TOKEN') || ''}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal mengirim data ke server' };
    }
  },

  async delete<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('SICEKAS_TOKEN') || ''}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal menghapus data di server' };
    }
  },
};
