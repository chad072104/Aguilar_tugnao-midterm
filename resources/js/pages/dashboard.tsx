import KPICards from "../components/KPICards";
import FeedBarChart from "../components/FeedBarChart";
import SalesLineChart from "../components/SalesLineChart";
import ProductionGroupBar from "../components/ProductionGroupBar";
import RevenueDonutChart from "../components/RevenueDonutChart";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Feed Production Dashboard</h1>

      <KPICards
  dateRange={{ start: "2026-01-01", end: "2026-12-31" }}
  feedType="all"
  customer="all"
  sortBy="revenue"
/>
      <h2>Feed Sales</h2>
      <FeedBarChart />

      <h2>Monthly Sales</h2>
      <SalesLineChart />

      <h2>Production vs Planned</h2>
      <ProductionGroupBar />

      <h2>Revenue Distribution</h2>
      <RevenueDonutChart />
    </div>
  );
}