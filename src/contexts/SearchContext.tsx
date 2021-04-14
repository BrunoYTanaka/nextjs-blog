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
    if (router.query.term) {
      setSearch(router.query.term as string)
    }
  }, [setSearch, router.query.term])

  const handleSelected = (value: boolean) => {
    const query = router.query.term
    if (value) {
      router.push(`/?term=${query}&orderby=relevance`)
    } else {
      router.push(`/?term=${query}`)
    }
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClickSearch = () => {
    if (!search) {
      return
    }
    router.push(`/?term=${search}`)
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
