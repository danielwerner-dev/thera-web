"use client"

import type React from "react"
import { useAppContext } from "@/contexts/app-context"
import { useState, useEffect, useId, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { formatarMoeda } from "@/lib/utils"

export default function FiltrosProdutos() {
  const { filtros, atualizarFiltros } = useAppContext()
  const [formValues, setFormValues] = useState({
    termoBusca: filtros.termoBusca,
    precoMinimo: filtros.precoMinimo,
    precoMaximo: filtros.precoMaximo,
    ordenacao: filtros.ordenacao,
  })

  // Gerar IDs únicos para os campos
  const searchId = useId()
  const minPriceId = useId()
  const maxPriceId = useId()
  const sortId = useId()

  // Atualizar o formulário quando os filtros mudarem
  useEffect(() => {
    setFormValues({
      termoBusca: filtros.termoBusca,
      precoMinimo: filtros.precoMinimo,
      precoMaximo: filtros.precoMaximo,
      ordenacao: filtros.ordenacao,
    })
  }, [filtros])

  // Manipuladores de eventos
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "precoMinimo" || name === "precoMaximo") {
      const newValue = Number(value)
      setFormValues((prev) => ({
        ...prev,
        [name]: newValue,
      }))
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      atualizarFiltros(formValues)
    },
    [formValues, atualizarFiltros],
  )

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Filtros</h2>
      <form onSubmit={handleSubmit} aria-label="Formulário de filtros">
        <div className="mb-4">
          <label htmlFor={searchId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Buscar
          </label>
          <input
            type="text"
            id={searchId}
            name="termoBusca"
            value={formValues.termoBusca}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nome do produto"
            aria-describedby={`${searchId}-hint`}
          />
          <div id={`${searchId}-hint`} className="sr-only">
            Digite termos para buscar produtos por nome, descrição ou categoria
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Faixa de preço</h3>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor={minPriceId} className="text-xs text-gray-500 dark:text-gray-400">
                Mínimo:
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
                {formatarMoeda(formValues.precoMinimo)}
              </span>
            </div>
            <input
              type="range"
              id={minPriceId}
              name="precoMinimo"
              min="0"
              max="5000"
              step="10"
              value={formValues.precoMinimo}
              onChange={handleChange}
              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              aria-valuemin={0}
              aria-valuemax={5000}
              aria-valuenow={formValues.precoMinimo}
              aria-valuetext={`${formValues.precoMinimo} reais`}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor={maxPriceId} className="text-xs text-gray-500 dark:text-gray-400">
                Máximo:
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
                {formatarMoeda(formValues.precoMaximo)}
              </span>
            </div>
            <input
              type="range"
              id={maxPriceId}
              name="precoMaximo"
              min="0"
              max="5000"
              step="10"
              value={formValues.precoMaximo}
              onChange={handleChange}
              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              aria-valuemin={0}
              aria-valuemax={5000}
              aria-valuenow={formValues.precoMaximo}
              aria-valuetext={`${formValues.precoMaximo} reais`}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor={sortId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ordenar por
          </label>
          <select
            id={sortId}
            name="ordenacao"
            value={formValues.ordenacao}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            aria-label="Ordenar produtos por"
          >
            <option value="">Selecione</option>
            <option value="nome-asc">Nome (A-Z)</option>
            <option value="nome-desc">Nome (Z-A)</option>
            <option value="preco-asc">Preço (menor-maior)</option>
            <option value="preco-desc">Preço (maior-menor)</option>
          </select>
        </div>

        <Button type="submit" className="w-full" aria-label="Aplicar filtros">
          Aplicar Filtros
        </Button>
      </form>
    </div>
  )
}
