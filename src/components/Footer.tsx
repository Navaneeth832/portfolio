import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`py-12 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <button 
              onClick={scrollToTop}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              Navaneeth
            </button>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              CSE Student & Future Software Engineer
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} 
                    transition-colors duration-200 hover:underline`}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Connect
            </h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a 
                href="https://github.com/Navaneeth832"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} 
                  transition-colors duration-200 hover:scale-110 transform`}
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/navaneeth-krishna-g-904477334/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} 
                  transition-colors duration-200 hover:scale-110 transform`}
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:mittunavan@gmail.com"
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} 
                  transition-colors duration-200 hover:scale-110 transform`}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} Navaneeth. All rights reserved.
            </p>
            <p className={`text-sm flex items-center gap-1 mt-2 md:mt-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Made with <Heart className="text-red-500" size={16} /> using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;