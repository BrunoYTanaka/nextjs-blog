import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { SearchProvider } from '../contexts/SearchContext'
import Header from '../components/Header'
import List from '../components/List'
import api from '../services/api'

interface Item {
  id: number
  title: string
  link: string
  headline: string
}
interface HomeProps {
  results: {
    data: Item[]
    size: number
    pages: number
  }
}

export default function Home({ results }: HomeProps): ReactElement {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Translation Inc.</title>
        <meta name="description" content="Busca com wp" />
      </Head>
      <SearchProvider result={results.size}>
        <Header />
      </SearchProvider>
      <List list={results.data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (context.query.term) {
    const { term, orderBy } = context.query
    const data = await api
      .get(
        `/v2/posts?search=${encodeURIComponent(term as string)}${
          orderBy === 'relevance' ? `&orderBy=${orderBy}` : ''
        }`,
      )
      .then(response => response.data)
    return { props: { results: data } }
  }
  return { props: { results: [] } }
}
