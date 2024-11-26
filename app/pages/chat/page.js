import ChatUserList from '@/components/chat/chatUserList'
import Groups from '@/components/chat/groups'
import Header from '@/components/sider/header'
import React from 'react'
import { Card } from '@/components/ui/card'
import ChatList from '@/components/chat/chat'

export default function ChatPage(){
  return (
    <section>
      <Header />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-4'>
        <div className="md:space-y-6 md:flex md:flex-row md:justify-between md:gap-6">
          <Card className="md:w-full">
            <ChatUserList />
          </Card>
        
          <Card className="md:w-full">
            <Groups />
          </Card>
        </div>

        <div className='lg:col-span-2'> 
          <Card>
            <ChatList />
          </Card>
        </div>
      </div>
      
    </section>
  )
}

