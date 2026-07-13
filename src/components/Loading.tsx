export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center text-[var(--jm-muted)]">
      <div
        className="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4"
        style={{ borderColor: 'var(--jm-line)', borderTopColor: 'var(--jm-accent)' }}
      />
      <p className="mt-4 text-lg font-semibold">Cargando contenido…</p>
    </div>
  )
}
