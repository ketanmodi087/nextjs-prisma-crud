'use client'

import { useRouter } from 'next/navigation'

interface ProjectFiltersProps {
  searchParams: { status?: string; search?: string }
}

export default function ProjectFilters({ searchParams }: ProjectFiltersProps) {
  const router = useRouter()

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as any)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="mb-6 flex gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          defaultValue={searchParams.search || ''}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              updateQuery('search', e.currentTarget.value)
            }
          }}
        />
      </div>
      <select
        className="px-4 py-2 border border-gray-300 rounded-md"
        defaultValue={searchParams.status || ''}
        onChange={(e) => updateQuery('status', e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="planned">Planned</option>
        <option value="active">Active</option>
        <option value="done">Done</option>
      </select>
    </div>
  )
}
