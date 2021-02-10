import { createContext, useState } from "react";

//by default, the context will have no value, as defined here
export const RefreshAppContext = createContext({
  refresh: 0,
  refreshChatrooms: () => {}
})

export const RefreshAppProvider: React.FC = ({ children }) => {

  const [refresh, setRefresh] = useState(0)

  const refreshChatrooms = () => {
    setRefresh(refresh + 1)
  }
  
  return (
    <RefreshAppContext.Provider
    value={{
      refresh,
      refreshChatrooms
    }}>
      {children}
    </RefreshAppContext.Provider>
  )
}


export default RefreshAppContext;
