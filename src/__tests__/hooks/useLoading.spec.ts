import { Router } from 'next/router'
import { renderHook, act } from '@testing-library/react-hooks'
import useLoading from '@hooks/useLoading'

jest.mock('nprogress')
jest.mock('nprogress/nprogress.css')

let routeChangeStart: () => void
let routeChangeComplete: () => void
describe('useLoading', () => {
  it('should show loading', async () => {
    Router.events.on = jest.fn((event, callback) => {
      if (event === 'routeChangeStart') {
        routeChangeStart = callback
      }
    })
    const { result } = renderHook(() => useLoading())
    act(() => {
      routeChangeStart()
    })
    expect(result.current).toEqual([true])
  })

  it('should end loading', async () => {
    Router.events.on = jest.fn((event, callback) => {
      if (event === 'routeChangeStart') {
        routeChangeStart = callback
      }
      if (event === 'routeChangeComplete') {
        routeChangeComplete = callback
      }
    })

    const { result } = renderHook(() => useLoading())
    act(() => {
      routeChangeStart()
    })
    expect(result.current).toEqual([true])

    act(() => {
      routeChangeComplete()
    })

    expect(result.current).toEqual([false])
  })
})
