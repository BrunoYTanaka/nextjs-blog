import { render } from '@testing-library/react'
import Tags from '../../components/Tags'

const mockCategories = {
  title: 'Categorias',
  type: 'category',
  tags: [
    {
      id: 1,
      name: 'Saude',
    },
    {
      id: 2,
      name: 'Bem-estar',
    },
  ],
}

const mockTags = {
  tags: [
    {
      id: 1,
      name: 'Tag 1',
    },
    {
      id: 2,
      name: 'Tag 2',
    },
  ],
}

describe('Tags', () => {
  it('should render tags as categories', () => {
    const { getByText } = render(<Tags {...mockCategories} />)

    const title = getByText('Categorias:')

    expect(title).not.toBeNull()

    mockCategories.tags.forEach(tag => {
      const category = getByText(tag.name)
      expect(category).not.toBeNull()
    })
  })

  it('should render tags as tag', () => {
    const { getByText } = render(<Tags {...mockTags} />)

    mockTags.tags.forEach(tag => {
      const tagName = getByText(tag.name)
      expect(tagName).not.toBeNull()
    })
  })
})
