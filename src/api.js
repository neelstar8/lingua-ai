// Free translation API (MyMemory) and Mock fallback

// Language code mapping for MyMemory
export const LANGUAGE_CODES = {
  'Auto': 'Autodetect',
  'English': 'en',
  'Spanish': 'es',
  'French': 'fr',
  'German': 'de',
  'Italian': 'it',
  'Portuguese': 'pt',
  'Hindi': 'hi',
  'Chinese (Simplified)': 'zh',
  'Japanese': 'ja',
  'Korean': 'ko',
  'Arabic': 'ar',
  'Russian': 'ru',
};

// Replace 'YOUR_GOOGLE_API_KEY' with your actual Google Cloud Translation API key
const GOOGLE_API_KEY = 'AIzaSyDv_Ju5MP4z1zg1djaxLRtGn5xTqdYpK7U';

export async function translateText(text, sourceLang, targetLang) {
  // If 'Auto' is selected, Google Translate can auto-detect if we don't pass the source parameter.
  const sourceCode = sourceLang === 'Auto' ? '' : (LANGUAGE_CODES[sourceLang] || 'en');
  const targetCode = LANGUAGE_CODES[targetLang] || 'en';

  try {
    // Google Cloud Translation API (v2) endpoint
    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;

    // Set up the request body
    const body = {
      q: text,
      target: targetCode,
      format: 'text',
    };

    // Only include source language if it's not set to Auto
    if (sourceCode) {
      body.source = sourceCode;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.data && data.data.translations && data.data.translations.length > 0) {
        const result = data.data.translations[0].translatedText;
        console.log("API Response:", result); // Added requested console log
        return result;
      } else {
        throw new Error("No translation text found in API response");
      }
    } else {
      const errorData = await response.json();
      console.error("Google API Error:", errorData);
      throw new Error(errorData.error?.message || 'Google API returned an error');
    }
  } catch (error) {
    console.error("Translation API failed:", error);
    throw error; // Throw so that the calling function can catch it and show an error message
  }
}
