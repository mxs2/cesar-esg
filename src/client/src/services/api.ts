import { ESGMetric, DashboardData, ApiResponse, User } from "../types";

const API_BASE_URL = "/api";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // ESG Metrics
  async getMetrics(category?: string): Promise<ApiResponse<ESGMetric[]>> {
    const queryParam = category ? `?category=${category}` : "";
    return this.request<ESGMetric[]>(`/metrics${queryParam}`);
  }

  async createMetric(
    metric: Omit<ESGMetric, "id">,
  ): Promise<ApiResponse<ESGMetric>> {
    return this.request<ESGMetric>("/metrics", {
      method: "POST",
      body: JSON.stringify(metric),
    });
  }

  async updateMetric(
    id: string,
    updates: Partial<ESGMetric>,
  ): Promise<ApiResponse<ESGMetric>> {
    return this.request<ESGMetric>(`/metrics/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  async deleteMetric(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/metrics/${id}`, {
      method: "DELETE",
    });
  }

  // Dashboard
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    return this.request<DashboardData>("/dashboard");
  }

  // CSV Import/Export
  async importCSV(file: File): Promise<ApiResponse<ESGMetric[]>> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE_URL}/import/csv`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Import failed");
      }

      return data;
    } catch (error) {
      console.error("CSV import failed:", error);
      throw error;
    }
  }

  async exportCSV(): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/export/csv`);

      if (!response.ok) {
        throw new Error("Export failed");
      }

      return await response.blob();
    } catch (error) {
      console.error("CSV export failed:", error);
      throw error;
    }
  }

  // Users
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>("/users");
  }
}

export const apiService = new ApiService();
