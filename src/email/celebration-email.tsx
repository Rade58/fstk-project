import { usersSync } from "drizzle-orm/neon";
import { eq } from "drizzle-orm";
import db from "@/db";
import resend from ".";
import { articles } from "@/db/schema";
import { CelebrationTemplate } from "./templates/celebration-template";

// using tsx extension because we are going to use rect built email template
// component

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000`;

//

export async function sendCelebrationEmail(
  articleId: number,
  pageviews: number,
) {
  const response = await db
    .select({
      email: usersSync.email,
      id: usersSync.id,
      //
      title: articles.title,
      name: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .where(eq(articles.id, articleId));

  const { email, id, name, title } = response[0];

  if (!email) {
    console.log(
      `Skipping sending a celebration for getting ${pageviews} on article ${articleId}, could not find email`,
    );
    return;
  }

  console.log(email);

  // only works if we set up your own custom domain on resend
  // TODO: set domain when you deploy the project
  // and uncomment this

  /* const emailRes = await resend.emails.send({
    from: "GardenMaster <noreply@mail.rade.dev>", // should be your domain
    to: email,
    subject: `You article got ${pageviews} views.`,
    html: "<h1>Congrats!</h1><p>You're an amazing author!</p>",
  }); */

  // when you specify and validate your own domain on resend, come back here
  // comment this because we will be using code above

  // this uses allowed resend domain we can send (only for testing from localhost)
  // and email that we sign up for resend
  // and convinently I used this user to test authentication and creating and updating articles
  // so we can test with taht email I set in env variable
  const emailRes = await resend.emails.send({
    from: "GardenMaster <onboarding@resend.dev>", // I believe it only lets you send from Resend if you haven't set up your domain
    // to: "<the email you signed up with>", // unless you set up your own domain, you can only email yourself
    to: process.env.RADETOV_EMAIL_TEMP!,
    subject: `You article got ${pageviews} views.`,
    html: "<h1>Congrats!</h1><p>You're an amazing author!</p>",
    // ---------------------------------------------------------
    react: (
      <CelebrationTemplate
        pageviews={pageviews}
        articleTitle={title}
        articleUrl={`${BASE_URL}/garden/${articleId}`}
        name={name ?? "Friend"}
      />
    ),
  });

  if (!emailRes.error) {
    console.log(
      `sent ${id} a celebration for getting ${pageviews} on article ${articleId}`,
    );
  } else {
    console.log(
      `Error! sending ${id} a celebration for gettting ${pageviews} on ${articleId} `,
      emailRes.error,
    );
  }
}
