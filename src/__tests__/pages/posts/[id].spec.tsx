import api from '@services/api'
import { render } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import Article, {
  getStaticPaths,
  getStaticProps,
} from '../../../pages/posts/[id]'

jest.mock('next/router', () => ({
  useRouter: () => ({
    isFallback: false,
  }),
}))

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const mockApi = new MockAdapter(api)
const mockStaticPaths = [
  {
    id: 1,
    title: 'title',
    link: 'link',
    headline: 'headline',
  },
  {
    id: 2,
    title: 'title-2',
    link: 'link-2',
    headline: 'headline-2',
  },
]

const mockStaticProps = {
  id: 1,
  author: {
    name: 'Gerald the Rivia',
    picture: 'picture.png',
    description: '<p>The greather witcher </p>',
  },
  tags: [
    {
      id: 1,
      name: 'tag-1',
    },
  ],
  categories: [
    {
      id: 1,
      name: 'category-1',
    },
  ],
  bibliography: '<p> bibliography </p>',
  content: '<p> content </p>',
  title: 'The White Wolf',
  published: '04/19/2021',
  metas: {
    title: 'The White Wolf',
    description: 'description',
  },
}

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

describe('Article Page', () => {
  describe('getStaticPaths', () => {
    it('should match props', async () => {
      mockApi.onGet(`/v1/posts/?orderby=relevance`).reply(200, mockStaticPaths)
      const props = await getStaticPaths({})

      expect(props).toEqual({
        paths: mockStaticPaths.map((item: { id: number }) => ({
          params: { id: item.id.toString() },
        })),
        fallback: true,
      })
    })
  })
  describe('getStaticProps', () => {
    it('should match props', async () => {
      mockApi.onGet(`/v1/posts/1`).reply(200, mockStaticProps)
      const props = await getStaticProps({
        params: {
          id: '1',
        },
      })

      expect(props).toEqual({
        props: { ...mockStaticProps },
      })
    })
  })
  describe('Article Page', () => {
    it('should render article', () => {
      const { getByText } = render(<Article {...mockStaticProps} />)

      const title = getByText(mockStaticProps.title)
      const categoryName = getByText(mockStaticProps.categories[0].name)
      const tagName = getByText(mockStaticProps.tags[0].name)
      const bibliographyButton = getByText('Bibliografia')
      const name = getByText(mockStaticProps.author.name)
      const backButton = getByText('Voltar')

      expect(title).not.toBeNull()
      expect(categoryName).not.toBeNull()
      expect(tagName).not.toBeNull()
      expect(bibliographyButton).not.toBeNull()
      expect(name).not.toBeNull()
      expect(backButton.textContent).toBe('Voltar')
    })
  })
  it('should not render article', () => {
    useRouter.mockImplementation(() => ({
      isFallback: true,
    }))

    const { queryByText } = render(<Article {...mockStaticProps} />)
    const title = queryByText(mockStaticProps.title)
    expect(title).toBeNull()
  })
})
