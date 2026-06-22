import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Permanent_Marker } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/components/cart-provider'
import { MusicProvider } from '@/components/music-provider'
import { MiniPlayer } from '@/components/mini-player'
import { QuickNav } from '@/components/quick-nav'
import { CartDrawer } from '@/components/cart-drawer'
import { Footer } from '@/components/footer'
import { HideOnDashboard } from '@/components/hide-on-dashboard'

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
            <HideOnDashboard>
              <QuickNav />
              <MiniPlayer />
            </HideOnDashboard>
            <main className="min-h-screen">
              {children}
            </main>
            <HideOnDashboard>
              <Footer />
              <CartDrawer />
            </HideOnDashboard>
          </MusicProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
