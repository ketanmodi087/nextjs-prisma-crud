// app/app/projects/page.tsx
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProjectFilters from '@/components/ProjectFilters'

interface ProjectsPageProps {
  searchParams: { status?: string; search?: string }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const session = await getSession()
  if (!session) redirect('/login')

  // Build the where clause dynamically
  const whereClause: any = {
    ownerEmail: session,
  }

  // Add status filter if provided
  if (searchParams.status && ['planned', 'active', 'done'].includes(searchParams.status)) {
    whereClause.status = searchParams.status as 'planned' | 'active' | 'done'
  }

  // Add search filter if provided
  if (searchParams.search) {
    whereClause.name = {
      contains: searchParams.search,
      mode: 'insensitive' as const, // Use 'as const' to fix the type issue
    }
  }

  const projects = await prisma.project.findMany({
    where: whereClause,
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Link
          href="/app/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Project
        </Link>
      </div>

       <ProjectFilters searchParams={searchParams} />


      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found. Create your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} isOwner />
          ))}
        </div>
      )}
    </div>
  )
}