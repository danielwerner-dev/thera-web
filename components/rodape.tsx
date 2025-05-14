export default function Rodape() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {anoAtual} Catálogo de Produtos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
