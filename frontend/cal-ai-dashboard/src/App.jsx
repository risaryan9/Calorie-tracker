import { useState } from 'react'
import React from 'react'
import Footer from './Footer'
import Dashboard from './Dashboard'
import Calendar from './Calender'
import Header from './Header'
import Upload from './Upload'



function App() {
  // Initial daily goals
  const initialGoals = {
    calories: 1949,
    protein: 152,
    carbs: 212,
    fats: 54
  };

  const [remaining, setRemaining] = useState(initialGoals);

  const handleMacrosUpdate = (macrosArray) => {
    if (!macrosArray || !Array.isArray(macrosArray)) return;
    
    // Array format: [calories, fats, protein, carbs]
    const [consumedCalories, consumedFats, consumedProtein, consumedCarbs] = macrosArray;
    
    setRemaining(prev => ({
      calories: Math.max(0, prev.calories - consumedCalories),
      protein: Math.max(0, prev.protein - consumedProtein),
      carbs: Math.max(0, prev.carbs - consumedCarbs),
      fats: Math.max(0, prev.fats - consumedFats)
    }));
  };

  return (
    <div className='app'>
      <Header />
      <Calendar />
      <Dashboard 
        calories={remaining.calories}
        protein={remaining.protein}
        carbs={remaining.carbs}
        fats={remaining.fats}
      />
      <Upload onMacrosUpdate={handleMacrosUpdate} />
      <Footer />
    </div>
  );
}

export default App;