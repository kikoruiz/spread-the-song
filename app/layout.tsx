import type {Metadata} from 'next'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale, getMessages} from 'next-intl/server'
import {Figtree} from 'next/font/google'
// import localFont from 'next/font/local'
import Logo from '@/assets/brand/logo-full.svg'

import './globals.css'

const font = Figtree({
  subsets: ['latin'],
  display: 'swap'
})

// const postino = localFont({
//   variable: '--font-postino',
//   src: [
//     {
//       path: './fonts/Postino-Std.otf',
//       weight: '400',
//       style: 'normal'
//     },
//     {
//       path: './fonts/Postino-Std-Italic.otf',
//       weight: '400',
//       style: 'italic'
//     }
//   ]
// })

export const metadata: Metadata = {
  title: 'Spread the Song',
  description: 'Get a song URL from any music cloud service ready to be shared everywhere.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${font.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col items-center min-h-screen">
            <header className="sticky top-0 z-20 w-full p-12 flex justify-center backdrop-blur bg-transparent">
              <Logo className="w-60" />
            </header>

            <main className="w-full mb-auto">{children}</main>

            <footer className="flex justify-center p-12 font-bold">Spread the Song © 2024</footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
