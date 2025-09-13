import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function KpiCard({ icon, label, value, trend = 0 }) {
  const TrendIcon = trend >= 0 ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 dark:bg-neutral-900 dark:border-neutral-800">
      <div>
        <p className="text-sm text-neutral-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
        <div className={`mt-2 inline-flex items-center gap-1 text-xs ${trendColor}`}>
          <TrendIcon size={14} />
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="h-10 w-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
