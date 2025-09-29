import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const Header = () => {
  const location = useLocation()
  const { user, login, logout, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  
  const isActive = (path: string) => location.pathname.startsWith(path)
  
  const linkStyle = (path: string) => ({
    padding: '12px 24px',
    textDecoration: 'none',
    border: '2px solid',
    borderColor: isActive(path) ? '#007bff' : '#ddd',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    backgroundColor: isActive(path) ? '#007bff' : 'white',
    color: isActive(path) ? 'white' : '#333',
    display: 'inline-block'
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    const success = await login(loginForm.email, loginForm.password)
    if (success) {
      setShowLogin(false)
      setLoginForm({ email: '', password: '' })
    } else {
      setLoginError('Invalid email or password')
    }
  }

  const demoUsers = [
    { email: 'john.doe@company.com', role: 'Admin' },
    { email: 'jane.smith@company.com', role: 'User' },
    { email: 'bob.wilson@company.com', role: 'Viewer' }
  ]

  return (
    <header style={{ 
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px',
      marginBottom: '30px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#007bff',
          margin: 0
        }}>
          🏠 MicroFrontend Host - Phase 4
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Navigation */}
          <nav>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/products" style={linkStyle('/products')}>
                📦 Products
              </Link>
              <Link to="/orders" style={linkStyle('/orders')}>
                🛒 Orders
              </Link>
              <Link to="/users" style={linkStyle('/users')}>
                👥 Users
              </Link>
            </div>
          </nav>

          {/* User Authentication */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  border: '2px solid #007bff',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#007bff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {user.avatar || user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{user.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{user.role}</div>
                </div>
                <span style={{ marginLeft: '4px' }}>⌄</span>
              </div>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '5px',
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  minWidth: '200px',
                  zIndex: 1000
                }}>
                  <Link
                    to="/profile"
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      textDecoration: 'none',
                      color: '#333',
                      borderBottom: '1px solid #eee'
                    }}
                    onClick={() => setShowUserMenu(false)}
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setShowUserMenu(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#dc3545',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="btn"
              disabled={loading}
            >
              {loading ? '⏳ Loading...' : '🔐 Login'}
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '400px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>🔐 Login</h2>
            
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              {loginError && (
                <div style={{
                  color: '#dc3545',
                  backgroundColor: '#f8d7da',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '15px',
                  fontSize: '14px'
                }}>
                  {loginError}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  className="btn"
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? '⏳ Logging in...' : '🚀 Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogin(false)
                    setLoginError('')
                    setLoginForm({ email: '', password: '' })
                  }}
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Demo Users */}
            <div style={{ 
              marginTop: '25px', 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px' 
            }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#495057' }}>
                Demo Users:
              </h4>
              {demoUsers.map((demoUser, index) => (
                <button
                  key={index}
                  onClick={() => setLoginForm({ email: demoUser.email, password: 'demo' })}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '6px 0',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#007bff',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  {demoUser.email} ({demoUser.role})
                </button>
              ))}
              <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '8px' }}>
                Use any password for demo
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
