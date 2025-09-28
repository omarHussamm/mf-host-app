import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const location = useLocation()
  
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
          🏠 MicroFrontend Host - Phase 3
        </h1>
        
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
      </div>
    </header>
  )
}
