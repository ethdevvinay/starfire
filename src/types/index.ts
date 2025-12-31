export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  category_name?: string;
  price?: number;
  image: string;
  specifications?: string;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  created_at?: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  product_id?: number;
  product_name?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
  updated_at?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "manager";
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  totalProducts: number;
  totalCategories: number;
  recentEnquiries: Enquiry[];
}
