// app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// LoginPage component (Client Component)
// This page handles user login and redirects authenticated users.
export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const callbackUrl = searchParams.callbackUrl || '/app/projects'
      
      if (!email) {
        setError('Email is required')
        return
      }
      
      if (!email.includes('@')) {
        setError('Please enter a valid email address')
        return
      }
      
      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, callbackUrl }),
      })
      
      if (response.ok) {
        // Redirect to the intended page after successful login
        router.push(callbackUrl)
      } else {
        const data = await response.json()
        setError(data.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        
        {/* Page Heading */}
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Welcome
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Login to continue managing your projects
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Hidden input to persist callback URL */}
          <input 
            type="hidden" 
            name="callbackUrl" 
            value={searchParams.callbackUrl || '/app/projects'} 
          />

          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium 
                       hover:bg-blue-700 transition-colors focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Public Projects Link */}
        <div className="mt-6">
          <Link
            href="/projects"
            className="w-full block text-center bg-gray-100 text-gray-700 py-2.5 rounded-lg 
                       font-medium hover:bg-gray-200 transition-colors"
          >
            View Public Projects
          </Link>
        </div>
      </div>
    </div>
  )
}