import express from 'express';
import multer from 'multer';
import fs from 'fs';
import axios from 'axios';
import cors from 'cors';
import parseJSONSafely from './functions.js';
import foodAnalysisPrompt from './prompt.js';
import cummulatemacros from './cummulatemacros.js';


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
              text: foodAnalysisPrompt
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
    console.log(responseText);
    console.log(parseJSONSafely(responseText));
    console.log(cummulatemacros(parseJSONSafely(responseText)))



    res.json({ result: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to analyze image' });
  } finally {
    fs.unlinkSync(imagePath);
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));




