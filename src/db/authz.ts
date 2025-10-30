import { eq, and } from "drizzle-orm";
import db from "@/db";
import { articles } from "@/db/schema";
import { usersSync } from "drizzle-orm/neon";

export async function authorizeUserToEditArticle(
  loggedInUserId: string,
  articleId: number,
): Promise<boolean> {
  const response = await db
    .select({ authorId: articles.authorId })
    .from(articles)
    // I added this
    // don't need the join (my mistake)
    // .innerJoin(usersSync, eq(usersSync.id, loggedInUserId))
    //
    .where(
      and(eq(articles.id, articleId), eq(articles.authorId, loggedInUserId)),
    );

  // If we didn't do it with checking user in the datbase
  /* if (!response.length) {
    return false;
  }

  return response[0].authorId === loggedInUserId; */

  // since we checked with query, we can do it like this

  if (response.length === 0) {
    return false;
  }
  return true;
}
