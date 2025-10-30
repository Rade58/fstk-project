import { MarkdownEditor } from "@/components/markdown-editor";
import { stackServerApp } from "@/stack/server";

export default async function NewArticlePage() {
  await stackServerApp.getUser({ or: "redirect" });
  return <MarkdownEditor isEditing={false} />;
}
