import { ESGMetric, User, ESGDashboardData } from "../types/esg";

class DataStore {
  private metrics: ESGMetric[] = [];
  private users: User[] = [];

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Usuários de exemplo em português
    this.users = [
      {
        id: "1",
        name: "Carlos Silva",
        role: "esg",
        department: "Sustentabilidade",
      },
      {
        id: "2",
        name: "Ana Souza",
        role: "leadership",
        department: "Executivo",
      },
    ];

    // Métricas ESG de exemplo em português
    this.metrics = [
      {
        id: "1",
        category: "environmental",
        metric: "Emissões de Carbono",
        value: 980,
        unit: "toneladas CO2e",
        period: "2024-Q1",
        source: "Sistema de Monitoramento Ambiental",
        reportedBy: "Carlos Silva",
        dateReported: new Date("2024-01-20").toISOString(),
        verified: true,
        notes: "Emissões de escopo 1 e 2",
      },
      {
        id: "2",
        category: "social",
        metric: "Horas de Treinamento de Funcionários",
        value: 12000,
        unit: "horas",
        period: "2024-Q1",
        source: "Sistema de RH",
        reportedBy: "Ana Souza",
        dateReported: new Date("2024-02-10").toISOString(),
        verified: true,
        notes: "Treinamento obrigatório anual",
      },
    ];
  }

  // ESG Metrics operations
  getAllMetrics(): ESGMetric[] {
    return [...this.metrics];
  }

  getMetricsByCategory(category: ESGMetric["category"]): ESGMetric[] {
    return this.metrics.filter((metric) => metric.category === category);
  }

  addMetric(metric: Omit<ESGMetric, "id">): ESGMetric {
    const newMetric: ESGMetric = {
      ...metric,
      id: Date.now().toString(),
    };
    this.metrics.push(newMetric);
    return newMetric;
  }

  updateMetric(id: string, updates: Partial<ESGMetric>): ESGMetric | null {
    const index = this.metrics.findIndex((metric) => metric.id === id);
    if (index === -1) return null;
    this.metrics[index] = { ...this.metrics[index], ...updates };
    return this.metrics[index];
  }

  deleteMetric(id: string): boolean {
    const index = this.metrics.findIndex((metric) => metric.id === id);
    if (index === -1) return false;
    this.metrics.splice(index, 1);
    return true;
  }

  // Dashboard data aggregation
  getDashboardData(): ESGDashboardData {
    const metrics = this.getAllMetrics();
    const summary = {
      environmental: metrics.filter((m) => m.category === "environmental")
        .length,
      social: metrics.filter((m) => m.category === "social").length,
      governance: metrics.filter((m) => m.category === "governance").length,
    };
    const trends = [
      { period: "2024-Q1", environmental: 10, social: 20, governance: 5 },
      { period: "2023-Q4", environmental: 8, social: 18, governance: 4 },
    ];
    return { metrics, summary, trends };
  }

  // User operations
  getAllUsers(): User[] {
    return [...this.users];
  }

  getUserById(id: string): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  // CSV operations
  importMetricsFromCSV(csvData: any[]): ESGMetric[] {
    const importedMetrics: ESGMetric[] = [];
    csvData.forEach((row) => {
      try {
        const metric: Omit<ESGMetric, "id"> = {
          category: row.category,
          metric: row.metric,
          value: parseFloat(row.value),
          unit: row.unit,
          period: row.period,
          source: row.source,
          reportedBy: row.reportedBy,
          dateReported: new Date(row.dateReported).toISOString(),
          verified: row.verified === "true",
          notes: row.notes || "",
        };
        const newMetric = this.addMetric(metric);
        importedMetrics.push(newMetric);
      } catch (error) {
        console.error("Erro ao importar linha:", row, error);
      }
    });
    return importedMetrics;
  }
}

export const dataStore = new DataStore();
