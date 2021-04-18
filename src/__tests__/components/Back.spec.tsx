import { fireEvent, render } from '@testing-library/react'
import Back from '../../components/Back'

const mockedBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    back: mockedBack,
  }),
}))

describe('Back', () => {
  it('should render back button', () => {
    const { getByText } = render(<Back />)

    const backButton = getByText('Voltar')

    expect(backButton.textContent).toBe('Voltar')
  })

  it('should render back button and call router back', () => {
    const { getByText } = render(<Back />)

    const backButton = getByText('Voltar')

    expect(backButton.textContent).toBe('Voltar')

    fireEvent.click(backButton)

    expect(mockedBack).toHaveBeenCalled()
  })
})
