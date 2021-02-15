import React, { useState, useEffect } from 'react';
import Link from 'next/link'


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
      <div className="flex flex-row m-4 max-w-3xl gap-x-6 justify-between break-words">
        <div className="text-sm">
          <p className={`${ownerStyles} border-white border-2 m-1 rounded-lg p-1 w-32 sm:w-60 lg:w-10/12`}>Room: {}
            
            <span className="text-blue-600 font-black"> 
              {roomName}... {}
            </span>
            
              with
            <span className="text-blue-600 font-black">           {participants} {}  
            </span>

              participants
          </p>
        </div>

        <div className="flex flex-row text-xs font-black">
          {isOwner && (
            <button className="border-white border-2 bg-yellow-800 bg-opacity-25 rounded-lg mt-1 mb-1 p-1 font-black break-normal w-14 sm:w-20" onClick={() => deleteChatRoom(roomId)}>Delete Chat Room</button>
          )}
          <Link href={`/messagesroom/${roomId}`} >
            <a className="border-white border-2 p-1 bg-pink-300 bg-opacity-80 rounded-lg text-center flex m-1 w-14 sm:w-20"><span className="m-auto">Enter Chat Room</span></a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ChatRoom;
