import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { PointSpreadLoading } from 'react-loadingg'

import { UniqueIdContext } from '../../context/UniqueIdContext'

const Auth: React.FC = (): JSX.Element => {
  const { setLocalStorage, clearLocalStorage } = useContext(UniqueIdContext)

  //these add dynamic routes. The uniqueId correlates to the filename
  const { query, push } = useRouter()
  const { uniqueId } = query

  const [fetchInProgress, changeProgressState] = useState<boolean>(false)
  const showLoader = fetchInProgress ? "block" : "hidden"

  const checkUserAuth = async () => {
    changeProgressState(true)
    // when the user arrives at this page through the email validation link, it will send their unique id to the api
    try {
      const { data } = await axios('/api/auth', {
        method: 'POST',
        data: {
          uniqueId
        }
      })

      setTimeout(() => {
        //it will also store their uniqueid in local storage.it will redirect the user to the home page, and now their unique id will be stored in local storage at the home page, ready to display optionally rendered components based on this id
        setLocalStorage(uniqueId as string)
        push('/')
        changeProgressState(false)
      }, 2000);
    } catch {
      setTimeout(() => {
        clearLocalStorage()
        // this is a next function that redirects the user to whichever page is specified in the push
        push('/')
        changeProgressState(false)
      }, 2000);
    }
  }

  useEffect(() => {
    if (uniqueId) {
      checkUserAuth()
    }
  }, [uniqueId])

  return (
    <div className={`${showLoader}`}>
      <PointSpreadLoading color="#aaaaaa" size="large" />
    </div>
  )
}

export default Auth
