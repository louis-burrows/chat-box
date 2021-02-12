import React, { useState, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { UniqueIdContext } from '../context/UniqueIdContext'
import axios from 'axios'

import { Auth } from '../components/Auth'
import { promises } from 'fs'


const EditProfiles: React.FC = (): JSX.Element => {

  const avatars = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png'
  ]

  const { uniqueId, refetchUser, user } = useContext(UniqueIdContext)

  const [name, setName] = useState(user.name)
  const [avatar, setAvatar] = useState(user.avatar)


  const saveUpdates = async (): Promise<void> => {
    try {
      const { data } = await axios('/api/users/update', {
        method: "POST",
        data: {
          uniqueId: uniqueId,
          name: name,
          avatar: avatar
        }
      })
      refetchUser()
    }
    catch (error) {
    }
  }



  return (
    < div className="flex flex-col bg-blue-200 min-h-screen text-center font-mono">
      <Head>
        <title>Edit your profile</title>
      </Head>

      <h1 className="bubble-main bubble-point text-3xl text-black font-mono font-bold">
        Update your profile page.
      </h1>

      <Auth>
        <Link href="/">
          <span className="fixed cursor-pointer top-0 left-2 mr-2 mt-2 bg-red-200 border-2 rounded p-1 shadow text-green-900">Home</span>
        </Link>

        <div className="mb-10">
          <label className="mr-2" htmlFor="userName">Choose your name</label>
          <input className="w-40 rounded" type="text" id="userName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <h3>Choose your avatar</h3>
        </div>

        {/* the name of the radio type is what groups all the radios together, so only one can be selected at once. label wraps the image to the radio selection, along with id of the radio input. */}
        <div className="flex justify-center">
          {avatars.map((avtr, index) => (
            <div className="flex flex-col">
              <label htmlFor={`avatar-${index}`}>
                <img className="object-contain cursor-pointer w-32 h-32 m-8" src={avtr} alt="" />
                <input type="radio" name="avatar" value={avtr} id={`avatar-${index}`} onChange={(e) => setAvatar(e.target.value)} defaultChecked={avatar === avtr} />
              </label>
            </div>
          ))}
        </div>

        {name && avatar && (
          <div className="mt-10">
            <button className="cursor-pointer bg-green-100 border-2 rounded p-1 shadow text-blue-500" onClick={() => saveUpdates()}>Save Updates</button>
          </div>
        )}


      </Auth>
    </ div >
  )
}


export default EditProfiles
