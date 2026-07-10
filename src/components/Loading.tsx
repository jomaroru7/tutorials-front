export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center text-slate-600 dark:text-slate-300">
      <div className="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-slate-200 border-t-slate-600" />
      <p className="mt-4 text-lg font-medium">Cargando contenido…</p>
    </div>
  )
}
