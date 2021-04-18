import { ReactElement, useState } from 'react'
import { BiPlus } from 'react-icons/bi'

interface BibliographyProps {
  bibliography: string
}

function Bibliography({ bibliography }: BibliographyProps): ReactElement {
  const [expand, setExpand] = useState(false)

  const handleExpand = (value: boolean) => setExpand(value)

  return (
    <div className="flex flex-col items-start py-5">
      <div className="group">
        <button
          className="flex flex-row items-center focus:outline-none group-hover:text-gray-400"
          onClick={() => handleExpand(!expand)}
          type="button"
        >
          <BiPlus size={24} className="text-red-400 group-hover:text-red-200" />
          <span className="ml-2">Bibliografia</span>
        </button>
      </div>
      {expand && (
        <div
          data-testid="content"
          className="content"
          dangerouslySetInnerHTML={{ __html: bibliography }}
        />
      )}
    </div>
  )
}

export default Bibliography
