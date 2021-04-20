import { fireEvent, render } from '@testing-library/react'
import Back from '@components/Back'

const mockedBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    back: mockedBack,
  }),
}))

describe('Back', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render back button', () => {
    const { getByText } = render(<Back />)

    const backBtn = getByText('Voltar')

    expect(backBtn.textContent).toBe('Voltar')
  })

  it('should render back button and call router back', () => {
    const { getByText } = render(<Back />)

    const backBtn = getByText('Voltar')

    expect(backBtn.textContent).toBe('Voltar')

    fireEvent.click(backBtn)

    expect(mockedBack).toHaveBeenCalled()
  })
})
