import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import PreviewCard from '@/components/PreviewCard'

export const dynamic = "force-dynamic";

interface PublicProjectDetailPageProps {
  params: { id: string }
}

// Generate static params at build time - ONLY for public projects
export async function generateStaticParams() {
  // Only include public projects in the build
  const publicProjects = await prisma.project.findMany({
    where: { isPublic: true },
    select: { id: true }
  })

  return publicProjects.map((project) => ({
    id: project.id,
  }))
}

// This tells Next.js to generate the rest on-demand
export const dynamicParams = true

export default async function PublicProjectDetailPage({
  params,
}: PublicProjectDetailPageProps) {
  // Fetch project by ID
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  })

  // During build, we should only get here for public projects
  // So we can safely skip the notFound check during build
  const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined'
  
  // If project doesn't exist or isn't public → 404
  // But only at runtime, not during build
  if ((!project || !project.isPublic) && !isBuildTime) {
    notFound()
  }

  // If we're building and the project doesn't exist, return null
  // This should never happen if generateStaticParams works correctly
  if (isBuildTime && (!project || !project.isPublic)) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {project &&
        <PreviewCard project={project} isOwner={false}  />
        }
      </div>
    </div>
  )
}


