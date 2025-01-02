import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.tsx';
import './Stylesheet/main.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NotificationProvider from './Components/Notification/NotificationProvider.tsx';
import ErrorGeneric from './Components/Errors/ErrorGeneric.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        FallbackComponent={ErrorGeneric}
        onReset={() => queryClient.clear()}
      >
        <NotificationProvider>
          <BrowserRouter>
            <App />
            <ReactQueryDevtools initialIsOpen />
          </BrowserRouter>
        </NotificationProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
