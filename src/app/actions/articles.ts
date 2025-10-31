"use server";

//
import { eq } from "drizzle-orm";
import db from "@/db";
import { articles } from "@/db/schema";

import { stackServerApp } from "@/stack/server";

//
import { authorizeUserToEditArticle } from "@/db/authz";

import { summerizeArticle } from "@/ai/summarize";

import redis from "@/cache"; // to clear redis db at the end of article creation
// because when we get all articles on the main page we are also
// serving articles from redis and we ned to make sure
// new article is included in result

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

  const summary = await summerizeArticle(data.title || "", data.content || "");

  const response = await db.insert(articles).values({
    title: data.title,
    content: data.content,
    slug: "" + Date.now(),
    published: true,
    authorId: user.id,
    imageUrl: data.imageUrl ?? undefined,
    //
    summary,
  });

  redis.del("articles:all");

  return { success: true, message: "Article create logged (stub)" };
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
  const user = await stackServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized!");
  }

  // we will write all of this inline in delete function, just to show you
  // that you can do it
  const authorized = await authorizeUserToEditArticle(user.id, +id);

  if (!authorized) {
    throw new Error("Forbidden!");
  }
  //

  const summary = await summerizeArticle(data.title || "", data.content || "");

  const response = await db
    .update(articles)
    .set({
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl ?? undefined,
      summary,
    })
    .where(eq(articles.id, +id));

  return { success: true, message: `Article id: ${id} update logged (stub)` };
}

export async function deleteArticle(id: string) {
  const user = await stackServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized!");
  }

  // see this, refactored unlike in update function
  if (!(await authorizeUserToEditArticle(user.id, +id))) {
    throw new Error("Forbidden!");
  }

  // TODO: Replace with actual datbase delete
  // console.log("deleteArticle called ", { id });

  const response = await db.delete(articles).where(eq(articles.id, +id));

  return { success: true, message: `Article id: ${id} delete logged (stub)` };
}
