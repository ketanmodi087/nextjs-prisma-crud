'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const publicPaths = ['/login', '/projects']

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, loading  } = useAuth()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (isAuthenticated === null) return

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

    if (!isAuthenticated && !isPublicPath) {
      setRedirecting(true)
      router.push('/login')
    } else if (isAuthenticated && pathname === '/login') {
      setRedirecting(true)
      router.push('/app/projects')
    } else {
      setRedirecting(false)
    }
  }, [isAuthenticated, pathname, router])

  if (loading) return <p>Checking session...</p>

  if (isAuthenticated === null || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <>{children}</>
}