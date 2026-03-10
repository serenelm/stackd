import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="branding">
            <h1>stackd</h1>
            <p className="tagline">stack smarter</p>
          </div>
          <div className="header-info">
            <span className="status-badge">
              <span className="status-dot"></span>
              Live
            </span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Dashboard />
      </main>

      <footer className="app-footer">
        <p>stackd &copy; 2026 • Your unified wealth wellness dashboard</p>
      </footer>
    </div>
  );
}

export default App;
