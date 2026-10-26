import Hero from './components/Hero';
import Servicos from './components/Servicos';
import Processo from './components/Processo';
import Projetos from './components/Projetos';
import Experiencia from './components/Experiencia';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center overflow-x-clip">
      {/* Navbar só aqui */}
    

      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-12">
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

        <section id="experiencia">
          <Experiencia />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>

      <BackToTop />
    </main>
  )
}
