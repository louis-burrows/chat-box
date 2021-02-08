import React from 'react'
import Head from 'next/head'
// import { PrismaClient } from '@prisma/client'
import EmailForm from "../containers/EmailForm"



const Home: React.FC = ({ users }: any): JSX.Element => {
  console.log('users', users)
  return (
    < div className="flex flex-col">
      <Head>
        <title>Chat-App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="w-full m-5 text-3xl">
        Welcome to Chat-App
      </h1>


      < div className="" >
        <EmailForm />
      </div >



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
//     props: { users }
//   }
// }


export default Home
