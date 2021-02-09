import React, { useState } from 'react'
import EmailForm from '../containers/EmailForm'

export const Auth: React.FC = ({ children }): JSX.Element => {

  // this indentifies whether there is an id in local storage and conditionally renders either the children passed into it, which is whatever is wrapped between two auth elements on whichever component requires conditional rendering dictacted by the rules in Auth, or whatever is identified in the else statement

  const localCall = (): string => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("uniqueId") || ''
    }
    return ''
  }

  const [uniqueId] = useState(() => localCall())

  if (uniqueId) {
    return (
      <>
        {children}
      </>
    )
  } else {
    return <EmailForm />
  }
}
