import '@/styles/fonts.css'
import './globals.css'

export const metadata = {
  title: 'Spaces Chat',
  description: 'A chat interface for Spaces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-['Segoe_UI_Local']">
      <head>
        <link
          rel="preload"
          href="/fonts/Segoe UI.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
