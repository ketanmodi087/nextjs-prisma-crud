import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ProjectForm from '@/components/ProjectForm'
import { createProject } from '@/lib/actions/index'

export default async function NewProjectPage() {
  const session = await getSession()

  // Redirect to login if user is not authenticated
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Pass createProject action to form for handling submission */}
        <ProjectForm action={createProject} />
      </div>
    </div>
  )
}
