export const sample_image = "https://picsum.photos/200/300";
export const markdownSampleContent = `# Getting Started with React and Markdown

## Introduction

Welcome to this comprehensive guide on working with **Markdown** in React applications. This article will cover the basics and some advanced techniques that will help you create beautiful, readable content for your web applications.

Markdown has become the de facto standard for writing documentation, blog posts, and README files. Its simplicity and readability make it an excellent choice for developers and content creators alike. In this guide, we'll explore various markdown features and how they render in React applications.

![Sample Image](https://picsum.photos/200/300)

## Why Use Markdown?

Markdown is a lightweight markup language that offers several benefits for modern web development. It was created by John Gruber in 2004 with the goal of making it easy to write and read plain text that could be converted to HTML.

The philosophy behind Markdown is that it should be readable as-is, without looking like it's been marked up with tags or formatting instructions. This makes it perfect for documentation where the source itself needs to be human-readable.

Here are some key advantages:

- Easy to read and write, even in plain text format
- Widely supported across platforms and tools
- Perfect for documentation and content management systems
- Can be converted to HTML seamlessly without losing formatting
- Integrates well with version control systems like Git
- Minimal learning curve for new users

## Code Examples

One of the most powerful features of Markdown is its ability to display code beautifully. Whether you're writing technical documentation or tutorials, code blocks are essential.

Here's a simple React component:

\`\`\`javascript
import React from 'react';

const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};

export default HelloWorld;
\`\`\`

You can also use inline code like \`const x = 10;\` within your text. This is particularly useful when referencing variable names, function names, or small code snippets without breaking the flow of your paragraph.

![Random Photo](https://picsum.photos/200/300)

## Working with React Markdown

When using \`react-markdown\`, you might encounter some styling issues, especially with tables. This is often due to CSS resets or global styles that override the default table styling.

To fix table rendering issues, you may need to add custom styles to your markdown container. Tables in particular need proper border and padding styles to display correctly. Many CSS frameworks reset table styles, which can cause them to appear as plain text.

Consider wrapping your markdown renderer in a div with a specific class, then applying styles like:

\`\`\`css
.markdown-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

.markdown-content th {
  background-color: #f2f2f2;
  font-weight: bold;
}
\`\`\`

## Lists and Organization

Organizing information is crucial for readability. Markdown provides both ordered and unordered lists to help structure your content effectively.

### Ordered List

When you need to present information in a specific sequence:

1. First item - this could be your initial step
2. Second item - follow up with the next action
3. Third item - complete the sequence with final steps

### Unordered List

For items where order doesn't matter:

- Coffee - the fuel of developers
- Tea - a gentler alternative
- Milk - for those who prefer simplicity

![Another Image](https://picsum.photos/200/300)

## Blockquotes

Blockquotes are perfect for highlighting important information, quotes from experts, or calling attention to key concepts. They provide visual separation from the main text and draw the reader's eye.

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

This quote perfectly encapsulates the spirit of software development. We're not just users of technology; we're creators and innovators who shape the digital landscape.

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
>
> — Martin Fowler

## Feature Comparison Table

Here's a comparison of different markdown features and their support across renderers:

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✓ | H1-H6 available |
| Lists | ✓ | Ordered & Unordered |
| Code Blocks | ✓ | Syntax highlighting supported |
| Tables | ✓ | May need custom styling |
| Images | ✓ | Inline and reference style |
| Links | ✓ | Internal and external |
| Blockquotes | ✓ | Can be nested |
| Emphasis | ✓ | Bold, italic, strikethrough |

## Advanced Formatting

Markdown supports various levels of emphasis and formatting. You can use **bold text** for strong emphasis, *italic text* for subtle emphasis, or even combine them with ***bold and italic*** text.

You can also use ~~strikethrough~~ text when you need to show deletions or corrections. This is particularly useful in collaborative documentation or when showing the evolution of code or ideas.

For those situations where you need subscript or special characters, you might need to use HTML entities or rely on your markdown renderer's extended syntax support.

![Final Image](https://picsum.photos/200/300)

## Links and Resources

Connecting your content to external resources is easy with Markdown. You can create inline links like [React documentation](https://react.dev) or reference-style links for better readability in the source.

Here are some useful resources:

- [Markdown Guide](https://www.markdownguide.org) - comprehensive markdown reference
- [React Markdown](https://github.com/remarkjs/react-markdown) - the library we're using
- [GitHub Flavored Markdown](https://github.github.com/gfm/) - extended markdown syntax

## Conclusion

Markdown makes it easy to create rich, formatted content without the complexity of HTML. Its simplicity doesn't mean limited functionality—as you've seen in this guide, markdown is capable of handling everything from simple text formatting to complex code blocks and images.

Whether you're building a blog, documentation site, or content management system, markdown provides an excellent balance between ease of use and powerful formatting capabilities. The key is understanding how your markdown renderer processes the content and ensuring your styles support all the features you need.

Remember to test your markdown rendering with various content types, especially if you're experiencing issues with specific elements like tables. Often, these issues can be resolved with targeted CSS adjustments.

Happy coding and writing!

---

*Last updated: October 2025*
`;
