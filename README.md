# ESG Data Management Application

A modern, minimalist ESG (Environmental, Social, Governance) data management web application built with TypeScript, React, and Material Design principles.

## 🚀 Features

- **Interactive Dashboard** with real-time ESG metrics visualization
- **CSV Import/Export** with drag-and-drop functionality
- **Data Input Forms** with comprehensive validation
- **Role-Based Navigation** for different user types
- **Material Design UI** with responsive layout
- **REST API** with TypeScript validation using Zod
- **Charts & Analytics** using Chart.js

## 🏗️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Chart.js** for data visualizations
- **React Dropzone** for file uploads

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **Zod** for data validation
- **CSV Parser/Writer** for data import/export
- **In-memory storage** for cost-effective data management

## 📋 Prerequisites

- **Node.js** 18+
- **npm** 8+ (or yarn/pnpm)

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install all dependencies
npm install
```

### 2. Fix ES Module Issues (Important!)

To avoid ES module scope problems and warnings, update the `package.json`:

```bash
# Add "type": "module" to package.json to fix PostCSS warnings
npm run fix-modules
```

Or manually add this to your `package.json`:

```json
{
  "type": "module"
  // ... rest of your package.json
}
```

### 3. Development Server

```bash
# Start both frontend and backend development servers
npm run dev

# Or start them separately:
npm run dev:client  # Frontend (Vite) - http://localhost:3001
npm run dev:server  # Backend (Express) - http://localhost:3000
```

### 4. Production Build

```bash
# Build both client and server
npm run build

# Build separately:
npm run build:client  # Builds frontend to dist/client
npm run build:server  # Builds backend to dist/server

# Start production server
npm start
```

## 📁 Project Structure

```
esg-data-management/
├── src/
│   ├── client/                 # Frontend React application
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── ui/         # Basic UI components (Button, Card, Input)
│   │   │   │   ├── layout/     # Layout components (Navigation, Layout)
│   │   │   │   ├── views/      # Page components (Dashboard, AddMetric)
│   │   │   │   └── charts/     # Chart components
│   │   │   ├── services/       # API service layer
│   │   │   ├── types/          # TypeScript type definitions
│   │   │   └── App.tsx         # Main application component
│   │   ├── index.html          # HTML template
│   │   └── src/index.css       # Global styles
│   │
│   └── server/                 # Backend Express server
│       ├── types/              # Shared type definitions
│       ├── store/              # Data storage layer
│       └── server.ts           # Express server setup
│
├── dist/                       # Built files (generated)
├── uploads/                    # CSV upload directory (generated)
├── exports/                    # CSV export directory (generated)
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript config (client)
├── tsconfig.server.json       # TypeScript config (server)
├── tsconfig.node.json         # TypeScript config (Vite)
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── postcss.config.js          # PostCSS configuration
```

## 📜 Available Scripts

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start both frontend and backend in development mode |
| `npm run dev:client`   | Start only frontend development server (port 3001)  |
| `npm run dev:server`   | Start only backend development server (port 3000)   |
| `npm run build`        | Build both frontend and backend for production      |
| `npm run build:client` | Build only frontend                                 |
| `npm run build:server` | Build only backend                                  |
| `npm start`            | Start production server                             |
| `npm run preview`      | Preview production build locally                    |

## 🔧 Troubleshooting Common Issues

### ES Module Scope Problems

**Problem:** Warnings about module type or CommonJS/ES module conflicts

**Solution:**

1. Add `"type": "module"` to `package.json`
2. Ensure all imports use `.js` extensions in TypeScript server files
3. Use `import` syntax consistently

### Vite CJS Deprecation Warning

**Problem:** "The CJS build of Vite's Node API is deprecated"

**Solution:** This is a known issue with Vite 5.x and doesn't affect functionality. To suppress:

```json
// package.json
{
  "type": "module"
}
```

### PostCSS Module Warning

**Problem:** "Module type of postcss.config.js is not specified"

**Solution:** Add `"type": "module"` to package.json or rename to `postcss.config.mjs`

### Port Conflicts

**Problem:** Ports 3000 or 3001 already in use

**Solution:**

```bash
# Kill processes using the ports
npx kill-port 3000 3001

# Or change ports in:
# - vite.config.ts (client port)
# - src/server/server.ts (server port)
```

### API Connection Issues

**Problem:** Frontend can't connect to backend API

**Solution:**

1. Ensure both servers are running (`npm run dev`)
2. Check proxy configuration in `vite.config.ts`
3. Verify backend is running on port 3000
4. Test API directly: `curl http://localhost:3000/health`

## 🎯 Development Workflow

### Adding New Features

1. **Frontend Components:**

   ```bash
   # Add new component in src/client/src/components/
   # Update types in src/client/src/types/
   # Add API calls in src/client/src/services/api.ts
   ```

2. **Backend Endpoints:**
   ```bash
   # Add routes in src/server/server.ts
   # Update validation schemas in src/server/types/
   # Update data store in src/server/store/dataStore.ts
   ```

### Code Organization

- **UI Components:** Reusable, single-responsibility components
- **Type Safety:** Full TypeScript coverage with Zod validation
- **API Layer:** Centralized API service with error handling
- **Responsive Design:** Mobile-first approach with Tailwind CSS

## 🌐 Environment Configuration

### Development

- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- API Proxy: Automatic via Vite

### Production

- Set `NODE_ENV=production`
- Configure ports via environment variables
- Build static assets: `npm run build`

## 📊 API Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/health`          | Health check      |
| GET    | `/api/dashboard`   | Dashboard data    |
| GET    | `/api/metrics`     | All ESG metrics   |
| POST   | `/api/metrics`     | Create new metric |
| PUT    | `/api/metrics/:id` | Update metric     |
| DELETE | `/api/metrics/:id` | Delete metric     |
| POST   | `/api/import/csv`  | Import CSV data   |
| GET    | `/api/export/csv`  | Export CSV data   |
| GET    | `/api/users`       | User data         |

## 🔒 Security & Validation

- **Input Validation:** Zod schemas for all API inputs
- **Type Safety:** Full TypeScript coverage
- **CORS:** Configured for development
- **File Uploads:** Restricted to CSV files only
- **Error Handling:** Comprehensive error responses

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Cloud Platforms

```bash
# Ensure build directory structure:
dist/
├── client/     # Static frontend files
└── server/     # Compiled backend

# Start production server
NODE_ENV=production npm start
```

## 📝 Contributing

1. Follow TypeScript strict mode
2. Use Tailwind CSS for styling
3. Maintain component modularity
4. Add proper error handling
5. Update types for new features

## 🐛 Known Issues

- Vite CJS deprecation warning (harmless)
- PostCSS module type warning (fixed with package.json type field)

## 📞 Support

For issues related to:

- **Setup/Installation:** Check troubleshooting section
- **ES Module Problems:** Ensure `"type": "module"` in package.json
- **Build Errors:** Verify Node.js version (18+)
- **API Issues:** Check server logs and network tab

---

**Built with ❤️ for sustainable business practices**
