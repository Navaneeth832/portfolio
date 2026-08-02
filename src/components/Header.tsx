import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Github, Linkedin } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'stats', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  const baseText = darkMode ? 'text-slate-100' : 'text-slate-900';
  const mutedText = darkMode ? 'text-slate-400' : 'text-slate-500';
  const borderColor = darkMode ? 'border-slate-800' : 'border-slate-200';
  const hoverBg = darkMode ? 'hover:bg-slate-800 hover:text-slate-100' : 'hover:bg-slate-100 hover:text-slate-900';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav' : 'bg-transparent'
    }`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Monogram + Name */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold select-none ${
              darkMode ? 'bg-indigo-600' : 'bg-indigo-600'
            }`}>
              N
            </div>
            <span className={`text-base font-semibold tracking-tight ${baseText} group-hover:text-indigo-500 transition-colors duration-150`}>
              Navaneeth Krishna G
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                    isActive
                      ? `${baseText} font-medium`
                      : `${mutedText} ${hoverBg}`
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/Navaneeth832"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-md ${mutedText} ${hoverBg} transition-colors duration-150`}
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href="https://linkedin.com/in/navaneeth-krishna-g-904477334"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-md ${mutedText} ${hoverBg} transition-colors duration-150`}
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <div className={`w-px h-5 mx-1 ${borderColor}`} />
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${mutedText} ${hoverBg} transition-colors duration-150`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${mutedText} ${hoverBg} transition-colors`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${mutedText} ${hoverBg} transition-colors`}
              aria-label="Open menu"
            >
              {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${borderColor}`}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors ${
                      isActive
                        ? `${baseText} font-medium bg-indigo-500/10`
                        : `${mutedText} ${hoverBg}`
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className={`mt-3 pt-3 border-t ${borderColor} flex gap-4`}>
                <a
                  href="https://github.com/Navaneeth832"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm ${mutedText} hover:text-indigo-500 transition-colors`}
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/navaneeth-krishna-g-904477334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm ${mutedText} hover:text-indigo-500 transition-colors`}
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;