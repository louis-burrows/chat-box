import React, { useState, useContext } from 'react'
import EmailForm from '../containers/EmailForm'
import Link from 'next/link'

import { UniqueIdContext } from '../context/UniqueIdContext'

export const Auth: React.FC = ({ children }): JSX.Element => {

  // this indentifies whether there is an id in local storage and conditionally renders either the children passed into it, which is whatever is wrapped between two auth elements on whichever component requires conditional rendering dictacted by the rules in Auth, or whatever is identified in the else statement

  const { uniqueId, clearLocalStorage } = useContext(UniqueIdContext)

  const logOut = (): void => {
    clearLocalStorage()
  }

  if (uniqueId) {
    return (
      <>
        {children}

        <button className="fixed top-0 right-0 mr-2 mt-2 bg-indigo-200 border-2 rounded p-1 shadow text-green-900" onClick={() => logOut()}>Log Out</button>

        <Link href="./editprofile">
        <button className="fixed top-0 right-20 mr-2 mt-2 bg-indigo-200 border-2 rounded p-1 shadow text-green-900">Edit Profile</button>
        </Link>
        
      </>
    )
  } else {
    return <EmailForm />
  }
}
