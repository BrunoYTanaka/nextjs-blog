import { ReactElement } from 'react'

interface TagsProps {
  tags: {
    id: number
    name: string
  }[]
}

function Tags({ tags }: TagsProps): ReactElement {
  return (
    <div className="flex items-center">
      {tags?.map(tag => {
        return (
          <div className="text-sm bg-blue-300 rounded-lg p-2 mr-2" key={tag.id}>
            {tag.name}
          </div>
        )
      })}
    </div>
  )
}

export default Tags
