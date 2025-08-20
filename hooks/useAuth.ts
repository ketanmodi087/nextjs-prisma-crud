'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const controller = new AbortController()
    checkAuthStatus(controller.signal)
    return () => controller.abort()
  }, [])

  const checkAuthStatus = async (signal?: AbortSignal) => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/status', { signal })
      if (!response.ok) throw new Error('Failed to fetch auth status')

      const data = await response.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      router.push('/login') // smoother than window.location.href
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return { isAuthenticated, loading, checkAuthStatus, logout }
}
