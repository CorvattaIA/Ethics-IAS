import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';
import { initSentry } from '@/lib/monitoring';

// Inicializar monitoreo
initSentry();

// Crear un componente de límite de error
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Registrar el error en Sentry
    console.error('Error capturado por el límite de error:', error, errorInfo);
    if (process.env.NODE_ENV === 'production') {
      const { logError } = require('@/lib/monitoring');
      logError(error, { errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-deep-indigo text-white p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
            <p className="mb-6">Lo sentimos, ha ocurrido un error inesperado.</p>
            <button
              className="px-4 py-2 bg-brand-vibrant-red text-white rounded-md hover:bg-opacity-90 transition-colors"
              onClick={() => window.location.reload()}
            >
              Recargar la página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
