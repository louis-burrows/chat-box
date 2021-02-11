import React, { useState, useContext } from 'react'
import EmailForm from '../containers/EmailForm'

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
        <button className="fixed top-0 right-0 mr-2 mt-2" onClick={() => logOut()}>Log Out</button>
      </>
    )
  } else {
    return <EmailForm />
  }
}
