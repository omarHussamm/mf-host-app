import { useLicenseValidation } from '../contexts/LicenseContext'

export const LicenseManagement = () => {
  const {
    licenses,
    loading,
    validateLicense,
    updateLicenseStatus,
    extendLicense,
    refreshLicenses,
    resetLicenses,
    getLicenseColor,
    getLicenseBadgeText
  } = useLicenseValidation()

  const handleStatusChange = (appName: string, newStatus: string) => {
    const licenseKey = appName.toLowerCase().replace(' ', '-')
    updateLicenseStatus(licenseKey, newStatus)
  }

  const handleExtendLicense = (appName: string, days: number) => {
    const licenseKey = appName.toLowerCase().replace(' ', '-')
    extendLicense(licenseKey, days)
  }

  const getLicenseKey = (license: any) => {
    return license.appName.toLowerCase().replace(' ', '-')
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
        <h2>Loading Licenses...</h2>
        <p style={{ color: '#666' }}>Fetching your micro frontend licenses</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">📋 License Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={resetLicenses}
            className="btn btn-outline"
            disabled={loading}
            title="Reset to original demo state (Products: Active, Orders: Trial, Users: Expired)"
          >
            🔄 Reset Demo State
          </button>
          <button 
            onClick={refreshLicenses}
            className="btn btn-outline"
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>
          📊 License Overview
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div style={{ 
            textAlign: 'center', 
            padding: '15px',
            backgroundColor: '#f7fafc',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#48bb78' }}>
              {licenses.filter(l => l.status === 'active').length}
            </div>
            <div style={{ fontSize: '14px', color: '#4a5568' }}>Active</div>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '15px',
            backgroundColor: '#fff9e6',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ed8936' }}>
              {licenses.filter(l => l.status === 'trial').length}
            </div>
            <div style={{ fontSize: '14px', color: '#4a5568' }}>Trial</div>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '15px',
            backgroundColor: '#fff5f5',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f56565' }}>
              {licenses.filter(l => l.status === 'expired').length}
            </div>
            <div style={{ fontSize: '14px', color: '#4a5568' }}>Expired</div>
          </div>
        </div>
      </div>

      {/* License Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {licenses.map(license => {
          const licenseKey = getLicenseKey(license)
          const isValid = validateLicense(licenseKey)
          const color = getLicenseColor(license.status)
          const badgeText = getLicenseBadgeText(license)
          
          return (
            <div 
              key={licenseKey}
              className="card" 
              style={{ 
                border: `2px solid ${color}`,
                backgroundColor: isValid ? '#f7fafc' : '#fff5f5'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '20px' 
              }}>
                <div>
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    color: '#2d3748',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    {license.appName}
                    <span style={{
                      backgroundColor: color,
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {badgeText}
                    </span>
                  </h3>
                  <p style={{ 
                    margin: '0 0 10px 0', 
                    color: '#4a5568',
                    fontSize: '14px'
                  }}>
                    Expires: {license.expiryDate} 
                    {license.daysRemaining > 0 
                      ? ` (${license.daysRemaining} days remaining)`
                      : license.daysRemaining < 0 
                        ? ` (expired ${Math.abs(license.daysRemaining)} days ago)`
                        : ' (expires today)'
                    }
                  </p>
                  <div style={{ fontSize: '14px', color: '#718096' }}>
                    <strong>Features:</strong> {license.features.join(', ')}
                  </div>
                </div>

                <div style={{ 
                  fontSize: '32px',
                  opacity: isValid ? 1 : 0.5
                }}>
                  {isValid ? '✅' : '❌'}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                flexWrap: 'wrap',
                borderTop: '1px solid #e2e8f0',
                paddingTop: '15px'
              }}>
                {/* Status Change Buttons */}
                {license.status !== 'active' && (
                  <button
                    onClick={() => handleStatusChange(license.appName, 'active')}
                    style={{
                      backgroundColor: '#48bb78',
                      color: 'white',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Activate
                  </button>
                )}
                
                {license.status !== 'trial' && (
                  <button
                    onClick={() => handleStatusChange(license.appName, 'trial')}
                    style={{
                      backgroundColor: '#ed8936',
                      color: 'white',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    🆓 Convert to Trial
                  </button>
                )}

                {license.status !== 'expired' && (
                  <button
                    onClick={() => handleStatusChange(license.appName, 'expired')}
                    style={{
                      backgroundColor: '#f56565',
                      color: 'white',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌ Expire
                  </button>
                )}

                {/* Extend License Buttons */}
                <button
                  onClick={() => handleExtendLicense(license.appName, 30)}
                  style={{
                    backgroundColor: '#4299e1',
                    color: 'white',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  📅 +30 Days
                </button>

                <button
                  onClick={() => handleExtendLicense(license.appName, 365)}
                  style={{
                    backgroundColor: '#38b2ac',
                    color: 'white',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  📅 +1 Year
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Demo Instructions */}
      <div className="card" style={{ 
        marginTop: '30px',
        backgroundColor: '#edf2f7',
        border: '2px dashed #a0aec0'
      }}>
        <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>
          🎯 Demo Instructions
        </h3>
        <ul style={{ 
          color: '#718096', 
          fontSize: '14px',
          lineHeight: '1.6',
          paddingLeft: '20px' 
        }}>
          <li><strong>Try expiring the Users App</strong> - Click "❌ Expire" to see error handling</li>
          <li><strong>Extend trial licenses</strong> - Use "+30 Days" or "+1 Year" buttons</li>
          <li><strong>Switch between statuses</strong> - Test different license states</li>
          <li><strong>Navigate to apps</strong> - See how license validation affects remote loading</li>
          <li><strong>Refresh the page</strong> - License changes persist across refreshes! 🎯</li>
          <li><strong>Reset demo state</strong> - Use "Reset Demo State" button to restart</li>
        </ul>
        <div style={{ 
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#e6fffa',
          borderRadius: '6px',
          border: '2px solid #38b2ac'
        }}>
          <p style={{ 
            color: '#2d3748', 
            fontSize: '14px',
            fontWeight: '600',
            margin: '0 0 5px 0'
          }}>
            ✨ <strong>Persistent License Changes:</strong>
          </p>
          <p style={{ 
            color: '#4a5568', 
            fontSize: '14px',
            margin: 0
          }}>
            License changes are saved to localStorage and persist across page refreshes - perfect for live presentations and testing!
          </p>
        </div>
      </div>
    </div>
  )
}
