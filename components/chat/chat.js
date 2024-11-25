"use client"

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  ImageIcon, 
  Paperclip, 
  Search, 
  Send, 
  Smile 
} from "lucide-react";


export default function ChatList(){
  const [chatUser, setChatWithUser] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const currentUserId = 5;

 //fetch chat list
  useEffect(()=> {
    const fetchListChatAndUser = async () => {
      try {
        const chatResponse = await fetch('http://18.143.79.95/api/chatSystem/chat/list');
        const dataChat = await chatResponse.json();
       

        if(!chatResponse.ok){
          throw new Error('Failed to fetch data of chat')
        }

        const dataUser = await fetch("http://18.143.79.95/api/chatSystem/users/list");
        const userList = await dataUser.json();
      

        if(!dataUser.ok){
          throw new Error('Failed to fetch data of groups')
        }

        console.log("Chat Data:", dataChat);
        console.log("User List:", userList);
        

        const chatAndUsers = dataChat.map((chat) => {
          const matchedUser = userList.find((user) => user.id === chat.fromUser);

          console.log("Chat:", chat);
          console.log("Matched User:", matchedUser);

          return {...chat, userDetails: matchedUser
          };
        });

        setUserList(userList);
        setChatWithUser(chatAndUsers);
      } catch(error){
        console.error("Error fetching chats:", error)
      }
    };

    fetchListChatAndUser();
  }, [])


  //fetch user details
  // const fetchUserDetails = async (userId) => {
  //   try{
  //     const response = await fetch(`http://18.143.79.95/api/chatSystem/user/${userId}`);
  //     const data = await response.json()
  //     setUserDetails(data);
  //   } catch(error){
  //     console.error("Error fetching user details:", error)
  //   }
  // };
    
  //fetch chats by userID
  const fetchChatMessages = async(userId) => {
    try {
      const response = await fetch(`http://18.143.79.95/api/chatSystem/chatByUserId/${userId}`);
      if(!response.ok){
        throw new Error("Failed to fetch chat messages");
      }
      const data = await response.json();
      setChatMessages(data);
      console.log(data)
    } catch(error){
      console.error("Error fetching chat message:", error);
    }
  }
       
  const sendMessage = async() => {
    if(!message.trim() || !selectedUser) return;

    try{
      const response = await fetch('http://18.143.79.95/api/chatSystem/chat/add', {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({
          fromUser: currentUserId,
          toUser: selectedUser.id, 
          message: message
        })
      });

      if(response.ok){
        setMessage(''),
        fetchChatMessages(selectedUser.id);
      }
    } catch(error){
      console.error("Error sending message:", error)
    }
  }

  const filteredChats = chatUser.filter( chat =>
    chat.message?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex w-full">
      <div className="rfixed w-1/3">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search messages..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      

        {/*chat list */}
        <div className="overflow-y-auto max-h-screen p-4">
          {filteredChats.map((chat) => (
            <div  
              key={chat.id}
              className="flex p-2 hover:bg-gray-200 cursor-pointer"
              onClick={()=> {
                setSelectedUser(chat.userDetails);
                fetchChatMessages(chat.userDetails.id);
              }}
            >
              <Avatar className="h-10 w-10 mr-3">
                {chat.userDetails?.profileImage ? (
                  <AvatarImage
                    src={chat.userDetails.profileImage}
                    alt={chat.userDetails.username || "User Profile"}
                  />
                ) : (
                  <AvatarFallback>
                    {chat.userDetails?.username?.charAt(0) || '?'}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-semibold">{chat.userDetails?.username}</p>
                <p className="text-sm text-gray-500 truncate">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/*Right Panel */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                {selectedUser.profileImage ? (
                  <AvatarImage
                    src={selectedUser.profileImage}
                    alt={selectedUser.username}
                  />
                ) : (
                  <AvatarFallback>{selectedUser.username.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.fromUser === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3 rounded-lg max-w-[70%] ${
                      msg.fromUser === currentUserId 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
              <Button onClick={sendMessage}>
                <Send className="h-5 w-5 mr-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

