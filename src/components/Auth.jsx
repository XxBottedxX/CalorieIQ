import React, { useState } from 'react';

export default function Auth({ onAuthenticated }) {
  const [isLogin, setIsLogin] = useState(false); // Toggle between Sign Up and Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Pass the authenticated user email up to App.jsx
    onAuthenticated({ email });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-emerald-400 tracking-wider mb-2">🔥 CalorieIQ</h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? 'Welcome back! Log in to access your dashboard.' : 'Create an account to start your fitness journey.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-emerald-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-emerald-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-2xl transition shadow-xl shadow-emerald-500/20 text-lg"
          >
            {isLogin ? 'Log In' : 'Sign Up with Email'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-slate-400 hover:text-emerald-400 transition"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}