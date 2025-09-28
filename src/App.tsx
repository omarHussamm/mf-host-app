import { useState, Suspense, lazy } from 'react'

// Direct imports from remote apps
// @ts-expect-error - Module federation imports
const ProductsApp = lazy(() => import(/* @vite-ignore */ 'products-app/App'))
// @ts-expect-error - Module federation imports  
const OrdersApp = lazy(() => import(/* @vite-ignore */ 'orders-app/App'))
// @ts-expect-error - Module federation imports
const UsersApp = lazy(() => import(/* @vite-ignore */ 'users-app/App'))

type ActiveApp = 'products' | 'orders' | 'users'

// Simple loading component
const Loading = ({ appName }: { appName: string }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    gap: '12px',
    color: '#666',
    fontStyle: 'italic'
  }}>
    <div style={{
      width: '20px',
      height: '20px',
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #007bff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    Loading {appName}...
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
)

// Simple Header Component
const Header = ({ activeApp, setActiveApp }: { 
  activeApp: ActiveApp
  setActiveApp: (app: ActiveApp) => void 
}) => {
  const buttonStyle = (app: ActiveApp) => ({
    padding: '12px 24px',
    border: '2px solid',
    borderColor: activeApp === app ? '#007bff' : '#ddd',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: activeApp === app ? '#007bff' : 'white',
    color: activeApp === app ? 'white' : '#333',
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
          🏠 MicroFrontend Host
        </h1>
        
        <nav>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => setActiveApp('products')} 
              style={buttonStyle('products')}
            >
              📦 Products
            </button>
            <button 
              onClick={() => setActiveApp('orders')} 
              style={buttonStyle('orders')}
            >
              🛒 Orders  
            </button>
            <button 
              onClick={() => setActiveApp('users')} 
              style={buttonStyle('users')}
            >
              👥 Users
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

function App() {
  // Default to products (as requested - / should redirect to products)
  const [activeApp, setActiveApp] = useState<ActiveApp>('products')

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'products':
        return (
          <Suspense fallback={<Loading appName="Products App" />}>
            <ProductsApp />
          </Suspense>
        )
      case 'orders':
        return (
          <Suspense fallback={<Loading appName="Orders App" />}>
            <OrdersApp />
          </Suspense>
        )
      case 'users':
        return (
          <Suspense fallback={<Loading appName="Users App" />}>
            <UsersApp />
          </Suspense>
        )
      default:
        return <div>Unknown app</div>
    }
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <Header activeApp={activeApp} setActiveApp={setActiveApp} />
      
      <main style={{ 
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '500px'
        }}>
          {renderActiveApp()}
        </div>
      </main>
      
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>✨ <strong>Basic Federation with Simple Navigation</strong> - Click buttons to switch between micro frontends!</p>
        <p style={{ fontSize: '12px', marginTop: '5px' }}>
          Currently showing: <strong>{activeApp.charAt(0).toUpperCase() + activeApp.slice(1)} App</strong>
        </p>
      </footer>
    </div>
  )
}

export default App
