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
      
      <section id="hero" >
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>
  
      <section id="skills">
        <Skills />
      </section>
      
      <section id="projects">
        <Projects />
      </section>

      <section id="contacts" className="h-full">
        <Contact />
        <Footer />
      </section>
    </main>
  );
}
