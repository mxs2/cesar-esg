import express from "express";
import cors from "cors";
import multer from "multer";
import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import fs from "fs";
import { ESGMetricSchema, UserRoleSchema } from "./types/esg";
import { dataStore } from "./store/dataStore";

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  },
});

// API Routes

// Get all ESG metrics
app.get("/api/metrics", (req, res) => {
  try {
    const category = req.query.category as string;
    const metrics = category
      ? dataStore.getMetricsByCategory(category as any)
      : dataStore.getAllMetrics();

    res.json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch metrics" });
  }
});

// Add new ESG metric
app.post("/api/metrics", (req, res) => {
  try {
    const validatedData = ESGMetricSchema.omit({ id: true }).parse(req.body);
    const newMetric = dataStore.addMetric(validatedData);

    res.status(201).json({ success: true, data: newMetric });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      details: error.errors || error.message,
    });
  }
});

// Update ESG metric
app.put("/api/metrics/:id", (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = ESGMetricSchema.partial().parse(req.body);
    const updatedMetric = dataStore.updateMetric(id, validatedData);

    if (!updatedMetric) {
      return res
        .status(404)
        .json({ success: false, error: "Metric not found" });
    }

    res.json({ success: true, data: updatedMetric });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      details: error.errors || error.message,
    });
  }
});

// Delete ESG metric
app.delete("/api/metrics/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deleted = dataStore.deleteMetric(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Metric not found" });
    }

    res.json({ success: true, message: "Metric deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete metric" });
  }
});

// Get dashboard data
app.get("/api/dashboard", (req, res) => {
  try {
    const dashboardData = dataStore.getDashboardData();
    res.json({ success: true, data: dashboardData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch dashboard data" });
  }
});

// CSV Import
app.post("/api/import/csv", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  const results: any[] = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      try {
        const importedMetrics = dataStore.importMetricsFromCSV(results);

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.json({
          success: true,
          data: importedMetrics,
          message: `Successfully imported ${importedMetrics.length} metrics`,
        });
      } catch (error: any) {
        fs.unlinkSync(filePath);
        res.status(400).json({
          success: false,
          error: "Failed to import CSV data",
          details: error.message,
        });
      }
    })
    .on("error", (error) => {
      fs.unlinkSync(filePath);
      res.status(500).json({
        success: false,
        error: "Failed to parse CSV file",
        details: error.message,
      });
    });
});

// CSV Export
app.get("/api/export/csv", async (req, res) => {
  try {
    const metrics = dataStore.getAllMetrics();
    const csvFilePath = path.join(
      __dirname,
      "../../exports",
      `esg-metrics-${Date.now()}.csv`,
    );

    // Ensure exports directory exists
    const exportsDir = path.dirname(csvFilePath);
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: "id", title: "ID" },
        { id: "category", title: "Category" },
        { id: "metric", title: "Metric" },
        { id: "value", title: "Value" },
        { id: "unit", title: "Unit" },
        { id: "period", title: "Period" },
        { id: "source", title: "Source" },
        { id: "reportedBy", title: "Reported By" },
        { id: "dateReported", title: "Date Reported" },
        { id: "verified", title: "Verified" },
        { id: "notes", title: "Notes" },
      ],
    });

    await csvWriter.writeRecords(metrics);

    res.download(csvFilePath, "esg-metrics.csv", (err) => {
      if (err) {
        console.error("Download error:", err);
      }
      // Clean up file after download
      fs.unlinkSync(csvFilePath);
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: "Failed to export CSV",
      details: error.message,
    });
  }
});

// User management
app.get("/api/users", (req, res) => {
  try {
    const users = dataStore.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "ESG Data Management API is running" });
});

// Error handling middleware
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  },
);

app.listen(PORT, () => {
  console.log(`ESG Data Management Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
