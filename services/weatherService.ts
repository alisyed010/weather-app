import { API_KEYS } from '../constants';
import { WeatherData, ForecastData } from '../types';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEYS.OPEN_WEATHER_MAP}&units=metric`
  );
  if (!response.ok) {
    throw new Error('City not found or API error');
  }
  return response.json();
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEYS.OPEN_WEATHER_MAP}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Forecast data not available');
  }
  return response.json();
};
