export interface User {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  role: 'customer' | 'provider' | 'admin';
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  base_price: number;
  duration_minutes: number;
  provider_id: number;
  rating?: number;
  total_reviews?: number;
  image_url?: string;
}

export interface Booking {
  id: number;
  service_id: number;
  provider_id: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_date: string;
  address: string;
  notes?: string;
  total_price: number;
  created_at: string;
  service?: Service;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
