export type UserRole = 
  | 'Super Admin' 
  | 'Admin' 
  | 'PJ Klaster' 
  | 'Kepala Puskesmas' 
  | 'Petugas Puskesmas';

export interface User {
  id: number;
  no_urut: number;
  username: string;
  nip: string;
  nip_full?: string;
  nama: string;
  jabatan: string;
  golongan: string;
  role: UserRole;
  avatar: string;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token?: string;
}
