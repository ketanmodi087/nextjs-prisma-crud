// lib/auth.ts
'use server'

import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from './constants'

// Server-side function to get session
export async function getSession() {
  const cookieStore = cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value
}

// Server-side function to set session
export async function setSession(email: string) {
  const cookieStore = cookies()
  cookieStore.set(SESSION_COOKIE_NAME, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/', // Important: set path to root
  })
}

// Server-side function to clear session
export async function clearSession() {
  const cookieStore = cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

// Helper to get session in server components
export async function getAuthStatus() {
  const session = await getSession()
  return { isAuthenticated: !!session, email: session }
}