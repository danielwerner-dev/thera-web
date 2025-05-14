"use client"

import { useState } from "react"
import { useAppContext } from "@/contexts/app-context"
import type { Produto } from "@/types/produto"
import { SemImagem } from "@/components"

interface CardProdutoProps {
  produto: Produto
}

export default function CardProduto({ produto }: CardProdutoProps) {
  const { abrirModal } = useAppContext()
  const [imagemErro, setImagemErro] = useState(false)

  const handleImagemErro = () => {
    setImagemErro(true)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
        {produto.imagem && !imagemErro ? (
          <img
            src={produto.imagem || "/placeholder.svg"}
            alt={produto.nome}
            className="w-full h-full object-cover"
            onError={handleImagemErro}
            loading="lazy"
          />
        ) : (
          <SemImagem />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 truncate">{produto.nome}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{produto.categoria}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(produto.preco)}
          </span>
          <button
            onClick={() => abrirModal(produto)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            aria-label={`Ver detalhes de ${produto.nome}`}
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  )
}
