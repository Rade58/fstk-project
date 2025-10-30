"use server";

//
import { eq } from "drizzle-orm";
import db from "@/db";
import { articles } from "@/db/schema";

import { stackServerApp } from "@/stack/server";

// Server action to handle uploads (stub)

// TODO: replace placeholder with real database operations when ready
export interface CreateArticleInput {
  title: string;
  content: string;
  authorId: string;
  imageUrl?: string;
}

export interface UpdateArticleInput {
  title?: string;
  content?: string;
  imageUrl?: string;
}

export async function createArticle(data: CreateArticleInput) {
  const user = await stackServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized!");
  }

  // TODO: Replace with actual datbase call
  // console.log("createArticle called ", data);

  const response = await db.insert(articles).values({
    title: data.title,
    content: data.content,
    slug: "" + Date.now(),
    published: true,
    authorId: user.id,
  });

  return { success: true, message: "Article create logged (stub)" };
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
  const user = await stackServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized!");
  }

  // TODO: Replace with actual datbase update
  // console.log("updateArticle called ", { id, ...data });

  const response = db
    .update(articles)
    .set({ title: data.title, content: data.content })
    .where(eq(articles.id, +id));

  return { success: true, message: `Article id: ${id} update logged (stub)` };
}

export async function deleteArticle(id: string) {
  const user = await stackServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized!");
  }

  // TODO: Replace with actual datbase delete
  // console.log("deleteArticle called ", { id });

  const response = await db.delete(articles).where(eq(articles.id, +id));

  return { success: true, message: `Article id: ${id} delete logged (stub)` };
}
