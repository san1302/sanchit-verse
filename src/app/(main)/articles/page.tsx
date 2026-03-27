import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { getAllArticles } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Articles - Sanchit Agarwal',
  description: 'Read articles on software development, design, and productivity.',
};

export default async function ArticlesPage() {
  // Fetch articles from markdown files
  const articles = await getAllArticles();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          // Basic div styled as a card
          <div key={article.slug} className="card flex flex-col border border-border hover:shadow-md transition-shadow duration-200">
            <div className="card-header"> {/* Basic header div */}
               <h2 className="card-title text-xl mb-1"> {/* Basic title */}
                <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </h2>
              <p className="card-description">{format(article.date, 'MMMM d, yyyy')}</p> {/* Basic description */}
            </div>
            <div className="card-content flex-grow"> {/* Basic content div */}
              <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                   // Basic span styled as a badge
                   <span key={tag} className="badge badge-secondary">{tag}</span>
                ))}
              </div>
            </div>
            <div className="card-footer"> {/* Basic footer div */}
              <Link href={`/articles/${article.slug}`} className="text-sm text-primary font-medium flex items-center group hover:text-primary/80 transition-colors">
                Read More
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
