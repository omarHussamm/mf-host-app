import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/products" replace />
  }

  const handleSave = () => {
    updateUser({
      name: formData.name,
      email: formData.email
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email
    })
    setIsEditing(false)
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin': return 'badge-primary'
      case 'user': return 'badge-success'
      case 'viewer': return 'badge-secondary'
      default: return 'badge-outline'
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div className="page-header">
        <h1 className="page-title">User Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-outline"
        >
          {isEditing ? '✖️ Cancel' : '✏️ Edit Profile'}
        </button>
      </div>

      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              margin: '0 auto 20px',
              border: '4px solid #e9ecef'
            }}
          >
            {user.avatar || user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  border: '2px solid #007bff',
                  borderRadius: '4px',
                  padding: '5px'
                }}
              />
            ) : (
              user.name
            )}
          </h2>
          <span className={`badge ${getRoleBadgeClass(user.role)}`}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#666',
              display: 'block',
              marginBottom: '5px'
            }}>Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '2px solid #007bff',
                  borderRadius: '4px'
                }}
              />
            ) : (
              <p style={{ margin: 0, fontSize: '16px' }}>{user.email}</p>
            )}
          </div>
          <div>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#666',
              display: 'block',
              marginBottom: '5px'
            }}>User ID</label>
            <p style={{ margin: 0, fontSize: '16px', color: '#666' }}>{user.id}</p>
          </div>
        </div>

        {user.lastLogin && (
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#666',
              display: 'block',
              marginBottom: '5px'
            }}>Last Login</label>
            <p style={{ margin: 0, fontSize: '16px' }}>
              {new Date(user.lastLogin).toLocaleString()}
            </p>
          </div>
        )}

        {isEditing ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleSave}
              className="btn"
              style={{ flex: 1 }}
            >
              💾 Save Changes
            </button>
            <button 
              onClick={handleCancel}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              ✖️ Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={logout}
            className="btn btn-outline"
            style={{ width: '100%', color: '#dc3545', borderColor: '#dc3545' }}
          >
            🚪 Logout
          </button>
        )}
      </div>

      {/* Demo Information */}
      <div className="card" style={{ marginTop: '20px', backgroundColor: '#f8f9fa' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>
          🎯 Phase 4 Demo: User State Sharing
        </h4>
        <div style={{ fontSize: '14px', color: '#6c757d' }}>
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>✅ User Context:</strong> This user data is now shared across all micro frontends!
          </p>
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>🔄 State Sync:</strong> Profile updates here are reflected in all remote apps
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>🏗️ Architecture:</strong> Host manages auth, remotes consume via AppContext
          </p>
        </div>
      </div>
    </div>
  )
}
