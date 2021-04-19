import { render } from '@testing-library/react'
import ListItem from '@/components/ListItem'

const mockedListItem = {
  id: 1,
  title: 'title-1',
  link: 'link-1',
  headline: 'headline-1',
}

describe('ListItem', () => {
  it('render a list item', () => {
    const { getByText } = render(<ListItem {...mockedListItem} />)

    const listTitle = getByText(mockedListItem.title)
    const listHeadline = getByText(mockedListItem.headline)
    const listLink = getByText(mockedListItem.link)

    expect(listTitle).not.toBeNull()
    expect(listHeadline).not.toBeNull()
    expect(listLink).not.toBeNull()
  })
})
