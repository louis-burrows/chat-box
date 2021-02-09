import React, { useState, useEffect } from 'react';

type ChatRoomData = {
  chatRoomData : {
    roomName: string
    roomId: string
    participants: number
  }
}

const ChatRoom: React.FC<ChatRoomData> = ({ chatRoomData }): JSX.Element => {

  const {roomId, roomName, participants} = chatRoomData

  return (
    <>
    <div className="flex flex-row m-5 ">
    <p className="text-yellow-800 m-2 bg-gray-50 rounded-lg"><span className="text-green-700">Room:</span> {roomName}... <span className="text-green-700">with <span className="text-red-500">{participants}</span> participants</span></p>
    <button className="m-1 bg-green-200 rounded-lg">Enter Chat Room {roomId}</button>
    <button className="m-1 bg-red-200 rounded-lg">Delete Chat Room {roomId}</button>
    </div>
    </>
  )
}

export default ChatRoom;