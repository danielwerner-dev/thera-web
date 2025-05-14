import type { Produto } from "@/types/produto"
import { validarProduto, sanitizarInput } from "@/lib/validacao"

// Interface para respostas de serviço
interface ServiceResponse<T = void> {
  sucesso: boolean
  mensagem: string
  dados?: T
}

// Classe de serviço para produtos
export class ProdutosService {
  private static STORAGE_KEY = "produtos"

  // Obter todos os produtos
  static async obterTodos(): Promise<ServiceResponse<Produto[]>> {
    try {
      const produtosJson = localStorage.getItem(this.STORAGE_KEY)
      const produtos = produtosJson ? JSON.parse(produtosJson) : []

      return {
        sucesso: true,
        mensagem: "Produtos obtidos com sucesso",
        dados: produtos,
      }
    } catch (error) {
      console.error("Erro ao obter produtos:", error)
      return {
        sucesso: false,
        mensagem: "Erro ao obter produtos",
      }
    }
  }

  // Obter produto por ID
  static async obterPorId(id: number): Promise<ServiceResponse<Produto>> {
    try {
      const { sucesso, dados: produtos } = await this.obterTodos()

      if (!sucesso || !produtos) {
        return {
          sucesso: false,
          mensagem: "Erro ao buscar produtos",
        }
      }

      const produto = produtos.find((p) => p.id === id)

      if (!produto) {
        return {
          sucesso: false,
          mensagem: "Produto não encontrado",
        }
      }

      return {
        sucesso: true,
        mensagem: "Produto obtido com sucesso",
        dados: produto,
      }
    } catch (error) {
      console.error("Erro ao obter produto por ID:", error)
      return {
        sucesso: false,
        mensagem: "Erro ao obter produto",
      }
    }
  }

  // Adicionar produto
  static async adicionar(produto: Omit<Produto, "id">): Promise<ServiceResponse<{ id: number }>> {
    try {
      // Sanitizar dados
      const produtoSanitizado = {
        ...produto,
        nome: sanitizarInput(produto.nome),
        categoria: sanitizarInput(produto.categoria),
        descricao: sanitizarInput(produto.descricao),
      }

      // Validar produto
      const { valido, erros } = validarProduto(produtoSanitizado)

      if (!valido) {
        return {
          sucesso: false,
          mensagem: `Erro ao adicionar produto: ${Object.values(erros).join(", ")}`,
        }
      }

      // Obter produtos existentes
      const { sucesso, dados: produtos } = await this.obterTodos()

      if (!sucesso || !produtos) {
        return {
          sucesso: false,
          mensagem: "Erro ao buscar produtos existentes",
        }
      }

      // Gerar novo ID
      const novoId = produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1

      // Criar novo produto
      const novoProduto = {
        ...produtoSanitizado,
        id: novoId,
      } as Produto

      // Adicionar à lista e salvar
      const novaLista = [...produtos, novoProduto]
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(novaLista))

      return {
        sucesso: true,
        mensagem: "Produto adicionado com sucesso",
        dados: { id: novoId },
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
      return {
        sucesso: false,
        mensagem: "Erro ao adicionar produto",
      }
    }
  }

  // Atualizar produto
  static async atualizar(id: number, produto: Partial<Produto>): Promise<ServiceResponse> {
    try {
      // Obter produto existente
      const { sucesso: sucessoBusca, dados: produtoExistente } = await this.obterPorId(id)

      if (!sucessoBusca || !produtoExistente) {
        return {
          sucesso: false,
          mensagem: "Produto não encontrado",
        }
      }

      // Sanitizar dados
      const produtoSanitizado = { ...produto }
      if (produto.nome) produtoSanitizado.nome = sanitizarInput(produto.nome)
      if (produto.categoria) produtoSanitizado.categoria = sanitizarInput(produto.categoria)
      if (produto.descricao) produtoSanitizado.descricao = sanitizarInput(produto.descricao)

      // Validar produto completo
      const produtoCompleto = { ...produtoExistente, ...produtoSanitizado }
      const { valido, erros } = validarProduto(produtoCompleto)

      if (!valido) {
        return {
          sucesso: false,
          mensagem: `Erro ao atualizar produto: ${Object.values(erros).join(", ")}`,
        }
      }

      // Obter todos os produtos
      const { sucesso: sucessoTodos, dados: produtos } = await this.obterTodos()

      if (!sucessoTodos || !produtos) {
        return {
          sucesso: false,
          mensagem: "Erro ao buscar produtos existentes",
        }
      }

      // Atualizar produto na lista
      const novaLista = produtos.map((p) => (p.id === id ? { ...p, ...produtoSanitizado } : p))

      // Salvar lista atualizada
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(novaLista))

      return {
        sucesso: true,
        mensagem: "Produto atualizado com sucesso",
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error)
      return {
        sucesso: false,
        mensagem: "Erro ao atualizar produto",
      }
    }
  }

  // Remover produto
  static async remover(id: number): Promise<ServiceResponse> {
    try {
      // Verificar se produto existe
      const { sucesso: sucessoBusca } = await this.obterPorId(id)

      if (!sucessoBusca) {
        return {
          sucesso: false,
          mensagem: "Produto não encontrado",
        }
      }

      // Obter todos os produtos
      const { sucesso: sucessoTodos, dados: produtos } = await this.obterTodos()

      if (!sucessoTodos || !produtos) {
        return {
          sucesso: false,
          mensagem: "Erro ao buscar produtos existentes",
        }
      }

      // Filtrar produto a ser removido
      const novaLista = produtos.filter((p) => p.id !== id)

      // Salvar lista atualizada
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(novaLista))

      return {
        sucesso: true,
        mensagem: "Produto removido com sucesso",
      }
    } catch (error) {
      console.error("Erro ao remover produto:", error)
      return {
        sucesso: false,
        mensagem: "Erro ao remover produto",
      }
    }
  }

  // Filtrar produtos
  static async filtrar(filtros: {
    termoBusca?: string
    precoMinimo?: number
    precoMaximo?: number
    categoria?: string
    ordenacao?: string
  }): Promise<ServiceResponse<Produto[]>> {
    try {
      // Obter todos os produtos
      const { sucesso, dados: produtos } = await this.obterTodos()

      if (!sucesso || !produtos) {
        return {
          sucesso: false,
          mensagem: "Erro ao buscar produtos",
        }
      }

      let produtosFiltrados = [...produtos]

      // Aplicar filtros
      if (filtros.termoBusca) {
        const termo = filtros.termoBusca.toLowerCase()
        produtosFiltrados = produtosFiltrados.filter(
          (produto) =>
            produto.nome.toLowerCase().includes(termo) ||
            produto.descricao.toLowerCase().includes(termo) ||
            produto.categoria.toLowerCase().includes(termo),
        )
      }

      if (filtros.categoria) {
        produtosFiltrados = produtosFiltrados.filter((produto) => produto.categoria === filtros.categoria)
      }

      if (filtros.precoMinimo !== undefined) {
        produtosFiltrados = produtosFiltrados.filter((produto) => produto.preco >= filtros.precoMinimo!)
      }

      if (filtros.precoMaximo !== undefined) {
        produtosFiltrados = produtosFiltrados.filter((produto) => produto.preco <= filtros.precoMaximo!)
      }

      // Aplicar ordenação
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

      return {
        sucesso: true,
        mensagem: "Produtos filtrados com sucesso",
        dados: produtosFiltrados,
      }
    } catch (error) {
      console.error("Erro ao filtrar produtos:", error)
      return {
        sucesso: false,
        mensagem: "Erro ao filtrar produtos",
      }
    }
  }
}
