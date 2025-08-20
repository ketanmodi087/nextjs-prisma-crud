import LogoutButton from '@/components/LogoutButton'
import { getAuthStatus } from '@/lib/auth'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get current user info (from session/cookie)
  const { email } = await getAuthStatus()

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* App Header */}
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold">My Projects</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Logged in as: {email}</span>
                <LogoutButton />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
