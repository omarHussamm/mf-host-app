import { Suspense, lazy } from 'react'
import { Loading } from '../components/Loading'
import { useAuth } from '../contexts/AuthContext'

// Direct import from orders remote
// @ts-expect-error - Module federation imports
const OrdersApp = lazy(() => import(/* @vite-ignore */ 'orders-app/App'))

export const OrdersPage = () => {
  const { user } = useAuth()

  return (
    <Suspense fallback={<Loading appName="Orders App" />}>
      <OrdersApp basePath="/orders" user={user} />
    </Suspense>
  )
}
