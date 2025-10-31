import { NextRequest, NextResponse } from "next/server";
import { eq, isNull } from "drizzle-orm";
import { summerizeArticle } from "@/ai/summarize";
import db from "@/db";
import redis from "@/cache";
import { articles } from "@/db/schema";

export async function GET(req: NextRequest, res: NextResponse) {
  if (
    process.env.NODE_ENV !== "development" &&
    req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // finding articles where summary is null
  const rows = await db
    .select({
      id: articles.id,
      title: articles.title,
      content: articles.content,
    })
    .from(articles)
    .where(isNull(articles.summary));

  if (!rows || rows.length === 0) {
    return NextResponse.json({ ok: true, updated: 0 });
  }

  let updated = 0;

  console.log("Starting AI summary job");

  for (const row of rows) {
    try {
      const summary = await summerizeArticle(
        row.title ?? "",
        row.content ?? "",
      );

      if (summary && summary.trim().length > 0) {
        await db
          .update(articles)
          .set({ summary })
          .where(eq(articles.id, row.id));
        updated++;
      }
    } catch (err) {
      console.error("Failed to summarize article id = ", row.id, err);
      continue; // biome has this is unenecessary
      // makes sense moving to another loop step at the end is not necessary
      // but maybe this is some fear from calling ai to many time thing
      // I'll leve it here
    }
  }

  if (updated > 0) {
    // because we have updated article need to clear redis so we use fresh data

    try {
      await redis.del("articles:all");
    } catch (err) {
      console.warn("Failed to clear articles cache ", err);
    }
  }

  console.log(`Concluding AI summary job, updated ${updated} rows`);

  return NextResponse.json({ ok: true, updated });
}
