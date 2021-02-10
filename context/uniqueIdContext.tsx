import { createContext, useState } from "react";

//by default, the context will have no value, as defined here
export const UniqueIdContext = createContext({
  uniqueId: '',
  //the default for the functions below, these are doing nothing. {} is the same as void, but for regular JS
  setLocalStorage: (string: string) => { },
  clearLocalStorage: () => { }
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

  const setLocalStorage = (value: string) => {
    localStorage.setItem('uniqueId', value)
    setUniqueId(value)
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('uniqueId')
    setUniqueId('')
  }

  // the value here, makes the default value of uniqueId set to uniqueId
  return (
    <UniqueIdContext.Provider
      value={{
        uniqueId,
        setLocalStorage,
        clearLocalStorage
      }}
    >
      {children}
    </UniqueIdContext.Provider>
  )
}


export default UniqueIdContext;
