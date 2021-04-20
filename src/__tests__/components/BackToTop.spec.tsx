import { fireEvent, render } from '@testing-library/react'
import BackToTop from '@components/BackToTop'

describe('BackToTop', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render back to top button hidden', () => {
    const { queryByRole } = render(<BackToTop />)

    const topTopBtn = queryByRole('button')

    expect(topTopBtn.className).toContain('hidden')
  })

  it('should render back to top button', () => {
    const { queryByRole } = render(<BackToTop />)

    const topTopBtn = queryByRole('button')

    expect(topTopBtn.className).toContain('hidden')

    fireEvent.scroll(window, { target: { pageYOffset: 500 } })

    expect(topTopBtn.className).not.toContain('hidden')

    fireEvent.scroll(window, { target: { pageYOffset: 0 } })

    expect(topTopBtn.className).toContain('hidden')
  })

  it('should render back to top button show and hidde', () => {
    const { queryByRole } = render(<BackToTop />)

    const topTopBtn = queryByRole('button')

    fireEvent.scroll(window, { target: { pageYOffset: 500 } })

    expect(topTopBtn.className).not.toContain('hidden')
  })

  it('should render back to top button and click to top', () => {
    const { queryByRole } = render(<BackToTop />)

    const topTopBtn = queryByRole('button')

    fireEvent.scroll(window, { target: { pageYOffset: 500 } })
    const spyScrollTo = jest.fn()

    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo })

    expect(topTopBtn.className).not.toContain('hidden')

    fireEvent.click(topTopBtn)

    expect(spyScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })
})
