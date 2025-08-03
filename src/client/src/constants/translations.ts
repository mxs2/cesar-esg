// Portuguese translations for the ESG Data Management application

export const translations = {
  // Navigation
  navigation: {
    dashboard: "Dashboard",
    metrics: "Métricas ESG",
    addMetric: "Adicionar Métrica",
    import: "Importar Dados",
    export: "Exportar Dados",
    appTitle: "Gestor ESG",
    appSubtitle: "Gestão de Dados",
  },

  // Dashboard
  dashboard: {
    title: "Dashboard ESG",
    subtitle:
      "Monitore e acompanhe o desempenho ambiental, social e de governança da sua organização",
    environmental: "Métricas Ambientais",
    social: "Métricas Sociais",
    governance: "Métricas de Governança",
    metricsDistribution: "Distribuição das Métricas",
    performanceTrends: "Tendências de Performance",
    currentQuarter: "Trimestre Atual",
    keyMetrics: "Métricas Principais",
    totalMetrics: "Total de Métricas Acompanhadas",
    verifiedMetrics: "Métricas Verificadas",
    pendingVerification: "Pendente de Verificação",
    recentMetrics: "Métricas Recentes",
    latestEntries: "Últimas entradas de dados ESG",
    noMetricsAvailable: "Nenhuma métrica disponível",
    reportedBy: "Relatado por",
    loadingDashboard: "Carregando dashboard...",
    errorLoading: "Erro ao carregar dashboard",
    retry: "Tentar Novamente",
  },

  // Categories
  categories: {
    environmental: "Ambiental",
    social: "Social",
    governance: "Governança",
  },

  // Status
  status: {
    verified: "Verificado",
    pending: "Pendente",
    active: "Ativo",
    inactive: "Inativo",
  },

  // Forms
  forms: {
    category: "Categoria",
    metricName: "Nome da Métrica",
    value: "Valor",
    unit: "Unidade",
    period: "Período",
    source: "Fonte",
    reportedBy: "Relatado por",
    dateReported: "Data de Relatório",
    verified: "Marcar como verificado",
    notes: "Observações",
    required: "obrigatório",
    optional: "opcional",
    save: "Salvar",
    cancel: "Cancelar",
    reset: "Limpar",
    submit: "Enviar",
    addMetric: "Adicionar Métrica",
    updateMetric: "Atualizar Métrica",
    deleteMetric: "Excluir Métrica",
  },

  // Import/Export
  importExport: {
    importTitle: "Importar Dados ESG",
    importSubtitle:
      "Faça upload de arquivos CSV para importar métricas ESG no sistema",
    exportTitle: "Exportar Dados ESG",
    exportSubtitle:
      "Baixe seus dados de métricas ESG em formato CSV para relatórios e análises",
    uploadCSV: "Upload de Arquivo CSV",
    dragDrop: "Arraste e solte um arquivo CSV aqui, ou clique para selecionar",
    supportedFiles: "Suporta arquivos CSV até 5MB",
    selectedFile: "Arquivo selecionado:",
    size: "Tamanho:",
    remove: "Remover",
    importData: "Importar Dados",
    downloadSample: "Baixar Exemplo",
    exportToCSV: "Exportar para CSV",
    formatRequirements: "Requisitos de Formato CSV",
    csvFormat: "Formato CSV",
    useCases: "Casos de Uso",
    exportFor: "Exporte seus dados para:",
    regulatoryReporting: "Relatórios regulamentários e conformidade",
    stakeholderPresentations: "Apresentações para stakeholders e dashboards",
    dataAnalysis: "Análise de dados e identificação de tendências",
    systemIntegration: "Integração com sistemas externos",
  },

  // Messages
  messages: {
    success: "Sucesso",
    error: "Erro",
    warning: "Aviso",
    info: "Informação",
    loading: "Carregando...",
    noData: "Nenhum dado disponível",
    confirmDelete: "Tem certeza que deseja excluir esta métrica?",
    deleteSuccess: "Métrica excluída com sucesso",
    saveSuccess: "Métrica salva com sucesso",
    importSuccess: "Dados importados com sucesso",
    exportSuccess: "Dados exportados com sucesso",
    validationError: "Erro de validação",
    networkError: "Erro de conexão",
    unauthorized: "Não autorizado",
    notFound: "Não encontrado",
  },

  // Validation
  validation: {
    required: "Este campo é obrigatório",
    invalidEmail: "Email inválido",
    invalidNumber: "Deve ser um número válido",
    invalidDate: "Data inválida",
    minLength: "Deve ter pelo menos {min} caracteres",
    maxLength: "Deve ter no máximo {max} caracteres",
    invalidFormat: "Formato inválido",
    periodFormat: "Período deve estar no formato AAAA ou AAAA-QX",
    positiveNumber: "Valor deve ser um número positivo",
  },

  // Common
  common: {
    yes: "Sim",
    no: "Não",
    ok: "OK",
    close: "Fechar",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    search: "Pesquisar",
    filter: "Filtrar",
    sort: "Ordenar",
    refresh: "Atualizar",
    edit: "Editar",
    delete: "Excluir",
    view: "Visualizar",
    download: "Baixar",
    upload: "Upload",
    all: "Todos",
    none: "Nenhum",
    other: "Outro",
  },
};

export type TranslationKey = keyof typeof translations;
