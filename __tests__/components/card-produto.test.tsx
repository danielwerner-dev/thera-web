import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import CardProduto from "@/components/card-produto"
import { useAppContext } from "@/contexts/app-context"

// Mock do contexto
jest.mock("@/contexts/app-context", () => ({
  useAppContext: jest.fn(),
}))

// Mock do componente SemImagem
jest.mock("@/components/sem-imagem", () => {
  return function MockSemImagem() {
    return <div data-testid="sem-imagem">Sem Imagem</div>
  }
})

describe("CardProduto", () => {
  const mockAbrirModal = jest.fn()
  const mockProduto = {
    id: 1,
    nome: "Produto Teste",
    categoria: "Categoria Teste",
    preco: 99.99,
    descricao: "Descrição do produto teste",
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  }

  beforeEach(() => {
    // Configurar o mock do useAppContext
    ;(useAppContext as jest.Mock).mockReturnValue({
      abrirModal: mockAbrirModal,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("deve renderizar corretamente com imagem", () => {
    render(<CardProduto produto={mockProduto} />)

    expect(screen.getByText(mockProduto.nome)).toBeInTheDocument()
    expect(screen.getByText(mockProduto.categoria)).toBeInTheDocument()
    expect(screen.getByText("Ver detalhes")).toBeInTheDocument()

    // Verificar se a imagem está sendo renderizada
    const imagem = screen.getByAltText(mockProduto.nome)
    expect(imagem).toBeInTheDocument()
    expect(imagem).toHaveAttribute("src", mockProduto.imagem)
  })

  it("deve renderizar o componente SemImagem quando não há imagem", () => {
    const produtoSemImagem = { ...mockProduto, imagem: "" }
    render(<CardProduto produto={produtoSemImagem} />)

    expect(screen.getByTestId("sem-imagem")).toBeInTheDocument()
  })

  it("deve chamar abrirModal quando o botão 'Ver detalhes' é clicado", () => {
    render(<CardProduto produto={mockProduto} />)

    const botaoVerDetalhes = screen.getByText("Ver detalhes")
    fireEvent.click(botaoVerDetalhes)

    expect(mockAbrirModal).toHaveBeenCalledWith(mockProduto)
  })

  it("deve mostrar o componente SemImagem quando ocorre erro ao carregar a imagem", () => {
    render(<CardProduto produto={mockProduto} />)

    // Simular erro de carregamento da imagem
    const imagem = screen.getByAltText(mockProduto.nome)
    fireEvent.error(imagem)

    expect(screen.getByTestId("sem-imagem")).toBeInTheDocument()
  })
})
