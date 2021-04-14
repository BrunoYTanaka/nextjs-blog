import React, { ReactElement } from 'react'
import ListItem from './ListItem'

interface ListProps {
  list: {
    id: number
    title: string
    link: string
    headline: string
  }[]
}

function List({ list }: ListProps): ReactElement {
  return (
    <div className="w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52">
      {list.map(item => {
        return <ListItem key={item.id} {...item} />
      })}
    </div>
  )
}

export default List
