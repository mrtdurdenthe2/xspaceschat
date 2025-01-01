import './globals.css'
import localFont from 'next/font/local'
import { Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const segoeUI = localFont({
  src: [
    {
      path: '../../public/fonts/Segoe UI.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Segoe UI Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Segoe UI Bold Italic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Segoe UI Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Segoe UI Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Segoe UI Light Italic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Segoe UI Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Segoe UI Semibold Italic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Segoe UI Semilight.ttf',
      weight: '350',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Segoe UI Semilight Italic.ttf',
      weight: '350',
      style: 'italic',
    }
  ],
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial'
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
    <html lang="en">
      <body className={`${segoeUI.className} ${notoSans.className} antialiased`}>{children}</body>
    </html>
  )
}
