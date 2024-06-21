'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


const links = [
    {
        name: "home",
        path: "#hero",
    },
    {
        name: "about",
        path: "#about",
    },
    {
        name: "skills",
        path: "#skills",
    },
    {
        name: "projects",
        path: "#projects",
    },
    {
        name: "contact",
        path: "#contacts",
    },
]

const Nav = () => {
    const pathname = usePathname();
  return (
    <nav className="flex gap-8 ">
        {links.map((link, index) => {
            return (
                <Link href={link.path} key={index} className={`${pathname === link.path && "text-accent"} capitalize font-medium hover:text-accent text-md tracking-wide transition-all`}>
                    {link.name}
                </Link>
            )
        })}
    </nav>
  )
}

export default Nav