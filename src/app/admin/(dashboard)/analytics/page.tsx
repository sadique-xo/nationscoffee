"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2, TrendingUp, TrendingDown, IndianRupee, Users, ShoppingBag, Clock, Activity, XCircle } from "lucide-react";

interface Summary {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  totalCustomers: number;
}

interface TodayInsights {
  orders: number;
  revenue: number;
  avgOrderValue: number;
  customers: number;
  active: number;
  cancelled: number;
}

interface DailyData {
  date: string;
  orders: number;
  revenue: number;
}

interface TopItem {
  name: string;
  quantity: number;
  revenue: number;
}

interface HourlyData {
  hour: string;
  orders: number;
}

type DateRange = "7" | "30" | "90";

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>("7");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary>({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    totalCustomers: 0,
  });
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [topItems, setTopItems] = useState<TopItem[]>([]);
  const [today, setToday] = useState<TodayInsights>({
    orders: 0, revenue: 0, avgOrderValue: 0, customers: 0, active: 0, cancelled: 0,
  });
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      const res = await fetch(`/api/admin/analytics?days=${range}`);
      if (res.ok) {
        const data = await res.json();
        setSummary(data.summary);
        setToday(data.today);
        setDailyData(data.dailyData);
        setTopItems(data.topItems);
        setHourlyData(data.hourlyData);
      }
      setLoading(false);
    }
    fetchAnalytics();
  }, [range]);

  const rangeOptions: { key: DateRange; label: string }[] = [
    { key: "7", label: "Last 7 days" },
    { key: "30", label: "Last 30 days" },
    { key: "90", label: "Last 3 months" },
  ];

  // Format date labels
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brew-green" />
      </div>
    );
  }

  // Find max item quantity for bar width calculation
  const maxQuantity = topItems.length > 0 ? topItems[0].quantity : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      {/* Header + Range selector */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl text-brew-text">Analytics</h1>
        <div className="flex gap-1 bg-brew-cream rounded-lg p-1">
          {rangeOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setRange(opt.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                range === opt.key
                  ? "bg-white text-brew-text shadow-sm"
                  : "text-brew-text-muted hover:text-brew-text"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Total Revenue"
          value={`₹${summary.totalRevenue.toLocaleString("en-IN")}`}
          icon={<IndianRupee className="w-4 h-4" />}
          trend={summary.totalRevenue > 0 ? "up" : undefined}
        />
        <StatCard
          title="Total Orders"
          value={String(summary.totalOrders)}
          icon={<ShoppingBag className="w-4 h-4" />}
          trend={summary.totalOrders > 0 ? "up" : undefined}
        />
        <StatCard
          title="Avg. Order Value"
          value={`₹${summary.avgOrderValue}`}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          title="Customers"
          value={String(summary.totalCustomers)}
          icon={<Users className="w-4 h-4" />}
        />
      </div>

      {/* Today's Insights */}
      <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
        <div className="mb-4">
          <h2 className="font-semibold text-brew-text text-sm">Today&apos;s Insights</h2>
          <p className="text-xs text-brew-text-muted">Real-time snapshot for today</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <MiniStat
            label="Orders"
            value={String(today.orders)}
            icon={<ShoppingBag className="w-3.5 h-3.5" />}
            color="green"
          />
          <MiniStat
            label="Revenue"
            value={`₹${today.revenue.toLocaleString("en-IN")}`}
            icon={<IndianRupee className="w-3.5 h-3.5" />}
            color="green"
          />
          <MiniStat
            label="Avg. Value"
            value={`₹${today.avgOrderValue}`}
            icon={<TrendingUp className="w-3.5 h-3.5" />}
            color="blue"
          />
          <MiniStat
            label="Customers"
            value={String(today.customers)}
            icon={<Users className="w-3.5 h-3.5" />}
            color="blue"
          />
          <MiniStat
            label="Active"
            value={String(today.active)}
            icon={<Activity className="w-3.5 h-3.5" />}
            color="orange"
          />
          <MiniStat
            label="Cancelled"
            value={String(today.cancelled)}
            icon={<XCircle className="w-3.5 h-3.5" />}
            color="red"
          />
        </div>
      </div>

      {/* Revenue chart (Area) */}
      <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
        <div className="mb-4">
          <h2 className="font-semibold text-brew-text text-sm">Revenue</h2>
          <p className="text-xs text-brew-text-muted">Daily revenue over time</p>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D6" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 11, fill: "#5A5A5A" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `₹${v}`}
                tick={{ fontSize: 11, fill: "#5A5A5A" }}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip
                formatter={(value: number) => [`₹${value}`, "Revenue"]}
                labelFormatter={formatDate}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E8E2D6",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4CAF50"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders per day (Bar) */}
      <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
        <div className="mb-4">
          <h2 className="font-semibold text-brew-text text-sm">Orders per Day</h2>
          <p className="text-xs text-brew-text-muted">Daily order count</p>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D6" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 11, fill: "#5A5A5A" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#5A5A5A" }}
                axisLine={false}
                tickLine={false}
                width={30}
                allowDecimals={false}
              />
              <Tooltip
                formatter={(value: number) => [value, "Orders"]}
                labelFormatter={formatDate}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E8E2D6",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="orders" fill="#4CAF50" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Top selling items */}
        <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-brew-text text-sm">Top Selling Items</h2>
            <p className="text-xs text-brew-text-muted">By quantity sold</p>
          </div>
          {topItems.length === 0 ? (
            <p className="text-sm text-brew-text-muted text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {topItems.map((item, i) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-brew-text truncate flex-1 mr-3">
                      {i + 1}. {item.name}
                    </span>
                    <span className="text-xs text-brew-text-muted shrink-0">
                      {item.quantity} sold • ₹{item.revenue}
                    </span>
                  </div>
                  <div className="h-2 bg-brew-cream rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brew-green rounded-full transition-all"
                      style={{ width: `${(item.quantity / maxQuantity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Peak hours */}
        <div className="bg-white rounded-2xl border border-brew-border/50 p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-brew-text text-sm">Peak Hours</h2>
            <p className="text-xs text-brew-text-muted">Orders by hour of day</p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData.filter((h) => h.orders > 0 || parseInt(h.hour) >= 8 && parseInt(h.hour) <= 23)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D6" vertical={false} />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 10, fill: "#5A5A5A" }}
                  axisLine={false}
                  tickLine={false}
                  interval={1}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#5A5A5A" }}
                  axisLine={false}
                  tickLine={false}
                  width={20}
                  allowDecimals={false}
                />
                <Tooltip
                  formatter={(value: number) => [value, "Orders"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E8E2D6",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="orders" fill="#FF6B35" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mini Stat (Today's Insights) ────────────────────────────
function MiniStat({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: "green" | "blue" | "orange" | "red";
}) {
  const colorMap = {
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-500",
  };

  return (
    <div className="flex items-center gap-3 rounded-xl bg-brew-cream/50 px-3.5 py-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-brew-text leading-tight">{value}</p>
        <p className="text-[10px] text-brew-text-muted">{label}</p>
      </div>
    </div>
  );
}

// ─── Stat Card Component ─────────────────────────────────────
function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
}) {
  return (
    <div className="bg-white rounded-xl border border-brew-border/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-brew-text-muted">{title}</span>
        <span className="text-brew-text-muted/50">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-brew-text">{value}</p>
      {trend && (
        <div className="flex items-center gap-1 mt-1">
          {trend === "up" ? (
            <TrendingUp className="w-3 h-3 text-green-600" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500" />
          )}
          <span
            className={`text-[10px] font-medium ${
              trend === "up" ? "text-green-600" : "text-red-500"
            }`}
          >
            {trend === "up" ? "Trending up" : "Trending down"}
          </span>
        </div>
      )}
    </div>
  );
}
