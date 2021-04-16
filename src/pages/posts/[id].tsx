import React, { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import Metatag, { MetatagProps } from '../../components/Metatag'
import AuthorCard from '../../components/AuthorCard'
import Bibliography from '../../components/Bibliography'
import Tags from '../../components/Tags'
import BackToTop from '../../components/BackToTop'
import Back from '../../components/Back'

interface ArticleProps {
  id: number
  author: {
    name: string
    picture: string
    description: string
  }
  tags: {
    id: number
    name: string
  }[]
  bibliography: string
  content: string
  title: string
  published: string
  metas: MetatagProps
}

function Article({
  title,
  author,
  content,
  published,
  tags,
  bibliography,
  metas,
}: ArticleProps): ReactElement {
  const router = useRouter()

  if (router.isFallback) {
    return <div />
  }

  return (
    <>
      <Metatag {...metas} />
      <div className="flex flex-col justify-center p-5 max-w-5xl mx-auto">
        <header className="text-4xl font-bold text-blue-400">{title}</header>
        <div className="w-full flex flex-row mt-4 items-start">
          <div className="text-sm text-red-400 font-normal ">{author.name}</div>
          <div className="text-sm ml-2 text-gray-500 font-bold">
            {format(new Date(published), "dd LLLL',' yyyy")}
          </div>
        </div>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <Tags tags={tags} />
        <Bibliography bibliography={bibliography} />
        <AuthorCard {...author} />
        <BackToTop />
        <Back />
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
