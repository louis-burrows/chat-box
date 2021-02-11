import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios'
import ChatRoom from "../components/ChatRoom"
import { PointSpreadLoading } from 'react-loadingg';
import CreateChatroom from './CreateChatroom';

import { UniqueIdContext } from '../context/UniqueIdContext'
import { RefreshAppContext } from "../context/RefreshAppContext"
import { LoadingStateContext } from "../context/LoadingStateContext"

const ChatRoomList: React.FC = ({ }): JSX.Element => {
  // this is calling the unique id from context, where the uniqueId is now being resolved
  const { uniqueId } = useContext(UniqueIdContext)
  const [availableChatRooms, addToChatRooms] = useState([])

  const { refresh, refreshChatrooms } = useContext(RefreshAppContext)
  const { isLoading, toggleLoading } = useContext(LoadingStateContext)

  const getChatRoomList = async (): Promise<any> => {
    toggleLoading(true)
    try {
      const { data } = await axios('/api/chatrooms/all', {
        method: "GET",
        params: {
          uniqueId
        }
      })
      setTimeout(() => {
        toggleLoading(false)
        addToChatRooms(data.chatrooms)
      }, 1500);
    }
    catch (error) {
      setTimeout(() => {
        toggleLoading(false)
        console.log(error)
      }, 1000);
    }
  }

  //

  useEffect(() => {
    getChatRoomList()
  }, [refresh]);


  const deleteChatRoom = async (id: number): Promise<any> => {
    toggleLoading(true)
    try {
      await axios('/api/chatrooms/delete', {
        method: "DELETE",
        params: {
          uniqueId,
          id
        }
      })
      refreshChatrooms()
      toggleLoading(false)
    }
    catch (error) {
      toggleLoading(false)
      console.log(error)
    }
  }


  return (
    <>

      <CreateChatroom />

      {
        isLoading && (
          <PointSpreadLoading color="#ffffff" size="large" />
        )
      }

      {
        availableChatRooms.length > 0 ? (
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
        availableChatRooms.map(((chatroom: any, index: number) => {
          const chat = {
            roomName: chatroom.name,
            roomId: chatroom.id,
            participants: chatroom.users.length,
            isOwner: uniqueId === chatroom.owner.userId,
            deleteChatRoom
          }
          //this is how to pass everything from an object as props, if you know you are going to be using everything
          return <ChatRoom {...chat} key={index} />
        }))
      }
    </>
  )
}

export default ChatRoomList;
