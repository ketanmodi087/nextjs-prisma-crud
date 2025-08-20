"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { z } from "zod";

// schema
const projectSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["planned", "active", "done"]),
  isPublic: z.boolean(),
});

/**
 * Create Project
 */
export async function createProject(
  prevState: { errors?: Record<string, string[]> },
  formData: FormData
) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const validatedFields = projectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
    isPublic: formData.get("isPublic") === "on",
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description, status, isPublic } = validatedFields.data;

  await prisma.project.create({
    data: { name, description, status, isPublic, ownerEmail: session },
  });

  revalidateTag(`projects:user:${session}`);
  if (isPublic) revalidateTag("projects:public");

  redirect(`/app/projects`);
}

/**
 * Update Project
 */
export async function updateProject(
  prevState: { errors?: Record<string, string[]> },
  formData: FormData
) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("id") as string;

  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject || existingProject.ownerEmail !== session) {
    throw new Error("Unauthorized");
  }

  const validatedFields = projectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
    isPublic: formData.get("isPublic") === "on",
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description, status, isPublic } = validatedFields.data;

  await prisma.project.update({
    where: { id },
    data: { name, description, status, isPublic },
  });

  revalidateTag(`project:${id}`);
  revalidateTag(`projects:user:${session}`);

  if (existingProject.isPublic !== isPublic) {
    revalidateTag("projects:public");
  }

  redirect(`/app/projects`);
}

/**
 * Delete Project
 */
export async function deleteProject(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject || existingProject.ownerEmail !== session) {
    throw new Error("Unauthorized");
  }

  await prisma.project.delete({ where: { id } });

  revalidateTag(`project:${id}`);
  revalidateTag(`projects:user:${session}`);
  if (existingProject.isPublic) {
    revalidateTag("projects:public");
  }

  redirect("/app/projects");
}
