"use client"

import type React from "react"
import { useAppContext } from "@/contexts/app-context"
import { useId } from "react"

export default function ItensPorPagina() {
  const { paginacao, atualizarPaginacao } = useAppContext()
  const selectId = useId()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    atualizarPaginacao({ itensPorPagina: Number(e.target.value), paginaAtual: 1 })
  }

  return (
    <div className="flex items-center">
      <label htmlFor={selectId} className="text-sm text-gray-600 dark:text-gray-400 mr-2">
        Itens por página:
      </label>
      <select
        id={selectId}
        value={paginacao.itensPorPagina}
        onChange={handleChange}
        className="p-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        aria-label="Selecione a quantidade de itens por página"
      >
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
    </div>
  )
}
