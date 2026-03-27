import React from "react";
import { Metadata } from 'next';
import { Download, Mail, Phone, Linkedin, Github, MapPin, Code, Facebook } from 'lucide-react'; // Added Code icon and Facebook icon

export const metadata: Metadata = {
  title: 'Resume - Sanchit Agarwal',
  description: 'View or download the resume of Sanchit Agarwal, Full-Stack Developer.',
};

// Mock Resume Data - Replace with your actual information
const resumeData = {
  name: 'Sanchit Agarwal',
  title: 'Full-Stack Developer', // Updated title
  location: 'Cyberspace | Remote', // Updated location
  contact: {
    email: 'hello@minimalistmuse.dev',
    phone: '+1 (555) 123-4567', // Keep or remove as needed
    linkedin: 'linkedin.com/in/minimalistmuse', // Just the path part
    github: 'github.com/minimalistmuse', // Just the path part
  },
  summary: 'A highly motivated and detail-oriented Full-Stack Developer with a passion for creating clean, efficient, and scalable web applications. Proven ability to design, develop, and deploy high-quality software solutions using modern technologies across the entire stack. Eager to contribute technical expertise to challenging projects.', // Updated summary
  experience: [
    {
      title: 'Senior Full-Stack Developer', // Updated title
      company: 'Innovatech Solutions Ltd.', // Example company
      period: '2021 - Present',
      location: 'Remote',
      description: 'Led the development of core platform features using Next.js, TypeScript, and Node.js. Designed and implemented RESTful APIs, managed PostgreSQL databases, and mentored junior developers. Contributed to architectural decisions and improved deployment pipelines.', // Updated description
    },
    {
      title: 'Software Engineer', // Updated title
      company: 'CodeCrafters Inc.', // Example company
      period: '2018 - 2021',
      location: 'Austin, TX', // Example location
      description: 'Developed and maintained client-side applications using React and Redux. Built backend services with Express.js and MongoDB. Collaborated closely with product managers and designers in an Agile environment to deliver features iteratively.', // Updated description
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      period: '2014 - 2018',
      location: 'Metropolis, USA',
    },
     {
      degree: 'Certified Cloud Practitioner', // Example certification
      institution: 'Amazon Web Services (AWS)',
      period: '2020',
      location: 'Online',
    },
  ],
  skills: [
    // Programming Languages
    'JavaScript (ES6+)', 'TypeScript', 'Python', 'Node.js', 'HTML5', 'CSS3',
    // Frontend Frameworks/Libraries
    'React', 'Next.js', 'Redux', 'Tailwind CSS', 'Styled Components',
    // Backend Frameworks/Libraries
    'Express.js', 'NestJS',
    // Databases
    'PostgreSQL', 'MongoDB', 'Redis', 'Firebase Firestore',
    // Cloud & DevOps
    'AWS (EC2, S3, Lambda, API Gateway, DynamoDB)', 'Docker', 'Kubernetes (Basic)', 'Vercel', 'Netlify', 'CI/CD', 'Git',
    // Tools & Concepts
     'RESTful APIs', 'GraphQL', 'Microservices', 'Serverless Architecture', 'Agile/Scrum', 'Unit Testing (Jest)', 'Integration Testing',
     // Design (Basic)
     'Figma (Basic)', 'UI/UX Principles',
  ],
};

export default function ResumePage() {
  return (
    <div className="container max-w-3xl py-10 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Sanchit <span className="text-primary">Agarwal</span></h1>
          <div className="text-muted-foreground text-sm md:text-base flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
            <span>sanchitagarwal0332@gmail.com</span>
            <span className="hidden md:inline">|</span>
            <span>+91 7355144155</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2 md:mt-0 md:text-right">
          Last Updated on 14th December 2024
        </div>
      </div>

      {/* Education & Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="card-title mb-2">EDUCATION</h2>
          <div className="font-semibold">BIT MESRA</div>
          <div>BE in Information Technology</div>
          <div className="text-muted-foreground text-sm">Graduated 2021 | Ranchi, India</div>
        </div>
        <div className="card">
          <h2 className="card-title mb-2">LINKS</h2>
          <div className="flex flex-col gap-1">
            <a href="https://facebook.com/sanchit.agarwal.399" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline"><Facebook className="h-4 w-4" /> facebook.com/sanchit.agarwal.399</a>
            <a href="https://github.com/san1302" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline"><Github className="h-4 w-4" /> github.com/san1302</a>
            <a href="https://linkedin.com/in/sanchitagarwal0332" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline"><Linkedin className="h-4 w-4" /> linkedin.com/in/sanchitagarwal0332</a>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="card mb-8">
        <h2 className="card-title mb-4">PROJECTS</h2>
        <div className="mb-4">
          <div className="font-semibold">GLOBAL DESIGN SYSTEM</div>
          <div className="text-muted-foreground text-sm mb-1">Spearheaded the creation of a unified design system for AB InBev, addressing inconsistencies across global zones. Standardized functional components and developed customizable themes to cater to localized requirements, ensuring alignment and usability across the organization.</div>
          <div className="text-xs text-muted-foreground mb-2">Technologies used: React.js, Node.js</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold">DEVREWBERY PLATFORM</div>
          <div className="text-muted-foreground text-sm mb-1">Consolidated multiple Power BI dashboards (e.g., DevOps costing, infra analysis, and code-related KPIs) into a unified web platform. Led frontend development and backend architecture setup, streamlining access to key insights for stakeholders.</div>
          <div className="text-xs text-muted-foreground mb-2">Technologies used: React.js, Node.js, MongoDB, MSSQL, GraphQL</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold">PROCESS AUTOMATION TOOL</div>
          <div className="text-muted-foreground text-sm mb-1">Developed a self-service portal enabling employees to request access to tools like Azure DevOps, GitHub, and SonarCloud. Migrated Azure DevOps access from ServiceNow, saving thousands of dollars annually by eliminating cross-charging fees. The project was built end-to-end using React.js and Node.js and delivered cost-effective and scalable solutions for enterprise users.</div>
          <div className="text-xs text-muted-foreground mb-2">Technologies used: React.js, Node.js</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold">CIBIL COMPLIANCE PROJECT</div>
          <div className="text-muted-foreground text-sm mb-1">Developed a consent flow for the "Free Credit Score" feature in Amazon Pay to comply with revised RBI guidelines. Delivered this project in under three weeks, leading frontend and backend efforts for a seamless production launch.</div>
          <div className="text-xs text-muted-foreground mb-2">Technologies used: Node.js, React.js</div>
        </div>
      </div>

      {/* Experience */}
      <div className="card mb-8">
        <h2 className="card-title mb-4">EXPERIENCE</h2>
        <div className="mb-4">
          <div className="font-semibold">AB INBEV | Software Engineer</div>
          <div className="text-xs text-muted-foreground mb-1">April 2023 – Present | Bangalore, India</div>
          <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
            <li>Designed and developed a self-service portal for enterprise tool access, saving 20,000 dollars annually by automating Azure DevOps workflows.</li>
            <li>Consolidated multiple dashboards into a unified analytics platform, reducing data retrieval time by 30 percent.</li>
            <li>Implemented real-time cost insights for Azure DevOps and GitHub, providing financial visibility for 50+ teams.</li>
            <li>Led the development of a global design system to standardize components across zones.</li>
          </ul>
        </div>
        <div className="mb-4">
          <div className="font-semibold">AMAZON | Software Engineer</div>
          <div className="text-xs text-muted-foreground mb-1">August 2021 – December 2022 | Bangalore, India</div>
          <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
            <li>Worked on launching new flows in "Free credit score" feature that is present in Amazon Pay section.</li>
            <li>Led many projects from end to end, helped the team in automating many internal tools of Amazon such as the update process of installment plans. Also, introduced bulk update feature of installment plans.</li>
            <li>Worked on Google guice, spring, angular js, java, javascript, typescript and many AWS services.</li>
          </ul>
        </div>
        <div className="mb-4">
          <div className="font-semibold">AMAZON | Software Engineering Intern</div>
          <div className="text-xs text-muted-foreground mb-1">Jan 2021 – July 2021 | Bangalore, India</div>
          <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
            <li>Built an internal secure channel which automated the process of sending/receiving confidential files from Lenders as well as processing and storing those received files in required format in our storage units.</li>
            <li>Worked on AWS services like Lambda, Data Pipeline, Fargate, DynamoDB, S3.</li>
            <li>Used Node.js, SQL queries, Javascript.</li>
          </ul>
        </div>
        <div className="mb-4">
          <div className="font-semibold">HCL TECHNOLOGIES LIMITED | Software Engineering Intern</div>
          <div className="text-xs text-muted-foreground mb-1">May 2019 – July 2019 | Lucknow, India</div>
          <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
            <li>Worked there as a full stack developer</li>
            <li>Built a web-based application to serve the students and teachers of any college. It was developed to make the academic life of a student easier.</li>
            <li>Used Node.js, React.js, MongoDB.</li>
          </ul>
        </div>
      </div>

      {/* Skills */}
      <div className="card mb-8">
        <h2 className="card-title mb-4">SKILLS</h2>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="badge">Javascript</span>
          <span className="badge">React</span>
          <span className="badge">Node.js</span>
          <span className="badge">MongoDB</span>
          <span className="badge">SQL</span>
          <span className="badge">C++</span>
        </div>
      </div>
    </div>
  );
}
