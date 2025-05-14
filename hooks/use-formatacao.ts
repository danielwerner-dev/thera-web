export function useFormatacao() {
  // Formatar preço para moeda brasileira
  const formatarPreco = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  // Formatar data para formato brasileiro
  const formatarData = (data: Date | string): string => {
    const dataObj = typeof data === "string" ? new Date(data) : data
    return new Intl.DateTimeFormat("pt-BR").format(dataObj)
  }

  // Truncar texto com ellipsis
  const truncarTexto = (texto: string, tamanhoMaximo: number): string => {
    if (texto.length <= tamanhoMaximo) return texto
    return texto.slice(0, tamanhoMaximo) + "..."
  }

  // Formatar número com separador de milhares
  const formatarNumero = (numero: number): string => {
    return new Intl.NumberFormat("pt-BR").format(numero)
  }

  return {
    formatarPreco,
    formatarData,
    truncarTexto,
    formatarNumero,
  }
}
