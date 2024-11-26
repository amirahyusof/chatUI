"use client"

import Link from "next/link"
import { navLinks } from "./navlink"
import { usePathname } from "next/navigation"

 

export default function Sidebar(){
  const pathname = usePathname();

  return (
    <div className="mt-4 h-max bg-[#7868E6] rounded-r-3xl md:border-r hidden md:flex flex-col color-white">

      
      <div className="flex-1 overflow-hidden">
        <nav className="grid items-center px-2">
          {navLinks.map(({href, Icon}) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center px-2 py-6 transition-all
                  ${isActive ? 'border-l-4 border-red-500' : 'hover:bg-red'}
                  `}
              >
              <Icon className="h-6 w-6 text-white" />
              </Link> 
            )
          })}
        </nav>
      </div>
    </div>
  )
}


