import { render } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import { createRequest, createResponse } from 'node-mocks-http'
import Home, { getServerSideProps } from '@/pages/index'
import api from '@/services/api'

const mockedPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      orderBy: '',
      page: '',
      search: 'pies',
    },
    push: mockedPush,
  }),
}))

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

const mockApi = new MockAdapter(api)
let req
let res

const mockData = {
  data: [
    {
      id: 1,
      title: 'title',
      link: 'link',
      headline: 'headline',
    },
  ],
  size: 1,
  pages: 1,
}
describe('Home', () => {
  beforeEach(() => {
    req = createRequest({
      method: 'GET',
    })
    res = createResponse()
  })

  describe('getServerSideProps', () => {
    it('should render first time home', async () => {
      const props = await getServerSideProps({
        resolvedUrl: '',
        req,
        res,
        query: {
          search: '',
        },
      })

      expect(props).toEqual({
        props: { results: { data: [], size: -1, pages: 0 } },
      })

      const { getByPlaceholderText, getAllByRole } = render(
        <Home results={{ data: [], size: -1, pages: 0 }} />,
      )
      const input = getByPlaceholderText('Pesquisar')
      const [button] = getAllByRole('button')

      expect(input).not.toBeNull()
      expect(button).not.toBeNull()
    })

    it('should render home search for pies orderby relevance', async () => {
      mockApi
        .onGet(`/v2/posts?search=pies&orderby=relevance&page=1`)
        .reply(200, mockData)

      const props = await getServerSideProps({
        resolvedUrl: '',
        req,
        res,
        query: {
          search: 'pies',
          orderby: 'relevance',
          page: '1',
        },
      })

      expect(props).toEqual({
        props: { results: { ...mockData } },
      })

      const { getByPlaceholderText, getAllByRole } = render(
        <Home results={{ ...mockData }} />,
      )
      const input = getByPlaceholderText('Pesquisar')
      const [, orderByBtn] = getAllByRole('button')

      expect(input).not.toBeNull()
      expect(orderByBtn).not.toBeNull()
    })

    it('should render home search for pies', async () => {
      mockApi.onGet(`/v2/posts?search=pies&page=1`).reply(200, mockData)

      const props = await getServerSideProps({
        resolvedUrl: '',
        req,
        res,
        query: {
          search: 'pies',
          page: '1',
        },
      })

      expect(props).toEqual({
        props: { results: { ...mockData } },
      })

      const { getByPlaceholderText, getAllByRole } = render(
        <Home results={{ ...mockData }} />,
      )
      const input = getByPlaceholderText('Pesquisar')
      const [, orderByBtn] = getAllByRole('button')

      expect(input).not.toBeNull()
      expect(orderByBtn).not.toBeNull()
    })
  })

  describe('Home Page', () => {
    it('render home', () => {
      const { getByPlaceholderText, getAllByRole } = render(
        <Home results={{ data: [], size: -1, pages: 0 }} />,
      )

      const input = getByPlaceholderText('Pesquisar')
      const [, orderByBtn] = getAllByRole('button')

      expect(input).not.toBeNull()
      expect(orderByBtn).not.toBeNull()
    })

    it('render home with results', () => {
      const mockProps = { ...mockData, size: 11 }
      const { getByText, getByPlaceholderText, getAllByRole } = render(
        <Home results={{ ...mockProps }} />,
      )

      const input = getByPlaceholderText('Pesquisar')
      const [, orderByBtn] = getAllByRole('button')
      const page1 = getByText('1')
      expect(page1.className).toContain('pagination-page-active')
      expect(input).not.toBeNull()
      expect(orderByBtn).not.toBeNull()
    })
  })
})
