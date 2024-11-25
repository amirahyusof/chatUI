"use client"

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function ChatUserList() {
  const [userlist, setUserList] = useState([]); 
  const [searchContact, setSearchContact] = useState(""); 
  const [filterUser, setFilterUser] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(
          "http://18.143.79.95/api/chatSystem/users/list"
        );
        const data = await response.json();
        console.log(data);

        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const processedUsers = data.map(user => ({
          ...user,
          id: user.id || Math.random().toString(),
          username: user.username || 'Unknown User',
          profileImage: user.profileImage || '/default-avatar.png' 
        }));
        setUserList(processedUsers);
        setFilterUser(processedUsers); 
      } catch (err){
        console.error("Error fetching users", err)
        setError(err.message);
      } finally {
        setLoading(false)
      }
    }
    fetchUser();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); 
    setSearchContact(value);

    const filtered = userlist.filter((user) =>
      user.username.toLowerCase().includes(value)
    );
    setFilterUser(filtered); 
  };

  return (
    <section className="p-6">
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search Contact"
          onChange={handleSearch}
          value={searchContact}
          className="w-full rounded-lg bg-white pl-8"
        />
      </div>

      <div className="mt-4">
        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && filterUser.length === 0 && (
          <p>No users found</p>
        )}

        <ul className="space-y-2">
          {filterUser.map((user) => (
            <li key={user.id} className="bg-white rounded-lg p-2 hover:bg-gray-50">
              <div className="flex items-center space-x-4 py-2">
                <div className="relative w-12 h-12">
                  <Image
                    src={user.profileImage}
                    alt={`${user.username}'s profile`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
                

                <div className="flex-1">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-gray-500">Lorem ipsum is simply tes</p>
                  
                  <div className="flex flex-cols font-medium text-sm gap-4">
                    <p>Dec 12 2020</p>
                    <p>10:40AM</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 mx-auto justify-center mt-4">
        <Button className="bg-indigo-600 row-span-2 hover:bg-indigo-700 text-white">Meeting</Button>
        <Button variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-black row-span-2">Schedule</Button>
      </div>
    </section>
  );
}
