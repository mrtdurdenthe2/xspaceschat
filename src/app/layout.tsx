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
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
