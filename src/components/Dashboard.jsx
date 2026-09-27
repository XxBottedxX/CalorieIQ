import React from 'react';

export default function Dashboard({ meals, totalCalories, targetCalories, userProfile, onNavigateLog }) {
  const caloriesLeft = targetCalories - totalCalories;
  const progressPercent = Math.min(Math.round((totalCalories / targetCalories) * 100), 100);

  // Calculate quick totals for macros from logged meals
  const totalProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);
  const totalCarbs = meals.reduce((sum, m) => sum + (m.carbs || 0), 0);
  const totalFat = meals.reduce((sum, m) => sum + (m.fat || 0), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="flex justify-between items-center bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 p-8 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Active Plan: {userProfile?.goalType?.replace('_', ' ').toUpperCase()}
          </span>
          <h2 className="text-3xl font-black mt-3 text-white">Welcome back, Athlete 👋</h2>
          <p className="text-slate-400 text-sm mt-1">Here is your nutritional snapshot for today.</p>
        </div>
        <button
          onClick={onNavigateLog}
          className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-3.5 rounded-2xl font-bold transition shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          <span>✨ Log New Meal</span>
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calories Card */}
        <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-200">Daily Calorie Budget</h3>
            <span className="text-xs text-slate-400 font-medium">Target: {targetCalories} kcal</span>
          </div>

          <div className="grid grid-cols-2 gap-6 my-6">
            <div>
              <p className="text-5xl font-black text-emerald-400 tracking-tight">{totalCalories}</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">Calories Consumed</p>
            </div>
            <div className="border-l border-slate-800/80 pl-6">
              <p className="text-5xl font-black text-sky-400 tracking-tight">{caloriesLeft}</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">Remaining</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-slate-400">Daily Goal Completion</span>
              <span className="text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full transition-all duration-700 rounded-full shadow-lg shadow-emerald-500/30" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Macro Breakdown Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
          <h3 className="text-lg font-bold text-slate-200 mb-4">Macro Nutrients</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400 font-medium">Protein</span>
                <span className="font-bold text-emerald-400">{totalProtein}g</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min((totalProtein / 150) * 100, 100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400 font-medium">Carbs</span>
                <span className="font-bold text-amber-400">{totalCarbs}g</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min((totalCarbs / 250) * 100, 100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400 font-medium">Fat</span>
                <span className="font-bold text-rose-400">{totalFat}g</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.min((totalFat / 70) * 100, 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meals Stream Header */}
      <div className="flex justify-between items-center pt-4">
        <h3 className="text-2xl font-black text-white">Today's Meals</h3>
        <button
          onClick={onNavigateLog}
          className="md:hidden bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl font-bold text-sm"
        >
          + Add Meal
        </button>
      </div>

      {/* Meals Feed */}
      <div className="space-y-4">
        {meals.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800/80 p-12 rounded-3xl text-center text-slate-400 text-base">
            No meals logged yet today. Click <span className="text-emerald-400 font-semibold">"Log New Meal"</span> to start tracking!
          </div>
        ) : (
          meals.map((meal, index) => (
            <div key={index} className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 p-6 rounded-2xl flex justify-between items-center transition shadow-lg group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl text-emerald-400 group-hover:scale-105 transition">
                  🍽️
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white group-hover:text-emerald-400 transition">{meal.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Logged at {meal.time} • <span className="text-emerald-400 font-medium">P: {meal.protein}g</span> | <span className="text-amber-400 font-medium">C: {meal.carbs}g</span> | <span className="text-rose-400 font-medium">F: {meal.fat}g</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400">{meal.calories}</span>
                <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-bold">kcal</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}