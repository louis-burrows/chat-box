import React, { useState, useEffect } from 'react';

type ChatRoomData = {
  roomName: string
  roomId: number
  participants: number
  isOwner: boolean
  deleteChatRoom: (id: number) => void
}

const ChatRoom: React.FC<ChatRoomData> = ({ roomId, roomName, participants, isOwner, deleteChatRoom }): JSX.Element => {

  const [isTheOwner, toggleOwner] = useState(false)
  const ownerStyles = isTheOwner ? "bg-yellow-200" : "bg-gray-50"

  useEffect(() => {
    if (isOwner) {
      toggleOwner(true)
    }
  }, []);

  return (
    <>
      <div className="flex flex-row m-5 ">
        <p className={`${ownerStyles} border-white border-2 text-yellow-800 m-2 rounded-lg p-1`}>
          <span className="text-green-700">Room: </span>
          {roomName}...
          <span className="text-green-700"> with
            <span className="text-red-500"> {participants} </span>
          participants</span>
        </p>
        <button className="m-1 bg-green-200 rounded-lg p-1">Enter Chat Room {roomId}</button>
        {isOwner && (
          <button className="m-1 bg-red-200 rounded-lg p-1" onClick={() => deleteChatRoom(roomId)}>Delete Chat Room {roomId}</button>
        )}
      </div>
    </>
  )
}

export default ChatRoom;
