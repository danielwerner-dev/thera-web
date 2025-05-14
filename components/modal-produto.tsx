"use client"

import { useAppContext } from "@/contexts/app-context"
import { useEffect, useState, useRef, useCallback } from "react"
import SemImagem from "./sem-imagem"
import { Button } from "@/components/ui/button"
import { formatarMoeda } from "@/lib/utils"

export default function ModalProduto() {
  const { produtoSelecionado, modalAberto, fecharModal } = useAppContext()
  const [imagemErro, setImagemErro] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleImagemErro = useCallback(() => {
    if (produtoSelecionado) {
      console.log("Erro ao carregar imagem no modal:", produtoSelecionado.imagem)
    }
    setImagemErro(true)
  }, [produtoSelecionado])

  // Fechar o modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fecharModal()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [fecharModal])

  // Fechar o modal ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        fecharModal()
      }
    }

    if (modalAberto) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [modalAberto, fecharModal])

  // Impedir o scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (modalAberto) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [modalAberto])

  // Resetar o estado de erro da imagem quando o produto selecionado mudar
  useEffect(() => {
    setImagemErro(false)
  }, [produtoSelecionado])

  if (!modalAberto || !produtoSelecionado) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="modal-titulo" className="text-xl font-semibold text-gray-800 dark:text-white">
            {produtoSelecionado.nome}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={fecharModal}
            aria-label="Fechar modal"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(90vh - 120px)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              {produtoSelecionado.imagem && !imagemErro ? (
                <img
                  src={produtoSelecionado.imagem || "/placeholder.svg"}
                  alt={produtoSelecionado.nome}
                  className="w-full h-full object-cover"
                  onError={handleImagemErro}
                  loading="lazy"
                />
              ) : (
                <SemImagem />
              )}
            </div>
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Categoria</h3>
                <p className="text-base text-gray-800 dark:text-white">{produtoSelecionado.categoria}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Preço</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatarMoeda(produtoSelecionado.preco)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</h3>
                <p className="text-base text-gray-800 dark:text-white">{produtoSelecionado.descricao}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <Button variant="secondary" onClick={fecharModal}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}
