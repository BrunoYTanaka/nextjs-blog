import { ReactElement, useState } from 'react'

interface AuthorCardProps {
  name: string
  picture: string
  description: string
}

function AuthorCard({
  name,
  picture,
  description,
}: AuthorCardProps): ReactElement {
  const [expand, setExpand] = useState(false)

  const handleExpand = (value: boolean) => setExpand(value)

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-row items-center mb-3">
        <img
          loading="lazy"
          className="rounded-full max-h-16"
          src={picture}
          alt={name}
        />
        <span className="ml-4 font-bold text-lg">{name}</span>
      </div>
      <div
        data-testid="content"
        className={`text-gray-500 md:text-base text-sm ${
          expand ? '' : 'max-h-20 overflow-y-hidden'
        }`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {description && (
        <div className="flex flex-row">
          <button
            onClick={() => handleExpand(!expand)}
            className="mt-2 text-green-400 hover:text-green-500 focus:outline-none"
            type="button"
          >
            Expandir
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthorCard
