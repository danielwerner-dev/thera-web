"use client"

import { useState } from "react"
import FiltrosProdutos from "./filtros-produtos"

export default function FiltrosMobile() {
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  return (
    <div className="lg:hidden mb-4">
      <button
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
        aria-expanded={mostrarFiltros}
        aria-controls="filtros-mobile-panel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        Filtros
      </button>
      {mostrarFiltros && (
        <div id="filtros-mobile-panel" className="mt-4">
          <FiltrosProdutos />
        </div>
      )}
    </div>
  )
}
