import { render } from '@testing-library/react'
import List from '../../components/List'

jest.mock('next/dynamic', () => func => {
  let component = null
  func().then(module => {
    component = module.default
  })
  const DynamicComponent = (...args) => component(...args)
  DynamicComponent.displayName = 'LoadableComponent'
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

const mockedList = [
  {
    id: 1,
    title: 'title-1',
    link: 'link-1',
    headline: 'headline-1',
  },
  {
    id: 2,
    title: 'title-2',
    link: 'link-2',
    headline: 'headline-2',
  },
]

describe('List', () => {
  it('should render list', () => {
    const { getByText } = render(<List size={10} list={mockedList} />)

    mockedList.forEach(item => {
      const listTitle = getByText(item.title)
      const listHeadline = getByText(item.headline)
      const listLink = getByText(item.link)

      expect(listTitle).not.toBeNull()
      expect(listHeadline).not.toBeNull()
      expect(listLink).not.toBeNull()
    })
  })
  it('should render not render list', () => {
    const { getByText } = render(<List size={0} list={[]} />)

    const label = getByText(
      'Não existem artigos relacionados ao termo pesquisado!',
    )
    expect(label).not.toBeNull()
  })
})
