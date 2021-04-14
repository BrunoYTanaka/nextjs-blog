import {
  createContext,
  ReactElement,
  useEffect,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from 'react'
import { useRouter } from 'next/router'

interface SearchContextData {
  selected: boolean
  result: number
  handleSelected: (value: boolean) => void
  setResult: Dispatch<SetStateAction<number>>
}

export const SearchContext = createContext({} as SearchContextData)

interface SearchProviderProps {
  children: ReactNode
}

export function SearchProvider({
  children,
}: SearchProviderProps): ReactElement {
  const [selected, setSelected] = useState(false)
  const [result, setResult] = useState(0)
  const router = useRouter()

  const handleSelected = (value: boolean) => {
    const query = router.query.term
    if (value) {
      router.push(`/?term=${query}&orderby=relevance`)
    } else {
      router.push(`/?term=${query}`)
    }
    setSelected(value)
  }

  return (
    <SearchContext.Provider
      value={{ selected, result, setResult, handleSelected }}
    >
      {children}
    </SearchContext.Provider>
  )
}
