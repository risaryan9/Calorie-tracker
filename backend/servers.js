import express from 'express';
import multer from 'multer';
import fs from 'fs';
import axios from 'axios';
import cors from 'cors';


const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());




app.post('/analyze', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;
  const mimeType = req.file.mimetype;

  console.log(req.file)

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const requestBody = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image
              }
            },
            {
              text: `You are given an image of a meal. Analyze the image and identify all food items present. For each food item, estimate the calories and macronutrients: fats (g), protein (g), and carbohydrates (g). Present your output strictly in the following JSON format, listing each food item and its macros.

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
}`
            }
          ]
        }
      ]
    };

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyD54ZfYkWnjFuRE9p-jsNsiS3UFrnabZCc`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseText = geminiResponse.data.candidates[0].content.parts[0].text;
    console.log(responseText)

    res.json({ result: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to analyze image' });
  } finally {
    fs.unlinkSync(imagePath); 
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));




