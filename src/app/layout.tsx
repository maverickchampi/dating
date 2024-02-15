import { Navbar } from '@/components'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dating App',
  description: 'Podrás agendar citas con doctores en cualquier momento',
  icons: {
    icon: [
      {
        url: '/images/favicon.ico',
        type: 'image/x-icon',
      },
    ]
  }
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />

        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout