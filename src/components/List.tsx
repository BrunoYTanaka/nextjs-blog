import { ReactElement } from 'react'
import ListItem from './ListItem'

interface ListProps {
  size: number
  list: {
    id: number
    title: string
    link: string
    headline: string
  }[]
}

function List({ size, list }: ListProps): ReactElement {
  return (
    <div className="w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52 flex-grow">
      {size ? (
        list?.map(item => {
          return <ListItem key={item.id} {...item} />
        })
      ) : (
        <div className="h-full flex flex-col mt-10">
          <span className="p-1 my-10 text-black text-sm sm:text-lg font-bold">
            Não existem artigos relacionados ao termo pesquisado!
          </span>
        </div>
      )}
    </div>
  )
}

export default List
