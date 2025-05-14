"use client"

import { useState, useMemo } from "react"

interface UsePaginacaoProps<T> {
  itens: T[]
  itensPorPagina: number
  paginaInicial?: number
}

interface UsePaginacaoRetorno<T> {
  itensPaginados: T[]
  paginaAtual: number
  totalPaginas: number
  totalItens: number
  irParaPagina: (pagina: number) => void
  proximaPagina: () => void
  paginaAnterior: () => void
  mudarItensPorPagina: (quantidade: number) => void
}

export function usePaginacao<T>({
  itens,
  itensPorPagina: itensPorPaginaInicial,
  paginaInicial = 1,
}: UsePaginacaoProps<T>): UsePaginacaoRetorno<T> {
  const [paginaAtual, setPaginaAtual] = useState(paginaInicial)
  const [itensPorPagina, setItensPorPagina] = useState(itensPorPaginaInicial)

  // Recalcular quando a página ou itens por página mudar
  const totalItens = itens.length
  const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina))

  // Garantir que a página atual seja válida
  useMemo(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas)
    }
  }, [paginaAtual, totalPaginas])

  // Calcular itens da página atual
  const itensPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina
    const fim = inicio + itensPorPagina
    return itens.slice(inicio, fim)
  }, [itens, paginaAtual, itensPorPagina])

  // Funções de navegação
  const irParaPagina = (pagina: number) => {
    const novaPagina = Math.max(1, Math.min(pagina, totalPaginas))
    setPaginaAtual(novaPagina)
  }

  const proximaPagina = () => {
    irParaPagina(paginaAtual + 1)
  }

  const paginaAnterior = () => {
    irParaPagina(paginaAtual - 1)
  }

  const mudarItensPorPagina = (quantidade: number) => {
    setItensPorPagina(quantidade)
    setPaginaAtual(1) // Voltar para a primeira página ao mudar a quantidade
  }

  return {
    itensPaginados,
    paginaAtual,
    totalPaginas,
    totalItens,
    irParaPagina,
    proximaPagina,
    paginaAnterior,
    mudarItensPorPagina,
  }
}
