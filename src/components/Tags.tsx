import { ReactElement } from 'react'

interface TagsProps {
  title?: string
  type?: string
  tags: {
    id: number
    name: string
  }[]
}

function Tags({ title, type, tags }: TagsProps): ReactElement {
  return (
    <div className="my-5 flex items-center">
      {title && <span className="text-md mr-2 text-gray-500">{title}:</span>}
      {tags.map(tag => {
        return (
          <div className={type} key={tag.id}>
            {tag.name}
          </div>
        )
      })}
    </div>
  )
}

Tags.defaultProps = {
  title: '',
  type: 'tag',
}

export default Tags
