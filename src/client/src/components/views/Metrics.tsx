import React, { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input, Select } from "../ui/Input";
import { Badge } from "../ui/Badge";
import { LoadingState } from "../ui/LoadingSpinner";
// import { EditMetricModal } from '../modals/EditMetricModal';
import { ESGMetric } from "../../types";
import { apiService } from "../../services/api";

export const Metrics: React.FC = () => {
  const [metrics, setMetrics] = useState<ESGMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  // const [editingMetric, setEditingMetric] = useState<ESGMetric | null>(null);

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

  // const handleEditMetric = async (updatedMetric: ESGMetric) => {
  //   try {
  //     const response = await apiService.updateMetric(
  //       updatedMetric.id!,
  //       updatedMetric,
  //     );

  //     if (response.success && response.data) {
  //       setMetrics((prev) =>
  //         prev.map((m) => (m.id === updatedMetric.id ? response.data! : m)),
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Failed to update metric:", error);
  //     throw error;
  //   }
  // };

  const handleDeleteMetric = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta métrica?")) {
      return;
    }

    try {
      const response = await apiService.deleteMetric(id);

      if (response.success) {
        setMetrics((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete metric:", error);
    }
  };

  const handleToggleVerification = async (metric: ESGMetric) => {
    try {
      const response = await apiService.updateMetric(metric.id!, {
        verified: !metric.verified,
      });

      if (response.success && response.data) {
        setMetrics((prev) =>
          prev.map((m) => (m.id === metric.id ? response.data! : m)),
        );
      }
    } catch (error) {
      console.error("Failed to update metric:", error);
    }
  };

  const getFilteredMetrics = () => {
    return metrics.filter((metric) => {
      const matchesSearch =
        metric.metric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metric.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metric.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || metric.category === categoryFilter;

      const matchesVerification =
        verificationFilter === "all" ||
        (verificationFilter === "verified" && metric.verified) ||
        (verificationFilter === "pending" && !metric.verified);

      return matchesSearch && matchesCategory && matchesVerification;
    });
  };

  const filteredMetrics = getFilteredMetrics();

  if (loading) {
    return <LoadingState message="Carregando métricas..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Métricas ESG
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Gerencie e monitore os dados ESG da sua organização
          </p>
        </div>
        <div className="text-left lg:text-right">
          <div className="text-xl lg:text-2xl font-bold text-gray-900">
            {metrics.length}
          </div>
          <div className="text-xs lg:text-sm text-gray-600">
            Total de Métricas
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card title="Filtros">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Pesquisar métricas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: "all", label: "Todas as Categorias" },
              { value: "environmental", label: "Ambiental" },
              { value: "social", label: "Social" },
              { value: "governance", label: "Governança" },
            ]}
          />

          <Select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            options={[
              { value: "all", label: "Todos os Status" },
              { value: "verified", label: "Verificados" },
              { value: "pending", label: "Pendentes" },
            ]}
          />

          <Button onClick={loadMetrics} variant="secondary">
            Atualizar
          </Button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredMetrics.length} de {metrics.length} métricas
        </div>
      </Card>

      {/* Metrics List */}
      <Card title="Dados das Métricas">
        {filteredMetrics.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ||
            categoryFilter !== "all" ||
            verificationFilter !== "all"
              ? "Nenhuma métrica corresponde aos seus critérios de pesquisa"
              : "Nenhuma métrica disponível"}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMetrics.map((metric) => (
              <div
                key={metric.id}
                className="border border-gray-200 rounded-lg p-4 lg:p-6 hover:shadow-material transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 break-words">
                        {metric.metric}
                      </h3>
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
                      <Badge variant={metric.verified ? "verified" : "pending"}>
                        {metric.verified ? "Verificado" : "Pendente"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Valor:</span>
                        <div className="font-medium text-lg text-gray-900">
                          {metric.value} {metric.unit}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Período:</span>
                        <div className="font-medium">{metric.period}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Fonte:</span>
                        <div className="font-medium">{metric.source}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Relatado por:</span>
                        <div className="font-medium">{metric.reportedBy}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                      <span>
                        Relatado em:{" "}
                        {new Date(metric.dateReported).toLocaleDateString()}
                      </span>
                      {metric.notes && (
                        <>
                          <span>•</span>
                          <span>{metric.notes}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant={metric.verified ? "warning" : "success"}
                      onClick={() => handleToggleVerification(metric)}
                    >
                      {metric.verified ? "Marcar Pendente" : "Verificar"}
                    </Button>
                    <Button size="sm" variant="secondary">
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDeleteMetric(metric.id!)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {metrics.filter((m) => m.category === "environmental").length}
            </div>
            <div className="text-sm text-gray-600">Ambiental</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {metrics.filter((m) => m.category === "social").length}
            </div>
            <div className="text-sm text-gray-600">Social</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metrics.filter((m) => m.category === "governance").length}
            </div>
            <div className="text-sm text-gray-600">Governança</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">
              {metrics.filter((m) => m.verified).length}
            </div>
            <div className="text-sm text-gray-600">Verificadas</div>
          </div>
        </Card>
      </div>

      {/*WIP: Edit Modal */}
    </div>
  );
};
