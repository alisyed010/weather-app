import React, { useState, useEffect } from 'react';
import { Search, MapPin, Droplets, Wind, Eye, Sparkles, Loader2, Thermometer, Cloud, Gauge, History } from 'lucide-react';
import { getWeather, getForecast } from './services/weatherService';
import { getWeatherInsight } from './services/geminiService';
import { WeatherData, ForecastData } from './types';
import { USER_DETAILS, DEFAULT_CITY } from './constants';
import LiveClock from './components/LiveClock';
import WeatherIcon from './components/WeatherIcon';
import Forecast from './components/Forecast';
import Contact from './components/Contact';
import WeatherBackground from './components/WeatherBackground';

const App: React.FC = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [inputCity, setInputCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [history, setHistory] = useState<WeatherData[]>([]);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError('');
    setAiInsight('');
    try {
      const weatherData = await getWeather(cityName);
      const forecastData = await getForecast(cityName);
      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);

      setHistory(prev => {
        const filtered = prev.filter(item => item.name !== weatherData.name);
        return [weatherData, ...filtered].slice(0, 5);
      });
    } catch (err) {
      setError('Could not fetch weather data. Please try another city.');
    } finally {
      setLoading(false);
    }
  };

  const handleAiInsight = async () => {
    if (!weather) return;
    setAiLoading(true);
    const insight = await getWeatherInsight(weather);
    setAiInsight(insight);
    setAiLoading(false);
  };

  useEffect(() => {
    fetchWeatherData(DEFAULT_CITY);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      fetchWeatherData(inputCity);
      setInputCity('');
    }
  };

  // Dynamic background based on weather description
  const getBackgroundClass = () => {
    if (!weather) return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900';
    const main = weather.weather[0].main.toLowerCase();
    
    if (main.includes('clear')) return 'bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-900';
    if (main.includes('cloud')) return 'bg-gradient-to-br from-slate-500 via-slate-700 to-gray-900';
    if (main.includes('rain') || main.includes('drizzle')) return 'bg-gradient-to-br from-cyan-900 via-blue-900 to-slate-900';
    if (main.includes('thunder')) return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900';
    if (main.includes('snow')) return 'bg-gradient-to-br from-blue-100 via-blue-300 to-indigo-400';
    
    return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900';
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${getBackgroundClass()} relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      {/* Dynamic Weather Animations */}
      <WeatherBackground weatherMain={weather?.weather[0].main || ''} />

      {/* Navigation / Header */}
      <nav className="relative z-10 w-full px-6 py-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center space-x-3 mb-4 md:mb-0 group cursor-default">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-lg group-hover:bg-white/20 transition-all duration-300">
             <Cloud className="text-blue-300 w-7 h-7 group-hover:scale-110 transition-transform" />
           </div>
           <div>
             <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">WEATHER FORECAST</h1>
             <p className="text-xs text-blue-200 font-medium tracking-wide">DESIGNED BY {USER_DETAILS.NAME}</p>
           </div>
        </div>
        
        <LiveClock />
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 relative z-20">
          <form onSubmit={handleSearch} className="relative group mb-6 animate-slide-up">
            <input
              type="text"
              placeholder="Search for a city..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="w-full py-5 pl-14 pr-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/15 transition-all shadow-xl text-lg"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-200 w-6 h-6 group-hover:text-white transition-colors" />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-lg">
              Search
            </button>
          </form>

          {/* Search History */}
          {history.length > 0 && (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="flex items-center space-x-2 text-blue-200/60 mb-3 text-xs uppercase tracking-widest">
                <History className="w-3 h-3" />
                <span>Recent Searches</span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => fetchWeatherData(item.name)}
                    className="flex items-center space-x-2 bg-white/5 hover:bg-white/15 hover:scale-105 border border-white/5 rounded-full px-4 py-2 cursor-pointer transition-all duration-300 group"
                  >
                    <span className="text-blue-100 text-sm">{item.name}</span>
                    <span className="text-white font-bold text-sm bg-white/10 px-2 py-0.5 rounded-full">{Math.round(item.main.temp)}°</span>
                    <WeatherIcon condition={item.weather[0].main} className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="max-w-md mx-auto text-center text-red-100 bg-red-500/30 backdrop-blur-md py-3 px-6 rounded-xl mb-8 animate-fade-in border border-red-500/30 shadow-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 animate-pulse">
            <Loader2 className="w-16 h-16 text-blue-300 animate-spin mb-4" />
            <p className="text-blue-200 text-lg">Fetching weather data...</p>
          </div>
        ) : weather && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Current Weather & Metrics */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Main Weather Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/10 shadow-2xl animate-fade-in relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
                  <div className="space-y-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-200 bg-blue-900/30 w-fit px-4 py-1.5 rounded-full mx-auto md:mx-0">
                      <MapPin className="w-4 h-4" />
                      <h2 className="text-lg font-semibold tracking-wide">{weather.name}, {weather.sys.country}</h2>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start">
                      <h3 className="text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-blue-200 drop-shadow-lg">
                        {Math.round(weather.main.temp)}°
                      </h3>
                    </div>
                    <p className="text-2xl capitalize font-medium text-white flex items-center justify-center md:justify-start gap-2">
                      {weather.weather[0].description}
                    </p>
                  </div>
                  
                  <div className="mt-8 md:mt-0 animate-float">
                    <WeatherIcon condition={weather.weather[0].main} className="w-48 h-48 drop-shadow-2xl filter" />
                  </div>
                </div>
              </div>

              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all hover:scale-105 duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500/30 transition-colors">
                    <Thermometer className="w-5 h-5 text-blue-300" />
                  </div>
                  <p className="text-sm text-blue-200/70">Feels Like</p>
                  <p className="text-xl font-bold">{Math.round(weather.main.feels_like)}°</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all hover:scale-105 duration-300 group">
                   <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3 group-hover:bg-cyan-500/30 transition-colors">
                    <Droplets className="w-5 h-5 text-cyan-300" />
                  </div>
                  <p className="text-sm text-blue-200/70">Humidity</p>
                  <p className="text-xl font-bold">{weather.main.humidity}%</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all hover:scale-105 duration-300 group">
                   <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mb-3 group-hover:bg-teal-500/30 transition-colors">
                    <Wind className="w-5 h-5 text-teal-300" />
                  </div>
                  <p className="text-sm text-blue-200/70">Wind Speed</p>
                  <p className="text-xl font-bold">{weather.wind.speed} m/s</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all hover:scale-105 duration-300 group">
                   <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-3 group-hover:bg-purple-500/30 transition-colors">
                    <Eye className="w-5 h-5 text-purple-300" />
                  </div>
                  <p className="text-sm text-blue-200/70">Visibility</p>
                  <p className="text-xl font-bold">{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all hover:scale-105 duration-300 group">
                   <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-3 group-hover:bg-orange-500/30 transition-colors">
                    <Gauge className="w-5 h-5 text-orange-300" />
                  </div>
                  <p className="text-sm text-blue-200/70">Pressure</p>
                  <p className="text-xl font-bold">{weather.main.pressure} hPa</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all hover:scale-105 duration-300 group">
                   <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center mb-3 group-hover:bg-gray-500/30 transition-colors">
                    <Cloud className="w-5 h-5 text-gray-300" />
                  </div>
                  <p className="text-sm text-blue-200/70">Cloudiness</p>
                  <p className="text-xl font-bold">{weather.clouds.all}%</p>
                </div>
              </div>

              {/* Forecast Component */}
              {forecast && <Forecast data={forecast} />}
            </div>

            {/* Right Column: AI Insight & Actions */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl animate-slide-up relative overflow-hidden flex-1 min-h-[50%]" style={{ animationDelay: '0.3s' }}>
                <div className="absolute top-0 right-0 p-24 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                <div className="flex items-center space-x-3 mb-6 relative z-10">
                  <div className="p-2 bg-yellow-400/20 rounded-lg">
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">AI Insights</h3>
                </div>
                
                <p className="text-blue-100 mb-8 text-sm leading-relaxed opacity-80">
                  Unlock smart weather analysis powered by Gemini AI. Get personalized outfit recommendations and witty summaries for {weather.name}.
                </p>

                {aiInsight ? (
                   <div className="bg-black/20 rounded-2xl p-6 mb-6 border-l-4 border-yellow-400 animate-fade-in shadow-inner">
                     <p className="text-base italic text-gray-100 leading-relaxed">"{aiInsight}"</p>
                   </div>
                ) : null}

                <div className="mt-auto">
                  <button 
                    onClick={handleAiInsight}
                    disabled={aiLoading}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-slate-900 font-bold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        <span>Thinking...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Get AI Advice</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sun Details Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-xl animate-slide-up overflow-hidden" style={{ animationDelay: '0.4s' }}>
                 <div className="flex justify-between items-center mb-6">
                    <div className="text-center">
                      <span className="block text-blue-200/60 text-xs uppercase tracking-wider mb-1">Sunrise</span>
                      <span className="text-xl font-bold text-yellow-100">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-blue-200/60 text-xs uppercase tracking-wider mb-1">Sunset</span>
                      <span className="text-xl font-bold text-orange-100">{new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                 </div>
                 
                 {/* Visual Sun Arc */}
                 <div className="relative h-24 border-b border-white/10">
                   <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
                     <div className="w-full h-[200%] border-2 border-dashed border-yellow-500/30 rounded-full absolute bottom-0 left-0"></div>
                   </div>
                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-12">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full blur-md animate-pulse"></div>
                      <div className="w-8 h-8 bg-yellow-200 rounded-full absolute top-0 left-0"></div>
                   </div>
                 </div>
                 <p className="text-center text-xs text-blue-200/50 mt-2">Sun Position</p>
              </div>
            </div>

          </div>
        )}
        
        {/* Contact Section */}
        <div id="contact" className="mt-20">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center text-blue-200/40 bg-black/40 backdrop-blur-xl border-t border-white/5">
        <p className="font-light tracking-wider text-sm">&copy; {new Date().getFullYear()} {USER_DETAILS.NAME}. All rights reserved.</p>
        <p className="text-xs mt-2 opacity-50">Powered by OpenWeatherMap & Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;