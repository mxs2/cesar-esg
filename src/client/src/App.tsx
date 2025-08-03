import React, { useState } from "react";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./components/views/Dashboard";
import { Metrics } from "./components/views/Metrics";
import { AddMetric } from "./components/views/AddMetric";
import { ImportData } from "./components/views/ImportData";
import { ExportData } from "./components/views/ExportData";
import { ViewMode } from "./types";

function App() {
  const [activeView, setActiveView] = useState<ViewMode>("dashboard");
  const [userRole] = useState("esg"); // In a real app, this would come from authentication

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "metrics":
        return <Metrics />;
      case "add-metric":
        return <AddMetric />;
      case "import":
        return <ImportData />;
      case "export":
        return <ExportData />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      activeView={activeView}
      onViewChange={setActiveView}
      userRole={userRole}
    >
      {renderView()}
    </Layout>
  );
}

export default App;
