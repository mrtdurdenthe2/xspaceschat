import './globals.css'
import '@fontsource-variable/noto-sans'

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
      <body className="antialiased font-['Noto_Sans_Variable']">{children}</body>
    </html>
  )
}
