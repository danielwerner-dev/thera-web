import { renderHook, act } from "@testing-library/react"
import { useAppContext } from "@/contexts/app-context"
import { AppProvider } from "@/contexts/app-context"
import { ProdutosLocaisProvider } from "@/contexts/produtos-locais-context"
import type { ReactNode } from "react"

// Mock para localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: jest.fn(() => {
      store = {}
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    length: 0,
    key: jest.fn((index: number) => ""),
  }
})()

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
})

// Mock para matchMedia
Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
  writable: true,
})

// Wrapper para os hooks
const wrapper = ({ children }: { children: ReactNode }) => (
  <ProdutosLocaisProvider>
    <AppProvider>{children}</AppProvider>
  </ProdutosLocaisProvider>
)

describe("useAppContext", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLocalStorage.clear()
  })

  it("deve fornecer o estado inicial correto", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    expect(result.current.tema).toBe("light")
    expect(result.current.filtros).toEqual({
      termoBusca: "",
      precoMinimo: 0,
      precoMaximo: 1000,
      ordenacao: "",
    })
    expect(result.current.paginacao.paginaAtual).toBe(1)
    expect(result.current.paginacao.itensPorPagina).toBe(6)
    expect(result.current.modalAberto).toBe(false)
    expect(result.current.produtoSelecionado).toBeNull()
  })

  it("deve alternar o tema corretamente", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    act(() => {
      result.current.alternarTema()
    })

    expect(result.current.tema).toBe("dark")
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("tema", "dark")

    act(() => {
      result.current.alternarTema()
    })

    expect(result.current.tema).toBe("light")
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("tema", "light")
  })

  it("deve atualizar filtros corretamente", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    act(() => {
      result.current.atualizarFiltros({
        termoBusca: "teste",
        precoMinimo: 100,
        precoMaximo: 500,
      })
    })

    expect(result.current.filtros.termoBusca).toBe("teste")
    expect(result.current.filtros.precoMinimo).toBe(100)
    expect(result.current.filtros.precoMaximo).toBe(500)
    expect(result.current.paginacao.paginaAtual).toBe(1) // Deve resetar para página 1
  })

  it("deve atualizar paginação corretamente", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    act(() => {
      result.current.atualizarPaginacao({
        paginaAtual: 2,
        itensPorPagina: 12,
      })
    })

    expect(result.current.paginacao.paginaAtual).toBe(2)
    expect(result.current.paginacao.itensPorPagina).toBe(12)
  })

  it("deve abrir e fechar o modal corretamente", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })
    const mockProduto = {
      id: 1,
      nome: "Produto Teste",
      categoria: "Teste",
      preco: 100,
      descricao: "Descrição teste",
      imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    }

    act(() => {
      result.current.abrirModal(mockProduto)
    })

    expect(result.current.modalAberto).toBe(true)
    expect(result.current.produtoSelecionado).toEqual(mockProduto)

    act(() => {
      result.current.fecharModal()
    })

    expect(result.current.modalAberto).toBe(false)
    expect(result.current.produtoSelecionado).toBeNull()
  })
})
