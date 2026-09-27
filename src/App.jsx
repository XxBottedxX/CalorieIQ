import React, { useState } from 'react';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LogMeal from './components/LogMeal';

export default function App() {
  // Initialize state from localStorage if available so it doesn't re-prompt after login
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem('calorieiq_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('calorieiq_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentView, setCurrentView] = useState('dashboard');
  
  const [meals, setMeals] = useState([
    { name: 'Protein Oatmeal', calories: 380, protein: 24, carbs: 45, fat: 8, time: '08:30 AM' },
    { name: 'Chicken & Rice Bowl', calories: 620, protein: 48, carbs: 65, fat: 12, time: '01:15 PM' },
  ]);

  // Handle Authentication login/signup
  const handleAuthenticated = (userData) => {
    setAuthUser(userData);
    localStorage.setItem('calorieiq_user', JSON.stringify(userData));
  };

  // Handle Onboarding completion and save to profile storage
  const handleOnboardingComplete = (profileData) => {
    setUserProfile(profileData);
    localStorage.setItem('calorieiq_profile', JSON.stringify(profileData));
  };

  // Handle Logout & clear session storage
  const handleLogout = () => {
    setAuthUser(null);
    setUserProfile(null);
    localStorage.removeItem('calorieiq_user');
    localStorage.removeItem('calorieiq_profile');
  };

  // 1. If not authenticated, show Auth screen
  if (!authUser) {
    return <Auth onAuthenticated={handleAuthenticated} />;
  }

  // 2. If authenticated but profile not set up, show Onboarding prompts
  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Calculate target calories dynamically based on user goal type
  let targetCalories = 2200;
  if (userProfile.goalType === 'weight_loss') targetCalories = 1900;
  if (userProfile.goalType === 'weight_gain') targetCalories = 2800;

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const handleSaveMeal = (newMeal) => {
    setMeals([newMeal, ...meals]);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-8 py-5 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black tracking-wider text-emerald-400">🔥 CalorieIQ</h1>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Goal: {userProfile.goalType.replace('_', ' ')}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-5 py-2 rounded-xl font-bold text-sm transition ${
                currentView === 'dashboard' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('log')}
              className={`px-5 py-2 rounded-xl font-bold text-sm transition ${
                currentView === 'log' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              + Log Meal
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-slate-400 hover:text-rose-400 transition bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl"
            title="Log Out"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Main View Router */}
      <main className="p-8">
        {currentView === 'dashboard' ? (
          <Dashboard 
            meals={meals} 
            totalCalories={totalCalories} 
            targetCalories={targetCalories} 
            userProfile={userProfile}
            onNavigateLog={() => setCurrentView('log')} 
          />
        ) : (
          <LogMeal onSaveMeal={handleSaveMeal} />
        )}
      </main>
    </div>
  );
}