"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Produto } from "../types/produto"
import { useProdutosLocais } from "./produtos-locais-context"

// Tipos
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

interface AppContextType {
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

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // Estado do tema
  const [tema, setTema] = useState<"light" | "dark">("light")

  // Estado dos filtros
  const [filtros, setFiltros] = useState<FiltrosProdutos>({
    termoBusca: "",
    precoMinimo: 0,
    precoMaximo: 1000,
    ordenacao: "",
  })

  // Estado da paginação
  const [paginacao, setPaginacao] = useState<ConfiguracaoPaginacao>({
    paginaAtual: 1,
    itensPorPagina: 6,
    totalPaginas: 1,
    totalItens: 0,
  })

  // Estado dos produtos
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([])
  const [produtosPaginados, setProdutosPaginados] = useState<Produto[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  // Estado do modal
  const [modalAberto, setModalAberto] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

  // Acesso aos produtos do contexto de produtos locais
  const { produtos } = useProdutosLocais()

  // Efeito para carregar o tema do localStorage
  useEffect(() => {
    const temaArmazenado = localStorage.getItem("tema")
    if (temaArmazenado === "dark" || temaArmazenado === "light") {
      setTema(temaArmazenado)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTema("dark")
    }
  }, [])

  // Efeito para aplicar o tema ao documento
  useEffect(() => {
    if (tema === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("tema", tema)
  }, [tema])

  // Função para alternar o tema
  const alternarTema = () => {
    setTema((temaAtual) => (temaAtual === "light" ? "dark" : "light"))
  }

  // Função para atualizar filtros
  const atualizarFiltros = (novosFiltros: Partial<FiltrosProdutos>) => {
    setFiltros((filtrosAtuais) => ({ ...filtrosAtuais, ...novosFiltros }))
    setPaginacao((paginacaoAtual) => ({ ...paginacaoAtual, paginaAtual: 1 }))
  }

  // Função para atualizar paginação
  const atualizarPaginacao = (novaConfig: Partial<ConfiguracaoPaginacao>) => {
    setPaginacao((paginacaoAtual) => ({ ...paginacaoAtual, ...novaConfig }))
  }

  // Função para buscar produtos
  const buscarProdutos = async () => {
    setCarregando(true)
    setErro(null)

    try {
      // Aplicar filtros
      let produtosFiltrados = [...produtos]

      // Filtro por termo de busca
      if (filtros.termoBusca) {
        const termo = filtros.termoBusca.toLowerCase()
        produtosFiltrados = produtosFiltrados.filter(
          (produto) =>
            produto.nome.toLowerCase().includes(termo) ||
            produto.descricao.toLowerCase().includes(termo) ||
            produto.categoria.toLowerCase().includes(termo),
        )
      }

      // Filtro por preço
      produtosFiltrados = produtosFiltrados.filter(
        (produto) => produto.preco >= filtros.precoMinimo && produto.preco <= filtros.precoMaximo,
      )

      // Ordenação
      if (filtros.ordenacao) {
        produtosFiltrados.sort((a, b) => {
          switch (filtros.ordenacao) {
            case "nome-asc":
              return a.nome.localeCompare(b.nome)
            case "nome-desc":
              return b.nome.localeCompare(a.nome)
            case "preco-asc":
              return a.preco - b.preco
            case "preco-desc":
              return b.preco - a.preco
            default:
              return 0
          }
        })
      }

      // Atualizar estado dos produtos filtrados
      setProdutosFiltrados(produtosFiltrados)

      // Atualizar paginação
      const totalItens = produtosFiltrados.length
      const totalPaginas = Math.ceil(totalItens / paginacao.itensPorPagina)

      setPaginacao((paginacaoAtual) => ({
        ...paginacaoAtual,
        totalPaginas,
        totalItens,
        paginaAtual: Math.min(paginacaoAtual.paginaAtual, totalPaginas || 1),
      }))
    } catch (error) {
      setErro("Erro ao buscar produtos")
      console.error("Erro ao buscar produtos:", error)
    } finally {
      setCarregando(false)
    }
  }

  // Efeito para buscar produtos quando os filtros ou produtos mudam
  useEffect(() => {
    buscarProdutos()
  }, [filtros, produtos])

  // Efeito para paginar os produtos
  useEffect(() => {
    const inicio = (paginacao.paginaAtual - 1) * paginacao.itensPorPagina
    const fim = inicio + paginacao.itensPorPagina
    setProdutosPaginados(produtosFiltrados.slice(inicio, fim))
  }, [produtosFiltrados, paginacao.paginaAtual, paginacao.itensPorPagina])

  // Funções para o modal
  const abrirModal = (produto: Produto) => {
    setProdutoSelecionado(produto)
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setProdutoSelecionado(null)
  }

  return (
    <AppContext.Provider
      value={{
        tema,
        alternarTema,
        filtros,
        atualizarFiltros,
        paginacao,
        atualizarPaginacao,
        produtosFiltrados,
        produtosPaginados,
        carregando,
        erro,
        buscarProdutos,
        modalAberto,
        produtoSelecionado,
        abrirModal,
        fecharModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider")
  }
  return context
}
