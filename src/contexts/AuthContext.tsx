import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

// User interface (matching remotes)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
  lastLogin?: string;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    avatar: '👨‍💼',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2', 
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'user',
    avatar: '👩‍💻',
    lastLogin: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com', 
    role: 'viewer',
    avatar: '👨‍🔬',
    lastLogin: '2024-01-13T09:15:00Z'
  }
]

// Auth context interface
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Context creation
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider props interface
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('currentUser')
      }
    }
    setLoading(false)
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [user])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Find user by email (any password works for demo)
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (foundUser && password.length > 0) {
      // Update last login
      const userWithLogin = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      }
      setUser(userWithLogin)
      setLoading(false)
      return true
    } else {
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
