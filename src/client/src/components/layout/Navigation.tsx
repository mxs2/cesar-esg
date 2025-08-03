import React, { useState } from "react";
import { ViewMode } from "../../types";

interface NavigationProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  userRole?: string;
}

const NAVIGATION_ITEMS = [
  {
    id: "dashboard" as ViewMode,
    label: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    roles: ["esg", "marketing", "leadership", "admin"],
    description: "Visão geral dos indicadores",
  },
  {
    id: "metrics" as ViewMode,
    label: "Métricas ESG",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    roles: ["esg", "admin"],
    description: "Gerenciar métricas",
  },
  {
    id: "add-metric" as ViewMode,
    label: "Adicionar Métrica",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
    roles: ["esg", "admin"],
    description: "Registrar nova métrica",
  },
  {
    id: "import" as ViewMode,
    label: "Importar Dados",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
        />
      </svg>
    ),
    roles: ["esg", "admin"],
    description: "Importar de fontes externas",
  },
  {
    id: "export" as ViewMode,
    label: "Exportar Dados",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
    roles: ["esg", "marketing", "leadership", "admin"],
    description: "Exportar relatórios",
  },
];

const ROLE_DISPLAY_NAMES: Record<string, string> = {
  esg: "Analista ESG",
  marketing: "Marketing",
  leadership: "Liderança",
  admin: "Administrador",
};

const ROLE_BADGE_COLORS: Record<string, string> = {
  admin: "bg-red-100 text-red-700 border-red-200",
  esg: "bg-primary-100 text-primary-700 border-primary-200",
  leadership: "bg-purple-100 text-purple-700 border-purple-200",
  marketing: "bg-orange-100 text-orange-700 border-orange-200",
};

export const Navigation: React.FC<NavigationProps> = ({
  activeView,
  onViewChange,
  userRole = "esg",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allowedItems = NAVIGATION_ITEMS.filter((item) =>
    item.roles.includes(userRole),
  );
  const roleDisplayName = ROLE_DISPLAY_NAMES[userRole] || "Usuário";
  const roleBadgeColor =
    ROLE_BADGE_COLORS[userRole] || "bg-gray-100 text-gray-700 border-gray-200";

  // Accessibility: close menu on Escape
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-2.5 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <div className="w-5 h-5 flex flex-col justify-around">
            <span
              className={`bg-gray-700 h-0.5 w-5 rounded transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`bg-gray-700 h-0.5 w-5 rounded transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`bg-gray-700 h-0.5 w-5 rounded transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Fechar menu"
          tabIndex={-1}
        />
      )}

      {/* Navigation Sidebar */}
      <nav
        aria-label="Menu principal"
        className={`
          bg-white shadow-xl border-r border-gray-200 min-h-screen
          md:relative md:translate-x-0 md:w-64 lg:w-72 md:flex-shrink-0
          fixed z-50 w-72 max-w-[85vw] transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "md:translate-x-0 -translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">EPM</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    ESG Process
                  </h1>
                  <p className="text-sm text-gray-600">Management</p>
                </div>
              </div>
              {/* Close button for mobile */}
              <button
                aria-label="Fechar menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* User role badge */}
            <div
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${roleBadgeColor}`}
            >
              <svg
                className="w-3 h-3 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {roleDisplayName}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
              Menu Principal
            </div>
            {allowedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`group w-full text-left p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  activeView === item.id
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/25"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
                aria-current={activeView === item.id ? "page" : undefined}
                aria-label={item.label}
                tabIndex={0}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      activeView === item.id
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-gray-200"
                    }`}
                  >
                    <div
                      className={`transition-colors ${
                        activeView === item.id
                          ? "text-white"
                          : "text-gray-600 group-hover:text-gray-700"
                      }`}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm leading-tight">
                      {item.label}
                    </div>
                    <div
                      className={`text-xs mt-0.5 ${
                        activeView === item.id
                          ? "text-white/80"
                          : "text-gray-500 group-hover:text-gray-600"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                  {activeView === item.id && (
                    <div
                      className="w-2 h-2 bg-white rounded-full"
                      aria-hidden="true"
                    ></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
