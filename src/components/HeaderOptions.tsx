import React, { ReactElement, useContext } from 'react'

import { FcSearch } from 'react-icons/fc'
import { SearchContext } from '../contexts/SearchContext'

function HeaderOptions(): ReactElement {
  const { selected, handleSelected, result } = useContext(SearchContext)

  return (
    <div
      className="flex w-full justify-between mt-2 max-w-md px-5 py-3 items-center
    sm:max-w-xl lg:max-w-2xl"
    >
      <button
        onClick={() => handleSelected(!selected)}
        type="button"
        className={`flex justify-center items-center text-black ${
          selected ? 'bg-blue-500 hover:bg-blue-400' : 'hover:bg-gray-100'
        } border-gray-100 rounded-full p-2  focus:outline-none`}
      >
        <FcSearch />
        <span className="ml-2 text-sm hidden sm:inline-flex">
          Mais Relevantes
        </span>
      </button>
      <div className="flex">
        <span className="ml-2 text-sm">
          {result} <strong>resultados</strong>
        </span>
      </div>
    </div>
  )
}

export default HeaderOptions
