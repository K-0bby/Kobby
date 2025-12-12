"use client";

import React, { useState } from "react";
import Image from "next/image";
import BackgroundCircles from "@/components/background-circles";
import { Button } from "@/components/ui/button";
import PolaroidImages from "@/components/polariod-image";
import SkillsMarquee from "@/components/skills-marquee";
import { projects } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Marquee from "@/components/marquee";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLenis } from "@/components/lenis-provider";

// Hero Section Component
const HeroSection = () => {
    const { scrollTo } = useLenis();

  const handleContactClick = () => {
    if (window.location.pathname === "/") {
      scrollTo("#contact", { offset: -100, duration: 8 });
    }
  };

  return (
    <section className="h-screen w-full flex flex-col space-y-4 sm:space-y-6 items-center justify-center text-center overflow-hidden relative px-4 sm:px-6 lg:px-8 mb-16 md:mb-0 pb-6 md:pb-0 ">
      <BackgroundCircles />

      {/* Floating Animation Elements - Hidden on small screens to prevent overflow */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce delay-1000" />
      <div className="absolute top-32 right-32 w-6 h-6 bg-purple-400/20 rounded-full animate-pulse delay-500" />
      <div className="absolute bottom-40 left-40 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce delay-700" />

      {/* Profile Image - Positioned to align with background circles */}
      <div className="relative flex-shrink-0 mt-2 lg:mt-0">
        <Image
          src="/images/kobby-1.png"
          alt="Gideon Hoenyefia - Frontend Developer"
          width={150}
          height={150}
          priority
          className="relative rounded-full w-40 h-40 mx-auto object-cover ring-4 ring-white/50 z-10"
        />
      </div>

      {/* Hero Content */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight">
          Hi, I&apos;m Gideon Hoenyefia.
        </h1>
        <h2 className="text-sm md:text-lg uppercase text-gray-700 tracking-[4px] sm:tracking-[6px] lg:tracking-[8px] font-medium">
          Frontend Developer
        </h2>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-2">
          &quot;Building modern, responsive apps with a creative touch&quot;
        </p>
      </div>

      {/* Action Button */}
      <div className="flex flex-row items-center gap-3">
        <div className="rounded-full bg-green-100 px-3 py-3 sm:px-4 flex items-center space-x-2 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-600 text-xs sm:text-sm font-medium whitespace-nowrap">
            Available for work
          </span>
        </div>
        <Button onClick={handleContactClick} className="rounded-xl cursor-pointer hover:scale-105 transition-transform duration-200 px-6 py-2 text-sm sm:text-base">
          Hire Me
        </Button>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const aboutParagraphs = [
    {
      id: 1,
      content: (
        <>
          Hey, I&apos;m <span className="font-semibold">Gideon</span>. I&apos;m
          a <span className="font-semibold">Frontend Developer</span> who
          thrives on turning abstract ideas into sleek, functional, and
          impactful web experiences. With{" "}
          <span className="font-semibold">
            modern web tools and technologies
          </span>
          , I focus on building clean, scalable, and user-friendly applications
          that balance performance with design.
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          My work is driven by curiosity and a builder&apos;s mentality. I
          believe code should be efficient, maintainable, and purposeful, and I
          enjoy exploring new technologies to keep pushing the boundaries of
          what&apos;s possible. Along with frontend development, I&apos;m
          passionate about cybersecurity and the role it plays in creating
          secure, reliable digital products.
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          Beyond coding, I enjoy basketball, experimenting with side projects,
          and reading to stay inspired. At my core, I&apos;m focused on
          curiosity, growth, and leaving everything I work on better than I
          found it.
        </>
      ),
    },
  ];

  return (
    <section className="w-full overflow-hidden py-12 -mt-40 lg:-mt-32">
      <div className="flex flex-col space-y-6 sm:space-y-8 items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black">
          About Me
        </h2>

        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {aboutParagraphs.map((paragraph) => (
            <p
              key={paragraph.id}
              className="text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed text-justify sm:text-center"
            >
              {paragraph.content}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mt-12 lg:mt-16">
        <PolaroidImages />
      </div>
    </section>
  );
};

// Section Divider Component
const SectionDivider = () => (
  <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl h-px mx-auto bg-gray-200" />
);

// Skills Section Component
const SkillsSection = () => (
  <section className="w-full">
    <SkillsMarquee />
  </section>
);

const ProjectSection = () => {
  const router = useRouter();
  return (
    <section className="min-h-screen pb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-black text-center mt-2 mb-20 capitalize">
        Check out some of my recent works
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl border-4 border-gray-200 transition-all duration-500 overflow-hidden p-3"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={320}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="py-3 px-2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  {project.title}
                </h2>

                <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                <div className="flex flex-row flex-wrap items-center gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="px-1.5 py-1 text-xs font-medium text-blue-500 bg-blue-50 rounded-full"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => router.push(`/projects/${project.id}`)}
                    className="group/btn inline-flex items-center gap-2 bg-gray-100 hover:bg-black text-gray-700 hover:text-white font-semibold py-3 px-4 rounded-lg"
                  >
                    <span>View Project</span>
                    <span>
                      <ChevronRight size={20} />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mt-12 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push(`/projects`)}
          className="rounded-xl cursor-pointer px-4 py-3 text-sm sm:text-base bg-black text-[#f5f5f5] flex items-center gap-2"
        >
          View All Projects{" "}
          <span>
            <ChevronRight size={20} />
          </span>
        </motion.button>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        setFormState({ name: "", email: "", message: "" });
      } else {
        toast.error(result.error || "Failed to send message.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="w-full py-16 sm:py-20 lg:py-20" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="contact-section relative overflow-hidden flex items-center justify-center">
          {/* Content Container */}
          <div className="relative z-10 text-center px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto">
            <div className="space-y-4 px-6">
              <h2 className="text-2xl font-bold text-white leading-tight tracking-wider capitalize">
                How may I assist you?
              </h2>

              <p className="text-sm sm:text-base text-gray-200 mx-auto leading-relaxed max-w-xs sm:max-w-md md:max-w-lg">
                Together, we can transform your vision into something remarkable.
              </p>

              {/* Responsive Marquee Container */}
              <>
                <Marquee />
              </>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-32 container mx-auto px-4 lg:px-48">
          <h2 className="text-2xl font-bold text-black leading-tight tracking-wider capitalize mb-4 text-center">
            Get in touch
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mx-auto leading-relaxed mb-8 text-justify sm:text-center">
            Let&apos;s create products that work and deliver real results. I am
            open to new opportunities and collaborations. Please contact me if you
            want to make ideas happen.
          </p>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-6 text-gray-800 bg-[#f2f2f2] border-2 border-[#bbbbbb] rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 shadow-none"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-6 text-gray-800 bg-[#f2f2f2] border-2 border-[#bbbbbb] rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 shadow-none"
              />
            </div>

            {/* Message Textarea */}
            <Textarea
              name="message"
              placeholder="Write your Message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={0}
              className="w-full px-6 py-6 h-[200px] text-gray-800 bg-[#f2f2f2] border-2 border-[#bbbbbb] rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 resize-none shadow-none"
            />

            {/* Send Button */}
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-black text-white rounded-2xl font-medium text-lg hover:bg-gray-800 transition-colors duration-200 contact-section disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Main Home Component
export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <SectionDivider />
      <SkillsSection />
      <ProjectSection />
      <SectionDivider />
      <ContactSection />
      <SectionDivider />
    </main>
  );
}
