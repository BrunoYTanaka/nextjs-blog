import { ReactElement, useContext, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { SearchContext } from '../contexts/SearchContext'

interface Item {
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
  const { setResult } = useContext(SearchContext)

  useEffect(() => {
    setResult(results.data.length)
  }, [setResult, results])

  return <div className="flex flex-col">search</div>
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (context.query.term) {
    const { term, orderBy } = context.query

    const data = await fetch(
      `https://api.beta.mejorconsalud.com/wp-json/mc/v2/posts?search=${term}${
        orderBy ? `&orderBy=${orderBy}` : ''
      }`,
    ).then(response => response.json())
    return { props: { results: data } }
  }
  return { props: { results: [] } }
}
