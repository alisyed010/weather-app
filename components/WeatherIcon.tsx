import React from 'react';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = "w-12 h-12" }) => {
  const lowerCondition = condition.toLowerCase();
  
  // Base classes for animation
  const animClass = "transition-all duration-1000";

  if (lowerCondition.includes('clear')) return <Sun className={`${className} ${animClass} text-yellow-400 animate-spin-slow`} />;
  if (lowerCondition.includes('cloud')) return <Cloud className={`${className} ${animClass} text-gray-300 animate-pulse`} />;
  if (lowerCondition.includes('rain')) return <CloudRain className={`${className} ${animClass} text-blue-400 animate-bounce`} style={{ animationDuration: '3s' }} />;
  if (lowerCondition.includes('drizzle')) return <CloudDrizzle className={`${className} ${animClass} text-blue-300 animate-pulse`} />;
  if (lowerCondition.includes('thunder')) return <CloudLightning className={`${className} ${animClass} text-purple-400 animate-pulse`} />;
  if (lowerCondition.includes('snow')) return <CloudSnow className={`${className} ${animClass} text-white animate-pulse`} />;
  if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) return <CloudFog className={`${className} ${animClass} text-gray-400 animate-pulse`} />;
  
  return <Wind className={`${className} ${animClass} text-teal-300 animate-pulse`} />;
};

export default WeatherIcon;