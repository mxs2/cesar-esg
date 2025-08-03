import React from "react";
import { Navigation } from "./Navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ViewMode } from "../../types";

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  userRole?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeView,
  onViewChange,
  userRole,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation
        activeView={activeView}
        onViewChange={onViewChange}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col">
        <Header activeView={activeView} userRole={userRole} />
        <main className="flex-1 p-4 lg:p-8 custom-scrollbar overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
