import mocked_articles from "@/lib/mocked/articles.json"; // mocked json articles

export async function getArticles() {
  // replace these ones with actual from datbase
  return mocked_articles;
}

export async function getArticleById(id: number) {
  const articles = await getArticles();

  return articles.find((item) => +item.id === id) || null;
}
