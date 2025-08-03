import { z } from "zod";

// ESG Data Validation Schemas
export const ESGMetricSchema = z.object({
  id: z.string().optional(),
  category: z.enum(["environmental", "social", "governance"]),
  metric: z.string().min(1, "Metric name is required"),
  value: z.number().min(0, "Value must be non-negative"),
  unit: z.string().min(1, "Unit is required"),
  period: z
    .string()
    .regex(/^\d{4}-Q[1-4]$|^\d{4}$/, "Period must be YYYY or YYYY-QX format"),
  source: z.string().min(1, "Source is required"),
  reportedBy: z.string().min(1, "Reporter is required"),
  dateReported: z.string().datetime(),
  verified: z.boolean().default(false),
  notes: z.string().optional(),
});

export const UserRoleSchema = z.enum([
  "esg",
  "marketing",
  "leadership",
  "admin",
]);

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  role: UserRoleSchema,
  department: z.string().min(1, "Department is required"),
});

export const CSVImportSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, "Valid file is required"),
  validateOnly: z.boolean().default(false),
});

// TypeScript Types
export type ESGMetric = z.infer<typeof ESGMetricSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type User = z.infer<typeof UserSchema>;

// Sample data structure
export interface ESGDashboardData {
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
