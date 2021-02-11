import React, { useContext } from 'react'
import Head from 'next/head'

import { UniqueIdContext } from '../context/UniqueIdContext'

import EmailForm from "../containers/EmailForm"
import { Auth } from '../components/Auth'
import ChatRoomList from "../containers/ChatRoomList"

const Home: React.FC = (): JSX.Element => {
  const { isLoggedIn, user } = useContext(UniqueIdContext)
  return (
    < div className="flex flex-col bg-blue-200 min-h-screen text-center font-mono">
      <Head>
        <title>Chat-Box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="bubble-main bubble-point text-3xl text-black font-mono font-bold">
        Welcome to Chat-Box
        {' '}
        {/* if statement - of logged in and user name is not empty string, then show user name */}
        {(isLoggedIn && user.name !== '') && user.name}
      </h1>


      <Auth>
        <div>You are logged in</div>
        <ChatRoomList />
      </Auth>
    </ div >
  )
}


export default Home
