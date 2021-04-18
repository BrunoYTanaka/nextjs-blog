import { fireEvent, render } from '@testing-library/react'
import Bibliography from '../../components/Bibliography'

const mockBibliography = {
  bibliography: '<p> bibliography </p>',
}

describe('Bibliography', () => {
  it('should render bibliography', () => {
    const { getByText, queryByTestId } = render(
      <Bibliography {...mockBibliography} />,
    )

    const button = getByText('Bibliografia')
    const bibliography = queryByTestId('content')

    expect(button).not.toBeNull()
    expect(bibliography).toBeNull()
  })

  it('should render bibliography content', () => {
    const { getByText, queryByTestId } = render(
      <Bibliography {...mockBibliography} />,
    )

    const button = getByText('Bibliografia')

    fireEvent.click(button)
    const bibliography = queryByTestId('content')

    expect(bibliography).not.toBeNull()
  })
})
