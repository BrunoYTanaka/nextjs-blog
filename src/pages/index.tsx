import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { SearchProvider } from '@contexts/SearchContext'
import Header from '@components/Header'
import List from '@components/List'
import api from '@services/api'
import { TOTAL_PER_PAGE } from '@constants/pagination'

const DynamicPagination = dynamic(() => import('@components/Pagination'))

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
    <div className="flex flex-col h-screen justify-between ">
      <SearchProvider result={results.size}>
        <Header />
      </SearchProvider>
      <List list={results.data} size={results.size} />
      {results.size > TOTAL_PER_PAGE && (
        <DynamicPagination size={results.size} />
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (context.query.search) {
    const { search, orderby, page } = context.query
    const data = api
      .get(
        `/v2/posts?search=${encodeURIComponent(search as string)}${
          orderby === 'relevance' ? `&orderby=${orderby}` : ''
        }&page=${Math.abs(Number(page))}`,
      )
      .then(response => response.data)

    return { props: { results: await data } }
  }
  return { props: { results: { data: [], size: -1, pages: 0 } } }
}
