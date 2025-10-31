// import mocked_articles from "@/lib/mocked/articles.json"; // mocked json articles
import { eq } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";
import db from "@/db";
import { articles } from "@/db/schema";
import redis from "@/cache";

export async function getArticles() {
  // redis stuff
  const cached = await redis.get("articles:all");

  if (cached) {
    console.log("Get articles cache hit");
    return cached;
  }

  // replace these ones with actual from datbase
  // return mocked_articles;

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
      summary: articles.summary,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));

  // redis stuff
  console.log("Get articles cache miss!");

  redis.set("articles:all", response, {
    ex: 60, // one minute
  });
  //

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
      imageUrl: articles.imageUrl,
      // summary: articles.summary, don't need summary from ai on the single article page
    })
    .from(articles)
    .where(eq(articles.id, id))
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));

  return response[0] ? response[0] : null;
}

export type ArticleJoinedUser = Exclude<
  Awaited<ReturnType<typeof getArticleById>>,
  null
>;
