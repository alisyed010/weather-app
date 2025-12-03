import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="group flex items-center space-x-3 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg animate-fade-in hover:bg-white/10 transition-colors cursor-default">
      <div className="p-1.5 bg-blue-500/20 rounded-full">
        <Clock className="w-4 h-4 text-blue-300" />
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline md:space-x-2">
        <span className="text-lg font-bold tracking-widest text-white tabular-nums">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="text-xs font-medium text-blue-200 uppercase tracking-wider">
          {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
};

export default LiveClock;