export default function ErrorMessage({ children }) {
  return (
    <div className="h-[20px] text-sm font-bold text-destructive">
      {children}
    </div>
  )
}
