import React, { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import styles from '../../styles/article.module.css'
import Metatag from '../../components/Metatag'

interface ArticleProps {
  id: number
  author: {
    name: string
    picture: string
  }
  bibliography: string
  content: string
  title: string
  published: string
  metas: {
    ampUrl: string
    'og:site_name': string
    'og:title': string
    'og:description': string
    'og:image': string
  }
}

function Article({
  title,
  author,
  content,
  published,
  metas,
}: ArticleProps): ReactElement {
  const router = useRouter()

  if (router.isFallback) {
    return <div />
  }

  return (
    <>
      <Metatag {...metas} />
      <div className="flex flex-col justify-center items-center p-5">
        <header className="text-4xl font-bold text-blue-400">{title}</header>
        <div className="w-full flex flex-row mt-4 items-start">
          <div className="text-sm text-red-400 font-normal ">{author.name}</div>
          <div className="text-sm ml-2">{published}</div>
        </div>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </>
  )
}

export default Article

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch(
    `https://api.beta.mejorconsalud.com/wp-json/mc/v1/posts`,
  ).then(response => response.json())

  return {
    paths: data.map((item: { id: number }) => ({
      params: { id: item.id.toString() },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context
  const data = await fetch(
    `https://api.beta.mejorconsalud.com/wp-json/mc/v1/posts/${params.id}`,
  ).then(response => response.json())

  return { props: { ...data } }
}
