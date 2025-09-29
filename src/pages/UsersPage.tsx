import { Suspense, lazy } from 'react'
import { Loading } from '../components/Loading'
import { useAuth } from '../contexts/AuthContext'

// Direct import from users remote
// @ts-expect-error - Module federation imports
const UsersApp = lazy(() => import(/* @vite-ignore */ 'users-app/App'))

export const UsersPage = () => {
  const { user } = useAuth()

  return (
    <Suspense fallback={<Loading appName="Users App" />}>
      <UsersApp basePath="/users" user={user} />
    </Suspense>
  )
}
