import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card } from "../ui/Card";
import { LoadingState } from "../ui/LoadingSpinner";
import { ESGCharts } from "../charts/ESGCharts";
import { Badge } from "../ui/Badge";
import { DashboardData } from "../../types";
import { apiService } from "../../services/api";

export const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getDashboardData();
      if (response.success && response.data) {
        setDashboardData(response.data);
      } else {
        throw new Error(response.error || "Failed to load dashboard data");
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const recentMetrics = useMemo(() => {
    if (!dashboardData?.metrics) return [];
    return [...dashboardData.metrics]
      .sort(
        (a, b) =>
          new Date(b.dateReported).getTime() -
          new Date(a.dateReported).getTime(),
      )
      .slice(0, 5);
  }, [dashboardData]);

  if (loading) {
    return <LoadingState message="Carregando dashboard..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium">
          Erro ao carregar dashboard
        </div>
        <p className="text-gray-600 mt-2">{error}</p>
        <button onClick={loadDashboardData} className="btn-primary mt-4">
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center text-gray-500 py-12">
        Nenhum dado disponível
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-success-700 rounded-xl p-4 lg:p-8 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Dashboard ESG</h1>
        <p className="text-primary-100 text-sm lg:text-base">
          Monitore e acompanhe o desempenho ambiental, social e de governança da
          sua organização
        </p>
        <div className="mt-4 lg:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-6">
          {(["environmental", "social", "governance"] as const).map((key) => (
            <div
              key={key}
              className="bg-white/10 rounded-lg p-3 lg:p-4 backdrop-blur-sm"
            >
              <div className="text-xl lg:text-2xl font-bold">
                {dashboardData.summary[key]}
              </div>
              <div className="text-primary-100 text-xs lg:text-sm">
                {key === "environmental" && "Métricas Ambientais"}
                {key === "social" && "Métricas Sociais"}
                {key === "governance" && "Métricas de Governança"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <ESGCharts dashboardData={dashboardData} />

      {/* Recent Metrics */}
      <Card title="Métricas Recentes" subtitle="Últimas entradas de dados ESG">
        <div className="space-y-4">
          {recentMetrics.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma métrica disponível
            </p>
          ) : (
            recentMetrics.map((metric) => (
              <div
                key={metric.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors space-y-3 lg:space-y-0"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 lg:space-x-3">
                    <h4 className="font-medium text-gray-900 text-sm lg:text-base">
                      {metric.metric}
                    </h4>
                    <Badge
                      variant={
                        metric.category === "environmental"
                          ? "environmental"
                          : metric.category === "social"
                            ? "social"
                            : metric.category === "governance"
                              ? "governance"
                              : "default"
                      }
                    >
                      {metric.category === "environmental"
                        ? "Ambiental"
                        : metric.category === "social"
                          ? "Social"
                          : metric.category === "governance"
                            ? "Governança"
                            : "Outro"}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 lg:space-x-4 text-xs lg:text-sm text-gray-600">
                    <span>
                      {metric.value} {metric.unit}
                    </span>
                    <span className="hidden lg:inline">•</span>
                    <span>{metric.period}</span>
                    <span className="hidden lg:inline">•</span>
                    <span>Por {metric.reportedBy}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between lg:justify-end lg:space-x-3">
                  <Badge variant={metric.verified ? "verified" : "pending"}>
                    {metric.verified ? "Verificado" : "Pendente"}
                  </Badge>
                  <div className="text-xs lg:text-sm text-gray-500">
                    {new Date(metric.dateReported).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
