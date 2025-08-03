import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/Card";
import { DashboardData } from "../../types";

interface ESGChartsProps {
  dashboardData: DashboardData;
}

export const ESGCharts: React.FC<ESGChartsProps> = ({ dashboardData }) => {
  const { summary, trends } = dashboardData;

  // Pie chart data for summary
  const summaryPieData = [
    {
      name: "Ambiental",
      value: summary.environmental,
      color: "rgba(34, 197, 94, 0.8)",
    },
    {
      name: "Social",
      value: summary.social,
      color: "rgba(249, 115, 22, 0.8)",
    },
    {
      name: "Governança",
      value: summary.governance,
      color: "rgba(59, 130, 246, 0.8)",
    },
  ];

  // Trends data for line chart (reverse for chronological order)
  const trendsLineData = trends
    .slice()
    .reverse()
    .map((t) => ({
      period: t.period,
      Ambiental: t.environmental,
      Social: t.social,
      Governança: t.governance,
    }));

  // Bar chart data for current quarter
  const currentQuarterBarData = [
    {
      name: "Ambiental",
      value: trends[0]?.environmental || 0,
      color: "rgba(34, 197, 94, 0.8)",
    },
    {
      name: "Social",
      value: trends[0]?.social || 0,
      color: "rgba(249, 115, 22, 0.8)",
    },
    {
      name: "Governança",
      value: trends[0]?.governance || 0,
      color: "rgba(59, 130, 246, 0.8)",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Metrics Distribution */}
      <Card title="Distribuição das Métricas" className="chart-container">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summaryPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {summaryPieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
              <RechartsLegend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Performance Trends */}
      <Card
        title="Tendências de Performance"
        className="chart-container xl:col-span-2"
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <RechartsTooltip />
              <RechartsLegend verticalAlign="bottom" />
              <Line
                type="monotone"
                dataKey="Ambiental"
                stroke="rgba(34, 197, 94, 1)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Social"
                stroke="rgba(249, 115, 22, 1)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Governança"
                stroke="rgba(59, 130, 246, 1)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Current Quarter Performance */}
      <Card title="Trimestre Atual" className="chart-container">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentQuarterBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <RechartsLegend verticalAlign="bottom" />
              <Bar dataKey="value">
                {currentQuarterBarData.map((entry, idx) => (
                  <Cell key={`cell-bar-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Key Metrics Summary */}
      <Card title="Métricas Principais" className="xl:col-span-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {summary.environmental}
            </div>
            <div className="text-sm text-green-600">Ambiental</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">
              {summary.social}
            </div>
            <div className="text-sm text-orange-600">Social</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">
              {summary.governance}
            </div>
            <div className="text-sm text-blue-600">Governança</div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Total de Métricas Acompanhadas
            </span>
            <span className="font-semibold">
              {summary.environmental + summary.social + summary.governance}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Métricas Verificadas</span>
            <span className="font-semibold text-green-600">
              {dashboardData.metrics.filter((m: any) => m.verified).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Pendente de Verificação
            </span>
            <span className="font-semibold text-orange-600">
              {dashboardData.metrics.filter((m: any) => !m.verified).length}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
