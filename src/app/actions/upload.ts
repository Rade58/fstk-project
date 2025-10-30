"use server";

import { put } from "@vercel/blob";

import { stackServerApp } from "@/stack/server";

// import {authorizeUserToEditArticle} from "@/db/authz"

// Server action to handle uploads (stub)

// TODO: replace placeholder with real cloudinary or other upload

export interface UploadedFile {
  url: string;
  size: number;
  type: string;
  filename?: string;
}

export async function uploadFile(formData: FormData): Promise<UploadedFile> {
  const user = await stackServerApp.getUser();

  if (!user) {
    throw new Error("Unauthorized!");
  }

  // basic validatio nconstants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB;
  const ALLOWED = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const files = formData.getAll("files").filter(Boolean) as File[];

  const file = files[0];

  if (!file) {
    throw new Error("No file provided");
  }

  console.log(
    " File upload initialized, received files: ",
    files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
  );

  if (!ALLOWED.includes(file.type)) {
    throw new Error("Invalid file type!");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File too large!");
  }

  // TODO:
  // Cloudinary upload code
  // Example: upload using Cloudinary SDK on the server and return secure_url

  console.log({ file });

  try {
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return {
      url: blob.url ?? "",
      size: file.size,
      type: file.type,
      filename: blob.pathname ?? file.name,
    };
  } catch (err) {
    console.log("Vercel blob upload error ", err);
    throw new Error("Upload failed!");
  }

  // Placeholder response
  // return {
  //   url: "/uploads/mock-image.jpg",
  //   size: file.size,
  //   type: file.type,
  //   filename: file.name,
  // };
}
