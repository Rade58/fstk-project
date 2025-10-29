import { MarkdownEditor } from "@/components/markdown-editor";
import { ArticleViewer } from "@/components/article-viewer";
import { randomBytes } from "node:crypto";
import {
  sample_image,
  markdownSampleContent,
} from "@/components/markdown_sample";

export default function TryOut() {
  return (
    <div>
      {/* <MarkdownEditor /> */}
      <ArticleViewer
        article={{
          id: randomBytes(16).toString("hex"),
          title: "React and Next.js: A Comprehensive Guide",
          author: "Alfred J. Kwak",
          content: markdownSampleContent,
          createdAt: "2-6-2021",
          imageUrl: sample_image,
        }}
      />
    </div>
  );
}
