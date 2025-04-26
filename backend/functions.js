function parseJSONSafely(jsonString) {
    let cleanString = jsonString.replace(/^```(json)?\s*|\s*```$/g, '').trim();
    cleanString = cleanString.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    
    const jsonStart = cleanString.indexOf('{');
    const jsonEnd = Math.max(
        cleanString.lastIndexOf('}'),
        cleanString.lastIndexOf(']')
    ) + 1;
    
    if (jsonStart >= 0 && jsonEnd > 0) {
        cleanString = cleanString.slice(jsonStart, jsonEnd);
    }
    
    try {
        return JSON.parse(cleanString);
    } catch (error) {
        console.error('Failed to parse JSON:', error.message);
        console.error('Problematic string:', cleanString);
        return null;
    }
  }

  
export default parseJSONSafely;