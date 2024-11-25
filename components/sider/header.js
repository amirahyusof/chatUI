"use client"

import Link from 'next/link'
import React from 'react'

export default function Header(){
  return (
    <div className='top-0 flex items-center'>
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
