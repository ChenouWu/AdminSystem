import { DollarSign, ShoppingCart, Users, Server } from "lucide-react";
import KpiCard from "./kpiCard";
import ChartCard from "./ChartCard";
import RevenueLineChart from "../Components/charts/RevenueLineChart";
import CategoryBarChart from "../Components/charts/CategoryBarChart";
import SourcePieChart from "../Components/charts/SourcePieChart";
import ActivityList from "./ActivityList.jsx";

export default function MainBoard() {
  const activities = [
    { title: "New user registered", subtitle: "woo56 · woo56@example.com", time: "2m ago" },
    { title: "Order #A1023 paid", subtitle: "Total $129.00 · VISA", time: "10m ago" },
    { title: "Low stock alert", subtitle: "SKU: ELEC-3321 · < 5 left", time: "30m ago" },
  ];

  return (
    <div className="space-y-4 p-4">
      {/* KPI Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Today's Orders"
          value="128"
          trend={+12}
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <KpiCard
          label="Total Revenue"
          value="$12,340"
          trend={+8}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <KpiCard
          label="Active Users"
          value="1,024"
          trend={-3}
          icon={<Users className="h-5 w-5" />}
        />
        <KpiCard
          label="Server Status"
          value="All Green"
          trend={+0}
          icon={<Server className="h-5 w-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Sales (Last 7 Days)">
          <RevenueLineChart />
        </ChartCard>
        <ChartCard title="Sales by Category">
          <CategoryBarChart />
        </ChartCard>
        <ChartCard title="User Source Distribution">
          <SourcePieChart />
        </ChartCard>

        {/* Recent Activity / Notifications */}
        <ActivityList title="Recent Activity / Notifications" items={activities} />
      </div>
    </div>
  );
}
