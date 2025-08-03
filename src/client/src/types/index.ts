export interface ESGMetric {
  id?: string;
  category: "environmental" | "social" | "governance";
  metric: string;
  value: number;
  unit: string;
  period: string;
  source: string;
  reportedBy: string;
  dateReported: string;
  verified: boolean;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  role: "esg" | "marketing" | "leadership" | "admin";
  department: string;
}

export interface DashboardData {
  metrics: ESGMetric[];
  summary: {
    environmental: number;
    social: number;
    governance: number;
  };
  trends: {
    period: string;
    environmental: number;
    social: number;
    governance: number;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

export type ViewMode =
  | "dashboard"
  | "metrics"
  | "import"
  | "export"
  | "add-metric";
