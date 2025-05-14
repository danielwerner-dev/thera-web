import { NextResponse } from "next/server"
import type { Produto } from "../../../types/produto"

// Dados de produtos
const produtos: Produto[] = [
  {
    id: 1,
    nome: "Smartphone XYZ",
    categoria: "Eletrônicos",
    preco: 1299.99,
    descricao: "Smartphone de última geração com câmera de alta resolução e processador rápido.",
    imagem: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2942&auto=format&fit=crop",
  },
  {
    id: 2,
    nome: "Notebook Ultra",
    categoria: "Informática",
    preco: 4500,
    descricao: "Notebook leve e potente para trabalho e entretenimento.",
    imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop",
  },
  {
    id: 3,
    nome: "Tênis Esportivo",
    categoria: "Esportes",
    preco: 299.9,
    descricao: "Tênis confortável para corrida e atividades físicas.",
    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 4,
    nome: "Cafeteira Elétrica",
    categoria: "Eletrodomésticos",
    preco: 189.9,
    descricao: "Cafeteira com timer programável e sistema antigotejamento.",
    imagem: "https://images.unsplash.com/photo-1520970519539-8c9eaad9e8fa?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 5,
    nome: "Fone de Ouvido Bluetooth",
    categoria: "Eletrônicos",
    preco: 159.9,
    descricao: "Fone sem fio com cancelamento de ruído e bateria de longa duração.",
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 6,
    nome: "Mochila para Notebook",
    categoria: "Acessórios",
    preco: 149.9,
    descricao: "Mochila resistente à água com compartimento acolchoado para notebook.",
    imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2787&auto=format&fit=crop",
  },
  {
    id: 7,
    nome: "Smart TV 4K",
    categoria: "Eletrônicos",
    preco: 2799.9,
    descricao: "Smart TV com resolução 4K, HDR e sistema operacional intuitivo.",
    imagem: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 8,
    nome: "Cadeira de Escritório",
    categoria: "Móveis",
    preco: 599.9,
    descricao: "Cadeira ergonômica com ajuste de altura e apoio lombar.",
    imagem: "https://images.unsplash.com/photo-1505843490701-5be5d1b31a89?q=80&w=2787&auto=format&fit=crop",
  },
  {
    id: 9,
    nome: "Relógio Inteligente",
    categoria: "Eletrônicos",
    preco: 499.9,
    descricao: "Smartwatch com monitor cardíaco, GPS e notificações.",
    imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2799&auto=format&fit=crop",
  },
  {
    id: 10,
    nome: "Câmera Digital",
    categoria: "Eletrônicos",
    preco: 1899.9,
    descricao: "Câmera com sensor de alta resolução e gravação em 4K.",
    imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2938&auto=format&fit=crop",
  },
  {
    id: 11,
    nome: "Liquidificador Potente",
    categoria: "Eletrodomésticos",
    preco: 149.9,
    descricao: "Liquidificador com múltiplas velocidades e lâminas de aço inoxidável.",
    imagem: "https://images.unsplash.com/photo-1659536009108-ebe9053222d4?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 12,
    nome: "Teclado Mecânico",
    categoria: "Informática",
    preco: 349.9,
    descricao: "Teclado mecânico com iluminação RGB e switches de alta durabilidade.",
    imagem: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 13,
    nome: "Mouse Gamer",
    categoria: "Informática",
    preco: 199.9,
    descricao: "Mouse com sensor de alta precisão e botões programáveis.",
    imagem: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=2865&auto=format&fit=crop",
  },
  {
    id: 14,
    nome: "Caixa de Som Bluetooth",
    categoria: "Eletrônicos",
    preco: 299.9,
    descricao: "Caixa de som portátil à prova d'água com bateria de longa duração.",
    imagem: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2936&auto=format&fit=crop",
  },
  {
    id: 15,
    nome: "Fritadeira Elétrica",
    categoria: "Eletrodomésticos",
    preco: 399.9,
    descricao: "Fritadeira sem óleo com controle digital de temperatura.",
    imagem: "https://images.unsplash.com/photo-1648505091248-f7b30c7aa5cc?q=80&w=2787&auto=format&fit=crop",
  },
  {
    id: 16,
    nome: "Mala de Viagem",
    categoria: "Acessórios",
    preco: 349.9,
    descricao: "Mala resistente com rodas giratórias e fechadura TSA.",
    imagem: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 17,
    nome: "Ventilador de Mesa",
    categoria: "Eletrodomésticos",
    preco: 129.9,
    descricao: "Ventilador silencioso com múltiplas velocidades e oscilação.",
    imagem: "https://images.unsplash.com/photo-1575344488972-8a1b2c645d23?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 18,
    nome: "Panela Elétrica",
    categoria: "Eletrodomésticos",
    preco: 249.9,
    descricao: "Panela multifuncional com programas pré-definidos.",
    imagem: "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=2787&auto=format&fit=crop",
  },
  {
    id: 19,
    nome: "Bicicleta Urbana",
    categoria: "Esportes",
    preco: 899.9,
    descricao: "Bicicleta leve e resistente para deslocamento urbano.",
    imagem: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 20,
    nome: "Headset Gamer",
    categoria: "Informática",
    preco: 279.9,
    descricao: "Headset com som surround e microfone com cancelamento de ruído.",
    imagem: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=2940&auto=format&fit=crop",
  },
]

export async function GET(request: Request) {
  // Simular um pequeno atraso para mostrar o estado de carregamento
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Obter parâmetros da URL
  const { searchParams } = new URL(request.url)
  const termoBusca = searchParams.get("termo") || ""
  const precoMinimo = Number(searchParams.get("precoMin")) || 0
  const precoMaximo = Number(searchParams.get("precoMax")) || 10000
  const ordenacao = searchParams.get("ordenacao") || ""
  const pagina = Number(searchParams.get("pagina")) || 1
  const itensPorPagina = Number(searchParams.get("itensPorPagina")) || 6

  // Filtrar produtos
  let produtosFiltrados = [...produtos]

  // Filtro por termo de busca
  if (termoBusca) {
    const termo = termoBusca.toLowerCase()
    produtosFiltrados = produtosFiltrados.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo),
    )
  }

  // Filtro por preço
  produtosFiltrados = produtosFiltrados.filter(
    (produto) => produto.preco >= precoMinimo && produto.preco <= precoMaximo,
  )

  // Ordenação
  if (ordenacao) {
    produtosFiltrados.sort((a, b) => {
      switch (ordenacao) {
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

  // Paginação
  const totalItens = produtosFiltrados.length
  const totalPaginas = Math.ceil(totalItens / itensPorPagina)
  const inicio = (pagina - 1) * itensPorPagina
  const fim = inicio + itensPorPagina
  const produtosPaginados = produtosFiltrados.slice(inicio, fim)

  return NextResponse.json({
    produtos: produtosPaginados,
    paginacao: {
      pagina,
      itensPorPagina,
      totalItens,
      totalPaginas,
    },
  })
}
