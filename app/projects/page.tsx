import { prisma } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function PublicProjectsPage() {
  // Fetch all public projects, sorted by most recently updated
  const projects = await prisma.project.findMany({
    where: { isPublic: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Back button */}
      <div className="flex items-center mb-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <h1 className="text-2xl font-bold ml-2">Public Projects</h1>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No public projects available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} isOwner={false} />
          ))}
        </div>
      )}
    </div>
  );
}
