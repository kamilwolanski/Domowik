import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './Stylesheet/main.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
