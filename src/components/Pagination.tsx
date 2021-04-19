import React, { ReactElement, useMemo } from 'react'
import { useRouter } from 'next/router'
import usePagination from '@/hooks/usePagination'
import {
  LEFT_PAGE,
  RIGHT_PAGE,
  PAGE_NEIGHBOURS,
  TOTAL_PER_PAGE,
} from '@/constants/pagination'

// based on
// https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react-pt

interface PaginationProps {
  size: number
}

function Pagination({ size }: PaginationProps): ReactElement {
  const router = useRouter()
  const pageNeighbours = PAGE_NEIGHBOURS
  const currentPage = useMemo(() => Math.abs(Number(router.query.page)) || 1, [
    router.query.page,
  ])
  const totalPages = useMemo(() => Math.ceil(size / TOTAL_PER_PAGE), [size])
  const pages = usePagination({ pageNeighbours, currentPage, totalPages })

  const gotoPage = (page: number) => {
    const newPage = Math.max(0, Math.min(page, totalPages))

    const { search, orderby } = router.query

    router.push(
      `/?search=${search}${
        orderby === 'relevance' ? `&orderby=${orderby}` : ''
      }&page=${newPage}`,
    )
  }

  const handleClick = (page: number) => () => {
    gotoPage(page)
  }

  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbours - 1)
  }

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbours + 1)
  }

  return (
    <div className="w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52 flex-grow">
      <nav className="py-5 flex my-6  items-center">
        <div className="pagination">
          {pages.map(page => {
            if (page === LEFT_PAGE)
              return (
                <button
                  key={page}
                  className="pagination-page"
                  type="button"
                  aria-label="Previous"
                  onClick={handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              )

            if (page === RIGHT_PAGE)
              return (
                <button
                  key={page}
                  className="pagination-page"
                  type="button"
                  aria-label="Next"
                  onClick={handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              )

            return (
              <button
                key={page}
                className={`pagination-page ${
                  currentPage === page ? `pagination-page-active` : ''
                }`}
                type="button"
                onClick={handleClick(page)}
              >
                {page}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default Pagination
