import { Suspense, lazy } from 'react'
import { Loading } from '../components/Loading'

// Direct import from orders remote
// @ts-expect-error - Module federation imports  
const OrdersApp = lazy(() => import(/* @vite-ignore */ 'orders-app/App'))

export const OrdersPage = () => {
  return (
    <Suspense fallback={<Loading appName="Orders App" />}>
      <OrdersApp basePath="/orders" />
    </Suspense>
  )
}
