import ChatUserList from '@/components/chat/chatUserList'
import Groups from '@/components/chat/groups'
import Header from '@/components/sider/header'
import React from 'react'
import { Card } from '@/components/ui/card'
import Chat from '@/components/chat/chat'

export default function ChatPage(){
  return (
    <section>
      <Header />
      <div className='grid grid-cols-2 gap-8 p-4'>
        <div className="grid grid-rows-2 gap-8">
          <Card>
            <ChatUserList />
          </Card>

          <Card>
            <Groups />
          </Card>
        </div>

        <Card>
          <Chat />
        </Card>

      </div>
      
    </section>
  )
}

