"use client"

import Link from 'next/link'
import React from 'react'
import { navLinks } from "./navlink"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"

export default function Header(){
  const pathname = usePathname();
  return (
    <div className='top-0 flex items-center'>
       <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" className="shrink-0 md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
        </SheetTrigger>
        <SheetContent side="top" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-light">
            {navLinks.map(({href, Icon}) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                     flex items-center px-2 py-4 transition-all
                    ${isActive ? 'border-l-4 border-red-500' : 'hover:bg-red'}
                    ${href === '/dashboard' ? 'mt-4' : ''}
                    `}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className='flex-1 px-8'>
        <h1 className='text-2xl text-extrabold'>Chat</h1>
      </div>

      <div className='flex items-center'>
        <p className='underline text-[#EDB5F5]'>
          <Link href="">
            Add New Profile
          </Link>
        </p>
      </div>
      
      
    </div>
  )
}
