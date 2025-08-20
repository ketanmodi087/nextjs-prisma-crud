import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

// Home route handler
export default async function HomePage(): Promise<never> {
  const session = await getSession()

  // Redirect based on authentication state
  if (session) {
    redirect('/app/projects')
  }
  redirect('/login')
}
