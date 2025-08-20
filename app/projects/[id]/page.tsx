import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import PreviewCard from '@/components/PreviewCard'

export const revalidate = 3600 // Revalidate every hour (ISR)

interface PublicProjectDetailPageProps {
  params: { id: string }
}

// Generate static params at build time
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

export default async function PublicProjectDetailPage({
  params,
}: PublicProjectDetailPageProps) {
  // Fetch project by ID
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  })

  // If project doesn't exist or isn't public → 404
  if (!project || !project.isPublic) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <PreviewCard project={project} isOwner={false}  />
      </div>
    </div>
  )
}
