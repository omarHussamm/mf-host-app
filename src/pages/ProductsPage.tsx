import { Suspense, lazy } from 'react'
import { Loading } from '../components/Loading'
import { useAuth } from '../contexts/AuthContext'

// Direct import from products remote
// @ts-expect-error - Module federation imports
const ProductsApp = lazy(() => import(/* @vite-ignore */ 'products-app/App'))

export const ProductsPage = () => {
  const { user } = useAuth()

  return (
    <Suspense fallback={<Loading appName="Products App" />}>
      <ProductsApp basePath="/products" user={user} />
    </Suspense>
  )
}
