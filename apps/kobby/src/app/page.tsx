"use client";

import React, { useState } from "react";
import Image from "next/image";
import BackgroundCircles from "@/components/ux/background-circles";
import { Button, Input, Textarea, cn } from "@repo/ui";
import ProjectCard from "@/components/projects/project-card";
import {
  ACTION_BUTTON,
  ACTION_BUTTON_PRIMARY,
} from "@/lib/ui";
import PolaroidImages from "@/components/ux/polariod-image";
import SkillsMarquee from "@/components/ux/skills-marquee";
import { projects } from "@/data/data";
import { CaretRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Marquee from "@/components/ux/marquee";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLenis } from "@/provider/lenis-provider";

// Hero Section Component
const HeroSection = () => {
  const { scrollTo } = useLenis();

  const handleContactClick = () => {
    if (window.location.pathname === "/") {
      scrollTo("#contact", { offset: -100, duration: 8 });
    }
  };

  return (
    <section className="relative mb-16 flex h-screen w-full flex-col items-center justify-center space-y-4 overflow-hidden px-4 pb-6 text-center sm:space-y-6 sm:px-6 md:mb-0 md:pb-0 lg:px-8">
      <BackgroundCircles />

      {/* Floating Animation Elements - Hidden on small screens to prevent overflow */}
      <div className="absolute top-20 left-20 h-4 w-4 animate-bounce rounded-full bg-blue-400/30 delay-1000" />
      <div className="absolute top-32 right-32 h-6 w-6 animate-pulse rounded-full bg-purple-400/20 delay-500" />
      <div className="absolute bottom-40 left-40 h-3 w-3 animate-bounce rounded-full bg-amber-400/40 delay-700" />

      {/* Profile Image - Positioned to align with background circles */}
      <div className="relative mt-2 shrink-0 lg:mt-0">
        <Image
          src="/images/me.png"
          alt="Gideon Hoenyefia - Frontend Developer"
          width={150}
          height={150}
          priority
          className="relative z-10 mx-auto h-40 w-40 rounded-full object-cover object-center ring-4 ring-gray-500/50"
        />
      </div>

      {/* Hero Content */}
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-xl leading-tight font-bold text-black sm:text-2xl md:text-3xl">
          Hi, I&apos;m Gideon Hoenyefia.
        </h1>
        <h2 className="text-sm font-medium tracking-[4px] text-gray-700 uppercase sm:tracking-[6px] md:text-lg lg:tracking-[8px]">
          Frontend Developer
        </h2>
        <p className="mx-auto max-w-xs px-2 text-sm leading-relaxed text-gray-500 sm:max-w-md md:text-base lg:max-w-lg">
          &quot;Building modern, responsive apps with a creative touch&quot;
        </p>
      </div>

      {/* Action Button */}
      <div className="flex flex-row items-center gap-3">
        <div className="flex shrink-0 items-center space-x-2 rounded-full bg-green-100 px-3 py-3 sm:px-4">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-xs font-medium whitespace-nowrap text-green-600 sm:text-sm">
            Available for work
          </span>
        </div>
        <Button
          onClick={handleContactClick}
          className={cn(ACTION_BUTTON, ACTION_BUTTON_PRIMARY, "hover:scale-105")}
        >
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
          Hey, I&apos;m <span className="font-semibold">Gideon</span>. I&apos;m a{" "}
          <span className="font-semibold">Frontend Developer</span> who thrives on turning abstract
          ideas into sleek, functional, and impactful web experiences. With{" "}
          <span className="font-semibold">modern web tools and technologies</span>, I focus on
          building clean, scalable, and user-friendly applications that balance performance with
          design.
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          My work is driven by curiosity and a builder&apos;s mentality. I believe code should be
          efficient, maintainable, and purposeful, and I enjoy exploring new technologies to keep
          pushing the boundaries of what&apos;s possible. Along with frontend development, I&apos;m
          passionate about cybersecurity and the role it plays in creating secure, reliable digital
          products.
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          Beyond coding, I enjoy basketball, experimenting with side projects, and reading to stay
          inspired. At my core, I&apos;m focused on curiosity, growth, and leaving everything I work
          on better than I found it.
        </>
      ),
    },
  ];

  return (
    <section className="-mt-40 w-full overflow-hidden py-12 lg:-mt-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-6 px-4 text-center sm:space-y-8 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        <h2 className="text-2xl font-bold text-black sm:text-3xl lg:text-4xl xl:text-5xl">
          About Me
        </h2>

        <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
          {aboutParagraphs.map((paragraph) => (
            <p
              key={paragraph.id}
              className="text-justify text-sm leading-relaxed text-gray-500 sm:text-center sm:text-base lg:text-lg"
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
  <div className="mx-auto h-px w-full max-w-xs bg-gray-200 sm:max-w-md md:max-w-lg lg:max-w-4xl" />
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
      <h2 className="mt-2 mb-20 text-center text-2xl font-bold text-black capitalize md:text-3xl">
        Check out some of my recent works
      </h2>

      <div className="mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center sm:mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push(`/projects`)}
          className={cn('inline-flex h-auto cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 sm:text-base', ACTION_BUTTON_PRIMARY)}
        >
          View All Projects{" "}
          <span>
            <CaretRight size={20} />
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <section className="w-full py-16 sm:py-20 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="contact-section relative flex items-center justify-center overflow-hidden">
          {/* Content Container */}
          <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 text-center sm:px-8 sm:py-12 lg:px-12 lg:py-16">
            <div className="space-y-4 px-6">
              <h2 className="text-2xl leading-tight font-bold tracking-wider text-white capitalize">
                How may I assist you?
              </h2>

              <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-200 sm:max-w-md sm:text-base md:max-w-lg">
                Together, we can transform your vision into something remarkable.
              </p>

              {/* Responsive Marquee Container */}
              <>
                <Marquee />
              </>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-20 px-4 lg:mt-32 lg:px-48" id="contact">
          <h2 className="mb-4 text-center text-2xl leading-tight font-bold tracking-wider text-black capitalize">
            Get in touch
          </h2>
          <p className="mx-auto mb-8 text-justify text-sm leading-relaxed text-gray-600 sm:text-center sm:text-base">
            Let&apos;s create products that work and deliver real results. I am open to new
            opportunities and collaborations. Please contact me if you want to make ideas happen.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-4">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border-2 border-[#bbbbbb] bg-[#f2f2f2] px-6 py-6 text-gray-800 shadow-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border-2 border-[#bbbbbb] bg-[#f2f2f2] px-6 py-6 text-gray-800 shadow-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
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
              className="h-50 w-full resize-none rounded-2xl border-2 border-[#bbbbbb] bg-[#f2f2f2] px-6 py-6 text-gray-800 shadow-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
            />

            {/* Send Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="contact-section w-full rounded-2xl bg-black py-6 text-lg font-medium text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
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
