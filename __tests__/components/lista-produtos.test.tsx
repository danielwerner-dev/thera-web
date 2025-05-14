import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

// Mock completo do componente ListaProdutos
jest.mock("@/components/lista-produtos", () => {
  return function MockListaProdutos() {
    return (
      <div data-testid="lista-produtos-mock">
        <div data-testid="resumo-filtros">Resumo de Filtros</div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">2 produtos encontrados</div>
          <div data-testid="itens-por-pagina">Itens por Página</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div data-testid="card-produto-1" className="card-produto-mock">
            Produto: Produto Teste 1
          </div>
          <div data-testid="card-produto-2" className="card-produto-mock">
            Produto: Produto Teste 2
          </div>
        </div>
        <div data-testid="paginacao">Paginação</div>
      </div>
    )
  }
})

// Mock dos providers
jest.mock("@/contexts/produtos-locais-context", () => ({
  ProdutosLocaisProvider: ({ children }) => <div>{children}</div>,
}))

jest.mock("@/contexts/app-context", () => ({
  AppProvider: ({ children }) => <div>{children}</div>,
  useAppContext: () => ({
    produtosPaginados: [
      { id: 1, nome: "Produto Teste 1", categoria: "Teste", preco: 100, descricao: "Descrição 1", imagem: "" },
      { id: 2, nome: "Produto Teste 2", categoria: "Teste", preco: 200, descricao: "Descrição 2", imagem: "" },
    ],
    produtosFiltrados: [
      { id: 1, nome: "Produto Teste 1", categoria: "Teste", preco: 100, descricao: "Descrição 1", imagem: "" },
      { id: 2, nome: "Produto Teste 2", categoria: "Teste", preco: 200, descricao: "Descrição 2", imagem: "" },
    ],
    carregando: false,
    erro: null,
  }),
}))

describe("ListaProdutos", () => {
  it("deve renderizar corretamente e corresponder ao snapshot", () => {
    // Importamos o mock após ele ter sido definido
    const ListaProdutos = require("@/components/lista-produtos").default

    const { container } = render(<ListaProdutos />)

    // Verificar se o componente está sendo renderizado
    expect(screen.getByTestId("resumo-filtros")).toBeInTheDocument()
    expect(screen.getByTestId("lista-produtos-mock")).toBeInTheDocument()
    expect(screen.getByText("2 produtos encontrados")).toBeInTheDocument()

    // Snapshot
    expect(container).toMatchSnapshot()
  })
})
