import React, { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Select } from "../ui/Input";
import { Badge } from "../ui/Badge";
import { LoadingState } from "../ui/LoadingSpinner";
import { ESGMetric } from "../../types";
import { apiService } from "../../services/api";

export const ExportData: React.FC = () => {
  const [metrics, setMetrics] = useState<ESGMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    verified: "all",
    period: "all",
  });

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMetrics();

      if (response.success && response.data) {
        setMetrics(response.data);
      }
    } catch (error) {
      console.error("Failed to load metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await apiService.exportCSV();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `esg-metrics-${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  const getFilteredMetrics = () => {
    return metrics.filter((metric) => {
      if (filters.category !== "all" && metric.category !== filters.category) {
        return false;
      }
      if (filters.verified !== "all") {
        const isVerified = filters.verified === "verified";
        if (metric.verified !== isVerified) {
          return false;
        }
      }
      if (filters.period !== "all" && metric.period !== filters.period) {
        return false;
      }
      return true;
    });
  };

  const filteredMetrics = getFilteredMetrics();
  const uniquePeriods = [...new Set(metrics.map((m) => m.period))].sort();

  if (loading) {
    return <LoadingState message="Carregando métricas..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Exportar Dados ESG
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Baixe seus dados de métricas ESG em formato CSV para relatórios e
          análises
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Export Options */}
        <Card title="Opções de Exportação" className="lg:col-span-1">
          <div className="space-y-2">
            <Select
              label="Categoria"
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
              options={[
                { value: "all", label: "Todas as Categorias" },
                { value: "environmental", label: "Ambiental" },
                { value: "social", label: "Social" },
                { value: "governance", label: "Governança" },
              ]}
            />

            <Select
              label="Status de Verificação"
              value={filters.verified}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, verified: e.target.value }))
              }
              options={[
                { value: "all", label: "Todos os Status" },
                { value: "verified", label: "Apenas Verificados" },
                { value: "pending", label: "Apenas Pendentes" },
              ]}
            />

            <Select
              label="Período"
              value={filters.period}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, period: e.target.value }))
              }
              options={[
                { value: "all", label: "Todos os Períodos" },
                ...uniquePeriods.map((period) => ({
                  value: period,
                  label: period,
                })),
              ]}
            />

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-4">
                <p>
                  <strong>Total de métricas:</strong> {metrics.length}
                </p>
                <p>
                  <strong>Métricas filtradas:</strong> {filteredMetrics.length}
                </p>
              </div>

              <Button
                onClick={handleExport}
                loading={exporting}
                className="w-full"
                disabled={filteredMetrics.length === 0}
              >
                Exportar para CSV
              </Button>
            </div>
          </div>
        </Card>

        {/* Data Preview */}
        <Card
          title="Dados Metrificados"
          subtitle="Dados a serem exportadas"
          className="lg:col-span-2"
        >
          {filteredMetrics.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Nenhuma métrica corresponde aos filtros atuais
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  {filteredMetrics.slice(0, 10).map((metric) => (
                    <div
                      key={metric.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">
                            {metric.metric}
                          </h4>
                          <Badge variant={metric.category}>
                            {metric.category === "environmental"
                              ? "Ambiental"
                              : metric.category === "social"
                                ? "Social"
                                : metric.category === "governance"
                                  ? "Governança"
                                  : metric.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>
                            {metric.value} {metric.unit}
                          </span>
                          <span>•</span>
                          <span>{metric.period}</span>
                          <span>•</span>
                          <span>Por {metric.reportedBy}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={metric.verified ? "verified" : "pending"}
                        >
                          {metric.verified ? "Verificado" : "Pendente"}
                        </Badge>
                        <div className="text-sm text-gray-500">
                          {new Date(metric.dateReported).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {filteredMetrics.length > 10 && (
                <div className="text-center text-sm text-gray-500 pt-4 border-t">
                  Mostrando 10 de {filteredMetrics.length} métricas
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Export Information */}
      <Card title="Informações de Exportação">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Formato CSV</h4>
            <p className="text-gray-600 text-sm mb-3">
              O arquivo CSV exportado incluirá todos os dados das métricas com
              as seguintes colunas:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• ID, Categoria, Nome da Métrica</li>
              <li>• Valor, Unidade, Período</li>
              <li>• Fonte, Relatado por, Data de Relatório</li>
              <li>• Status de Verificação, Observações</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Casos de Uso</h4>
            <p className="text-gray-600 text-sm mb-3">
              Exporte seus dados para:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Relatórios regulamentares e conformidade</li>
              <li>• Apresentações para stakeholders e dashboards</li>
              <li>• Análise de dados e identificação de tendências</li>
              <li>• Integração com sistemas externos</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
