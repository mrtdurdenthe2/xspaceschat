import './globals.css'
import { Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto',
})

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
    <html lang="en" className={`${notoSans.variable} ${notoSans.className}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
