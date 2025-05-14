"use client"

import { useAppContext } from "@/contexts/app-context"

export default function ResumoFiltros() {
  const { filtros, atualizarFiltros } = useAppContext()
  const temFiltros = filtros.termoBusca || filtros.precoMinimo > 0 || filtros.precoMaximo < 1000 || filtros.ordenacao

  if (!temFiltros) {
    return null
  }

  const limparFiltros = () => {
    atualizarFiltros({
      termoBusca: "",
      precoMinimo: 0,
      precoMaximo: 1000,
      ordenacao: "",
    })
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtros aplicados:</span>
          <div className="flex flex-wrap gap-2">
            {filtros.termoBusca && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                Busca: {filtros.termoBusca}
                <button
                  onClick={() => atualizarFiltros({ termoBusca: "" })}
                  className="ml-1 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100"
                  aria-label={`Remover filtro de busca: ${filtros.termoBusca}`}
                >
                  ×
                </button>
              </span>
            )}
            {(filtros.precoMinimo > 0 || filtros.precoMaximo < 1000) && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                Preço: R$ {filtros.precoMinimo.toFixed(2)} - R$ {filtros.precoMaximo.toFixed(2)}
                <button
                  onClick={() => atualizarFiltros({ precoMinimo: 0, precoMaximo: 1000 })}
                  className="ml-1 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100"
                  aria-label="Remover filtro de preço"
                >
                  ×
                </button>
              </span>
            )}
            {filtros.ordenacao && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                Ordenação:{" "}
                {filtros.ordenacao === "nome-asc"
                  ? "Nome (A-Z)"
                  : filtros.ordenacao === "nome-desc"
                    ? "Nome (Z-A)"
                    : filtros.ordenacao === "preco-asc"
                      ? "Preço (menor-maior)"
                      : "Preço (maior-menor)"}
                <button
                  onClick={() => atualizarFiltros({ ordenacao: "" })}
                  className="ml-1 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100"
                  aria-label="Remover ordenação"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
        <button
          onClick={limparFiltros}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          aria-label="Limpar todos os filtros"
        >
          Limpar todos
        </button>
      </div>
    </div>
  )
}
