import { useEffect, useState } from 'react'

export const LEFT_PAGE = -2
export const RIGHT_PAGE = -1

const range = (from: number, to: number, step = 1): number[] => {
  let i = from
  const range1 = []

  while (i <= to) {
    range1.push(i)
    i += step
  }

  return range1
}

interface usePaginationProps {
  currentPage: number
  totalPages: number
}

function usePagination({
  currentPage,
  totalPages,
}: usePaginationProps): number[] {
  const [pages, setPages] = useState<number[]>([])
  const pageNeighbours = 1

  useEffect(() => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let rangePages = range(startPage, endPage)

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (rangePages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          rangePages = [LEFT_PAGE, ...extraPages, ...rangePages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          rangePages = [...rangePages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          rangePages = [LEFT_PAGE, ...rangePages, RIGHT_PAGE]
          break
        }
      }
      setPages([1, ...rangePages, totalPages])
    } else {
      setPages(range(1, totalPages))
    }
  }, [currentPage, totalPages, setPages])

  return pages
}

export default usePagination
