import { PAGE_NEIGHBOURS } from '@constants/pagination'
import usePagination from '@hooks/usePagination'
import { renderHook } from '@testing-library/react-hooks'

describe('usePagination', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should show pages 100 and currentpage 1', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 1,
        pageNeighbours: PAGE_NEIGHBOURS,
        totalPages: 100,
      }),
    )
    expect(result.current.length).toEqual(7)
    expect(result.current).toEqual([1, 2, 3, 4, 5, -1, 100])
  })

  it('should show pages 100 and currentpage 50', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 50,
        pageNeighbours: PAGE_NEIGHBOURS,
        totalPages: 100,
      }),
    )
    expect(result.current.length).toEqual(7)
    expect(result.current).toEqual([1, -2, 49, 50, 51, -1, 100])
  })

  it('should show pages 100 and currentpage 100', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 100,
        pageNeighbours: PAGE_NEIGHBOURS,
        totalPages: 100,
      }),
    )
    expect(result.current.length).toEqual(7)
    expect(result.current).toEqual([1, -2, 96, 97, 98, 99, 100])
  })

  it('should show pages 4 and currentpage 2', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 2,
        pageNeighbours: PAGE_NEIGHBOURS,
        totalPages: 4,
      }),
    )
    expect(result.current.length).toEqual(4)
    expect(result.current).toEqual([1, 2, 3, 4])
  })

  it('should show pages 8 and currentpage 2', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 2,
        pageNeighbours: PAGE_NEIGHBOURS,
        totalPages: 8,
      }),
    )
    expect(result.current.length).toEqual(7)
    expect(result.current).toEqual([1, 2, 3, 4, 5, -1, 8])
  })
})
