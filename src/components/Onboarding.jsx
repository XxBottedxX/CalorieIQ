import React, { useState } from 'react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goalType: 'weight_loss',
    currentWeight: '',
    targetWeight: '',
    height: '',
    targetDate: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const progressPercentage = Math.round((step / 3) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800 p-10 rounded-3xl shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-4 text-xs text-emerald-400 font-bold uppercase tracking-widest">
          <span>Step {step} of 3</span>
          <span>{progressPercentage}% Completed</span>
        </div>
        <div className="w-full bg-slate-950 h-2.5 rounded-full mb-10 overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full transition-all duration-500 rounded-full shadow-md shadow-emerald-500/30" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <form onSubmit={handleNext} className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-black text-white">What is your primary goal?</h2>
                <p className="text-slate-400 text-sm mt-1">We'll calibrate your daily caloric target and macro splits based on this.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'weight_loss', label: '🔥 Fat Loss / Cut', desc: 'Shed body fat while preserving lean muscle mass' },
                  { id: 'weight_gain', label: '💪 Muscle Gain / Bulk', desc: 'Build muscle with a clean nutritional surplus' },
                  { id: 'maintenance', label: '⚖️ Maintenance', desc: 'Maintain weight and optimize overall body composition' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleChange('goalType', item.id)}
                    className={`p-5 rounded-2xl text-left border transition-all ${
                      formData.goalType === item.id 
                        ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10 scale-[1.01]' 
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <p className="font-bold text-lg text-white">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-black text-white">Enter your current stats</h2>
                <p className="text-slate-400 text-sm mt-1">Used to compute your baseline metabolic rate and daily energy expenditure.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Weight (lbs)</label>
                  <input
                    type="number"
                    value={formData.currentWeight}
                    onChange={(e) => handleChange('currentWeight', e.target.value)}
                    placeholder="e.g. 175"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-base text-white focus:outline-none focus:border-emerald-400 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Height</label>
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) => handleChange('height', e.target.value)}
                    placeholder="e.g. 5 ft 10 in or 178 cm"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-base text-white focus:outline-none focus:border-emerald-400 transition"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-black text-white">Target goal & timeline</h2>
                <p className="text-slate-400 text-sm mt-1">Set your destination goal weight and completion date.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Weight (lbs)</label>
                  <input
                    type="number"
                    value={formData.targetWeight}
                    onChange={(e) => handleChange('targetWeight', e.target.value)}
                    placeholder="e.g. 160"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-base text-white focus:outline-none focus:border-emerald-400 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Completion Date</label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => handleChange('targetDate', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-base text-white focus:outline-none focus:border-emerald-400 transition"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-2xl transition text-sm"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl transition shadow-xl shadow-emerald-500/20 text-base active:scale-[0.99]"
            >
              {step === 3 ? 'Complete Setup 🚀' : 'Next Step'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}