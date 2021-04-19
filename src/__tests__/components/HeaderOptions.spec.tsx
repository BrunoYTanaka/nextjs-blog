import { render } from '@testing-library/react'
import { SearchProvider } from '@contexts/SearchContext'
import HeaderOptions from '@components/HeaderOptions'

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

describe('HeaderOptions', () => {
  it('should render headerOptions', () => {
    const { getByText, queryByText } = render(<HeaderOptions />)

    const button = getByText('Mais Relevantes')
    const results = queryByText('resultados')

    expect(button).not.toBeNull()
    expect(results).toBeNull()
  })

  it('should render headerOptions with results', () => {
    const { getByText, queryByText } = render(
      <SearchProvider result={100}>
        <HeaderOptions />
      </SearchProvider>,
    )

    const button = getByText('Mais Relevantes')
    const results = queryByText('resultados')

    expect(button).not.toBeNull()
    expect(results).not.toBeNull()
  })
})
