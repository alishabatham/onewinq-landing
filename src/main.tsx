import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import './index.css';
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ErrorBoundary>
);
