import React, { useState, useCallback } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input, Select, Textarea } from "../ui/Input";
import { ESGMetric } from "../../types";
import { apiService } from "../../services/api";

type FormData = {
  category: ESGMetric["category"];
  metric: string;
  value: string;
  unit: string;
  period: string;
  source: string;
  reportedBy: string;
  dateReported: string;
  verified: boolean;
  notes: string;
};

const getInitialFormData = (): FormData => ({
  category: "environmental",
  metric: "",
  value: "",
  unit: "",
  period: "",
  source: "",
  reportedBy: "",
  dateReported: new Date().toISOString().split("T")[0],
  verified: false,
  notes: "",
});

export const AddMetric: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    metric?: ESGMetric;
  } | null>(null);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.metric.trim())
      newErrors.metric = "Nome da métrica é obrigatório";
    if (!formData.value.trim()) newErrors.value = "Valor é obrigatório";
    else if (isNaN(Number(formData.value)) || Number(formData.value) < 0)
      newErrors.value = "Valor deve ser um número não negativo";
    if (!formData.unit.trim()) newErrors.unit = "Unidade é obrigatória";
    if (!formData.period.trim()) newErrors.period = "Período é obrigatório";
    else if (!/^\d{4}(-Q[1-4])?$/.test(formData.period))
      newErrors.period = "Período deve estar no formato AAAA ou AAAA-QX";
    if (!formData.source.trim()) newErrors.source = "Fonte é obrigatória";
    if (!formData.reportedBy.trim())
      newErrors.reportedBy = "Nome do relator é obrigatório";
    if (!formData.dateReported)
      newErrors.dateReported = "Data de relatório é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    },
    [errors],
  );

  const resetForm = useCallback(() => {
    setFormData(getInitialFormData());
    setErrors({});
    setSubmitResult(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      try {
        setSubmitting(true);
        setSubmitResult(null);

        const metricData: Omit<ESGMetric, "id"> = {
          category: formData.category,
          metric: formData.metric.trim(),
          value: Number(formData.value),
          unit: formData.unit.trim(),
          period: formData.period.trim(),
          source: formData.source.trim(),
          reportedBy: formData.reportedBy.trim(),
          dateReported: new Date(formData.dateReported).toISOString(),
          verified: formData.verified,
          notes: formData.notes.trim(),
        };

        const response = await apiService.createMetric(metricData);

        if (response.success && response.data) {
          setSubmitResult({
            success: true,
            message: "Métrica adicionada com sucesso!",
            metric: response.data,
          });
          resetForm();
        } else {
          throw new Error(response.error || "Falha ao adicionar métrica");
        }
      } catch (error: any) {
        setSubmitResult({
          success: false,
          message: error.message || "Falha ao adicionar métrica",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [formData, validateForm, resetForm],
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Adicionar Métrica ESG
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Insira novos dados ESG para acompanhar o desempenho de
          sustentabilidade da sua organização
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Form */}
        <Card title="Informações da Métrica" className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Categoria *"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                error={errors.category}
                options={[
                  { value: "environmental", label: "Ambiental" },
                  { value: "social", label: "Social" },
                  { value: "governance", label: "Governança" },
                ]}
              />
              <Input
                label="Nome da Métrica *"
                value={formData.metric}
                onChange={(e) => handleInputChange("metric", e.target.value)}
                error={errors.metric}
                placeholder="ex: Emissões de Carbono"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Valor *"
                type="number"
                min="0"
                step="any"
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                error={errors.value}
                placeholder="ex: 1500"
              />
              <Input
                label="Unidade *"
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                error={errors.unit}
                placeholder="ex: toneladas CO2e"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Período *"
                value={formData.period}
                onChange={(e) => handleInputChange("period", e.target.value)}
                error={errors.period}
                placeholder="ex: 2024-T1 ou 2024"
                helper="Use formato AAAA para dados anuais ou AAAA-QX para trimestral"
              />
              <Input
                label="Data de Relatório *"
                type="date"
                value={formData.dateReported}
                onChange={(e) =>
                  handleInputChange("dateReported", e.target.value)
                }
                error={errors.dateReported}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Fonte *"
                value={formData.source}
                onChange={(e) => handleInputChange("source", e.target.value)}
                error={errors.source}
                placeholder="ex: Sistema de Monitoramento Ambiental"
              />
              <Input
                label="Relatado por *"
                value={formData.reportedBy}
                onChange={(e) =>
                  handleInputChange("reportedBy", e.target.value)
                }
                error={errors.reportedBy}
                placeholder="ex: João Silva"
              />
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) =>
                  handleInputChange("verified", e.target.checked)
                }
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="verified"
                className="text-sm font-medium text-gray-700"
              >
                Marcar como verificado
              </label>
            </div>
            <Textarea
              label="Observações"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Informações adicionais opcionais..."
              rows={3}
            />
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                type="submit"
                loading={submitting}
                disabled={submitting}
                className="flex-1 order-2 sm:order-1"
              >
                Adicionar Métrica
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={resetForm}
                disabled={submitting}
                className="order-1 sm:order-2"
              >
                Limpar Formulário
              </Button>
            </div>
          </form>
        </Card>
        {/* Guidelines */}
        <Card title="Diretrizes">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Dicas de Qualidade dos Dados
              </h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Use convenções de nomenclatura consistentes</li>
                <li>• Verifique a precisão dos dados antes de enviar</li>
                <li>• Inclua informações relevantes da fonte</li>
                <li>• Use unidades padrão quando possível</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Formatos de Período
              </h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Anual: 2024</li>
                <li>• Trimestral: 2024-T1, 2024-T2, etc.</li>
                <li>• Sempre use o ano atual ou anos anteriores</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Unidades Comuns
              </h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Carbono: toneladas CO2e, kg CO2e</li>
                <li>• Energia: kWh, MWh, GJ</li>
                <li>• Água: litros, galões, m³</li>
                <li>• Social: porcentagem, horas, contagem</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
      {/* Submit Result */}
      {submitResult && (
        <Card>
          <div
            className={`flex items-center space-x-3 ${
              submitResult.success ? "text-green-700" : "text-red-700"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                submitResult.success ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {submitResult.success ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <span className="font-medium">{submitResult.message}</span>
          </div>
          {submitResult.success && submitResult.metric && (
            <div className="mt-4 p-4 bg-primary-50 rounded-lg">
              <p className="text-primary-700 font-medium">
                Detalhes da Métrica:
              </p>
              <div className="mt-2 text-sm text-primary-600">
                <p>
                  <strong>{submitResult.metric.metric}:</strong>{" "}
                  {submitResult.metric.value} {submitResult.metric.unit}
                </p>
                <p>
                  <strong>Categoria:</strong> {submitResult.metric.category}
                </p>
                <p>
                  <strong>Período:</strong> {submitResult.metric.period}
                </p>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
