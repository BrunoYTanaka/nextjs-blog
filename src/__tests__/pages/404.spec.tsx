import { fireEvent, render } from '@testing-library/react'
import NotFound from '@/pages/404'

const mockedBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    back: mockedBack,
  }),
}))

describe('NotFound', () => {
  it('should render not found', () => {
    const { getByText } = render(<NotFound />)

    const firstText = getByText('Página não encontrada')
    const secondText = getByText('A paǵina que você tentou acessar não existe')
    const backBtn = getByText('Clique para voltar')

    expect(firstText).not.toBeNull()
    expect(secondText).not.toBeNull()
    expect(backBtn).not.toBeNull()
  })
  it('should call router back', () => {
    const { getByText } = render(<NotFound />)

    const backBtn = getByText('Clique para voltar')

    expect(backBtn).not.toBeNull()

    fireEvent.click(backBtn)

    expect(mockedBack).toHaveBeenCalled()
  })
})
