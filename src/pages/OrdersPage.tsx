import { lazy } from 'react'
import { ConditionalRemote } from '../components/ConditionalRemote'
import { useAuth } from '../contexts/AuthContext'

// Direct import from orders remote
// @ts-expect-error - Module federation imports
const OrdersApp = lazy(() => import(/* @vite-ignore */ 'orders-app/App'))

export const OrdersPage = () => {
  const { user } = useAuth()

  return (
    <ConditionalRemote appName="Orders App">
      <OrdersApp basePath="/orders" user={user} />
    </ConditionalRemote>
  )
}
