export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isGuest: boolean;
  role: 'user' | 'admin'; // Added role field
}

export interface AuthResponse {
  user: User;
  token: string;
}
