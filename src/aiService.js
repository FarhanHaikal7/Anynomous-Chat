// A simple map to convert your complex language codes to simple 2-letter codes
// MyMemory API uses "en", "fr", "de", etc.
const langMap = {
  'eng_Latn': 'en',
  'fra_Latn': 'fr',
  'deu_Latn': 'de',
  'jpn_Jpan': 'ja',
  'zho_Hans': 'zh',
  'spa_Latn': 'es',
};

export const translateMessage = async (text, targetLang) => {
  try {
    // 1. Convert code (e.g., "fra_Latn" -> "fr")
    const source = 'en'; // We assume input is English
    const target = langMap[targetLang] || 'en';

    // 2. Don't translate if languages match
    if (source === target) return text;

    // 3. Call the Free API (MyMemory)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // 4. Return the result
    return data.responseData.translatedText;

  } catch (error) {
    console.error("API Error:", error);
    return text; // If internet fails, just show original text
  }
};