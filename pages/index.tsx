import React, { useContext } from 'react'
import Head from 'next/head'
import axios from 'axios'

import { UniqueIdContext } from '../context/UniqueIdContext'

import { Auth } from '../components/Auth'
import ChatRoomList from "../containers/ChatRoomList"

axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0'
}

const Home: React.FC = (): JSX.Element => {
  const { isLoggedIn, user } = useContext(UniqueIdContext)
  return (
    < div className="flex flex-col bg-blue-200 font-mono min-h-screen">
      <Head>
        <title>Chat-Box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-2xl text-black font-mono font-bold mt-16 mb-10 text-center">
        Welcome to Chat-Box,
        {' '}
        {/* if statement - of logged in and user name is not empty string, then show user name */}
        {(isLoggedIn && user.name !== '') && user.name}!
      </h1>


      <Auth>
        <ChatRoomList />
      </Auth>
    </ div >
  )
}


export default Home
