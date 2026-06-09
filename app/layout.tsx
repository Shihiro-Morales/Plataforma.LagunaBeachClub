import type { Metadata, Viewport } from 'next'
//import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/providers/language-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'


export const metadata: Metadata = {
  title: 'Laguna Beach Club | Resort en Laguna de Apoyo, Nicaragua',
  description: 'Tu escape tropical en la Laguna de Apoyo, Nicaragua. Un resort ecológico donde la naturaleza, la relajación y la aventura se encuentran. Alojamiento, restaurante, actividades acuáticas y más.',
  keywords: ['Laguna de Apoyo', 'Nicaragua', 'resort', 'hotel', 'eco-friendly', 'tropical', 'vacation', 'kayak', 'swimming'],
  authors: [{ name: 'Laguna Beach Club' }],
  openGraph: {
    title: 'Laguna Beach Club | Resort en Laguna de Apoyo',
    description: 'Tu escape tropical en la Laguna de Apoyo, Nicaragua',
    type: 'website',
    locale: 'es_NI',
  },
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

export const viewport: Viewport = {
  themeColor: '#0891B2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        <AuthProvider>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S1B9M8KP1E"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S1B9M8KP1E');
          `}
        </Script>
      </body>
    </html>
  )
}

