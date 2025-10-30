import { ArticleViewer } from "@/components/article-viewer";
import { getArticleById } from "@/lib/data/articles";
import { notFound } from "next/navigation";

type ViewArticlePage = {
  params: Promise<{ id: string }>;
};

export default async function ViewArticlePage({ params }: ViewArticlePage) {
  const { id } = await params;

  // Mock permission check - in real app, this would come from auth/user context
  const canEdit = true;

  const article = await getArticleById(+id);

  if (!article) {
    notFound();
  }

  return <ArticleViewer canEdit={canEdit} article={article} />;
}
