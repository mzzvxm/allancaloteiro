export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-slate-800">404</h1>
          <h2 className="text-2xl font-semibold text-slate-600">Página não encontrada</h2>
        </div>
        <p className="text-lg text-slate-500 max-w-md mx-auto">
          Oops! A página que você está procurando não existe ou foi movida.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  )
}
