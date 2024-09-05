
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contacts";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="bg-[#242424] max-w-screen-7xl h-screen text-white  overflow-y-scroll overflow-x-hidden z-0 scroll-smooth scrollbar scrollbar-track-gray-400/2 scrollbar-thumb-accent">
      <Header />
      <section id="hero" className=" h-full">
      <Hero />
      </section>
      
      <section id="about" className=" h-full">
      <About />
      </section>
  
      <section id="skills" className=" h-full">
      <Skills />
      </section>
      
      <section id="projects" className=" h-full">
      <Projects />
      </section>

      <section id="contacts" className=" h-full">
      <Contact />
      <Footer />
      </section>

    </main>
  );
}
