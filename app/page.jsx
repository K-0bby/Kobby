import Hero from "@/components/Hero";
import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#242424] max-w-screen-7xl min-h-screen text-white overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-accent">
      <Header />
      
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>
      
      <section id="about" className="min-h-screen">
        <About />
      </section>
  
      <section id="skills" className="min-h-screen">
        <Skills />
      </section>
      
      <section id="projects" className="min-h-screen">
        <Projects />
      </section>

      <section id="contacts" className="h-full">
        <Contact />
        <Footer />
      </section>
    </main>
  );
}
