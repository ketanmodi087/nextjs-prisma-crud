import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Check if session exists
    const session = await getSession()

    // Return auth status
    return NextResponse.json({ authenticated: !!session })
  } catch (error) {
    // On error, treat as unauthenticated
    return NextResponse.json({ authenticated: false })
  }
}
