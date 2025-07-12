import React, { useEffect, useState } from 'react';
import { ChevronDown, MapPin, GraduationCap } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const rotatingTexts = [
    'CSE Student',
    'Hackathon Enthusiast', 
    'Full-Stack Developer',
    'Problem Solver'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3B82F6 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #14B8A6 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Image */}
                {/* <div className="mb-8">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-500/20 hover:scale-105 transition-transform duration-300">
                  <img 
                  src=""
                  alt="Navaneeth - Computer Science Student"
                  className="w-full h-full object-cover"
                  />
                </div>
                </div> */}

                {/* Name */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Navaneeth Krishna G
            </span>
          </h1>

          {/* Location & Education */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <GraduationCap size={20} />
              <span>BTech CSE, College Of Engineering Trivandrum</span>
            </div>
            <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <MapPin size={20} />
              <span>Kerala, India</span>
            </div>
          </div>

          {/* Rotating Tagline */}
          <div className="h-16 flex items-center justify-center mb-8">
            <p className={`text-xl md:text-2xl font-medium transition-all duration-500 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <span className="text-blue-600 font-semibold">
                {rotatingTexts[textIndex]}
              </span>
            </p>
          </div>

          {/* Brief Description */}
          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Passionate about building innovative solutions through code. 
            Specializing in full-stack development, machine learning, and open-source contributions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full 
                hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              View My Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full 
                hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200 ${
                darkMode ? 'hover:bg-blue-600' : ''
              }`}
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToAbout}
            className={`animate-bounce ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;