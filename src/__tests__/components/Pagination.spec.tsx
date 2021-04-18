import { fireEvent, render } from '@testing-library/react'
import Pagination from '../../components/Pagination'

const mockedPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      orderBy: '',
      page: '',
      search: 'pies',
    },
    push: mockedPush,
  }),
}))
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

// jest.mock('../../hooks/usePagination', () => () => [1, 2, 3, 4, 5, 6, 7, 8])

describe('Pagination', () => {
  it('should render pagination', () => {
    const { getByText } = render(<Pagination size={100} />)
    const page1 = getByText('1')
    expect(page1.className).toContain('pagination-page-active')
  })

  it('should render pagination and click arrow right', () => {
    const { getByText } = render(<Pagination size={100} />)

    const nextPage = getByText('»')
    fireEvent.click(nextPage)

    expect(mockedPush).toHaveBeenCalledWith(expect.stringContaining('page=3'))
  })

  it('should render pagination and push to fourth page', () => {
    const { getByText } = render(<Pagination size={100} />)
    const page1 = getByText('1')
    expect(page1.className).toContain('pagination-page-active')

    const page4 = getByText('4')
    fireEvent.click(page4)

    expect(mockedPush).toHaveBeenCalledWith(expect.stringContaining('page=4'))
  })

  it('should render pagination with currentPage = 5', () => {
    useRouter.mockImplementation(() => ({
      query: {
        search: 'pizza',
        page: 5,
        orderby: '',
      },
    }))
    const { getByText } = render(<Pagination size={100} />)
    const page5 = getByText('5')
    expect(page5.className).toContain('pagination-page-active')
  })

  it('should render pagination with currentPage = 6 and click arrow left', () => {
    useRouter.mockImplementation(() => ({
      query: {
        search: 'pizza',
        page: 6,
        orderby: 'relevance',
      },
      push: mockedPush,
    }))
    const { getByText } = render(<Pagination size={100} />)
    const backPage = getByText('«')
    fireEvent.click(backPage)

    expect(mockedPush).toHaveBeenCalledWith(expect.stringContaining('page=4'))
  })
})
