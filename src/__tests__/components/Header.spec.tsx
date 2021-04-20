import { fireEvent, render } from '@testing-library/react'
import { SearchProvider, SearchContext } from '@contexts/SearchContext'
import Header from '@components/Header'

const mockedPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      orderBy: '',
      page: 1,
      search: '',
    },
    push: mockedPush,
  }),
}))

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render header', () => {
    const { getByPlaceholderText, getAllByRole } = render(<Header />)

    const input = getByPlaceholderText('Pesquisar')
    const [button] = getAllByRole('button')

    expect(input).not.toBeNull()
    expect(button).not.toBeNull()
  })

  it('should render header and change input value', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <SearchProvider result={0}>
        <Header />
      </SearchProvider>,
    )

    const input = getByPlaceholderText('Pesquisar')
    fireEvent.change(input, { target: { value: 'pies' } })

    const newValue = getByDisplayValue('pies')

    expect(newValue).not.toBeNull()
  })

  it('should render header and search', () => {
    const { getByPlaceholderText, getAllByRole } = render(
      <SearchProvider result={0}>
        <Header />
      </SearchProvider>,
    )

    const input = getByPlaceholderText('Pesquisar')
    const [searchBtn] = getAllByRole('button')
    fireEvent.change(input, { target: { value: 'pies' } })
    fireEvent.click(searchBtn)
    expect(mockedPush).toHaveBeenCalledWith('/?search=pies&page=1')
  })

  it('should not search without value', () => {
    const { getByPlaceholderText, getAllByRole } = render(
      <SearchProvider result={0}>
        <Header />
      </SearchProvider>,
    )

    const input = getByPlaceholderText('Pesquisar')
    const [searchBtn] = getAllByRole('button')
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(searchBtn)
    expect(mockedPush).not.toHaveBeenCalled()
  })

  it('should render header and search with keydown', () => {
    const { getByPlaceholderText } = render(
      <SearchProvider result={0}>
        <Header />
      </SearchProvider>,
    )

    const input = getByPlaceholderText('Pesquisar')
    fireEvent.change(input, { target: { value: 'pies' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(mockedPush).toHaveBeenCalledWith('/?search=pies&page=1')
  })

  it('should render header and search by revelance', () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <SearchProvider result={10}>
        <Header />
      </SearchProvider>,
    )

    const [, orderbyBtn] = getAllByRole('button')
    const input = getByPlaceholderText('Pesquisar')
    fireEvent.change(input, { target: { value: 'pies' } })
    fireEvent.click(orderbyBtn)

    expect(mockedPush).toBeCalledWith('/?search=pies&page=1&orderby=relevance')
  })

  it('should render header and not search by revelance without value', () => {
    const { getAllByRole } = render(
      <SearchProvider result={10}>
        <Header />
      </SearchProvider>,
    )

    const [, orderbyBtn] = getAllByRole('button')
    fireEvent.click(orderbyBtn)

    expect(mockedPush).not.toBeCalled()
  })

  it('should render header search by pies when orderby is selected', () => {
    useRouter.mockImplementation(() => ({
      query: {
        search: 'unhas',
        orderby: 'relevance',
      },
      push: mockedPush,
    }))

    const { getAllByRole, getByPlaceholderText } = render(
      <SearchProvider result={10}>
        <Header />
      </SearchProvider>,
    )

    const input = getByPlaceholderText('Pesquisar')
    const [searchBtn] = getAllByRole('button')
    fireEvent.change(input, { target: { value: 'pies' } })
    fireEvent.click(searchBtn)
    expect(mockedPush).toHaveBeenCalledWith(
      '/?search=pies&page=1&orderby=relevance',
    )
  })

  it('should render header search by pies not orderby relevance', () => {
    useRouter.mockImplementation(() => ({
      query: {
        search: 'unhas',
        orderby: 'relevance',
      },
      push: mockedPush,
    }))

    const { getAllByRole, getByPlaceholderText } = render(
      <SearchProvider result={10}>
        <Header />
      </SearchProvider>,
    )

    const input = getByPlaceholderText('Pesquisar')
    const [, orderbyBtn] = getAllByRole('button')
    fireEvent.change(input, { target: { value: 'pies' } })
    fireEvent.click(orderbyBtn)
    expect(mockedPush).toHaveBeenCalledWith('/?search=pies&page=1')
  })
})
