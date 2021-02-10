import type { AppProps } from 'next/app'

import { UniqueIdProvider } from '../context/uniqueIdContext'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <UniqueIdProvider>
      <Component {...pageProps} />
    </UniqueIdProvider>
  )
}

export default MyApp
