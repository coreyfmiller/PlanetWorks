import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Tiny Planet',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
