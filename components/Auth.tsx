import React, { useState, useContext } from 'react'
import EmailForm from '../containers/EmailForm'
import Link from 'next/link'

import { UniqueIdContext } from '../context/UniqueIdContext'

export const Auth: React.FC = ({ children }): JSX.Element => {

  // this indentifies whether there is an id in local storage and conditionally renders either the children passed into it, which is whatever is wrapped between two auth elements on whichever component requires conditional rendering dictacted by the rules in Auth, or whatever is identified in the else statement

  const { isLoggedIn, init, logOut, user } = useContext(UniqueIdContext)

  if (!init) {
    return <div />
  }

  if (isLoggedIn) {
    return (
      <>
        {children}

        <button className="fixed cursor-pointer top-0 right-0 mr-2 mt-2 bg-indigo-200 border-2 rounded p-1 shadow text-green-900" onClick={() => logOut()}>Log Out</button>

        {user.avatar && (
          <img className="fixed top-0 mt-2 right-24 w-12 h-12 rounded-full bg-white" src={user.avatar} alt="" />
        )}

        <Link href="/editprofile">
          <span className="fixed cursor-pointer top-0 right-36 mr-2 mt-2 bg-indigo-200 border-2 rounded p-1 shadow text-green-900">Edit Profile</span>
        </Link>

      </>
    )
  } else {
    return <EmailForm />
  }
}
