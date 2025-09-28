import { Suspense, lazy } from 'react'
import { Loading } from '../components/Loading'

// Direct import from users remote
// @ts-expect-error - Module federation imports
const UsersApp = lazy(() => import(/* @vite-ignore */ 'users-app/App'))

export const UsersPage = () => {
  return (
    <Suspense fallback={<Loading appName="Users App" />}>
      <UsersApp basePath="/users" />
    </Suspense>
  )
}
