import type { AppProps } from 'next/app'

import { UniqueIdProvider } from '../context/uniqueIdContext'
import { RefreshAppProvider } from '../context/RefreshAppContext'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <RefreshAppProvider>
      <UniqueIdProvider>
        <Component {...pageProps} />
      </UniqueIdProvider>
    </RefreshAppProvider>
  )
}

export default MyApp
