export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

export interface AppProps {
  user?: User | null;
  basePath?: string;
}

// Module Federation Types
export interface RemoteAppComponent {
  default: React.ComponentType<AppProps>;
}

// License Types (for later phases)
export interface License {
  id: string;
  name: string;
  type: 'products' | 'orders' | 'users';
  status: 'active' | 'expired' | 'not_purchased';
  expiryDate?: string;
  features: string[];
}
