import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLicenseValidation } from '../contexts/LicenseContext'
import { RemoteErrorBoundary } from './RemoteErrorBoundary'

interface ConditionalRemoteProps {
  appName: string;
  children: ReactNode;
}

// License Expired Fallback Component
const LicenseExpiredFallback = ({ appName }: { appName: string }) => {
  const { getLicenseStatus, getLicenseColor, getLicenseBadgeText } = useLicenseValidation()
  
  const licenseKey = appName.toLowerCase().replace(' ', '-')
  const license = getLicenseStatus(licenseKey)
  
  if (!license) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#fff5f5',
        border: '2px solid #fed7d7',
        borderRadius: '12px',
        margin: '20px 0'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
        <h2 style={{ color: '#c53030', marginBottom: '15px' }}>
          No License Found
        </h2>
        <p style={{ color: '#742a2a', marginBottom: '25px' }}>
          No valid license found for {appName}. Please contact your administrator.
        </p>
        <Link 
          to="/licenses" 
          style={{
            display: 'inline-block',
            backgroundColor: '#e53e3e',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500'
          }}
        >
          📋 Manage Licenses
        </Link>
      </div>
    )
  }

  const color = getLicenseColor(license.status)
  const badgeText = getLicenseBadgeText(license)

  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#fff5f5',
      border: `2px solid ${color}`,
      borderRadius: '12px',
      margin: '20px 0'
    }}>
      {/* License Status Icon */}
      <div style={{ 
        fontSize: '64px', 
        marginBottom: '20px',
        opacity: 0.8
      }}>
        {license.status === 'expired' ? '⏰' : 
         license.status === 'suspended' ? '🚫' : '📋'}
      </div>

      {/* Main Message */}
      <h2 style={{ 
        color: '#c53030', 
        marginBottom: '15px',
        fontSize: '24px'
      }}>
        {appName} License Issue
      </h2>

      {/* License Status Badge */}
      <div style={{
        display: 'inline-block',
        backgroundColor: color,
        color: 'white',
        padding: '8px 16px',
        borderRadius: '25px',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '20px'
      }}>
        {badgeText}
      </div>

      {/* Detailed Message */}
      <div style={{
        backgroundColor: '#fed7d7',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '25px',
        textAlign: 'left'
      }}>
        <p style={{ 
          color: '#742a2a', 
          margin: '0 0 15px 0',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          <strong>License Details:</strong>
        </p>
        <ul style={{ 
          color: '#742a2a',
          fontSize: '14px',
          lineHeight: '1.6',
          paddingLeft: '20px',
          margin: 0
        }}>
          <li><strong>Status:</strong> {license.status.charAt(0).toUpperCase() + license.status.slice(1)}</li>
          <li><strong>Expiry Date:</strong> {license.expiryDate}</li>
          <li><strong>Days Remaining:</strong> {license.daysRemaining > 0 
            ? `${license.daysRemaining} days` 
            : license.daysRemaining < 0 
              ? `Expired ${Math.abs(license.daysRemaining)} days ago`
              : 'Expires today'
          }</li>
          <li><strong>Available Features:</strong> {license.features.join(', ')}</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div style={{
        backgroundColor: '#edf2f7',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '25px'
      }}>
        <h4 style={{ 
          color: '#4a5568', 
          margin: '0 0 10px 0',
          fontSize: '16px'
        }}>
          🎯 What you can do:
        </h4>
        <ul style={{ 
          color: '#718096',
          fontSize: '14px',
          textAlign: 'left',
          paddingLeft: '20px',
          margin: 0
        }}>
          <li>Contact your administrator to renew the license</li>
          <li>Check if you have alternative licensed applications</li>
          <li>Use the License Management page to extend trial periods</li>
          {license.status === 'trial' && license.daysRemaining > 0 && (
            <li>Continue using the application - you have {license.daysRemaining} trial days left</li>
          )}
        </ul>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Link 
          to="/licenses" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#e53e3e',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          📋 Manage Licenses
        </Link>

        <Link 
          to="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'white',
            color: '#4a5568',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '6px',
            border: '2px solid #cbd5e0',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          🏠 Go to Dashboard
        </Link>

        <button 
          onClick={() => window.location.reload()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'transparent',
            color: '#4a5568',
            padding: '12px 24px',
            border: '2px solid #cbd5e0',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          🔄 Refresh Page
        </button>
      </div>

      {/* Demo Notice */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#e6fffa',
          border: '1px solid #38b2ac',
          borderRadius: '6px'
        }}>
          <p style={{ 
            color: '#2d3748',
            fontSize: '13px',
            margin: 0,
            fontWeight: '500'
          }}>
            🎯 <strong>Demo Mode:</strong> Use the "Manage Licenses" page to activate this app or extend the trial period.
          </p>
        </div>
      )}
    </div>
  )
}

export const ConditionalRemote = ({ appName, children }: ConditionalRemoteProps) => {
  const { validateLicense } = useLicenseValidation()
  
  const licenseKey = appName.toLowerCase().replace(' ', '-')
  const isLicenseValid = validateLicense(licenseKey)

  // If license is not valid, show the license expired fallback
  if (!isLicenseValid) {
    return <LicenseExpiredFallback appName={appName} />
  }

  // If license is valid, wrap the children with error boundary
  return (
    <RemoteErrorBoundary remoteName={appName}>
      {children}
    </RemoteErrorBoundary>
  )
}
