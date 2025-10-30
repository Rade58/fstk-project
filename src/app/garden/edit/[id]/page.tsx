import { notFound } from "next/navigation";
import { MarkdownEditor } from "@/components/markdown-editor";
import { getArticleById } from "@/lib/data/articles";
import { stackServerApp } from "@/stack/server";

type EditArticlePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const _user = await stackServerApp.getUser({ or: "redirect" });

  const { id } = await params;

  // when we introduce real database
  /* if (_user.id !== id) {
    stackServerApp.redirectToHome();
  } */

  // In a real app, you would fetch the article data here
  // For now, we'll just show some mock data if it's not "new"
  if (id === "new") {
    return <MarkdownEditor isEditing={true} articleId={id} />;
  }

  const article = await getArticleById(+id);

  if (!article) {
    notFound();
  }

  // return <div>{JSON.stringify(article, null, 2)}</div>;

  return (
    <MarkdownEditor
      articleId={id}
      initialTitle={article.title}
      initialContent={article.content}
      isEditing={true}
    />
  );
}
