import React, {
  ReactElement,
  ChangeEvent,
  KeyboardEvent,
  useState,
} from 'react'
import { BiSearch } from 'react-icons/bi'
import HeaderOptions from './HeaderOptions'

function Header(): ReactElement {
  const [search, setSearch] = useState('')

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClickSearch = () => {
    if (!search) {
      return
    }
    console.log(search)
  }

  const handleKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClickSearch()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <div
        className="flex w-full shadow mt-5 max-w-md rounded-full border border-gray-200 px-5 py-3 items-center
      sm:max-w-xl lg:max-w-2xl"
      >
        <input
          type="text"
          className="w-full focus:outline-none"
          value={search}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDownSearch}
        />
        <button
          type="button"
          onClick={handleClickSearch}
          className="text-blue-500 hover:text-blue-400 p-2  focus:outline-none"
        >
          <BiSearch size={24} />
        </button>
      </div>
      <HeaderOptions />
    </div>
  )
}

export default Header
