"use client"

import { useContext } from "react"
import { AppContext } from "./app-context-provider"

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider")
  }
  return context
}
