import React from 'react';
import { ArrowRight, Download, MapPin } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const coreTech = ['Python', 'FastAPI', 'React', 'Flutter', 'Gemini API', 'PostgreSQL'];

  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';

  return (
    <section
      id="home"
      className={`relative min-h-screen flex flex-col justify-center pt-20 pb-20 overflow-hidden bg-grid-pattern ${
        darkMode ? 'bg-slate-950' : 'bg-slate-50'
      }`}
    >
      {/* Subtle ambient glow — very low opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
          style={{
            background: darkMode
              ? 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">

          {/* Location badge */}
          <div className={`inline-flex items-center gap-1.5 text-xs ${muted} mb-8`}>
            <MapPin size={13} />
            <span>Trivandrum, Kerala · Open to opportunities</span>
          </div>

          {/* Name */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-3 ${base}`}>
            Navaneeth Krishna G
          </h1>

          {/* Role */}
          <p className={`text-lg sm:text-xl font-medium mb-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            Software Developer · B.Tech CSE @ CET Trivandrum
          </p>

          {/* Description */}
          <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-10 ${muted}`}>
            Computer Science undergraduate interested in backend systems, AI applications, and full-stack
            development. Currently interning at{' '}
            <span className={`font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              SATCARD, IIT Palakkad
            </span>
            , building an agricultural market analytics platform. I enjoy working on problems that sit at
            the intersection of software engineering and applied AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-150"
            >
              View Projects
              <ArrowRight size={15} />
            </button>
            <a
              href="https://drive.google.com/file/d/1zyJa3iAcgS1YOUpPW0l8WMTdG-WKpZSK/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors duration-150 ${
                darkMode
                  ? `${border} text-slate-300 hover:bg-slate-800 hover:text-white`
                  : `${border} text-slate-700 hover:bg-slate-100 hover:text-slate-900`
              }`}
            >
              <Download size={15} />
              Resume
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                darkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Core tech pills — 6 max */}
          <div className="flex flex-wrap gap-2">
            {coreTech.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 rounded-md text-xs font-mono border ${
                  darkMode
                    ? `${border} text-slate-400 bg-slate-900/60`
                    : `${border} text-slate-600 bg-white`
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;