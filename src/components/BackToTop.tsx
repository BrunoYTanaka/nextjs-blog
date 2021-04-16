import { ReactElement, useEffect, useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'

function BackToTop(): ReactElement {
  const [showScroll, setShowScroll] = useState(false)

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false)
      }
    }
    window.addEventListener('scroll', checkScrollTop)
    return () => {
      window.removeEventListener('scroll', checkScrollTop)
    }
  }, [showScroll])

  return (
    <div className="fixed bottom-0 p-5 right-3 z-10">
      <button
        className={`focus:outline-none opacity-5 ${
          showScroll ? 'flex' : 'hidden'
        }`}
        type="button"
        onClick={scrollTop}
      >
        <FaArrowCircleUp size={36} />
      </button>
    </div>
  )
}

export default BackToTop
