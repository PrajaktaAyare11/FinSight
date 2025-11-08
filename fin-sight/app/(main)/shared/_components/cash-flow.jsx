"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Reusable Cash Flow Forecast Chart
 * @param {Array} transactions - List of transactions
 * @param {String} account - Optional, filter by account name
 */
export default function CashFlowForecast({ transactions, account }) {
  // Filter transactions if account is passed
  const filteredTxns = transactions;

  // 1. Aggregate monthly net cash flow
  function getMonthlyCashFlow(txns) {
    const monthly = {};

    txns.forEach((t) => {
      const date = new Date(t.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleString("default", { month: "short" });
      
      if (!monthly[monthYear]) {
        monthly[monthYear] = {
          monthName,
          amount: 0,
          sortDate: date
        };
      }
      
      // 🔧 FIX: Handle both uppercase and lowercase, and convert Decimal to number
      const amount = typeof t.amount === 'object' ? parseFloat(t.amount) : t.amount;
      const transactionType = t.type.toLowerCase();
      
      monthly[monthYear].amount += transactionType === "income" ? amount : -amount;
    });

    // Sort by date and return in chronological order
    return Object.values(monthly)
      .sort((a, b) => a.sortDate - b.sortDate)
      .map(item => ({
        month: item.monthName,
        actual: item.amount,
      }));
  }

  const actualData = getMonthlyCashFlow(filteredTxns);

  // 2. Simple forecast → project trend using avg growth
  let forecastData = [...actualData];
  if (actualData.length > 1) {
    // Use the last 3 months for more stable forecasting, or at least 2
    const lastMonths = actualData.slice(-3);
    let avgGrowth = 0;
    
    if (lastMonths.length >= 2) {
      // Calculate average growth over available months
      let totalGrowth = 0;
      for (let i = 1; i < lastMonths.length; i++) {
        const growth = (lastMonths[i].actual - lastMonths[i-1].actual) / Math.abs(lastMonths[i-1].actual || 1);
        totalGrowth += growth;
      }
      avgGrowth = totalGrowth / (lastMonths.length - 1);
      
      // Cap extreme growth rates to avoid wild predictions
      avgGrowth = Math.max(Math.min(avgGrowth, 0.5), -0.5); // Between -50% and +50%
    }

    const lastVal = actualData[actualData.length - 1].actual;

    forecastData = [
      ...actualData,
      {
        month: "Next 1",
        forecast: Math.round(lastVal * (1 + avgGrowth)),
        forecastHigh: Math.round(lastVal * (1 + avgGrowth * 1.5)),
        forecastLow: Math.round(lastVal * (1 + avgGrowth * 0.5)),
      },
      {
        month: "Next 2",
        forecast: Math.round(lastVal * Math.pow((1 + avgGrowth), 2)),
        forecastHigh: Math.round(lastVal * Math.pow((1 + avgGrowth * 1.5), 2)),
        forecastLow: Math.round(lastVal * Math.pow((1 + avgGrowth * 0.5), 2)),
      },
    ];
  }

  // 🔧 FIX: Custom tooltip to format currency properly
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="font-semibold">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ₹${entry.value?.toLocaleString() || 0}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 350, marginTop: "1rem" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
        Cash Flow Forecast {account ? `(${account})` : "(All Accounts)"}
      </h3>
      <ResponsiveContainer>
        <LineChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Actuals */}
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#2563eb" 
            strokeWidth={3} 
            dot 
            connectNulls={false}
          />

          {/* Forecast (dotted) */}
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#16a34a"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="forecastHigh"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={false}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="forecastLow"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}