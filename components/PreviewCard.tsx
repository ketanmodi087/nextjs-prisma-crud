import Link from "next/link"
import { Project } from "@prisma/client"
import { Calendar, User, Globe, Lock, ArrowLeft, Edit3 } from "lucide-react"

interface ProjectDetailProps {
  project: Project
  isOwner: boolean
}

export default function ProjectDetail({ project, isOwner }: ProjectDetailProps) {
  const statusColors: Record<Project["status"], string> = {
    planned: "bg-gray-100 text-gray-700 border border-gray-300",
    active: "bg-blue-100 text-blue-700 border border-blue-300",
    done: "bg-green-100 text-green-700 border border-green-300",
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b">
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <span
            className={`px-4 py-1.5 text-sm font-medium rounded-full ${
              statusColors[project.status] ?? "bg-gray-200 text-gray-600"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Description */}
        {project.description && (
          <div className="px-8 py-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>
        )}

        {/* Metadata */}
        <div className="px-8 py-6 border-b grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <User className="w-5 h-5 text-gray-500" />
            <span>
              <span className="font-medium">Owner:</span> {project.ownerEmail}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            {project.isPublic ? (
              <>
                <Globe className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-600">Public Project</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-600">Private Project</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center px-8 py-6 bg-gray-50">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {isOwner && (
            <Link
              href={`/app/projects/${project.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Edit3 className="w-4 h-4" />
              Edit Project
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
