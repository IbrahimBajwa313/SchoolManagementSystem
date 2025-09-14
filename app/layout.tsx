import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Greenwood International School',
  description:
    'Greenwood International School – A modern institution providing quality education with innovation, creativity, and excellence.',
  generator: 'Next.js',
  keywords: [
    'Greenwood International School',
    'International School',
    'Quality Education',
    'Best School',
    'Modern Learning',
  ],
  authors: [{ name: 'Greenwood International School Team' }],
  openGraph: {
    title: 'Greenwood International School',
    description:
      'Join Greenwood International School for world-class education, modern facilities, and a nurturing environment for students.',
    url: 'https://greenwood.example.com', // replace with your domain
    siteName: 'Greenwood International School',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greenwood International School',
    description:
      'Discover Greenwood International School – where innovation meets education.',
    creator: '@GreenwoodSchool', // replace with actual Twitter handle
  },
  metadataBase: new URL('https://greenwood.example.com'), // replace with your domain
  alternates: {
    canonical: 'https://greenwood.example.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
