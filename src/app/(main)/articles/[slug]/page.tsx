import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getArticleBySlug, getArticleSlugs } from '@/lib/markdown';

// Mock data - replace with actual data fetching
const articlesData: { [key: string]: any } = {
  'minimalism-in-design': {
    slug: 'minimalism-in-design',
    title: 'The Power of Minimalism in Design',
    date: new Date(2024, 6, 15),
    tags: ['Design', 'Minimalism', 'UI/UX'],
    content: `
      <p>Minimalism isn't just an aesthetic; it's a principle that prioritizes clarity and usability. By stripping away the non-essential, we allow the core message and functionality to shine through.</p>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Why Less is More</h2>
      <p>Reducing visual clutter leads to:</p>
      <ul class="list-disc list-inside my-4 space-y-2 pl-4">
        <li>Faster loading times</li>
        <li>Easier navigation</li>
        <li>Improved focus on content</li>
        <li>Enhanced accessibility</li>
      </ul>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Implementing Minimalism</h2>
      <p>Key techniques include:</p>
      <ul class="list-disc list-inside my-4 space-y-2 pl-4">
        <li>Generous use of whitespace</li>
        <li>Limited color palettes</li>
        <li>Simple typography</li>
        <li>Flat design elements</li>
        <li>Purposeful iconography</li>
      </ul>
      <p>Ultimately, minimalism is about intentionality. Every element should serve a purpose, contributing to a seamless and effective user experience.</p>
    `,
  },
  'getting-started-with-nextjs': {
     slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 15',
    date: new Date(2024, 5, 28),
    tags: ['Web Development', 'Next.js', 'React', 'TypeScript'],
    content: `
      <p>Next.js continues to evolve, making it a powerful framework for building modern web applications. Version 15 introduces several exciting features and improvements, especially around the App Router and Server Components.</p>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Setting Up Your Project</h2>
      <p>Creating a new Next.js app with the latest features is straightforward:</p>
      <pre class="bg-muted p-4 rounded-md my-4 overflow-x-auto"><code class="font-mono text-sm">npx create-next-app@latest my-dev-app --typescript --tailwind --eslint</code></pre>
      <p>This command sets up a new project with TypeScript, Tailwind CSS, and ESLint configured, ready for development.</p>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Key Concepts for Developers</h2>
      <p>Understanding these core concepts is crucial for leveraging Next.js effectively:</p>
      <ul class="list-disc list-inside my-4 space-y-2 pl-4">
        <li><strong>App Router:</strong> The default routing system, enabling features like nested layouts, route groups, and Server Components.</li>
        <li><strong>Server Components:</strong> Rendered on the server, reducing client-side JavaScript and improving performance. Ideal for data fetching and non-interactive UI.</li>
        <li><strong>Client Components:</strong> Use the <code>'use client'</code> directive. Necessary for interactivity, state management (useState, useEffect), and browser APIs.</li>
        <li><strong>File-based Routing:</strong> Directory structure defines routes (e.g., <code>app/dashboard/page.tsx</code> maps to <code>/dashboard</code>).</li>
        <li><strong>Data Fetching:</strong> Use async Server Components for direct data fetching or leverage Server Actions for mutations.</li>
        <li><strong>Server Actions:</strong> Functions executed securely on the server, often used for form submissions and data mutations without needing separate API routes.</li>
      </ul>
      <p>Next.js provides a robust foundation for building performant, scalable, and maintainable full-stack applications with an excellent developer experience focused on modern web standards.</p>
    `,
  },
   'mindful-productivity': {
    slug: 'mindful-productivity',
    title: 'Mindful Productivity for Developers',
    date: new Date(2024, 5, 10),
    tags: ['Productivity', 'Mindfulness', 'Well-being', 'Software Development'],
    content: `
      <p>In the demanding world of software development, productivity often feels like a relentless race against deadlines and complexity. Mindful productivity offers a sustainable approach – focusing on intention, presence, and reducing cognitive load.</p>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Core Principles for Coders</h2>
      <ul class="list-disc list-inside my-4 space-y-2 pl-4">
        <li><strong>Deep Work Blocks:</strong> Allocate uninterrupted time for complex coding tasks, minimizing context switching.</li>
        <li><strong>Manage Cognitive Load:</strong> Break down complex problems into smaller, manageable chunks. Use tools and techniques to offload mental effort (e.g., good documentation, clear variable names).</li>
        <li><strong>Intentional Debugging:</strong> Approach debugging sessions with curiosity and a structured process, rather than frustration.</li>
        <li><strong>Regular Breaks:</strong> Step away from the screen to rest your eyes and mind. Short breaks can significantly improve focus and problem-solving.</li>
        <li><strong>Mindful Communication:</strong> Be present in meetings and code reviews. Practice active listening and provide constructive feedback.</li>
        <li><strong>Accept Imperfection:</strong> Recognize that code is iterative. Aim for progress, not perfection, especially in early stages.</li>
      </ul>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Practical Techniques</h2>
      <p>Integrate these habits into your workflow:</p>
      <ul class="list-disc list-inside my-4 space-y-2 pl-4">
        <li>Time blocking for coding vs. meetings vs. learning.</li>
        <li>The Pomodoro Technique (e.g., 25 mins coding, 5 mins break).</li>
        <li>Turning off non-essential notifications during focus blocks.</li>
        <li>Using rubber duck debugging to articulate problems.</li>
        <li>Regularly refactoring code to maintain clarity.</li>
        <li>Ending the workday with a brief review and plan for the next day.</li>
      </ul>
      <p>By integrating mindfulness into your development process, you can enhance focus, reduce stress, write better code, and find more satisfaction in your work.</p>
    `,
  },
};

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
