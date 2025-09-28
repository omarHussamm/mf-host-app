import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
      <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/products" 
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: '500'
        }}
      >
        Go to Products
      </Link>
    </div>
  )
}
