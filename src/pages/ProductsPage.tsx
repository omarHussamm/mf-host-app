import { Suspense, lazy } from 'react'
import { Loading } from '../components/Loading'

// Direct import from products remote
// @ts-expect-error - Module federation imports
const ProductsApp = lazy(() => import(/* @vite-ignore */ 'products-app/App'))

export const ProductsPage = () => {
  return (
    <Suspense fallback={<Loading appName="Products App" />}>
      <ProductsApp basePath="/products" />
    </Suspense>
  )
}
