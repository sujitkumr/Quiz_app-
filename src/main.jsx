import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.css';
import './styles/animations.css';

// Error Boundary Component (Must be PascalCase)
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong!</h2>
          <p>Please refresh the page to continue</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Root initialization
const container = document.getElementById('root');
const root = createRoot(container);

// Render hierarchy
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);