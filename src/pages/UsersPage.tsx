import { lazy } from 'react'
import { ConditionalRemote } from '../components/ConditionalRemote'
import { useAuth } from '../contexts/AuthContext'

// Direct import from users remote
// @ts-expect-error - Module federation imports
const UsersApp = lazy(() => import(/* @vite-ignore */ 'users-app/App'))

export const UsersPage = () => {
  const { user } = useAuth()

  return (
    <ConditionalRemote appName="Users App">
      <UsersApp basePath="/users" user={user} />
    </ConditionalRemote>
  )
}
