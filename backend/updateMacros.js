function updateRemainingMacros(consumedValues) {
    const caloriesElem = document.querySelector('.summary h2');
    const macroNumbers = document.querySelectorAll('.macros-number');
    
    const currentValues = {
      calories: parseInt(caloriesElem.textContent),
      protein: parseInt(macroNumbers[0].textContent),
      carbs: parseInt(macroNumbers[1].textContent),
      fats: parseInt(macroNumbers[2].textContent)
    };
    
    const newValues = {
      calories: Math.max(currentValues.calories - consumedValues[0], 0),
      protein: Math.max(currentValues.protein - consumedValues[1], 0),
      carbs: Math.max(currentValues.carbs - consumedValues[2], 0),
      fats: Math.max(currentValues.fats - consumedValues[3], 0)
    };
    
    caloriesElem.textContent = newValues.calories;
    macroNumbers[0].textContent = newValues.protein;
    macroNumbers[1].textContent = newValues.carbs;
    macroNumbers[2].textContent = newValues.fats;
  }

export default updateRemainingMacros;