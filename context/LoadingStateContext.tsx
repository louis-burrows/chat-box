import { createContext, useState } from "react";

//by default, the context will have no value, as defined here
export const LoadingStateContext = createContext({
  isLoading: false,
  toggleLoading: () => {}
})

export const LoadingStateProvider: React.FC = ({ children }) => {

  const [isLoading, toggleLoadingState] = useState<boolean>(false)

  const toggleLoading = () => {
    toggleLoadingState(!isLoading)
  }
 
  return (
    <LoadingStateContext.Provider
    value={{
      isLoading,
      toggleLoading
    }}>
      {children}
    </LoadingStateContext.Provider>
  )
}


export default LoadingStateContext;
