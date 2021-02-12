import React, { useState, useContext, useEffect } from 'react'
//allows us to access variables that are in the url.
//this is next.js built in routing system.
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { UniqueIdContext } from '../../context/UniqueIdContext'
import axios from 'axios'


import { Auth } from '../../components/Auth'
import { sendError } from 'next/dist/next-server/server/api-utils'


const MessageRoom: React.FC = (): JSX.Element => {
  // this query fetches data from the url, useful when you want anything that is dynamic within the url.
  //push is a function that allows you to redirect a user to another place
  const { query, push } = useRouter()
  //id is the bit of information that we want from the query through useRouter
  const { id } = query

  const { uniqueId, user } = useContext(UniqueIdContext)
  const [chatroomData, updateChatRoomData] = useState<any>({})
  const [refresh, setRefresh] = useState(0)
  const [userMessage, setMessage] = useState<string>("")

  // causes a refresh of the page every 15 seconds the simulate a new api call and update the messages in the chat room
  useEffect(() => {
    const interval = setTimeout(() => {
      setRefresh(refresh + 1)
    }, 8000)
  }, [refresh])

  useEffect(() => {
    const getDataForThisChatRoom = async (): Promise<any> => {
      axios.get("/api/chatrooms/single", {
        params: {
          uniqueId,
          id,
          cache: new Date().toISOString()
        }
      })
        .then(response => {
          // console.log("return from chat room info call", response)
          updateChatRoomData(response.data.chatroom)
        })
        .catch(error => {
          console.log("error from chat room info call", error);
          push("/")
        })
    }
    // this makes sure the function is called only when id is defined, as for a split second it can be undefined
    if (id) {
      getDataForThisChatRoom()
    }
  }, [refresh, id]);

  // this is a safe way of checking whether an object has a specific property
  if (!chatroomData.hasOwnProperty('name')) {
    return <div />
  }

  const sendMessage = async (): Promise<any> => {
    axios.post('/api/messages/create', {
      //params is for get requests, data is for post requests. but because we are using .post, instead of method: "POST", data is already assumed
      uniqueId,
      chatroomId: id,
      message: userMessage
    })
      .then(response => {
        console.log("return from chat room info call", response)
        setMessage('')
        setRefresh(refresh + 1)
      })
      .catch(error => {
        console.log("error from chat room info call", error);
      })
  }



  return (

    <div className="flex flex-col bg-blue-200 min-h-screen text-center font-mono">

      <Head>
        <title>{chatroomData.name}</title>
      </Head>

      <h1 className="bubble-main bubble-point text-3xl text-black font-mono font-bold">
        Room Name: {chatroomData.name}
      </h1>

      {/* display of user names and avatars relevant to the chat room  */}
      <div className="flex justify-center">
        {chatroomData.users.map((user, index) => (
          <div key={index} className="flex flex-col mr-2 ml-8">
            <p>{user.name}</p>
            <img className="w-20 h-20 object-contain" src={user.avatar} alt="picture of the user" />
          </div>
        )
        )}
      </div>

      {/* input box to insert new messages */}
      <div className="flex flex-row mt-10 justify-center">
        <label className="mr-4" htmlFor="messageInput">Type away, {user.name}</label>
        <input className="rounded border-blue-300 border-2 border-solid" type="text" name="messageInput" id="messageInput" value={userMessage} onChange={(e) => setMessage(e.target.value)} />
        <button className="ml-4 bg-gray-100 rounded p-0.5 border-blue-300 border-2 border-solid" onClick={() => sendMessage()}>Submit</button>
      </div>

      {/* All the messages submitted by the users, with user-dependent styles */}
      <div className="flex flex-col bg-white p-4 mt-10 w-9/12 rounded m-auto">
        {chatroomData.messages.map((message, index) => {
          //setting up a date and time stamp, to present the data in a nice UI way
          const date = new Date(message.timestamp)
          const dateStamp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} @ ${date.getHours()}:${date.getMinutes()}`
          return message.sender.userId === uniqueId ? (
            <div key={index} className="flex flex-row mb-3">

              <div className="w-full bg-green-100 p-0.5">{message.message}</div>
              <div className="ml-2 bg-green-200 text-xs p-0.5">From <span className="text-blue-500"> you </span>- {dateStamp}</div>

            </div>
          ) : (
              <div key={index} className="flex flex-row mb-3">

                <div className="bg-gray-100 mr-2 text-xs p-0.5">From <span className="text-red-500">{message.sender.name}</span> - {dateStamp}</div>
                <div className="w-full bg-blue-100 p-0.5">{message.message}</div>

              </div>
            )
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
