"use client"

import { memo, useCallback } from "react"
import { useAppContext } from "@/contexts/app-context"
import ResumoFiltros from "./resumo-filtros"
import ItensPorPagina from "./itens-por-pagina"
import Paginacao from "./paginacao"
import CardProduto from "./card-produto"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

function ListaProdutosBase() {
  const { produtosPaginados, produtosFiltrados, carregando, erro } = useAppContext()

  const renderProdutos = useCallback(() => {
    if (produtosPaginados.length === 0) {
      return (
        <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-300">Nenhum produto encontrado com os filtros aplicados.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {produtosPaginados.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    )
  }, [produtosPaginados])

  if (carregando) {
    return (
      <div className="flex justify-center items-center py-12" aria-live="polite" aria-busy="true">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (erro) {
    return (
      <div
        className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative"
        role="alert"
        aria-live="assertive"
      >
        <strong className="font-bold">Erro!</strong>
        <span className="block sm:inline"> {erro}</span>
      </div>
    )
  }

  return (
    <section aria-label="Lista de produtos">
      <ResumoFiltros />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
          <span aria-live="polite">
            {produtosFiltrados.length} {produtosFiltrados.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </span>
        </div>
        <ItensPorPagina />
      </div>
      {renderProdutos()}
      <Paginacao />
    </section>
  )
}

export default memo(ListaProdutosBase)
