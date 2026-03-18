// welcome.tsx - Fully Dynamic Dashboard with Drill-Down & Full Interaction Design
import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ===== Sample Raw Data ===== */
const rawFeedData = [
  { feed: "Starter", sales: 400, customer: "Customer A", date: "2026-03-01", stock: 120 },
  { feed: "Grower", sales: 600, customer: "Customer B", date: "2026-03-02", stock: 50 },
  { feed: "Finisher", sales: 350, customer: "Customer C", date: "2026-03-03", stock: 30 },
  { feed: "Starter", sales: 450, customer: "Customer B", date: "2026-03-05", stock: 80 },
  { feed: "Grower", sales: 500, customer: "Customer A", date: "2026-03-06", stock: 60 },
  { feed: "Finisher", sales: 300, customer: "Customer C", date: "2026-03-07", stock: 20 },
];

/* ===== KPI Cards Component ===== */
type KPICardsProps = {
  feedData: typeof rawFeedData;
  drillFeed?: string | null;
};

const KPICards: React.FC<KPICardsProps> = ({ feedData, drillFeed }) => {
  const totalSales = feedData.reduce((acc, d) => acc + d.sales, 0);
  const totalRevenue = totalSales * 10;
  const topFeed = feedData.reduce((prev, curr) => (prev.sales > curr.sales ? prev : curr), { feed: "", sales: 0 });
  const topCustomer = feedData.reduce((prev, curr) => (prev.sales > curr.sales ? prev : curr), { customer: "", sales: 0 });

  // Low-stock alert count
  const lowStockItems = feedData.filter((d) => d.stock < 40).length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "25px", marginTop: "20px" }}>
      <div style={{ background: "#22C55E", color: "white", padding: "20px", borderRadius: "12px" }}>
        Total Sales: {totalSales} {drillFeed && `(Feed: ${drillFeed})`}
      </div>
      <div style={{ background: "#3B82F6", color: "white", padding: "20px", borderRadius: "12px" }}>
        Total Revenue: {totalRevenue}
      </div>
      <div style={{ background: "#F59E0B", color: "white", padding: "20px", borderRadius: "12px" }}>
        Top Feed: {topFeed.feed}
      </div>
      <div style={{ background: "#B91C1C", color: "white", padding: "20px", borderRadius: "12px" }}>
        Top Customer: {topCustomer.customer}
      </div>
      <div style={{ background: "#EF4444", color: "white", padding: "20px", borderRadius: "12px" }}>
        Low Stock Alerts: {lowStockItems}
      </div>
    </div>
  );
};

/* ===== Feed Sales Bar Chart ===== */
type FeedBarChartProps = {
  feedData: typeof rawFeedData;
  sortBy: "revenue" | "quantity";
  drillFeed?: string | null;
  onFeedClick?: (feed: string) => void;
};

const FeedBarChart: React.FC<FeedBarChartProps> = ({ feedData, sortBy, drillFeed, onFeedClick }) => {
  const aggregated = feedData.reduce<{ feed: string; sales: number }[]>((acc, d) => {
    const found = acc.find((a) => a.feed === d.feed);
    if (found) found.sales += d.sales;
    else acc.push({ feed: d.feed, sales: d.sales });
    return acc;
  }, []);

  const sortedData = [...aggregated].sort((a, b) => (sortBy === "revenue" ? b.sales - a.sales : 0));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={sortedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="feed" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="sales"
          fill="#22C55E"
          cursor="pointer"
          onClick={(data: any) => {
            if (onFeedClick && data?.payload) onFeedClick(data.payload.feed);
          }}
        >
          {sortedData.map((entry, index) => (
            <Cell key={index} fill={drillFeed === entry.feed ? "#B91C1C" : "#22C55E"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

/* ===== Sales Line Chart ===== */
type SalesLineChartProps = { showForecast: boolean };
const SalesLineChart: React.FC<SalesLineChartProps> = ({ showForecast }) => {
  const salesData = [
    { month: "Jan", actual: 400, forecast: 420 },
    { month: "Feb", actual: 600, forecast: 580 },
    { month: "Mar", actual: 500, forecast: 520 },
  ];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="actual" stroke="#B91C1C" />
        {showForecast && <Line type="monotone" dataKey="forecast" stroke="#FBBF24" strokeDasharray="5 5" />}
      </LineChart>
    </ResponsiveContainer>
  );
};

/* ===== Production vs Planned Chart ===== */
type ProductionGroupBarProps = { feedData: typeof rawFeedData };
const ProductionGroupBar: React.FC<ProductionGroupBarProps> = ({ feedData }) => {
  const aggregated = feedData.reduce<{ feed: string; planned: number; actual: number }[]>((acc, d) => {
    const found = acc.find((a) => a.feed === d.feed);
    if (found) found.actual += d.sales;
    else acc.push({ feed: d.feed, planned: d.sales + 50, actual: d.sales });
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={aggregated}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="feed" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="planned" fill="#3B82F6" />
        <Bar dataKey="actual" fill="#22C55E" />
      </BarChart>
    </ResponsiveContainer>
  );
};

/* ===== Revenue Donut Chart ===== */
type RevenueDonutChartProps = { feedData: typeof rawFeedData };
const RevenueDonutChart: React.FC<RevenueDonutChartProps> = ({ feedData }) => {
  const revenueData = feedData.reduce<{ name: string; value: number }[]>((acc, d) => {
    const found = acc.find((a) => a.name === d.feed);
    if (found) found.value += d.sales * 10;
    else acc.push({ name: d.feed, value: d.sales * 10 });
    return acc;
  }, []);

  const COLORS = ["#22C55E", "#3B82F6", "#F87171"];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={revenueData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
          {revenueData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

/* ===== Dashboard Component ===== */
export default function Dashboard() {
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" });
  const [selectedFeed, setSelectedFeed] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState("All");
  const [sortBy, setSortBy] = useState<"revenue" | "quantity">("revenue");
  const [showForecast, setShowForecast] = useState(true);
  const [drillFeed, setDrillFeed] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto refresh simulation every 10 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      console.log("Auto-refresh triggered"); // In real case, re-fetch data
    }, 10000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredFeedData = rawFeedData.filter((d) => {
    const dateMatch =
      dateRange.start && dateRange.end
        ? new Date(d.date) >= new Date(dateRange.start) && new Date(d.date) <= new Date(dateRange.end)
        : true;
    const feedMatch = drillFeed ? d.feed === drillFeed : selectedFeed === "All" ? true : d.feed === selectedFeed;
    const customerMatch = selectedCustomer === "All" ? true : d.customer === selectedCustomer;
    return dateMatch && feedMatch && customerMatch;
  });

  const cardStyle = (borderColor: string) => ({
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    borderTop: `5px solid ${borderColor}`,
    transition: "all 0.3s ease",
    cursor: "pointer",
  });

  const handleHover = (e: React.MouseEvent<HTMLDivElement>, up = true) => {
    (e.currentTarget as HTMLDivElement).style.transform = up ? "translateY(-6px)" : "translateY(0)";
  };

  return (
    <div style={{ padding: "30px", background: "#F1F5F9", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#166534,#B91C1C)", padding: "40px", borderRadius: "20px", color: "white", marginBottom: "30px", boxShadow: "0 12px 30px rgba(0,0,0,0.2)" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "10px", letterSpacing: "1px" }}>Feed Production Dashboard</h1>
        <p style={{ fontSize: "15px", opacity: 0.9, maxWidth: "600px" }}>Real-time monitoring of poultry feed production, sales performance, and revenue insights.</p>
        <div style={{ marginTop: "15px", width: "100px", height: "4px", borderRadius: "10px", background: "linear-gradient(90deg,#22C55E,#F87171)" }} />
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
        <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} style={{ padding: "8px", borderRadius: "8px" }} />
        <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} style={{ padding: "8px", borderRadius: "8px" }} />

        <select value={selectedFeed} onChange={(e) => { setSelectedFeed(e.target.value); setDrillFeed(null); }} style={{ padding: "8px", borderRadius: "8px" }}>
          <option value="All">All Feeds</option>
          <option value="Starter">Starter</option>
          <option value="Grower">Grower</option>
          <option value="Finisher">Finisher</option>
        </select>

        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} style={{ padding: "8px", borderRadius: "8px" }}>
          <option value="All">All Customers</option>
          <option value="Customer A"> Manokan ni Chad</option>
          <option value="Customer B"> Charise sari-sari store</option>
          <option value="Customer C"> Sab Feed Retailer</option>
          <option value="Customer D"> Tindahan ni Mang Jassel</option>
          <option value="Customer E"> Hayag Feed Store </option>
          <option value="Customer E"> Coop ni Aling Jienie </option>
        </select>

        <button onClick={() => setSortBy(sortBy === "revenue" ? "quantity" : "revenue")} style={{ padding: "8px 12px", borderRadius: "8px", background: "#3B82F6", color: "white", border: "none", cursor: "pointer" }}>
          Sort by: {sortBy}
        </button>

        <button onClick={() => setShowForecast(!showForecast)} style={{ padding: "8px 12px", borderRadius: "8px", background: "#F59E0B", color: "white", border: "none", cursor: "pointer" }}>
          Forecast: {showForecast ? "On" : "Off"}
        </button>

        {drillFeed && (
          <button onClick={() => setDrillFeed(null)} style={{ padding: "8px 12px", borderRadius: "8px", background: "#EF4444", color: "white", border: "none", cursor: "pointer" }}>
            Back to All Feeds
          </button>
        )}

        <button onClick={() => setAutoRefresh(!autoRefresh)} style={{ padding: "8px 12px", borderRadius: "8px", background: "#6366F1", color: "white", border: "none", cursor: "pointer" }}>
          Auto Refresh: {autoRefresh ? "On" : "Off"}
        </button>

        <button onClick={() => window.print()} style={{ padding: "8px 12px", borderRadius: "8px", background: "#10B981", color: "white", border: "none", cursor: "pointer" }}>
          Export to PDF
        </button>
      </div>

      {/* KPI CARDS */}
      <KPICards feedData={filteredFeedData} drillFeed={drillFeed} />

      {/* CHART GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginTop: "30px" }}>
        <div style={cardStyle("#166534")} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
          <h3 style={{ marginBottom: "15px", color: "#166534" }}>Feed Sales Overview</h3>
          <FeedBarChart feedData={filteredFeedData} sortBy={sortBy} drillFeed={drillFeed} onFeedClick={setDrillFeed} />
        </div>

        <div style={cardStyle("#B91C1C")} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
          <h3 style={{ marginBottom: "15px", color: "#B91C1C" }}>Monthly Sales Trend</h3>
          <SalesLineChart showForecast={showForecast} />
        </div>

        <div style={cardStyle("#22C55E")} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
          <h3 style={{ marginBottom: "15px", color: "#22C55E" }}>Production vs Planned</h3>
          <ProductionGroupBar feedData={filteredFeedData} />
        </div>

        <div style={cardStyle("#F87171")} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
          <h3 style={{ marginBottom: "15px", color: "#F87171" }}>Revenue Distribution</h3>
          <RevenueDonutChart feedData={filteredFeedData} />
        </div>
      </div>
    </div>
  );
}