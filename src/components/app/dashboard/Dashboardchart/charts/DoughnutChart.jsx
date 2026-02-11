import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Static data for the chart
  const data = {
    labels: ["Events", "Programs", "Donations"],
    datasets: [
      {
        label: "Receipts",
        data: [2000, 1500, 2000],
        backgroundColor: ["#5B93FF", "#FFD66B", "#FF8F6B"],
        borderWidth: 0,
        borderColor: "#F7FAFF", // Match your background color
        borderRadius: 30, // This creates the rounded "pill" shape
        cutout: "70%",
      },
      
    ],

  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      className="w-full"
      style={{
        position: "relative",
        height: "250px",
        zIndex: 2,
      }}
    >
      {/* Doughnut chart */}
      <Doughnut data={data} options={options} />

      {/* Center label overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          boxShadow: "0px 14px 64px -10px rgba(0, 0, 0, 0.25)",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "50%",
          width: "120px",
          height: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: -10,
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "600" }}>80%</div>
        <div style={{ fontSize: "12px", color: "#030229" }}>Donations</div>
      </div>
    </div>
  );
};

export default DoughnutChart;
