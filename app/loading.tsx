import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export default function Loading() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24" style={{fontSize:'2rem', padding: 20}}>
      <h1 style={inter.style}>Loading...</h1>
  </main>
  )
}