type ErrorMessageProps = {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-red-800 shadow-sm">
      <p className="font-semibold">Ha ocurrido un error</p>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  )
}
