"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';


export default function Groups(){
  const [groupWithUsers, setGroupWithUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupAndUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const groupResponse = await fetch ("http://18.143.79.95/api/chatSystem/groups/list");
        const groupList = await groupResponse.json()
      
        if(!groupResponse.ok){
          throw new Error('Failed to fetch data of groups')
        }

        const dataUser = await fetch("http://18.143.79.95/api/chatSystem/users/list");
        const userList = await dataUser.json();
        
        if(!dataUser.ok){
          throw new Error('Failed to fetch data of groups')
        }

        const processGroups = groupList.map((group) => {
          const groupUsers = group.users.map((userId) => 
            userList.find((user) => user.id === userId)
          );
          return {...group, groupUsers};
        });

        setGroupWithUsers(processGroups);
        setIsLoading(false);

      } catch(err){
        console.error('Error fetching group and users:', err)
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setIsLoading(false);

      }
    };
    fetchGroupAndUsers();
  }, []);

  if (isLoading) {
    return (
      <div className='p-6 text-center'>
        Loading ...
      </div>
    );
  }


  if (error) {
    return (
      <div className='p-6 text-red-500'>
        <h1>Error Loading Groups</h1>
        <p>{error}</p>
      </div>
    );
  }
  

  return (
    <section className='p-6'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold'>Groups ({groupWithUsers.length})</h1>
        <p className='text-2xl'>+</p>
      </div>
      
      <div>
        <ul className=''>
          {groupWithUsers.map((group) => (
            <li key={group.id} className="py-4 flex items-center justify-between">
              <div className='flex items-center space-x-4'>
                <div className='w-8 h-8 bg-purple-300 text-purple-800 flex items-center justify-center rounded-lg'>
                  {group.name?.charAt(0)}
                </div>
                <p className="font-medium">{group.name}</p>
              </div>

              <div className="flex items-center -space-x-4">
                {group.groupUsers.slice(0,1).map((user) => (
                  user?.profileImage && (
                    <Image 
                      key={user.id}
                      src={ user.profileImage}
                      alt={user.username}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )
                ))}

                {group.groupUsers.length > 1 && (
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full">
                    +{group.groupUsers.length - 1}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}