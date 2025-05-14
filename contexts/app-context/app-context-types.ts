import type { Produto } from "@/types/produto"

export type OrdenacaoTipo = "nome-asc" | "nome-desc" | "preco-asc" | "preco-desc" | ""

export interface FiltrosProdutos {
  termoBusca: string
  precoMinimo: number
  precoMaximo: number
  ordenacao: OrdenacaoTipo
}

export interface ConfiguracaoPaginacao {
  paginaAtual: number
  itensPorPagina: number
  totalPaginas: number
  totalItens: number
}

export interface AppContextType {
  tema: "light" | "dark"
  alternarTema: () => void
  filtros: FiltrosProdutos
  atualizarFiltros: (novosFiltros: Partial<FiltrosProdutos>) => void
  paginacao: ConfiguracaoPaginacao
  atualizarPaginacao: (novaConfig: Partial<ConfiguracaoPaginacao>) => void
  produtosFiltrados: Produto[]
  produtosPaginados: Produto[]
  carregando: boolean
  erro: string | null
  buscarProdutos: () => void
  modalAberto: boolean
  produtoSelecionado: Produto | null
  abrirModal: (produto: Produto) => void
  fecharModal: () => void
}

export const initialFilters: FiltrosProdutos = {
  termoBusca: "",
  precoMinimo: 0,
  precoMaximo: 1000,
  ordenacao: "",
}

export const initialPagination: ConfiguracaoPaginacao = {
  paginaAtual: 1,
  itensPorPagina: 6,
  totalPaginas: 1,
  totalItens: 0,
}
