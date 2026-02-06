import Navbar from './components/Navbar'; // Importar só uma vez
import Hero from './components/Hero';
import Servicos from './components/Servicos';
import Processo from './components/Processo';
import Projetos from './components/Projetos';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Navbar só aqui */}
    

      <div className="w-full max-w-7xl px-6 md:px-12">
        <section id="me">
          <Hero />
        </section>

        <section id="servicos">
          <Servicos />
        </section>

        <section id="processo">
          <Processo />
        </section>

        <section id="projetos">
          <Projetos />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
    </main>
  )
}
