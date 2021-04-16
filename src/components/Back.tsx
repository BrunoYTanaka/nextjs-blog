import { ReactElement } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/router'

function Back(): ReactElement {
  const router = useRouter()

  const handleBack = () => router.back()

  return (
    <button
      onClick={handleBack}
      className="flex justify-start items-center px-5 py-3 focus:outline-none group text-gray-400 hover:text-gray-500"
      type="button"
    >
      <BiArrowBack size={24} />
      <span className="ml-3 text-sm font-bold text-gray-400 group-hover:text-gray-500">
        Voltar
      </span>
    </button>
  )
}

export default Back
