import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 0.2, // Ajusta según el volumen de tráfico
      environment: process.env.NODE_ENV,
      release: `horizon-etica@${process.env.REACT_APP_VERSION || '1.0.0'}`,
    });
  }
};

export const logError = (error, errorInfo = null) => {
  console.error(error);
  
  if (process.env.NODE_ENV === 'production') {
    if (errorInfo) {
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    } else {
      Sentry.captureException(error);
    }
  }
};

export const logMessage = (message, level = 'info', extra = {}) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.withScope(scope => {
      Object.entries(extra).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
      Sentry.captureMessage(message, level);
    });
  } else {
    console[level](message, extra);
  }
};
