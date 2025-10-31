"use server";
import redis from "@/cache";
import { sendCelebrationEmail } from "@/email/celebration-email";

const MILESTONES = [10, 50, 100, 1000, 10000];

const keyFor = (id: number | string) => `pageviews:article:${id}`;

export async function incrementPageview(articleId: number) {
  const articleKey = keyFor(articleId);
  const newVal = await redis.incr(articleKey);

  // no awaiting because we don't want to block with sending email
  if (MILESTONES.includes(+newVal)) {
    sendCelebrationEmail(articleId, +newVal); // no idea why + is there since redis will return number
  }
  //

  return +newVal;
}
