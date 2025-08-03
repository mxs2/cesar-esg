# Aplicação de Gestão de Dados ESG

Uma aplicação web moderna e minimalista para gestão de dados ESG (Ambiental, Social, Governança) construída com TypeScript, React e princípios de Material Design.

## 🚀 Funcionalidades

- **Dashboard Interativo** com visualização de métricas ESG em tempo real
- **Importação/Exportação CSV** com funcionalidade de arrastar e soltar
- **Formulários de Entrada de Dados** com validação abrangente
- **Navegação Baseada em Funções** para diferentes tipos de usuários
- **Interface Material Design** com layout responsivo
- **API REST** com validação TypeScript usando Zod
- **Gráficos e Análises** usando Chart.js

## 🏗️ Stack Tecnológica

### Frontend

- **React 18** com TypeScript
- **Vite** para desenvolvimento rápido e build
- **Tailwind CSS** para estilização
- **Chart.js** para visualização de dados
- **React Dropzone** para upload de arquivos

### Backend

- **Node.js** com Express
- **TypeScript** para type safety
- **Zod** para validação de dados
- **CSV Parser/Writer** para importação/exportação de dados
- **Armazenamento em memória** para gestão de dados econômica

## 📋 Pré-requisitos

- **Node.js** 18+
- **npm** 8+ (ou yarn/pnpm)

## 🛠️ Instalação e Configuração

### 1. Clonar e Instalar Dependências

```bash
# Instalar todas as dependências
npm install
```

### 2. Corrigir Problemas de Módulos ES (Importante!)

Para evitar problemas de escopo de módulos ES e avisos, atualize o `package.json`:

```bash
# Adicionar "type": "module" ao package.json para corrigir avisos do PostCSS
npm run fix-modules
```

Ou adicione manualmente isso ao seu `package.json`:

```json
{
  "type": "module"
  // ... resto do seu package.json
}
```

### 3. Servidor de Desenvolvimento

```bash
# Iniciar servidores de desenvolvimento frontend e backend
npm run dev

# Ou iniciá-los separadamente:
npm run dev:client  # Frontend (Vite) - http://localhost:3001
npm run dev:server  # Backend (Express) - http://localhost:3000
```

### 4. Build de Produção

```bash
# Build do cliente e servidor
npm run build

# Build separadamente:
npm run build:client  # Build do frontend para dist/client
npm run build:server  # Build do backend para dist/server

# Iniciar servidor de produção
npm start
```

## 📁 Estrutura do Projeto

```
esg-data-management/
├── src/
│   ├── client/                 # Aplicação React frontend
│   │   ├── src/
│   │   │   ├── components/     # Componentes UI reutilizáveis
│   │   │   │   ├── ui/         # Componentes UI básicos (Button, Card, Input)
│   │   │   │   ├── layout/     # Componentes de layout (Navigation, Layout)
│   │   │   │   ├── views/      # Componentes de página (Dashboard, AddMetric)
│   │   │   │   └── charts/     # Componentes de gráficos
│   │   │   ├── services/       # Camada de serviço da API
│   │   │   ├── types/          # Definições de tipos TypeScript
│   │   │   └── App.tsx         # Componente principal da aplicação
│   │   ├── index.html          # Template HTML
│   │   └── src/index.css       # Estilos globais
│   │
│   └── server/                 # Servidor Express backend
│       ├── types/              # Definições de tipos compartilhados
│       ├── store/              # Camada de armazenamento de dados
│       └── server.ts           # Configuração do servidor Express
│
├── dist/                       # Arquivos compilados (gerados)
├── uploads/                    # Diretório de upload CSV (gerado)
├── exports/                    # Diretório de exportação CSV (gerado)
├── package.json                # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript (cliente)
├── tsconfig.server.json       # Configuração TypeScript (servidor)
├── tsconfig.node.json         # Configuração TypeScript (Vite)
├── vite.config.ts             # Configuração do Vite
├── tailwind.config.js         # Configuração do Tailwind CSS
└── postcss.config.js          # Configuração do PostCSS
```

## 📜 Scripts Disponíveis

| Comando                | Descrição                                                        |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Iniciar frontend e backend em modo de desenvolvimento            |
| `npm run dev:client`   | Iniciar apenas servidor de desenvolvimento frontend (porta 3001) |
| `npm run dev:server`   | Iniciar apenas servidor de desenvolvimento backend (porta 3000)  |
| `npm run build`        | Build de frontend e backend para produção                        |
| `npm run build:client` | Build apenas do frontend                                         |
| `npm run build:server` | Build apenas do backend                                          |
| `npm start`            | Iniciar servidor de produção                                     |
| `npm run preview`      | Visualizar build de produção localmente                          |

## 🔧 Solução de Problemas Comuns

### Problemas de Escopo de Módulos ES

**Problema:** Avisos sobre tipo de módulo ou conflitos CommonJS/ES module

**Solução:**

1. Adicionar `"type": "module"` ao `package.json`
2. Garantir que todas as importações usem extensões `.js` nos arquivos TypeScript do servidor
3. Usar sintaxe `import` consistentemente

### Aviso de Depreciação CJS do Vite

**Problema:** "The CJS build of Vite's Node API is deprecated"

**Solução:** Este é um problema conhecido com Vite 5.x e não afeta a funcionalidade. Para suprimir:

```json
// package.json
{
  "type": "module"
}
```

### Aviso de Módulo PostCSS

**Problema:** "Module type of postcss.config.js is not specified"

**Solução:** Adicionar `"type": "module"` ao package.json ou renomear para `postcss.config.mjs`

### Conflitos de Porta

**Problema:** Portas 3000 ou 3001 já estão em uso

**Solução:**

```bash
# Finalizar processos usando as portas
npx kill-port 3000 3001

# Ou alterar portas em:
# - vite.config.ts (porta do cliente)
# - src/server/server.ts (porta do servidor)
```

### Problemas de Conexão da API

**Problema:** Frontend não consegue conectar à API do backend

**Solução:**

1. Garantir que ambos os servidores estão rodando (`npm run dev`)
2. Verificar configuração de proxy em `vite.config.ts`
3. Verificar se o backend está rodando na porta 3000
4. Testar API diretamente: `curl http://localhost:3000/health`

## 🎯 Fluxo de Desenvolvimento

### Adicionando Novas Funcionalidades

1. **Componentes Frontend:**

   ```bash
   # Adicionar novo componente em src/client/src/components/
   # Atualizar tipos em src/client/src/types/
   # Adicionar chamadas da API em src/client/src/services/api.ts
   ```

2. **Endpoints Backend:**
   ```bash
   # Adicionar rotas em src/server/server.ts
   # Atualizar schemas de validação em src/server/types/
   # Atualizar data store em src/server/store/dataStore.ts
   ```

### Organização do Código

- **Componentes UI:** Componentes reutilizáveis, responsabilidade única
- **Type Safety:** Cobertura completa TypeScript com validação Zod
- **Camada API:** Serviço de API centralizado com tratamento de erros
- **Design Responsivo:** Abordagem mobile-first com Tailwind CSS

## 🌐 Configuração de Ambiente

### Desenvolvimento

- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- Proxy da API: Automático via Vite

### Produção

- Definir `NODE_ENV=production`
- Configurar portas via variáveis de ambiente
- Build de assets estáticos: `npm run build`

## 📊 Endpoints da API

| Método | Endpoint           | Descrição             |
| ------ | ------------------ | --------------------- |
| GET    | `/health`          | Verificação de saúde  |
| GET    | `/api/dashboard`   | Dados do dashboard    |
| GET    | `/api/metrics`     | Todas as métricas ESG |
| POST   | `/api/metrics`     | Criar nova métrica    |
| PUT    | `/api/metrics/:id` | Atualizar métrica     |
| DELETE | `/api/metrics/:id` | Deletar métrica       |
| POST   | `/api/import/csv`  | Importar dados CSV    |
| GET    | `/api/export/csv`  | Exportar dados CSV    |
| GET    | `/api/users`       | Dados de usuário      |

## 🔒 Segurança e Validação

- **Validação de Entrada:** Schemas Zod para todas as entradas da API
- **Type Safety:** Cobertura completa TypeScript
- **CORS:** Configurado para desenvolvimento
- **Upload de Arquivos:** Restrito apenas a arquivos CSV
- **Tratamento de Erros:** Respostas de erro abrangentes

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

### Deploy para Plataformas Cloud

```bash
# Garantir estrutura do diretório de build:
dist/
├── client/     # Arquivos estáticos do frontend
└── server/     # Backend compilado

# Iniciar servidor de produção
NODE_ENV=production npm start
```

## 📝 Contribuindo

1. Seguir modo strict do TypeScript
2. Usar Tailwind CSS para estilização
3. Manter modularidade dos componentes
4. Adicionar tratamento adequado de erros
5. Atualizar tipos para novas funcionalidades

## 🐛 Problemas Conhecidos

- Aviso de depreciação CJS do Vite (inofensivo)
- Aviso de tipo de módulo PostCSS (corrigido com campo type do package.json)

## 📞 Suporte

Para problemas relacionados a:

- **Configuração/Instalação:** Verificar seção de solução de problemas
- **Problemas de Módulos ES:** Garantir `"type": "module"` no package.json
- **Erros de Build:** Verificar versão do Node.js (18+)
- **Problemas de API:** Verificar logs do servidor e aba de rede

---

**Construído com ❤️ para práticas empresariais sustentáveis**
