import React from 'react'
import Head from 'next/head'
import Link from 'next/link'


import { Auth } from '../components/Auth'


const EditProfiles: React.FC = (): JSX.Element => {
  return (
    < div className="flex flex-col bg-blue-200 min-h-screen text-center font-mono">
      <Head>
        <title>Edit your profile</title>
      </Head>

      <h1 className="bubble-main bubble-point text-3xl text-black font-mono font-bold">
        Update your profile page.
      </h1>

      <Auth>
        <Link href="./index">
          <button className="fixed top-0 left-2 mr-2 mt-2 bg-red-200 border-2 rounded p-1 shadow text-green-900">Home</button>
        </Link>

        <div className="mb-10">
          <label className="mr-2" htmlFor="userName">Choose your name</label>
          <input className="w-40 rounded" type="text" name="name" id="userName"/>
        </div>

        <div>
          <h3>Choose your avatar</h3>
        </div>
       
      </Auth>
    </ div >
  )
}


export default EditProfiles
