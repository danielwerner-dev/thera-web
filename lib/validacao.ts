import type { Produto } from "@/types/produto"

export function validarProduto(produto: Partial<Produto>): { valido: boolean; erros: Record<string, string> } {
  const erros: Record<string, string> = {}

  // Validar nome
  if (!produto.nome) {
    erros.nome = "O nome do produto é obrigatório"
  } else if (produto.nome.length < 3) {
    erros.nome = "O nome deve ter pelo menos 3 caracteres"
  } else if (produto.nome.length > 100) {
    erros.nome = "O nome deve ter no máximo 100 caracteres"
  }

  // Validar categoria
  if (!produto.categoria) {
    erros.categoria = "A categoria é obrigatória"
  }

  // Validar preço
  if (produto.preco === undefined || produto.preco === null) {
    erros.preco = "O preço é obrigatório"
  } else if (isNaN(produto.preco)) {
    erros.preco = "O preço deve ser um número"
  } else if (produto.preco < 0) {
    erros.preco = "O preço não pode ser negativo"
  } else if (produto.preco > 1000000) {
    erros.preco = "O preço é muito alto"
  }

  // Validar descrição
  if (!produto.descricao) {
    erros.descricao = "A descrição é obrigatória"
  } else if (produto.descricao.length < 10) {
    erros.descricao = "A descrição deve ter pelo menos 10 caracteres"
  } else if (produto.descricao.length > 1000) {
    erros.descricao = "A descrição deve ter no máximo 1000 caracteres"
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
  }
}

export function sanitizarInput(input: string): string {
  // Remover tags HTML e caracteres especiais
  return input
    .replace(/<[^>]*>?/gm, "")
    .replace(/[<>]/g, "")
    .trim()
}
