import './globals.css'
import { Inter } from 'next/font/google'
import { Orbitron } from 'next/font/google' // <-- nova fonte
import AnimatedBackground from './components/AnimatedBackground'

const inter = Inter({ subsets: ['latin'] })  
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400','500','700','900'] }) // Orbitron

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${orbitron.className} bg-[#0a0a0a] text-[#00ff7f]`}>
        <AnimatedBackground /> 
        {children}
      </body>
    </html>
  )
}
