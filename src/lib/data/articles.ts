// import mocked_articles from "@/lib/mocked/articles.json"; // mocked json articles
import db from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";

export async function getArticles() {
  // replace these ones with actual from datbase
  // return mocked_articles;

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));

  return response;
}

export async function getArticleById(id: number) {
  // const articles = await getArticles();
  // return articles.find((item) => +item.id === id) || null;

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
    })
    .from(articles)
    .where(eq(articles.id, id))
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));

  return response[0] ? response[0] : null;
}
