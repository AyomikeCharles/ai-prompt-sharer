import Nav from '@components/Nav'
import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Provider from '@components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI prompt idea',
  description: 'Save your ai prompt ideas here',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Nav/>
          {children}
        </Provider>
      </body>
    </html>
  )
}
