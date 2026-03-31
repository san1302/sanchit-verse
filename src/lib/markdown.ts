import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Path to the articles folder
const articlesDirectory = path.join(process.cwd(), 'content/articles');

export type Article = {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  tags: string[];
  content: string;
  contentHtml?: string;
};

/**
 * Get the slugs of all articles
 */
export function getArticleSlugs() {
  try {
    return fs.readdirSync(articlesDirectory)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''));
  } catch {
    // Intentional: graceful degradation for static site — return empty list
    // rather than crashing if the articles directory is missing or unreadable
    return [];
  }
}

/**
 * Get article data by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .use(remarkGfm)
      .process(content);
    const contentHtml = processedContent.toString();
    
    return {
      slug,
      title: data.title,
      date: new Date(data.date),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content,
      contentHtml,
    };
  } catch {
    // Intentional: graceful degradation — return null so the page can show
    // a 404 instead of crashing if a single article fails to parse
    return null;
  }
}

/**
 * Get all articles, sorted by date
 */
export async function getAllArticles(): Promise<Article[]> {
  const slugs = getArticleSlugs();
  const articlesPromises = slugs.map(slug => getArticleBySlug(slug));
  const articles = (await Promise.all(articlesPromises)).filter(
    (article): article is Article => article !== null
  );
  
  // Sort by date, most recent first
  return [...articles].sort((a, b) => b.date.getTime() - a.date.getTime());
} 