import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Oops! The page you're looking for seems to have vanished into the digital ether.
      </p>
       {/* Basic link styled as a button */}
       <Link href="/" className="btn btn-primary btn-md">
           <ArrowLeft className="mr-2 h-4 w-4" />
           Return Home
       </Link>
    </div>
  )
}
