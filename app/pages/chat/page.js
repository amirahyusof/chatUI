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
      <div className='grid grid-rows-2 grid-flow-col gap-8 p-4'>
        <div className="row-span-3 space-y-6">
          <Card>
            <ChatUserList />
          </Card>
        
          <Card>
            <Groups />
          </Card>
        </div>

        <div className='row-span-2 col-span-2'> 
          <Card>
            <ChatList />
          </Card>
        </div>
      </div>
      
    </section>
  )
}

