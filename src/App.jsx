import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import LogMeal from './pages/LogMeal';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // Tracks which screen is active

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans">
      {currentView === 'dashboard' ? (
        <Dashboard onNavigateLog={() => setCurrentView('log')} />
      ) : (
        <LogMeal onBack={() => setCurrentView('dashboard')} />
      )}
    </div>
  );
}