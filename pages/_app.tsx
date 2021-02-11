import type { AppProps } from 'next/app'

import { UniqueIdProvider } from '../context/UniqueIdContext'
import { RefreshAppProvider } from '../context/RefreshAppContext'
import { LoadingStateProvider } from '../context/LoadingStateContext'


import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <LoadingStateProvider>
      <RefreshAppProvider>
        <UniqueIdProvider>
          <Component {...pageProps} />
        </UniqueIdProvider>
      </RefreshAppProvider>
    </LoadingStateProvider>
  )
}

export default MyApp
