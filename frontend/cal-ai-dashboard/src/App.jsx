import { useState } from 'react'
import React from 'react'
import Footer from './Footer'
import Dashboard from './Dashboard'
import Calendar from './Calender'
import Header from './Header'
import Upload from './Upload'



function App(){
  const [nutritionData, setNutritionData] = useState({
    calories: 1949,
    protein: 152,
    carbs: 212,
    fats: 54
  });


  return(
    <div className='app'>
      <Header />
      <Calendar />
      <Dashboard 
        calories={nutritionData.calories}
        protein={nutritionData.protein}
        carbs={nutritionData.carbs}
        fats={nutritionData.fats}
      />
      <Upload />
      <Footer />
    </div>
  )
}


export default App
