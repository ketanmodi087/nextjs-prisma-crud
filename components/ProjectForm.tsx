'use client'

import { useFormState } from 'react-dom'
import { createProject, updateProject } from '@/lib/actions'

interface ProjectFormProps {
  action: typeof createProject | typeof updateProject
  project?: {
    id?: string
    name?: string | null
    description?: string | null
    status?: string | null
    isPublic?: boolean | null
  }
}

export default function ProjectForm({ action, project }: ProjectFormProps) {
  // Initialize form state with empty errors
  const [state, formAction] = useFormState(action, { errors: {} })

  return (
    <form action={formAction} className="space-y-6">
      {/* hidden id for updates */}
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      {/* Project Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Name*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={project?.name || ""}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength={3}
        />
        {state?.errors?.name && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.name.join(', ')}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={project?.description || ""}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status (radio) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <div className="space-y-2">
          {['planned', 'active', 'done'].map((status) => (
            <div key={status} className="flex items-center">
              <input
                type="radio"
                id={`status-${status}`}
                name="status"
                value={status}
                defaultChecked={
                  project?.status === status ||
                  (!project?.status && status === 'planned')
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`status-${status}`}
                className="ml-2 block text-sm text-gray-700 capitalize"
              >
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Public checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          defaultChecked={project?.isPublic || false}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
          Make project public
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {project?.id ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}
