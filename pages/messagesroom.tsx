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
      message: "how do you do today",
      date: "2nd Feb 18:04"
    },
    {
      from: "Naomi",
      message: "fine, thank you",
      date: "2nd Feb 18:04"
    },
    {
      from: "Alex",
      message: "not too bad, aye",
      date: "2nd Feb 18:04"
    },
    {
      from: "you",
      message: "Ah, grand",
      date: "2nd Feb 18:04"
    },
    {
      from: "Joe",
      message: "Let's make chickpea burgers!",
      date: "2nd Feb 18:04"
    }
  ]


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
          <div key={index} className="flex flex-col mr-2 ml-8">
            <p>{user.userName}</p>
            <img className="w-20 h-20 object-contain" src={user.avatar} alt="picture of the user"/>
          </div>
        )
        )}
      </div>

      <div className="flex flex-col bg-white p-4 mt-10 w-9/12 rounded m-auto">
        {dummyMessages.map((message, index) => {
           if(message.from == "you") {
            return (
            <div key={index} className="flex flex-row mb-3">
            <div className="w-full bg-green-100 p-0.5">{message.message}</div>
            <div className="ml-2 bg-green-200 text-xs p-0.5">From <span className="text-blue-500"> you </span>- {message.date}</div>
            </div>
            )
          } else {
            return (
            <div key={index} className="flex flex-row mb-3">
            <div className="bg-gray-100 mr-2 text-xs p-0.5">From <span className="text-red-500">{message.from}</span> - {message.date}</div>
            <div className="w-full bg-blue-100 p-0.5">{message.message}</div>
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
