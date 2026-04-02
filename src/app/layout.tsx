import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CV Studio | ADAPTOVATE',
  description: 'AI-assisted CV drafting for proposal teams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <div className="bg-blue-600 text-white py-2">
          <div className="text-center font-bold text-sm">
            TEST FEATURE
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}