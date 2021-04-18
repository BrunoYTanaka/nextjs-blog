import { render, fireEvent } from '@testing-library/react'
import AuthCard from '../../components/AuthorCard'

const mockAuthor = {
  name: 'Gerald the Rivia',
  picture: 'img',
  description: '<p>Great witcher </p>',
}

describe('AuthCard', () => {
  it('should render auth card', () => {
    const { getByAltText, getByText, getByTestId } = render(
      <AuthCard {...mockAuthor} />,
    )

    const imgUser = getByAltText(mockAuthor.name) as HTMLImageElement
    const name = getByText(mockAuthor.name)
    const description = getByTestId('content')
    const button = getByText('Expandir')

    expect(imgUser).not.toBeNull()
    expect(imgUser.src).toContain(mockAuthor.picture)
    expect(name).not.toBeNull()
    expect(name.textContent).toBe(mockAuthor.name)
    expect(description.outerHTML).toContain(mockAuthor.description)
    expect(button).not.toBeNull()
    expect(button.textContent).toBe('Expandir')
  })

  it('should render auth card and expand description', () => {
    const { getByText, getByTestId } = render(<AuthCard {...mockAuthor} />)

    const description = getByTestId('content')
    const button = getByText('Expandir')

    expect(description.className).toContain('max-h-20 overflow-y-hidden')

    fireEvent.click(button)

    expect(description.className).not.toContain('max-h-20 overflow-y-hidden')
  })
})
