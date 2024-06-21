'use client'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { CiMenuFries } from 'react-icons/ci';


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
        path: "#project",
    },
    {
        name: "contact",
        path: "#contacts",
    },
]

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <Sheet>
        <SheetTrigger className="flex justify-center items-center">
            <CiMenuFries className="text-[28px] text-accent"/>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
            {/* logo */}
            <div className="mt-28 mb-36 text-center text-2xl">
                <Link href={"/"}>
                    <h1 className="text-4xl font-semibold text-white">
                        Gideon<span className="text-accent">.</span>
                    </h1> 
                </Link>
            </div>
            {/* nav */}
            <nav className="flex flex-col justify-center items-center text-white gap-8">
            {links.map((link, index) => {
            return (
                <Link href={link.path} key={index} className={`${pathname === link.path && "text-accent"} capitalize font-medium hover:text-accent text-md tracking-wide transition-all`}>
                    {link.name}
                </Link>
            )
        })}
            </nav>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNav