import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Purchase {
  id: string
  product_name: string
  product_type: 'software' | 'hardware' | 'subscription' | 'training'
  amount: number
  currency: string
  purchase_date: string
  status: 'completed' | 'pending' | 'cancelled' | 'refunded'
  description: string
  invoice_url?: string
}

interface User {
  email: string
  username: string
  full_name: string
  phone_number: string
  city: string
  state_province: string
  country: string
  purpose_of_use: string
  avatar_url?: string
  member_since: string
  subscription_status: 'free' | 'premium' | 'pro'
  total_flight_hours: number
  achievements: string[]
}

interface AuthContextType {
  user: User | null
  purchases: Purchase[]
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: User & { password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [purchases] = useState<Purchase[]>([
    {
      id: 'PUR-001',
      product_name: 'DroneSimulator Pro License',
      product_type: 'software',
      amount: 299.99,
      currency: 'USD',
      purchase_date: '2024-01-15',
      status: 'completed',
      description: 'Professional drone simulation software with advanced features',
      invoice_url: '#'
    },
    {
      id: 'PUR-002',
      product_name: 'Premium Training Course',
      product_type: 'training',
      amount: 149.99,
      currency: 'USD',
      purchase_date: '2024-02-20',
      status: 'completed',
      description: 'Advanced drone piloting techniques and safety protocols',
      invoice_url: '#'
    },
    {
      id: 'PUR-003',
      product_name: 'Monthly Pro Subscription',
      product_type: 'subscription',
      amount: 29.99,
      currency: 'USD',
      purchase_date: '2024-12-01',
      status: 'completed',
      description: 'Monthly subscription for premium features and cloud storage',
      invoice_url: '#'
    },
    {
      id: 'PUR-004',
      product_name: 'DJI Mavic Controller',
      product_type: 'hardware',
      amount: 199.99,
      currency: 'USD',
      purchase_date: '2024-11-10',
      status: 'pending',
      description: 'Physical controller for enhanced simulation experience',
      invoice_url: '#'
    }
  ])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock authentication - Use these credentials to login
    if (email === 'blackpanthersandy@gmail.com' && password === 'Srinivas@1234') {
      const mockUser: User = {
        email: 'blackpanthersandy@gmail.com',
        username: 'Srinivas',
        full_name: 'Srinivas Prasad',
        phone_number: '8500925325',
        city: 'Hyd',
        state_province: 'Telangana',
        country: 'India',
        purpose_of_use: 'personal',
        member_since: '2024-01-15',
        subscription_status: 'pro',
        total_flight_hours: 127.5,
        achievements: ['First Flight', 'Night Pilot', 'Precision Landing', 'Weather Master', '100 Hours']
      }
      setUser(mockUser)
      return true
    }
    return false
  }

  const register = async (userData: User & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock registration
    const { password, ...userWithoutPassword } = userData
    const newUser = {
      ...userWithoutPassword,
      member_since: new Date().toISOString().split('T')[0],
      subscription_status: 'free' as const,
      total_flight_hours: 0,
      achievements: ['Welcome Aboard']
    }
    setUser(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (user) {
      setUser({ ...user, ...userData })
      return true
    }
    return false
  }

  const value: AuthContextType = {
    user,
    purchases,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}