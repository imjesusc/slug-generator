export function GroupSlugsCardSkeleton({ length = 6 }: { length?: number }) {
  return (
    <div className="grid tablet:grid-cols-3 gap-4">
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="h-[154px] rounded-md w-full animate-pulse bg-accent" />
      ))}
    </div>
  )
}
