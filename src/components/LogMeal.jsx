import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export default function LogMeal({ onSaveMeal }) {
  const [activeTab, setActiveTab] = useState('ai');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [loading, setLoading] = useState(false);

  const fileToGenerativePart = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Fallback simulation if API key is not provided yet
    if (!apiKey || apiKey.trim() === "") {
      setTimeout(() => {
        setFoodName("Grilled Chicken & Avocado Salad (Simulated)");
        setCalories(480);
        setProtein(42);
        setCarbs(15);
        setFat(22);
        setLoading(false);
        setActiveTab('manual');
      }, 1500);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const imagePart = await fileToGenerativePart(file);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          imagePart,
          {
            text: "Analyze this meal photo. Return ONLY a valid JSON object with these exact keys: foodName (string), estimatedCalories (number), proteinGrams (number), carbGrams (number), fatGrams (number)."
          }
        ]
      });

      let rawText = response.text.trim();
      if (rawText.startsWith("```json")) {
        rawText = rawText.replace(/^```json/, "").replace(/```$/, "").trim();
      } else if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```/, "").replace(/```$/, "").trim();
      }

      const data = JSON.parse(rawText);

      setFoodName(data.foodName || "Scanned Meal");
      setCalories(data.estimatedCalories || 500);
      setProtein(data.proteinGrams || 30);
      setCarbs(data.carbGrams || 45);
      setFat(data.fatGrams || 15);
      
      setActiveTab('manual');
    } catch (error) {
      console.error("Gemini Vision Error:", error);
      alert("API key error or invalid response. Falling back to manual entry.");
      setFoodName("Sample Meal");
      setCalories(500);
      setActiveTab('manual');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitManual = (e) => {
    e.preventDefault();
    if (!foodName || !calories) return;

    const newMeal = {
      name: foodName,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onSaveMeal(newMeal);
    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-8 text-emerald-400 text-center">Log Your Meal</h2>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-2 rounded-2xl mb-8 shadow-inner border border-slate-800">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3.5 rounded-xl font-bold text-base transition ${
              activeTab === 'ai' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📷 AI Photo Scan
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-3.5 rounded-xl font-bold text-base transition ${
              activeTab === 'manual' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            ✍️ Manual Entry
          </button>
        </div>

        {/* AI Photo Scan Section */}
        {activeTab === 'ai' && (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl p-16 text-center hover:border-emerald-500 transition cursor-pointer relative bg-slate-950/40">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {loading ? (
              <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-emerald-400 mb-6"></div>
            ) : (
              <span className="text-6xl mb-6">📸</span>
            )}
            <p className="text-2xl font-bold mb-2">
              {loading ? "Simulating AI scan..." : "Tap or drop a meal photo here"}
            </p>
            <p className="text-base text-slate-400">
              {import.meta.env.VITE_GEMINI_API_KEY ? "Live Gemini Vision Ready" : "Offline mode: simulating scan"}
            </p>
          </div>
        )}

        {/* Manual Form Section */}
        {activeTab === 'manual' && (
          <form onSubmit={handleSubmitManual} className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium">Food / Meal Name</label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g., Chicken Rice Bowl"
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2 font-medium">Calories (kcal)</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="500"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2 font-medium">Protein (g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="30"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2 font-medium">Carbs (g)</label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  placeholder="45"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2 font-medium">Fat (g)</label>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  placeholder="15"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-lg text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-2xl transition mt-8 shadow-xl shadow-emerald-500/20 text-lg"
            >
              Save Meal
            </button>
          </form>
        )}
      </div>
    </div>
  );
}