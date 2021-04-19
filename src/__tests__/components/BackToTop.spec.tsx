import { fireEvent, render } from '@testing-library/react'
import BackToTop from '@components/BackToTop'

describe('BackToTop', () => {
  it('should render back to top button hidden', () => {
    const { queryByRole } = render(<BackToTop />)

    const topTopButton = queryByRole('button')

    expect(topTopButton.className).toContain('hidden')
  })

  it('should render back to top button', () => {
    const { queryByRole } = render(<BackToTop />)

    const topTopButton = queryByRole('button')

    expect(topTopButton.className).toContain('hidden')

    fireEvent.scroll(window, { target: { pageYOffset: 500 } })

    expect(topTopButton.className).not.toContain('hidden')

    fireEvent.scroll(window, { target: { pageYOffset: 0 } })

    expect(topTopButton.className).toContain('hidden')
  })

  it('should render back to top button show and hidde', () => {
    const { queryByRole } = render(<BackToTop />)

    const topTopButton = queryByRole('button')

    fireEvent.scroll(window, { target: { pageYOffset: 500 } })

    expect(topTopButton.className).not.toContain('hidden')
  })

  it('should render back to top button and click to top', () => {
    const { queryByRole } = render(<BackToTop />)

    const topTopButton = queryByRole('button')

    fireEvent.scroll(window, { target: { pageYOffset: 500 } })
    const spyScrollTo = jest.fn()

    Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo })

    expect(topTopButton.className).not.toContain('hidden')

    fireEvent.click(topTopButton)

    expect(spyScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })
})
