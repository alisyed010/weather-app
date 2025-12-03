import React from 'react';
import { ForecastData } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  // Filter for one reading per day (e.g., around noon)
  const dailyData = data.list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 5);

  return (
    <div className="w-full bg-white/5 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/10 shadow-xl animate-slide-up mt-8" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4 flex items-center">
        <span className="mr-2">📅</span> 5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyData.map((day, index) => {
          const date = new Date(day.dt * 1000);
          return (
            <div 
              key={day.dt} 
              className="flex flex-col items-center justify-between bg-white/5 hover:bg-white/15 transition-all duration-300 p-5 rounded-2xl border border-white/5 group hover:scale-105 hover:shadow-lg cursor-default"
            >
              <span className="text-blue-200 font-medium uppercase text-sm tracking-wider">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <div className="my-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">
                <WeatherIcon condition={day.weather[0].main} className="w-10 h-10" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-1">{Math.round(day.main.temp)}°</p>
                <p className="text-xs text-blue-300/80 capitalize truncate w-full px-2">{day.weather[0].description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;