import React from "react";
import { ViewMode } from "../../types";

interface HeaderProps {
  activeView: ViewMode;
  userRole?: string;
}

const BREADCRUMBS: Record<ViewMode, string[]> = {
  dashboard: ["Início", "Dashboard"],
  metrics: ["Dados", "Métricas ESG"],
  "add-metric": ["Dados", "Adicionar Métrica"],
  import: ["Dados", "Importar"],
  export: ["Dados", "Exportar"],
};

export const Header: React.FC<HeaderProps> = ({ activeView }) => {
  const breadcrumb = BREADCRUMBS[activeView] || BREADCRUMBS.dashboard;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between">
        {/* Breadcrumb */}
        <nav
          className="flex items-center text-xs text-gray-500"
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((item, idx) => (
            <React.Fragment key={idx}>
              <span
                className={
                  idx === breadcrumb.length - 1
                    ? "text-gray-900 font-semibold"
                    : ""
                }
              >
                {item}
              </span>
              {idx < breadcrumb.length - 1 && (
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};
