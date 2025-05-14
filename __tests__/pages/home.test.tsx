import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

// Mock dos componentes
jest.mock("@/components/lista-produtos", () => {
  return function MockListaProdutos() {
    return <div data-testid="lista-produtos-mock">Lista de Produtos</div>
  }
})

jest.mock("@/components/filtros-produtos", () => {
  return function MockFiltrosProdutos() {
    return <div data-testid="filtros-produtos-mock">Filtros de Produtos</div>
  }
})

jest.mock("@/components/filtros-mobile", () => {
  return function MockFiltrosMobile() {
    return <div data-testid="filtros-mobile-mock">Filtros Mobile</div>
  }
})

jest.mock("@/components/cabecalho", () => {
  return function MockCabecalho() {
    return <div data-testid="cabecalho-mock">Cabeçalho</div>
  }
})

jest.mock("@/components/rodape", () => {
  return function MockRodape() {
    return <div data-testid="rodape-mock">Rodapé</div>
  }
})

jest.mock("@/components/modal-produto", () => {
  return function MockModalProduto() {
    return null
  }
})

// Mock dos providers
jest.mock("@/contexts/produtos-locais-context", () => ({
  ProdutosLocaisProvider: ({ children }) => <div>{children}</div>,
}))

jest.mock("@/contexts/app-context", () => ({
  AppProvider: ({ children }) => <div>{children}</div>,
}))

// Mock da ErrorBoundary
jest.mock("@/components/error-boundary", () => ({
  ErrorBoundary: ({ children }) => <div>{children}</div>,
}))

describe("Página Home (Catálogo de Produtos)", () => {
  it("deve renderizar corretamente e corresponder ao snapshot", () => {
    // Importamos a página Home após os mocks terem sido definidos
    const Home = require("@/app/page").default

    const { container } = render(<Home />)

    // Verificar se os componentes principais estão sendo renderizados
    expect(screen.getByTestId("cabecalho-mock")).toBeInTheDocument()
    expect(screen.getByTestId("filtros-produtos-mock")).toBeInTheDocument()
    expect(screen.getByTestId("filtros-mobile-mock")).toBeInTheDocument()
    expect(screen.getByTestId("lista-produtos-mock")).toBeInTheDocument()
    expect(screen.getByTestId("rodape-mock")).toBeInTheDocument()

    // Snapshot
    expect(container).toMatchSnapshot()
  })
})
