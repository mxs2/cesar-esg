import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { FileUpload } from "../ui/FileUpload";
import { Badge } from "../ui/Badge";
import { ESGMetric } from "../../types";
import { apiService } from "../../services/api";

export const ImportData: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    metrics?: ESGMetric[];
    message?: string;
    error?: string;
  } | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setImportResult(null);
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    setImporting(true);
    setImportResult(null);
    try {
      const response = await apiService.importCSV(selectedFile);
      if (response.success) {
        setImportResult({
          success: true,
          metrics: response.data || [],
          message: response.message || "Importação concluída com sucesso",
        });
        setSelectedFile(null);
      } else {
        setImportResult({
          success: false,
          error: response.error || "Falha na importação",
        });
      }
    } catch (error: any) {
      setImportResult({
        success: false,
        error: error.message || "Falha na importação",
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      [
        "category",
        "metric",
        "value",
        "unit",
        "period",
        "source",
        "reportedBy",
        "dateReported",
        "verified",
        "notes",
      ],
      [
        "environmental",
        "Carbon Emissions",
        "1500",
        "tons CO2e",
        "2024-Q1",
        "Environmental System",
        "John Doe",
        "2024-01-31T00:00:00.000Z",
        "true",
        "Scope 1 and 2 emissions",
      ],
      [
        "social",
        "Employee Training Hours",
        "2400",
        "hours",
        "2024-Q1",
        "HR System",
        "Jane Smith",
        "2024-02-15T00:00:00.000Z",
        "true",
        "",
      ],
      [
        "governance",
        "Board Diversity",
        "45",
        "percentage",
        "2024",
        "Corporate Report",
        "Mike Johnson",
        "2024-03-01T00:00:00.000Z",
        "false",
        "Gender diversity",
      ],
    ];
    const csvContent = sampleData
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "esg-sample-data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Importar Dados ESG
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Faça upload de arquivos CSV para importar métricas ESG no sistema.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Import Section */}
        <Card title="Upload de Arquivo CSV">
          <div className="space-y-6">
            <FileUpload onFileSelect={handleFileSelect} disabled={importing} />

            {selectedFile && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary-900">
                      Arquivo selecionado:
                    </p>
                    <p className="text-primary-700">{selectedFile.name}</p>
                    <p className="text-sm text-primary-600">
                      Tamanho: {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelectedFile(null)}
                    variant="secondary"
                    size="sm"
                    disabled={importing}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleImport}
                disabled={!selectedFile || importing}
                loading={importing}
                className="flex-1"
              >
                Importar Dados
              </Button>
              <Button
                onClick={downloadSampleCSV}
                variant="secondary"
                disabled={importing}
              >
                Baixar Exemplo
              </Button>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <Card title="Requisitos de Formato CSV">
          <div className="space-y-2">
            <p className="text-gray-600">
              Seu arquivo CSV deve incluir as seguintes colunas:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="font-medium">category</span>
              <span className="text-gray-600">
                Environmental, Social, Governance
              </span>
              <span className="font-medium">metric</span>
              <span className="text-gray-600">Nome da métrica</span>
              <span className="font-medium">value</span>
              <span className="text-gray-600">Valor numérico</span>
              <span className="font-medium">unit</span>
              <span className="text-gray-600">Unidade de medida</span>
              <span className="font-medium">period</span>
              <span className="text-gray-600">Formato AAAA ou AAAA-QX</span>
              <span className="font-medium">source</span>
              <span className="text-gray-600">Fonte dos dados</span>
              <span className="font-medium">reportedBy</span>
              <span className="text-gray-600">Nome do relator</span>
              <span className="font-medium">dateReported</span>
              <span className="text-gray-600">String de data ISO</span>
              <span className="font-medium">verified</span>
              <span className="text-gray-600">true ou false</span>
              <span className="font-medium">notes</span>
              <span className="text-gray-600">Observações opcionais</span>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 text-sm">
                <strong>Dica:</strong> Baixe o CSV de exemplo para ver o formato
                exato necessário.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Import Results */}
      {importResult && (
        <Card title="Resultados da Importação">
          {importResult.success ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
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
                </div>
                <span className="text-green-700 font-medium">
                  {importResult.message}
                </span>
              </div>
              {importResult.metrics && importResult.metrics.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Importadas {importResult.metrics.length} métricas:
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {importResult.metrics.map((metric) => (
                      <div
                        key={metric.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge variant={metric.category}>
                            {metric.category}
                          </Badge>
                          <span className="font-medium">{metric.metric}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {metric.value} {metric.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
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
              </div>
              <span className="text-red-700 font-medium">
                Falha na importação: {importResult.error}
              </span>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
