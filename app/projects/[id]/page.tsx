import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import PreviewCard from '@/components/PreviewCard'

export const revalidate = 3600 // Revalidate every hour (ISR)

interface PublicProjectDetailPageProps {
  params: { id: string }
}

export default async function PublicProjectDetailPage({
  params,
}: PublicProjectDetailPageProps) {
  // Fetch project by ID
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  })

  // If project doesn’t exist or isn’t public → 404
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
