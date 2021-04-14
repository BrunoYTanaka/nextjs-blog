import { ReactElement, useContext, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { SearchContext, SearchProvider } from '../contexts/SearchContext'
import Header from '../components/Header'
import List from '../components/List'

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
      <SearchProvider result={results.data?.length || 0}>
        <Header />
      </SearchProvider>
      <List list={results.data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (context.query.term) {
    const { term, orderBy } = context.query
    const data = await fetch(
      `https://api.beta.mejorconsalud.com/wp-json/mc/v2/posts?search=${term}${
        orderBy === 'relevance' ? `&orderBy=${orderBy}` : ''
      }`,
    ).then(response => response.json())
    return { props: { results: data } }
  }
  return { props: { results: [] } }
}
