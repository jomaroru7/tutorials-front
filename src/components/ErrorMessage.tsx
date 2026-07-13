type ErrorMessageProps = {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="mx-auto max-w-3xl rounded-2xl border px-6 py-5 shadow-sm"
      style={{
        borderColor: 'var(--jm-danger-line)',
        backgroundColor: 'var(--jm-danger-bg)',
        color: 'var(--jm-danger-text)',
      }}
    >
      <p className="font-semibold">Ha ocurrido un error</p>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  )
}
