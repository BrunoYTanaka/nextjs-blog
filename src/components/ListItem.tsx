import React, { ReactElement } from 'react'
import Link from 'next/link'

interface ListItemProps {
  id: number
  title: string
  link: string
  headline: string
}

function ListItem({ id, link, title, headline }: ListItemProps): ReactElement {
  return (
    <div className="max-w-xl mb-8">
      <div className="flex flex-col">
        <div className="group">
          <div className="flex flex-col">
            <Link href={`/article/${id}`}>
              <a className="truncate overflow-hidden text-sml mb-1">{link}</a>
            </Link>
            <Link href={`/article/${id}`}>
              <a className="truncate text-xl text-blue-800 font-medium mb-1 group-hover:underline">
                {title}
              </a>
            </Link>
          </div>
        </div>
        <p>{headline}</p>
      </div>
    </div>
  )
}

export default ListItem
