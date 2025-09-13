export default function ActivityList({ title, items = [] }) {
  return (
    <div className="rounded-xl border bg-white p-4 dark:bg-neutral-900 dark:border-neutral-800">
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      <ul className="space-y-3">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium">{it.title}</p>
              <p className="text-xs text-neutral-500">{it.subtitle}</p>
            </div>
            <span className="text-xs text-neutral-500">{it.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
