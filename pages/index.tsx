import React from 'react'
import Head from 'next/head'
// import { PrismaClient } from '@prisma/client'
import EmailForm from "../containers/EmailForm"
import { Auth } from '../components/Auth'



const Home: React.FC = ({ users }: any): JSX.Element => {
  console.log('users', users)
  return (
    < div className="flex flex-col bg-blue-200 min-h-screen text-center font-mono">
      <Head>
        <title>Chat-Box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="bubble-main bubble-point text-3xl text-black font-mono font-bold">
        Welcome to Chat-Box
      </h1>

      <Auth>
        <div>You are logged in</div>
      </Auth>
    </ div >
  )
}

// // this runs a moment before the component loads. getStaticProps holds up the page from loading until it is resolved - when it receives the "users" props
// export async function getStaticProps() {
//   const prisma = new PrismaClient()
//   const users = await prisma.chatroom.findMany({
//     include: {
//       users: true,
//       messages: true
//     }
//   })
//   return {
//     props: {users}
//   }
// }


export default Home
