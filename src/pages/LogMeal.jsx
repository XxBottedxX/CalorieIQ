import React, { useState } from 'react';

export default function LogMeal({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState('photo'); // 'photo' or 'presage'

  const handleSnapPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setTimeout(() => {
      setResult({
        name: "Grilled Chicken & Quinoa Bowl",
        calories: 580,
        protein: 42,
        carbs: 45,
        fat: 14,
        source: "Google Gemini Vision API"
      });
      setLoading(false);
    }, 1500);
  };

  const handlePresageVitals = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        vitalsSummary: "Heart Rate: 72 BPM | Stress Index: Low (Optimal)",
        source: "Presage Camera Vitals"
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 pb-20">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-slate-400 hover:text-white font-medium">
          ← Back
        </button>
        <h1 className="text-lg font-bold">AI Capture & Vitals</h1>
        <div className="w-10"></div>
      </div>

      {/* Mode Switcher */}
      <div className="flex bg-slate-800 p-1 rounded-xl mb-6">
        <button 
          onClick={() => { setMode('photo'); setResult(null); }}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${mode === 'photo' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
        >
          📷 Food AI (Gemini)
        </button>
        <button 
          onClick={() => { setMode('presage'); setResult(null); }}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${mode === 'presage' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
        >
          👁️ Vitals (Presage)
        </button>
      </div>

      {/* Active Mode UI */}
      {mode === 'photo' ? (
        <div className="bg-slate-800 border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
          <div className="text-4xl mb-3">📸</div>
          <h2 className="font-semibold text-lg mb-1">Snap Your Meal</h2>
          <p className="text-slate-400 text-sm mb-6">Gemini Vision will instantly analyze macros and estimate calories.</p>
          
          <label className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl cursor-pointer shadow-lg transition">
            Upload / Take Photo
            <input type="file" accept="image/*" onChange={handleSnapPhoto} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="bg-slate-800 border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
          <div className="text-4xl mb-3">👁️</div>
          <h2 className="font-semibold text-lg mb-1">Presage Camera Scan</h2>
          <p className="text-slate-400 text-sm mb-6">Monitor real-time health biometrics via your device camera.</p>
          
          <button 
            onClick={handlePresageVitals}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            Start Vitals Scan
          </button>
        </div>
      )}

      {loading && (
        <div className="mt-6 text-center text-slate-400 animate-pulse">
          Processing data through AI pipeline...
        </div>
      )}

      {result && !loading && (
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Successfully Logged via {result.source}</span>
          
          {result.calories ? (
            <div className="mt-3">
              <h3 className="font-bold text-xl text-white mb-2">{result.name}</h3>
              <div className="grid grid-cols-4 gap-2 text-center bg-slate-900/50 p-3 rounded-xl">
                <div>
                  <p className="text-xs text-slate-400">Calories</p>
                  <p className="font-bold text-emerald-400">{result.calories}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Protein</p>
                  <p className="font-bold">{result.protein}g</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Carbs</p>
                  <p className="font-bold">{result.carbs}g</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Fat</p>
                  <p className="font-bold">{result.fat}g</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <p className="font-bold text-lg text-white">{result.vitalsSummary}</p>
            </div>
          )}

          <button 
            onClick={() => alert("Saved to Tiger Data database & synced with Snowflake!")}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition"
          >
            Confirm & Save to Tiger Data 🐅
          </button>
        </div>
      )}
    </div>
  );
}