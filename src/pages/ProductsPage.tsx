import { lazy } from 'react'
import { ConditionalRemote } from '../components/ConditionalRemote'
import { useAuth } from '../contexts/AuthContext'

// Direct import from products remote
// @ts-expect-error - Module federation imports
const ProductsApp = lazy(() => import(/* @vite-ignore */ 'products-app/App'))

export const ProductsPage = () => {
  const { user } = useAuth()

  return (
    <ConditionalRemote appName="Products App">
      <ProductsApp basePath="/products" user={user} />
    </ConditionalRemote>
  )
}
