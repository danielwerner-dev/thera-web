"use client"

import { Suspense, lazy } from "react"
import { AppProvider } from "@/contexts/app-context"
import { ProdutosLocaisProvider } from "@/contexts/produtos-locais-context"
import Cabecalho from "@/components/cabecalho"
import FiltrosProdutos from "@/components/filtros-produtos"
import FiltrosMobile from "@/components/filtros-mobile"
import Rodape from "@/components/rodape"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Lazy loading para componentes pesados
const ListaProdutos = lazy(() => import("@/components/lista-produtos"))
const ModalProduto = lazy(() => import("@/components/modal-produto"))

export default function Home() {
  return (
    <ErrorBoundary fallback={<div className="p-8 text-center">Algo deu errado. Por favor, recarregue a página.</div>}>
      <ProdutosLocaisProvider>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Cabecalho />
            <main className="flex-grow bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
                  <div className="lg:col-span-1 hidden lg:block">
                    <FiltrosProdutos />
                  </div>
                  <div className="lg:col-span-3">
                    <FiltrosMobile />
                    <Suspense
                      fallback={
                        <div className="flex justify-center items-center py-12">
                          <LoadingSpinner size="lg" />
                        </div>
                      }
                    >
                      <ListaProdutos />
                    </Suspense>
                  </div>
                </div>
              </div>
            </main>
            <Rodape />
            <Suspense fallback={null}>
              <ModalProduto />
            </Suspense>
          </div>
        </AppProvider>
      </ProdutosLocaisProvider>
    </ErrorBoundary>
  )
}
