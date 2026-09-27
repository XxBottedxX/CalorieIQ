import React from 'react';

export default function Dashboard({ onNavigateLog }) {
  return (
    <div className="min-h-screen bg-slate-900 p-4 pb-20 text-slate-100">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">HealthPulse 🚀</h1>
        <span className="text-sm bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-medium border border-emerald-500/30">Cut Goal</span>
      </header>

      {/* Morning Brief Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg mb-6">
        <h2 className="text-lg font-semibold mb-1">☀️ Morning Daily Brief</h2>
        <p className="text-blue-100 text-sm mb-3">"Yesterday you hit 92% of your protein goal. Weight is trending down by 0.4 lbs this week—on track!"</p>
        <div className="bg-white/10 rounded-xl p-3 flex justify-between text-center">
          <div>
            <p className="text-xs text-blue-200">New Target</p>
            <p className="font-bold text-lg">2,150 kcal</p>
          </div>
          <div>
            <p className="text-xs text-blue-200">Weekly Pace</p>
            <p className="font-bold text-lg">-1.2 lbs/wk</p>
          </div>
        </div>
      </div>

      {/* Calorie Progress Bar */}
      <div className="bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-700 mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-slate-200">Today's Calories</span>
          <span className="text-slate-400 text-sm">1,420 / 2,150 kcal</span>
        </div>
        <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full w-[65%]"></div>
        </div>
      </div>

      {/* Quick Action Button to Log Meal */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <button 
          onClick={onNavigateLog}
          className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:bg-blue-500 transition"
        >
          📷 Snap Meal / Scan Vitals
        </button>
      </div>
    </div>
  );
}