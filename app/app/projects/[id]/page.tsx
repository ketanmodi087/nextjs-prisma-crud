import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { updateProject } from "@/lib/actions/index";

interface ProjectDetailPageProps {
  params: { id: string };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const session = await getSession();

  // Redirect if user is not logged in
  if (!session) {
    redirect("/login");
  }

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  // If project doesn't exist or user doesn't own it → 404
  if (!project || project.ownerEmail !== session) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ProjectForm action={updateProject} project={project} />
      </div>
    </div>
  );
}
