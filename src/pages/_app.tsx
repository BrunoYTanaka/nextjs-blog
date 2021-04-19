import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import useLoading from '@/hooks/useLoading'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  useLoading()
  return <Component {...pageProps} />
}

export default MyApp
