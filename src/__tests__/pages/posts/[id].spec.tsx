import api from '@services/api'
import MockAdapter from 'axios-mock-adapter'
import { getStaticPaths } from '../../../pages/posts/[id]'

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

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null
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
})
