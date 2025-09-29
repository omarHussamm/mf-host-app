import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LicenseProvider } from './contexts/LicenseContext'
import { MainLayout } from './layouts/MainLayout'
import { ProductsPage } from './pages/ProductsPage'
import { OrdersPage } from './pages/OrdersPage'
import { UsersPage } from './pages/UsersPage'
import { ProfilePage } from './pages/ProfilePage'
import { LicenseManagement } from './pages/LicenseManagement'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LicenseProvider>
          <MainLayout>
            <Routes>
              {/* Default redirect to products */}
              <Route path="/" element={<Navigate to="/products" replace />} />

              {/* Remote Routes */}
              <Route path="/products/*" element={<ProductsPage />} />
              <Route path="/orders/*" element={<OrdersPage />} />
              <Route path="/users/*" element={<UsersPage />} />

              {/* Host Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/licenses" element={<LicenseManagement />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </LicenseProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
