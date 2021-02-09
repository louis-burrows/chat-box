import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ChatRoom from "../components/ChatRoom"
import { PointSpreadLoading } from 'react-loadingg';


const ChatRoomList: React.FC = ({ }): JSX.Element => {

  type ChatRoom = typeof availableChatRooms

  const uniqueId = localStorage.getItem("uniqueId")

  const [availableChatRooms, addToChatRooms] = useState([])
  const [fetchListInProgress, changeListFetchProgressState] = useState<boolean>(false);
  const [createdRoomName, addName] = useState("")
  const [createdParticipantNumber, addNumber] = useState(0)


  useEffect(() => {
    changeListFetchProgressState(true)
    const getChatRoomList = async (): Promise<any> => {
      try {
        const { data } = await axios('/api/chatrooms/all', {
          method: "GET",
          params: {
            uniqueId
          }
        })
        setTimeout(() => {
          changeListFetchProgressState(false)
          addToChatRooms(data.chatrooms)
        }, 2000);
      }
      catch (error) {
        changeListFetchProgressState(false)
        console.log(error)
      }
    }
    getChatRoomList()
  }, []);

  
  const generateEmailBoxes = () => {
    console.log(createdParticipantNumber)
    console.log(createdRoomName)
  }


  return (
    <>
      <div className="flex flex-column max-w-4xl">
        <button className="rounded border-solid border-2 border-blue-500 p-0.5 bg-white font-bold m-3" onClick={() => generateEmailBoxes()}>Create a new chat room</button>
        <input className="m-3 rounded" type="text" placeholder="Name your chatroom" onChange={e => addName(e.target.value)}/>
        <label className="m-2" htmlFor="participants">How many participants?</label>
        <input className="m-3 rounded w-10" type="number" min="1" max="5" id="participants" onChange={e => addNumber(e.target.valueAsNumber)}/>
      </div>

      {fetchListInProgress && (
        <PointSpreadLoading color="#ffffff" size="large" />
      )}

      {availableChatRooms.length>0 ? (
        <div>
          <div className="flex flex-row">
            <p>Created by you =</p>
            <div className="rounded border-white w-10 h-6 border-2 m-2 bg-yellow-200"></div>
          </div>
          <h2 className="m-2">Your currently available chatrooms...</h2>
        </div>
        ) : (
          null
          )
        }
        

      {
        availableChatRooms.map((chatroom: any) => {
          const chat = {
            roomName: chatroom.name,
            roomId: chatroom.id,
            participants: chatroom.users.length,
            isOwner: uniqueId === chatroom.owner.userId
          }
          //this is how to pass everything from an object as props, if you know you are going to be using everything
          return <ChatRoom {...chat} />
        })
      }
    </>
  )
}

export default ChatRoomList;
