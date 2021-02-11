import { createContext, useState, useEffect } from "react"
import axios from 'axios'

//by default, the context will have no value, as defined here
export const UniqueIdContext = createContext({
  uniqueId: '',
  user: {
    id: 0,
    name: '',
    email: '',
    avatar: ''
  },
  isLoggedIn: false,
  //the default for the functions below, these are doing nothing. {} is the same as void, but for regular JS
  setLocalStorage: (string: string) => { },
  clearLocalStorage: () => { },
  refetchUser: () => { },
  logOut: () => { }
})

export const UniqueIdProvider: React.FC = ({ children }) => {

  const localCall = (): string => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("uniqueId") || ''
    }
    return ''
  }

  //these are the methods and variables that will be available to the children
  const [uniqueId, setUniqueId] = useState(() => localCall())
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [refetch, setRefetch] = useState(0)
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    avatar: string;
  }>({
    id: 0,
    name: '',
    email: '',
    avatar: ''
  })

  console.log('user', user)

  const refetchUser = () => {
    setRefetch(refetch + 1)
  }

  const setLocalStorage = (value: string) => {
    localStorage.setItem('uniqueId', value)
    setUniqueId(value)
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('uniqueId')
    setUniqueId('')
  }

  const logOut = () => {
    setIsLoggedIn(false)
    setUser({
      id: 0,
      name: '',
      email: '',
      avatar: ''
    })
    clearLocalStorage()
  }

  // when logging in, with the requiremnt of uniqueID, it will get an object associated with the user that contains, id, usernam, and avatar, and will make this info available as an object by setting it to state, using the set state "setUser"
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios('/api/users/single', {
          method: 'GET',
          params: {
            uniqueId
          }
        })

        setIsLoggedIn(true)
        setUser(data.user)
      } catch {
        // error
        logOut()
      }
    }
    if (uniqueId) {
      getUserInfo()
    }
  }, [uniqueId, refetch])

  // the value here, makes the default value of uniqueId set to uniqueId
  return (
    <UniqueIdContext.Provider
      value={{
        uniqueId,
        isLoggedIn,
        user,
        setLocalStorage,
        clearLocalStorage,
        refetchUser,
        logOut
      }}
    >
      {children}
    </UniqueIdContext.Provider>
  )
}


export default UniqueIdContext;
