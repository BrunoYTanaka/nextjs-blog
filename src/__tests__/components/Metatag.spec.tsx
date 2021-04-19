import { render } from '@testing-library/react'
import Metatag from '@components/Metatag'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
  }
})

const mockedMetas = {
  'og:title': 'ogTitle',
  'og:description': 'ogDescription',
  'article:tag': [{ content: 'content-1' }],
}

describe('Metatag', () => {
  it('render metas', () => {
    render(<Metatag {...mockedMetas} />, {
      container: document.head,
    })

    expect(document.title).toBe(mockedMetas['og:title'])
  })
})
