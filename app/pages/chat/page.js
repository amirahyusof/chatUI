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
      <div className='grid grid-cols-1 lg:grid-rows-2 grid-flow-col gap-8 p-4'>
        <div className="row-span-3 space-y-6">
          <Card>
            <ChatUserList />
          </Card>
        
          <Card>
            <Groups />
          </Card>
        </div>

        <div className='row-span-2 lg:col-span-2 overflow-y-hidden'> 
          <Card>
            <ChatList />
          </Card>
        </div>
      </div>
      
    </section>
  )
}

