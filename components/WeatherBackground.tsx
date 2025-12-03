import React from 'react';

interface WeatherBackgroundProps {
  weatherMain: string;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherMain }) => {
  const condition = weatherMain.toLowerCase();

  // Rain Effect
  if (condition.includes('rain') || condition.includes('drizzle')) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-200/30 w-[1px] h-8 rounded-full animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDuration: `${0.6 + Math.random() * 0.4}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  }

  // Snow Effect
  if (condition.includes('snow')) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-snow blur-[1px]"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDuration: `${4 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>
    );
  }

  // Cloud Effect (Moving Fog/Clouds)
  if (condition.includes('cloud') || condition.includes('mist') || condition.includes('fog')) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 rounded-full blur-[80px] animate-cloud-move"
            style={{
              width: `${300 + Math.random() * 400}px`,
              height: `${150 + Math.random() * 200}px`,
              top: `${Math.random() * 80}%`,
              animationDuration: `${25 + Math.random() * 15}s`,
              animationDelay: `${Math.random() * -20}s`
            }}
          />
        ))}
      </div>
    );
  }
  
  // Clear/Sun Effect
  if (condition.includes('clear')) {
     return (
       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         {/* Sun Glow */}
         <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[100px] animate-pulse-slow"></div>
         
         {/* Lens Flares / Floating Particles */}
         {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className="absolute bg-yellow-200/20 rounded-full blur-md animate-float"
                style={{
                    width: `${Math.random() * 50 + 10}px`,
                    height: `${Math.random() * 50 + 10}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${4 + Math.random() * 4}s`,
                    animationDelay: `${Math.random() * 2}s`
                }}
            />
         ))}
       </div>
     )
  }

  // Thunder Effect
  if (condition.includes('thunder')) {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
             {/* Rain base for thunder */}
             {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-blue-300/40 w-[2px] h-12 rounded-full animate-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDuration: `${0.4 + Math.random() * 0.3}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
            {/* Lightning Flash Overlay */}
             <div className="absolute inset-0 bg-white/20 animate-flash pointer-events-none"></div>
        </div>
    )
  }

  return null;
};

export default WeatherBackground;