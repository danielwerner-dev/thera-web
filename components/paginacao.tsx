"use client"

import { useAppContext } from "@/contexts/app-context"

export default function Paginacao() {
  const { paginacao, atualizarPaginacao } = useAppContext()
  const { paginaAtual, totalPaginas } = paginacao

  if (totalPaginas <= 1) {
    return null
  }

  const irParaPagina = (pagina: number) => {
    atualizarPaginacao({ paginaAtual: pagina })
    // Rolar para o topo da lista
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderBotoesPagina = () => {
    const botoes = []
    const maxBotoes = 5
    let inicio = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2))
    const fim = Math.min(totalPaginas, inicio + maxBotoes - 1)

    if (fim - inicio + 1 < maxBotoes) {
      inicio = Math.max(1, fim - maxBotoes + 1)
    }

    // Primeira página
    if (inicio > 1) {
      botoes.push(
        <button
          key="1"
          onClick={() => irParaPagina(1)}
          className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          aria-label="Ir para a primeira página"
        >
          1
        </button>,
      )
      if (inicio > 2) {
        botoes.push(
          <span key="ellipsis1" className="px-2 py-1 text-gray-500 dark:text-gray-400">
            ...
          </span>,
        )
      }
    }

    // Páginas intermediárias
    for (let i = inicio; i <= fim; i++) {
      botoes.push(
        <button
          key={i}
          onClick={() => irParaPagina(i)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            i === paginaAtual
              ? "text-white bg-blue-600 border border-blue-600"
              : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
          aria-label={`Ir para a página ${i}`}
          aria-current={i === paginaAtual ? "page" : undefined}
        >
          {i}
        </button>,
      )
    }

    // Última página
    if (fim < totalPaginas) {
      if (fim < totalPaginas - 1) {
        botoes.push(
          <span key="ellipsis2" className="px-2 py-1 text-gray-500 dark:text-gray-400">
            ...
          </span>,
        )
      }
      botoes.push(
        <button
          key={totalPaginas}
          onClick={() => irParaPagina(totalPaginas)}
          className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          aria-label={`Ir para a última página, página ${totalPaginas}`}
        >
          {totalPaginas}
        </button>,
      )
    }

    return botoes
  }

  return (
    <div className="flex justify-center mt-6">
      <nav className="flex items-center space-x-1" aria-label="Paginação">
        <button
          onClick={() => irParaPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          aria-label="Ir para a página anterior"
        >
          Anterior
        </button>
        {renderBotoesPagina()}
        <button
          onClick={() => irParaPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          aria-label="Ir para a próxima página"
        >
          Próxima
        </button>
      </nav>
    </div>
  )
}
