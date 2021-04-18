import { fireEvent, getAllByText, render } from '@testing-library/react'
import { SearchProvider, SearchContext } from '../../contexts/SearchContext'
import Header from '../../components/Header'

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

describe('Header', () => {
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
    const [button] = getAllByRole('button')
    fireEvent.change(input, { target: { value: 'pies' } })
    fireEvent.click(button)
    expect(mockedPush).toHaveBeenCalled()
  })

  it('should render header and search by revelance', () => {
    const mockedHandleSelected = jest.fn()
    const { getAllByRole, getByPlaceholderText } = render(
      <SearchContext.Provider
        value={{
          handleClickSearch: jest.fn(),
          handleKeyDownSearch: jest.fn(),
          handleSearchInput: jest.fn(),
          handleSelected: mockedHandleSelected,
          result: 0,
          search: '',
          selected: true,
        }}
      >
        <Header />
      </SearchContext.Provider>,
    )

    const [, button] = getAllByRole('button')
    const input = getByPlaceholderText('Pesquisar')
    fireEvent.change(input, { target: { value: 'pies' } })

    fireEvent.click(button)
    expect(button.className).toContain('bg-blue-500 hover:bg-blue-400')
    expect(mockedHandleSelected).toHaveBeenCalled()
  })
})
