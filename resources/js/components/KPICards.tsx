import React from "react";

export type KPICardsProps = {
  dateRange: { start: string; end: string };
  feedType: string;
  customer: string;
  sortBy: "revenue" | "quantity";
};

const KPICards: React.FC<KPICardsProps> = ({ dateRange, feedType, customer, sortBy }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "25px", marginTop: "20px" }}>
      <div style={{ background: "#22C55E", color: "white", padding: "20px", borderRadius: "12px" }}>Total Sales</div>
      <div style={{ background: "#3B82F6", color: "white", padding: "20px", borderRadius: "12px" }}>Total Revenue</div>
      <div style={{ background: "#F59E0B", color: "white", padding: "20px", borderRadius: "12px" }}>Top Feed</div>
      <div style={{ background: "#B91C1C", color: "white", padding: "20px", borderRadius: "12px" }}>Top Customer</div>
    </div>
  );
};

export default KPICards;