import { ReactElement, useContext } from 'react'
import { BiSearch } from 'react-icons/bi'
import HeaderOptions from './HeaderOptions'
import { SearchContext } from '../contexts/SearchContext'

function Header(): ReactElement {
  const {
    search,
    handleClickSearch,
    handleKeyDownSearch,
    handleSearchInput,
  } = useContext(SearchContext)

  return (
    <div className="sticky top-0 bg-white">
      <div className="w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52 flex-grow">
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
    </div>
  )
}

export default Header
