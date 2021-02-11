import React, { useState, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { UniqueIdContext } from '../context/UniqueIdContext'

import { Auth } from '../components/Auth'


const MessageRoom: React.FC = (): JSX.Element => {

  const chatroomUsers = [
    {
      userName: "Blob",
      avatar: "./avatars/avatar1.png"
    },
    {
      userName: "Gi Gi",
      avatar: "./avatars/avatar2.png"
    },
    {
      userName: "Pompinu",
      avatar: "./avatars/avatar1.png"
    },
    {
      userName: "Jack",
      avatar: "./avatars/avatar3.png"
    },
    {
      userName: "",
      avatar: ""
    }
  ]

  const dummyMessages = [
    {
      from: "you",
      message: "how do you do today"
    },
    {
      from: "them",
      message: "fine, thank you"
    },
    {
      from: "them",
      message: "not too bad, aye"
    },
    {
      from: "you",
      message: "Ah, grand"
    },
    {
      from: "them",
      message: "Let's make chickpea burgers!"
    }
  ]

  const [whoSent, toggleWho] = useState("")

  const you = "bg-green-100"
  const them = "bg-yellow-100"

  const chatRoomUserGenerator = () => {
    
  }

  const { uniqueId, refetchUser, user } = useContext(UniqueIdContext)


  return (
    <div className="flex flex-col bg-blue-200 min-h-screen text-center font-mono">

      <Head>
        <title>Chat Room Name</title>
      </Head>

      <h1 className="bubble-main bubble-point text-3xl text-black font-mono font-bold">
        Room Name:
      </h1>

      <div className="flex justify-center">
        {chatroomUsers.map((user, index) => (
          <div className="flex flex-col mr-2 ml-8">
            <p>{user.userName}</p>
            <img className="w-20 h-20 object-contain" src={user.avatar} alt="picture of the user"/>
          </div>
        )
        )}
      </div>

      <div className="flex flex-col bg-white p-4 mt-10 w-9/12 rounded">
        {dummyMessages.map((message, index) => {
           if(message.from == "you") {
            return (
            <div key={index} className="flex flex-row mb-3">
            <div className="w-full bg-yellow-100">{message.message}</div>
            <div className="right-10">From you</div>
            </div>
            )
          } else {
            return (
            <div key={index} className="flex flex-row mb-3">
            <div className="left-10">From {message.from}</div>
            <div className="w-full bg-blue-100">{message.message}</div>
            </div>
            )
          }
        })}


      </div>
        
            
      

      <Auth>
        <Link href="/">
          <span className="fixed cursor-pointer top-0 left-2 mr-2 mt-2 bg-red-200 border-2 rounded p-1 shadow text-green-900">Home</span>
        </Link>


      </Auth>
    </div>
  )
}



export default MessageRoom;
