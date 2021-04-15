import React, { ReactElement, useMemo } from 'react'
import { useRouter } from 'next/router'
import usePagination, { LEFT_PAGE, RIGHT_PAGE } from '../hooks/usePagination'

// based on
// https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react-pt

interface PaginationProps {
  size: number
}

function Pagination({ size }: PaginationProps): ReactElement {
  const router = useRouter()
  const pageNeighbours = 0
  const currentPage = useMemo(() => Number(router.query.page) || 1, [
    router.query.page,
  ])
  const totalPages = useMemo(() => Math.ceil(size / 10), [size])
  const pages = usePagination({ currentPage, totalPages })

  const gotoPage = (page: number) => {
    const newPage = Math.max(0, Math.min(page, totalPages))

    const { search, orderby } = router.query

    router.push(
      `/?search=${search}${
        orderby === 'relevance' ? `&orderBy=${orderby}` : ''
      }&page=${newPage}`,
    )
  }

  const handleClick = (page: number) => () => {
    gotoPage(page)
  }

  const handleMoveLeft = () => {
    gotoPage(currentPage - pageNeighbours * 2 - 1)
  }

  const handleMoveRight = () => {
    gotoPage(currentPage + pageNeighbours * 2 + 1)
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