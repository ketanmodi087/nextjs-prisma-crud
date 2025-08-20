"use server";

import { redirect } from "next/navigation";
import { setSession } from "@/lib/auth";
 
/**
 * Login Action
 * - Validates email input
 * - Creates a session for the user
 * - Redirects to callback or default project page
 */
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const callbackUrl = formData.get('callbackUrl') as string || '/app/projects'
  
  if (!email) {
    return { error: 'Email is required' }
  }
  
  // Simple email validation
  if (!email.includes('@')) {
    return { error: 'Invalid email format' }
  }
  
  await setSession(email)
  
  // Use redirect instead of returning
  redirect(callbackUrl)
}
