import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { ProductsPage } from './pages/ProductsPage'
import { OrdersPage } from './pages/OrdersPage'
import { UsersPage } from './pages/UsersPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Default redirect to products */}
          <Route path="/" element={<Navigate to="/products" replace />} />
          
          {/* Remote Routes */}
          <Route path="/products/*" element={<ProductsPage />} />
          <Route path="/orders/*" element={<OrdersPage />} />
          <Route path="/users/*" element={<UsersPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
