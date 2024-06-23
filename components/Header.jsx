'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import { motion } from "framer-motion";
import MobileNav from "./MobileNav";
import { Download } from 'lucide-react';
const Header = () => {
  return (
    <header className="text-white sticky top-0 p-5 flex bg-inherit items-start xl:items-center justify-between max-w-7xl mx-auto z-20">
        <div 
        className="container mx-auto flex justify-between items-center">
            {/* logo */}
            <motion.div 
            initial={{
                x: -500,
                opacity: 0,
                scale: 0.5
            }}
            animate={{
                x: 0,
                opacity: 1,
                scale: 1
            }}
            transition={{
                duration: 1.5,
            }}
            >
                <Link href="#hero">
                    <h1 className="text-4xl font-semibold">Gideon<span className="text-accent">.</span></h1>
                </Link>
            </motion.div>

            {/* Desktop nav&button */}
            <motion.div
            initial={{
                x: 500,
                opacity: 0,
                scale: 0.5
            }}
            animate={{
                x: 0,
                opacity: 1,
                scale: 1
            }}
            transition={{
                duration: 1.5,
            }}
            className="hidden lg:flex xl:flex items-center gap-8">
                <Nav />
                {/* <Link href="#contacts">
                    <Button className="tracking-[3px]">Hire me</Button>
                </Link> */}
                <Link href="/" target="_blank" rel="noopener noreferrer">
                    <Button className="tracking-[3px] mt-4" onClick={()=>{downloadFileAtURL(PDF_FILE_URL)}}>Download CV <Download className="ml-3"/></Button>
                </Link>
            </motion.div>

            {/* Mobile Nav */}
            <div className="lg:hidden">
                <MobileNav />
            </div>
        </div>
    </header>
  )
}

export default Header