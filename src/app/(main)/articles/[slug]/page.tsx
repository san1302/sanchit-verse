import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getArticleBySlug, getArticleSlugs } from '@/lib/markdown';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} - Sanchit Agarwal`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
       <Link href="/articles" className="inline-flex items-center text-sm text-primary hover:text-primary/80 mb-6 group">
          <ArrowLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-3 leading-tight">{article.title}</h1>
        <p className="text-muted-foreground text-sm mb-3">
          Published on {format(article.date, 'MMMM d, yyyy')}
        </p>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag: string) => (
            <span key={tag} className="badge badge-secondary">{tag}</span>
          ))}
        </div>
      </header>
      <hr className="separator separator-horizontal my-8" />
      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:marker:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: article.contentHtml || '' }}
      />
    </article>
  );
}

// Generate static paths for all articles
export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map(slug => ({ slug }));
}
