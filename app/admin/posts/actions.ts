"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import * as posts from "@/lib/posts";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readPostInput(formData: FormData): posts.PostInput {
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    title,
    slug: slugify(rawSlug || title),
    excerpt,
    content,
    tags,
  };
}

export async function createPostAction(formData: FormData) {
  await requireAdmin();
  const data = readPostInput(formData);
  await posts.createPost(data);
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin");
}

export async function updatePostAction(id: number, formData: FormData) {
  await requireAdmin();
  const data = readPostInput(formData);
  await posts.updatePost(id, data);
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin");
}

export async function deletePostAction(id: number) {
  await requireAdmin();
  await posts.deletePost(id);
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function setPublishedAction(id: number, published: boolean) {
  await requireAdmin();
  await posts.setPublished(id, published);
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
}
