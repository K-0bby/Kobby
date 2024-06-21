
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contacts";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="bg-[#242424] h-screen text-white snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scroll-smooth scrollbar scrollbar-track-gray-400/2 scrollbar-thumb-accent">
      <Header />
      <section id="hero" className="snap-start">
      <Hero />
      </section>
      
      <section id="about" className="snap-center">
      <About />
      </section>
  
      <section id="skills" className="snap-start">
      <Skills />
      </section>
      
      <section id="projects" className="snap-start">
      <Projects />
      </section>

      <section id="contacts" className="snap-start">
      <Contact />
      <Footer />
      </section>

    </main>
  );
}
