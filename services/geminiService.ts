import { GoogleGenAI } from "@google/genai";
import { WeatherData } from "../types";

// Initialize Gemini only if the key is available
const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const getWeatherInsight = async (weather: WeatherData): Promise<string> => {
  if (!ai) {
    return "AI insights are unavailable. Please configure the Gemini API Key.";
  }

  try {
    const prompt = `
      The current weather in ${weather.name}, ${weather.sys.country} is:
      - Temperature: ${weather.main.temp}°C (Feels like ${weather.main.feels_like}°C)
      - Condition: ${weather.weather[0].description}
      - Humidity: ${weather.main.humidity}%
      - Wind Speed: ${weather.wind.speed} m/s

      Provide a short, witty, and helpful summary for a user. 
      Include an outfit recommendation. 
      Keep it under 60 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate insight.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not connect to AI service.";
  }
};
