import Hero from './components/Hero'
import Servicos from './components/Servicos'
import Processo from './components/Processo'
import Projetos from './components/Projetos'
import Contact from './components/Contact'
import Navbar from './components/Navbar'; // Ajuste caso o caminho seja diferente


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Container principal para manter o alinhamento centralizado */}
      <div className="w-full max-w-7xl px-6 md:px-12">
        <Hero />
        <Servicos />
        <Processo />
        <Projetos />
        <Contact />
      
      </div>
    </main>
  )
}