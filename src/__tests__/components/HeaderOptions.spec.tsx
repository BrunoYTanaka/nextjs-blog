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
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render headerOptions', () => {
    const { getByText, queryByText } = render(<HeaderOptions />)

    const orderbyBtn = getByText('Mais Relevantes')
    const results = queryByText('resultados')

    expect(orderbyBtn).not.toBeNull()
    expect(results).toBeNull()
  })

  it('should render headerOptions with results', () => {
    const { getByText, queryByText } = render(
      <SearchProvider result={100}>
        <HeaderOptions />
      </SearchProvider>,
    )

    const orderbyBtn = getByText('Mais Relevantes')
    const results = queryByText('resultados')

    expect(orderbyBtn).not.toBeNull()
    expect(results).not.toBeNull()
  })
})
