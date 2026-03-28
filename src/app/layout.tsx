import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-headline',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Sanchit Verse',
  description: 'Software Engineer | Ex-Amazon | AB InBev — Building scalable platforms and design systems.',
  metadataBase: new URL('https://www.sanchit-verse.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Sanchit Verse',
    description: 'Software Engineer | Ex-Amazon | AB InBev — Building scalable platforms and design systems.',
    url: 'https://www.sanchit-verse.com',
    siteName: 'Sanchit Verse',
    images: [
      {
        url: '/images/sanchit-portrait.png',
        width: 800,
        height: 800,
        alt: 'Sanchit Agarwal — Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanchit Verse',
    description: 'Software Engineer | Ex-Amazon | AB InBev — Building scalable platforms and design systems.',
    images: ['/images/sanchit-portrait.png'],
    creator: '@sanchit_verse',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-black text-[#e2e2e2] font-body antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
