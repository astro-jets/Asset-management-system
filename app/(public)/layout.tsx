import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import AuthProvider from '../context/AuthProvider'
import Navbar from '../components/Nav/Nav'
import Footer from '../components/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'World Vision',
  description: "Malawi's leasing insurance",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <Navbar />
        <body>
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
