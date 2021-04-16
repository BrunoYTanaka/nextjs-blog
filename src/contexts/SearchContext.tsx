import {
  createContext,
  ReactElement,
  useEffect,
  ReactNode,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react'
import { useRouter } from 'next/router'

interface SearchContextData {
  selected: boolean
  result: number
  search: string
  handleSelected: (value: boolean) => void
  handleSearchInput: (e: ChangeEvent<HTMLInputElement>) => void
  handleClickSearch: () => void
  handleKeyDownSearch: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const SearchContext = createContext({} as SearchContextData)

interface SearchProviderProps {
  result: number
  children: ReactNode
}

export function SearchProvider({
  result,
  children,
}: SearchProviderProps): ReactElement {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (router.query.orderby && router.query.orderby === 'relevance') {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [setSelected, router.query.orderby])

  useEffect(() => {
    if (router.query.search) {
      setSearch(router.query.search as string)
    }
  }, [setSearch, router.query.search])

  const handleSelected = (value: boolean) => {
    const { page = 1 } = router.query
    if (!search) return
    if (value) {
      router.push(`/?search=${search}&page=${page}&orderby=relevance`)
    } else {
      router.push(`/?search=${search}&page=${page}`)
    }
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClickSearch = () => {
    if (!search) {
      return
    }
    router.push(
      `/?search=${search}&page=${1}${selected ? '&orderby=relevance' : ''}`,
    )
  }

  const handleKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClickSearch()
    }
  }

  return (
    <SearchContext.Provider
      value={{
        selected,
        result,
        search,
        handleSearchInput,
        handleClickSearch,
        handleKeyDownSearch,
        handleSelected,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
