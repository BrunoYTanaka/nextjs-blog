import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { RiErrorWarningLine } from 'react-icons/ri'

function NotFound(): ReactElement {
  const router = useRouter()

  const handleBack = () => router.back()

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="md:w-8/12 m-3 p-5">
        <div className="flex-grow flex flex-col justify-around space-y-12">
          <span className="sm:text-3xl text-xl flex flex-row items-center">
            <RiErrorWarningLine size={36} />
            <span className="ml-2">Página não encontrada</span>
          </span>
          <span className="sm:text-3xl text-xl">
            A paǵina que você tentou acessar não existe
          </span>
          <button
            className="text-left sm:text-3xl text-xl focus:outline-none text-blue-400 hover:text-blue-700 transition-colors"
            type="button"
            onClick={handleBack}
          >
            Clique para voltar
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
