import './globals.css'
import { Orbitron } from 'next/font/google' // <-- nova fonte
import type { Viewport } from 'next'
import AnimatedBackground from './components/AnimatedBackground'
import ChatBot from "./components/ChatBot";

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400','500','700','900'] }) // Orbitron

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
  <body className={`${orbitron.className} min-h-dvh bg-[#0a0a0a] text-[#00ff7f] antialiased`}>
        <AnimatedBackground /> 
        {children}
        <ChatBot />
      </body>
    </html>
  )
}
