import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>
              &copy; {currentYear}{" "}
              <span className="font-semibold">
                ESG Process Management (EPM)
              </span>
              .
            </span>
            <span className="hidden sm:inline">
              Todos os direitos reservados.
            </span>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <a
              href="https://github.com/mxs2/cesar-epm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <span aria-hidden="true">&middot;</span>
            {/* <a
              href="/privacy"
              className="hover:underline"
            >
              Política de Privacidade
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
