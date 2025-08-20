import Link from 'next/link'
import { Project } from '@prisma/client'

interface ProjectCardProps {
  project: Project
  isOwner: boolean
  detailed?: boolean
}

export default function ProjectCard({ project, isOwner, detailed = false }: ProjectCardProps) {
  const statusColors = {
    planned: 'bg-gray-100 text-gray-800 border border-gray-300',
    active: 'bg-blue-100 text-blue-700 border border-blue-300',
    done: 'bg-green-100 text-green-700 border border-green-300',
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
          {isOwner && (
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[project.status as keyof typeof statusColors]}`}
            >
              {project.status}
            </span>
          )}
        </div>

        {project.description && (
          <p className="text-gray-600 mt-3 leading-relaxed">
            {detailed
              ? project.description
              : `${project.description.substring(0, 120)}${
                  project.description.length > 120 ? '...' : ''
                }`}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
        <div className="text-xs text-gray-500">
          Last updated: {new Date(project.updatedAt).toLocaleDateString()}
          {detailed && project.isPublic && (
            <span className="ml-2 px-2 py-0.5 text-[10px] rounded bg-yellow-100 text-yellow-700 border border-yellow-200">
              Public
            </span>
          )}
        </div>
        {isOwner ? (
          <Link
            href={`/app/projects/${project.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Edit →
          </Link>
        ) : (
          <Link
            href={`/projects/${project.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  )
}
