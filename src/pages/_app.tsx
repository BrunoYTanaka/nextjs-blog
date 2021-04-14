import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import Header from '../components/Header'
import '../styles/globals.css'
import { SearchProvider } from '../contexts/SearchContext'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <SearchProvider>
      <Header />
      <Component {...pageProps} />
    </SearchProvider>
  )
}

export default MyApp
