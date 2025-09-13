export default function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-xl border bg-white p-4 dark:bg-neutral-900 dark:border-neutral-800">
      <div className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>}
      </div>
      <div className="h-72">{children}</div>
    </div>
  );
}
