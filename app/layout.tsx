import type {Metadata} from 'next'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale, getMessages} from 'next-intl/server'

import {Figtree} from 'next/font/google'
import TransitionProvider from './components/transition-provider'

import './globals.css'

const font = Figtree({
  subsets: ['latin'],
  display: 'swap'
})

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
            <TransitionProvider className="w-full mb-auto">{children}</TransitionProvider>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
