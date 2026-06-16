import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Permanent_Marker } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/components/cart-provider'
import { MusicProvider } from '@/components/music-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-serif'
});
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans'
});
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-brush'
});

export const metadata: Metadata = {
  title: 'BareBone',
  description: 'A curated collection of photography, stories, and exclusive merchandise',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} ${permanentMarker.variable} font-sans antialiased`}>
        <CartProvider>
          <MusicProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </MusicProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
