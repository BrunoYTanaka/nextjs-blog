import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
