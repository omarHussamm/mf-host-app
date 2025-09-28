import type { ReactNode } from 'react'
import { Header } from '../components/Header'

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <Header />
      
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
          {children}
        </div>
      </main>
      
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>✨ <strong>Phase 3: Centralized Routing</strong> - Host controls all navigation with basePath props!</p>
        <p style={{ fontSize: '12px', marginTop: '5px' }}>
          URL-based routing: <code>{window.location.pathname}</code>
        </p>
      </footer>
    </div>
  )
}
