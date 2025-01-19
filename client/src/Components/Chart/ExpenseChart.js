import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGlobalContext } from "../../context/globalContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const colorPalette = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

const ExpenseChart = () => {
  const { expenses } = useGlobalContext();
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!expenses || expenses.length === 0) {
      console.warn("No expenses data found.");
      setLoading(false);
      return;
    }

    const categoryMap = {};

    expenses.forEach((item) => {
      if (item?.category && typeof item.amount === "number") {
        categoryMap[item.category] =
          (categoryMap[item.category] || 0) + item.amount;
      }
    });

    const sortedCategories = Object.entries(categoryMap).sort(
      (a, b) => b[1] - a[1]
    );

    const labels = sortedCategories.map(([category]) => category);
    const datasets = sortedCategories.map(([category, amount], index) => ({
      label: category, // Her kategori için ayrı label
      data: [amount], // Veri miktarı
      backgroundColor: colorPalette[index % colorPalette.length], // Renk atanıyor
      borderWidth: 1,
    }));

    setChartData({
      labels: ["Expenses"], // Tek bir ortak kategori
      datasets, // Her kategori için ayrı bir dataset
    });

    setLoading(false);
  }, [expenses]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Expenses by Category</h2>
      {chartData.datasets?.length > 0 ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const value = tooltipItem.raw;
                    return `${tooltipItem.label}: ${value}`;
                  },
                },
              },
            },
            scales: {
              x: {
                stacked: false, // Yığılmış değil, yan yana olacak
              },
              y: {
                stacked: false, // Yığılmış değil, yan yana olacak
              },
            },
          }}
        />
      ) : (
        <p style={{ textAlign: "center" }}>No data available</p>
      )}
    </div>
  );
};

export default ExpenseChart;
