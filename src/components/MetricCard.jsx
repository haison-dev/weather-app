export default function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-neutral-800/70 px-4 py-4 text-neutral-0">
      <p className="text-xs uppercase tracking-widest text-neutral-300">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  )
}