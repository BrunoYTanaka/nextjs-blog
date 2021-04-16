import { useEffect, useState } from 'react'
import { LEFT_PAGE, RIGHT_PAGE } from '../constants/pagination'

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
  pageNeighbours: number
  currentPage: number
  totalPages: number
}

function usePagination({
  pageNeighbours,
  currentPage,
  totalPages,
}: usePaginationProps): number[] {
  const [pages, setPages] = useState<number[]>([])

  useEffect(() => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let rangePages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (rangePages.length + 1)

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          rangePages = [LEFT_PAGE, ...extraPages, ...rangePages]
          break
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          rangePages = [...rangePages, ...extraPages, RIGHT_PAGE]
          break
        }

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
  }, [currentPage, totalPages, setPages, pageNeighbours])

  return pages
}

export default usePagination
