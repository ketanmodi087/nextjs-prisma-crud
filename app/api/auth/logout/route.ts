import { NextResponse } from 'next/server'
import { clearSession } from '@/lib/auth'

export async function POST() {
  // Clear user session (removes auth cookie)
  await clearSession()

  // Respond with success
  return NextResponse.json({ success: true })
}
