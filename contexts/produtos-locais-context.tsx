"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Produto } from "@/types/produto"

// Dados iniciais de produtos com URLs de imagens online
const produtosIniciais: Produto[] = [
  {
    id: 1,
    nome: "Smartphone XYZ",
    categoria: "Eletrônicos",
    preco: 1299.99,
    descricao: "Smartphone de última geração com câmera de alta resolução e processador rápido.",
    imagem: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    nome: "Notebook Ultra",
    categoria: "Informática",
    preco: 4500.0,
    descricao: "Notebook leve e potente para trabalho e entretenimento.",
    imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    nome: "Tênis Esportivo",
    categoria: "Esportes",
    preco: 299.9,
    descricao: "Tênis confortável para corrida e atividades físicas.",
    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    nome: "Cafeteira Elétrica",
    categoria: "Eletrodomésticos",
    preco: 189.9,
    descricao: "Cafeteira com timer programável e sistema antigotejamento.",
    imagem: "https://images.unsplash.com/photo-1520970519539-8c9eaad9e8fa?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 5,
    nome: "Fone de Ouvido Bluetooth",
    categoria: "Eletrônicos",
    preco: 159.9,
    descricao: "Fone sem fio com cancelamento de ruído e bateria de longa duração.",
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 6,
    nome: "Mochila para Notebook",
    categoria: "Acessórios",
    preco: 149.9,
    descricao: "Mochila resistente à água com compartimento acolchoado para notebook.",
    imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 7,
    nome: "Smart TV 4K",
    categoria: "Eletrônicos",
    preco: 2799.9,
    descricao: "Smart TV com resolução 4K, HDR e sistema operacional intuitivo.",
    imagem: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 8,
    nome: "Cadeira de Escritório",
    categoria: "Móveis",
    preco: 599.9,
    descricao: "Cadeira ergonômica com ajuste de altura e apoio lombar.",
    imagem: "https://images.unsplash.com/photo-1505843490701-5be5d1b31a89?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 9,
    nome: "Relógio Inteligente",
    categoria: "Eletrônicos",
    preco: 499.9,
    descricao: "Smartwatch com monitor cardíaco, GPS e notificações.",
    imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 10,
    nome: "Câmera Digital",
    categoria: "Eletrônicos",
    preco: 1899.9,
    descricao: "Câmera com sensor de alta resolução e gravação em 4K.",
    imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 11,
    nome: "Liquidificador Potente",
    categoria: "Eletrodomésticos",
    preco: 149.9,
    descricao: "Liquidificador com múltiplas velocidades e lâminas de aço inoxidável.",
    imagem: "https://images.unsplash.com/photo-1659536009108-ebe9053222d4?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 12,
    nome: "Teclado Mecânico",
    categoria: "Informática",
    preco: 349.9,
    descricao: "Teclado mecânico com iluminação RGB e switches de alta durabilidade.",
    imagem: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=500&auto=format&fit=crop",
  },
]

// Tipos
interface ProdutosLocaisContextType {
  produtos: Produto[]
  adicionarProduto: (produto: Omit<Produto, "id">) => { sucesso: boolean; mensagem: string; id?: number }
  atualizarProduto: (id: number, produto: Partial<Produto>) => { sucesso: boolean; mensagem: string }
  removerProduto: (id: number) => { sucesso: boolean; mensagem: string }
}

const ProdutosLocaisContext = createContext<ProdutosLocaisContextType | undefined>(undefined)

export function ProdutosLocaisProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([])

  // Carregar produtos do localStorage na inicialização
  useEffect(() => {
    const produtosArmazenados = localStorage.getItem("produtos")
    if (produtosArmazenados) {
      try {
        const parsedProdutos = JSON.parse(produtosArmazenados)
        if (Array.isArray(parsedProdutos)) {
          setProdutos(parsedProdutos)
        } else {
          console.error("Formato inválido de produtos no localStorage")
          setProdutos(produtosIniciais)
          localStorage.setItem("produtos", JSON.stringify(produtosIniciais))
        }
      } catch (error) {
        console.error("Erro ao parsear produtos do localStorage:", error)
        setProdutos(produtosIniciais)
        localStorage.setItem("produtos", JSON.stringify(produtosIniciais))
      }
    } else {
      setProdutos(produtosIniciais)
      localStorage.setItem("produtos", JSON.stringify(produtosIniciais))
    }
  }, [])

  // Salvar produtos no localStorage quando mudam
  useEffect(() => {
    if (produtos.length > 0) {
      localStorage.setItem("produtos", JSON.stringify(produtos))
    }
  }, [produtos])

  // Função para adicionar um novo produto
  const adicionarProduto = (produto: Omit<Produto, "id">) => {
    // Validação básica
    if (!produto.nome || !produto.categoria || produto.preco <= 0) {
      return {
        sucesso: false,
        mensagem: "Dados do produto inválidos",
      }
    }

    const novoProduto = {
      ...produto,
      id: Math.max(0, ...produtos.map((p) => p.id)) + 1,
    } as Produto

    setProdutos([...produtos, novoProduto])

    return {
      sucesso: true,
      mensagem: "Produto adicionado com sucesso",
      id: novoProduto.id,
    }
  }

  // Função para atualizar um produto existente
  const atualizarProduto = (id: number, produto: Partial<Produto>) => {
    const produtoExistente = produtos.find((p) => p.id === id)

    if (!produtoExistente) {
      return { sucesso: false, mensagem: "Produto não encontrado" }
    }

    // Validação básica
    if (
      (produto.nome !== undefined && produto.nome.trim() === "") ||
      (produto.categoria !== undefined && produto.categoria.trim() === "") ||
      (produto.preco !== undefined && produto.preco <= 0)
    ) {
      return {
        sucesso: false,
        mensagem: "Dados do produto inválidos",
      }
    }

    setProdutos(produtos.map((p) => (p.id === id ? { ...p, ...produto } : p)))

    return { sucesso: true, mensagem: "Produto atualizado com sucesso" }
  }

  // Função para remover um produto
  const removerProduto = (id: number) => {
    const produtoExistente = produtos.find((p) => p.id === id)

    if (!produtoExistente) {
      return { sucesso: false, mensagem: "Produto não encontrado" }
    }

    setProdutos(produtos.filter((p) => p.id !== id))

    return { sucesso: true, mensagem: "Produto removido com sucesso" }
  }

  return (
    <ProdutosLocaisContext.Provider
      value={{
        produtos,
        adicionarProduto,
        atualizarProduto,
        removerProduto,
      }}
    >
      {children}
    </ProdutosLocaisContext.Provider>
  )
}

export function useProdutosLocais() {
  const context = useContext(ProdutosLocaisContext)
  if (context === undefined) {
    throw new Error("useProdutosLocais deve ser usado dentro de um ProdutosLocaisProvider")
  }
  return context
}
