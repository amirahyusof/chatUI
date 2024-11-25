import React from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Button } from '../ui/button'

export default async function ChatUserList(){
  let datalist = await fetch ("http://18.143.79.95/api/chatSystem/users/list")
  let userslist = await datalist.json()
 
  return (
   <section className='p-6'>
    <Input placeholder="Search Contact" />
    <div>
      <ul>
        {userslist.map((userlist) => (
          <li 
            key={userlist.id}
          >
            <div className='flex items-center space-x-4 py-2'>
              <Image
              src={userlist.profileImage} 
              alt={`${userlist.username}'s profile`}
              width={48}
              height={48}
              className="rounded-full"
              />
            
              <div>
                <p className='font-semibold'>{userlist.username}</p>
                <p className='text-gray-500'>Lorem ipsum is simply tes</p>

                <div className='flex flex-cols font-medium text-sm gap-4'>
                  <p>Dec 12 2020</p>
                  <p>10:40AM</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div className='grid grid-cols-2 gap-4 mx-auto justify-center mt-2'>
      <Button className="bg-indigo-600 row-span-2">Meeting</Button>
      <Button className="bg-gray-200 text-black row-span-2">Schedule</Button>
    </div>
   </section>
  )
}
