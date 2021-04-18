import { render } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import Home, { getServerSideProps } from '../../pages/index'
import api from '../../services/api'

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

describe('Home', () => {
  it('should render home', async () => {
    const props = await getServerSideProps({
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

  // it('should render home search for pies orderby=relevance', async () => {
  //   const mockData = {
  //     data: [
  //       {
  //         id: 1,
  //         title: 'title',
  //         link: 'link',
  //         headline: 'headline',
  //       },
  //     ],
  //     size: 1,
  //     pages: 1,
  //   }
  //   mockApi
  //     .onGet(`/v2/posts`, {
  //       params: {
  //         search: 'pies',
  //         orderby: 'relevance',
  //         page: '1',
  //       },
  //     })
  //     .replyOnce(200, mockData)

  //   const props = await getServerSideProps({
  //     query: {
  //       search: 'pies',
  //       orderby: 'relevance',
  //       page: '1',
  //     },
  //   })

  //   expect(props).toEqual({
  //     props: { results: { ...mockData } },
  //   })

  //   const { getByPlaceholderText, getAllByRole } = render(
  //     <Home results={{ data: [], size: -1, pages: 0 }} />,
  //   )
  //   const input = getByPlaceholderText('Pesquisar')
  //   const [button] = getAllByRole('button')

  //   expect(input).not.toBeNull()
  //   expect(button).not.toBeNull()
  // })
})
