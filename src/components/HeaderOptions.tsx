import React, { ReactElement, useState } from 'react'
import { FcSearch } from 'react-icons/fc'

function HeaderOptions(): ReactElement {
  const [selected, setSelected] = useState(true)

  const handleClickSelected = () => {
    setSelected(!selected)
  }

  return (
    <div
      className="flex w-full justify-between mt-2 max-w-md px-5 py-3 items-center
    sm:max-w-xl lg:max-w-2xl"
    >
      <button
        onClick={handleClickSelected}
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
          123 <strong>resultados</strong>
        </span>
      </div>
    </div>
  )
}

export default HeaderOptions
