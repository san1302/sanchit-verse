import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio - Minimalist Muse',
  description: 'A showcase of selected software development projects.',
};

// Mock data - Replace with actual projects
const portfolioItems = [
  {
    id: 1,
    title: 'Full-Stack E-commerce Platform',
    description: 'Scalable online store built with Next.js, TypeScript, PostgreSQL, and deployed on Vercel.',
    imageUrl: 'https://picsum.photos/seed/ecommerce/600/400',
    link: '#', // Replace with actual project link or GitHub repo
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Full-Stack'],
  },
  {
    id: 2,
    title: 'Real-time Collaboration Tool',
    description: 'A web application enabling users to collaborate on documents in real-time using WebSockets and React.',
    imageUrl: 'https://picsum.photos/seed/collabtool/600/400',
    link: '#', // Replace with actual project link or GitHub repo
    tags: ['React', 'Node.js', 'WebSocket', 'MongoDB', 'Real-time'],
  },
  {
    id: 3,
    title: 'Component Library Showcase',
    description: 'A Storybook site documenting a custom React component library built for reusability.',
    imageUrl: 'https://picsum.photos/seed/storybook/600/400',
    link: '#', // Replace with actual project link or GitHub repo
    tags: ['React', 'Storybook', 'UI/UX', 'Component Library', 'Frontend'],
  },
    {
    id: 4,
    title: 'Serverless API Backend',
    description: 'A RESTful API built with AWS Lambda, API Gateway, and DynamoDB for a mobile application.',
    imageUrl: 'https://picsum.photos/seed/serverless/600/400',
    link: '#', // Replace with actual project link or GitHub repo
    tags: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Serverless', 'Backend'],
  },
];


export default function PortfolioPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
        Here are some selected software development projects I've worked on, showcasing my skills across the stack.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {portfolioItems.map((item) => (
           // Basic div styled as a card
          <div key={item.id} className="card overflow-hidden group hover:shadow-lg transition-shadow duration-200 border border-border">
            <div className="relative h-48 w-full">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-105"
                priority={item.id <= 2} // Prioritize loading images for the first few items
              />
            </div>
            <div className="card-header"> {/* Basic header div */}
              <h2 className="card-title text-xl mb-1 flex justify-between items-center"> {/* Basic title */}
                {item.title}
                {item.link && item.link !== '#' && (
                   <Link href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-5 w-5" />
                    <span className="sr-only">View Project</span>
                  </Link>
                )}
              </h2>
              <p className="card-description">{item.description}</p> {/* Basic description */}
            </div>
            <div className="card-content"> {/* Basic content div */}
               <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag) => (
                   // Basic span styled as a badge
                   <span key={tag} className="badge badge-secondary text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
