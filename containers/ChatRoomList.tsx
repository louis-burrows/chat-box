import React, { useState, useEffect } from 'react';
import ChatRoom from "../components/ChatRoom"

const ChatRoomList: React.FC = ({ }): JSX.Element => {

type ChatRoom = {
  roomName: string
  roomId: string
  participants: number
}

const chatRooms: ChatRoom[] = [
  {
    roomName: "Mac Chat",
    roomId: "231655313",
    participants: 3
  },
  {
    roomName: "Talk about Cats and Dogs",
    roomId: "231245433",
    participants: 6
  },
  {
    roomName: "What to grow in the garden this year",
    roomId: "231676523",
    participants: 2
  },
  {
    roomName: "Turtleneck jumpers",
    roomId: "232341313",
    participants: 12
  }
]

return (
    <>
      <h2 className="m-2">Your currently available chatrooms...</h2>
      {chatRooms.map(chatroom => {
       return <ChatRoom chatRoomData={chatroom}/>
      })}
    </>
  )
}

export default ChatRoomList;
