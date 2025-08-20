import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, callbackUrl } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }
    
    await setSession(email)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}