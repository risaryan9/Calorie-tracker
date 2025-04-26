const foodAnalysisPrompt = `You are given an image of a meal. Analyze the image and identify all food items present. For each food item, estimate the calories and macronutrients: fats (g), protein (g), and carbohydrates (g). Present your output strictly in the following JSON format, listing each food item and its macros.

After listing all items, calculate and include the total calories as the sum of all food item calories, and a meal score rated out of 10 (with 1 decimal point, e.g., 8.4). The score should reflect how balanced the meal is in terms of macronutrient distribution. Favor meals with a balanced distribution of protein, carbs, and fats, and penalize skewed ones.
Do not mention that this is an approximation or mention weight-based limitations. Just return the output in the following exact format:

{
  "food_items": [
    {
      "name": "Food item 1",
      "calories": 412,
      "fats_g": 42,
      "protein_g": 23,
      "carbs_g": 32
    },
    {
      "name": "Food item 2",
      "calories": 522,
      "fats_g": 45,
      "protein_g": 13,
      "carbs_g": 67
    },
    {
      "name": "Food item 3",
      "calories": 752,
      "fats_g": 65,
      "protein_g": 83,
      "carbs_g": 27
    }
  ],
  "total_calories": 1686,
  "meal_score": 8.7
}`;

export default foodAnalysisPrompt;