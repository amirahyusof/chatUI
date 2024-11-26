"use client"

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  ImageIcon, 
  Paperclip, 
  PhoneCallIcon, 
  Search, 
  Send, 
  Smile, 
  Video, 
  EllipsisVertical, 
  MapPin
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


export default function ChatList(){
  const [chatUser, setChatWithUser] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
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
  const fetchUserDetails = async (userId) => {
    try{
      const response = await fetch(`http://18.143.79.95/api/chatSystem/user/${userId}`);
      const data = await response.json()
      setUserDetails(data);
    } catch(error){
      console.error("Error fetching user details:", error)
    }
  };
    
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


      const data = await response.json();
      console.log(data)

      if(!response.ok){
        throw new Error (`HTTP error ${response.status}`)
      }

      setMessage(''),
      fetchChatMessages(selectedUser.id);
    } catch(error){
      console.error("Error sending message:", error)
    }
  }

  const filteredChats = chatUser.filter( chat =>
    chat.message?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex w-full">
      <div className="relative w-1/3">
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
      <div className="relative flex-1 flex flex-col w-2/3 overflow-y-auto">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="h-10 w-10 mr-3">
                    {selectedUser.profileImage ? (
                      <div>
                        <AvatarImage
                          src={selectedUser.profileImage}
                          alt={selectedUser.username}
                          onClick={()=> {
                            fetchUserDetails(selectedUser.id);
                          }}
                        />
                      </div>
                      
                    ) : (
                      <AvatarFallback>{selectedUser.username.charAt(0)}</AvatarFallback>
                    )}
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-6 bg-white shadow-lg rounded-lg">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={selectedUser.profileImage} alt={selectedUser.username} />
                      </Avatar>
                      <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
                      <p className="text-gray-500">{selectedUser.position}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-500">{selectedUser.location}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <Button variant="outline" size="icon">
                          <PhoneCallIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Video className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* User Information Section */}
                    <div className="mt-6 space-y-4">
                      <h3 className="text-md font-semibold">User Information</h3>
                      <p>
                        <strong>Phone:</strong> {selectedUser.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedUser.email}
                      </p>
                    </div>

                    {/* Group Participants */}
                    <div className="mt-6">
                      <h3 className="text-md font-semibold">Group Participants</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{selectedUser.group}</p>
                      </div>
                    </div>

                    {/* Media Section */}
                    {/* <div className="mt-6">
                      <h3 className="text-md font-semibold">Media</h3>
                      <div className="flex space-x-2 mt-2">
                        {selectedUser.media.map((item, index) => (
                          <img
                            key={index}
                            src={item}
                            alt={`media-${index}`}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                        ))}
                      </div>
                    </div> */}
                  </PopoverContent>
                </Popover>
                
                <div>
                  <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
                  <p>{selectedUser.position}</p>
                </div>
              </div>
             

                <div className="flex items-center space-x-2">
                  <PhoneCallIcon className="h-6 w-6 border-2 p-1 cursor-pointer rounded-full" />
                  <Video className="h-6 w-6 border-2 rounded-full p-1 cursor-pointer" />
                  <EllipsisVertical className="h-6 w-6 border-2 rounded-full p-1 cursor-pointer" />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[36%] bg-gray-100">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.fromUser === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3 rounded-lg max-w-[50%] ${
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

