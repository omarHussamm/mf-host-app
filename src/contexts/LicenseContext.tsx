import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// License status types (type-only)
type LicenseStatus = 'active' | 'expired' | 'trial' | 'suspended'

// License interface (type-only)
interface License {
  appName: string;
  status: LicenseStatus;
  expiryDate: string;
  daysRemaining: number;
  features: string[];
  isValid: boolean;
}

// Mock license data - in a real app this would come from an API
const MOCK_LICENSES: Record<string, License> = {
  'products-app': {
    appName: 'Products App',
    status: 'active',
    expiryDate: '2024-12-31',
    daysRemaining: 365,
    features: ['Product Management', 'Categories', 'Inventory'],
    isValid: true
  },
  'orders-app': {
    appName: 'Orders App', 
    status: 'trial',
    expiryDate: '2024-02-15',
    daysRemaining: 30,
    features: ['Order Processing', 'Analytics'],
    isValid: true
  },
  'users-app': {
    appName: 'Users App',
    status: 'expired',
    expiryDate: '2024-01-01',
    daysRemaining: -15,
    features: ['User Management', 'Roles'],
    isValid: false
  }
}

// License Context Type
interface LicenseContextType {
  licenses: License[];
  loading: boolean;
  validateLicense: (appName: string) => boolean;
  getLicenseStatus: (appName: string) => License | null;
  updateLicenseStatus: (appName: string, status: string) => void;
  extendLicense: (appName: string, days: number) => void;
  refreshLicenses: () => Promise<void>;
  resetLicenses: () => void;
  getLicenseColor: (status: LicenseStatus) => string;
  getLicenseBadgeText: (license: License) => string;
}

// Create the License Context
const LicenseContext = createContext<LicenseContextType | undefined>(undefined)

// License Provider Component
interface LicenseProviderProps {
  children: ReactNode;
}

export const LicenseProvider = ({ children }: LicenseProviderProps) => {
  // Initialize licenses from localStorage or fallback to mock data
  const initializeLicenses = (): Record<string, License> => {
    try {
      const stored = localStorage.getItem('microfrontend-licenses')
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load licenses from localStorage:', error)
    }
    return MOCK_LICENSES
  }

  const [licenses, setLicenses] = useState<Record<string, License>>(initializeLicenses)
  const [loading, setLoading] = useState(false)

  // Save licenses to localStorage whenever they change
  const saveLicenses = (newLicenses: Record<string, License>) => {
    try {
      localStorage.setItem('microfrontend-licenses', JSON.stringify(newLicenses))
    } catch (error) {
      console.warn('Failed to save licenses to localStorage:', error)
    }
  }

  // Simulate fetching licenses from API
  const refreshLicenses = async () => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, this would be an API call
    // const response = await fetch('/api/licenses')
    // const licenses = await response.json()
    
    setLicenses(MOCK_LICENSES)
    setLoading(false)
  }

  // Reset licenses to original demo state (useful for presentations)
  const resetLicenses = () => {
    setLicenses(MOCK_LICENSES)
    saveLicenses(MOCK_LICENSES)
  }

  // Check if a specific app license is valid
  const validateLicense = (appName: string): boolean => {
    const license = licenses[appName]
    if (!license) return false
    
    // Check if license is active and not expired
    return license.status === 'active' || (license.status === 'trial' && license.daysRemaining > 0)
  }

  // Get license status for display
  const getLicenseStatus = (appName: string): License | null => {
    return licenses[appName] || null
  }

  // Update license status
  const updateLicenseStatus = (appName: string, status: string) => {
    const newLicenses = {
      ...licenses,
      [appName]: {
        ...licenses[appName],
        status: status as LicenseStatus,
        isValid: status === 'active' || (status === 'trial' && licenses[appName].daysRemaining > 0)
      }
    }
    setLicenses(newLicenses)
    saveLicenses(newLicenses)
  }

  // Extend license
  const extendLicense = (appName: string, days: number) => {
    const newLicenses = {
      ...licenses,
      [appName]: {
        ...licenses[appName],
        daysRemaining: licenses[appName].daysRemaining + days,
        status: 'active' as LicenseStatus,
        isValid: true,
        expiryDate: new Date(Date.now() + (licenses[appName].daysRemaining + days) * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0]
      }
    }
    setLicenses(newLicenses)
    saveLicenses(newLicenses)
  }

  // Get all licenses
  const getAllLicenses = (): License[] => {
    return Object.values(licenses)
  }

  // Get license color for status
  const getLicenseColor = (status: LicenseStatus): string => {
    switch (status) {
      case 'active':
        return '#48bb78' // Green
      case 'trial':
        return '#ed8936' // Orange
      case 'expired':
        return '#f56565' // Red
      case 'suspended':
        return '#a0aec0' // Gray
      default:
        return '#718096' // Default gray
    }
  }

  // Get license badge text
  const getLicenseBadgeText = (license: License): string => {
    if (license.status === 'trial') {
      return `Trial (${license.daysRemaining} days left)`
    }
    if (license.status === 'expired') {
      return `Expired ${Math.abs(license.daysRemaining)} days ago`
    }
    return license.status.charAt(0).toUpperCase() + license.status.slice(1)
  }

  // Load licenses on mount (just like auth does it)
  useEffect(() => {
    setLoading(false) // Simple - no API call on mount
  }, [])

  const contextValue: LicenseContextType = {
    licenses: getAllLicenses(),
    loading,
    validateLicense,
    getLicenseStatus,
    updateLicenseStatus,
    extendLicense,
    refreshLicenses,
    resetLicenses,
    getLicenseColor,
    getLicenseBadgeText
  }

  return (
    <LicenseContext.Provider value={contextValue}>
      {children}
    </LicenseContext.Provider>
  )
}

// Custom hook to use the License Context
export const useLicenseValidation = () => {
  const context = useContext(LicenseContext)
  if (context === undefined) {
    throw new Error('useLicenseValidation must be used within a LicenseProvider')
  }
  return context
}
