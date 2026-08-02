import React from 'react';
import { Github, Linkedin, Mail, Code2, ArrowUp } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const muted = darkMode ? 'text-slate-500' : 'text-slate-400';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const hover = darkMode ? 'hover:text-slate-300' : 'hover:text-slate-700';

  return (
    <footer className={`py-10 border-t ${border} ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              N
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Navaneeth Krishna G
            </span>
          </div>

          {/* Social links */}
          <div className={`flex items-center gap-1 ${muted}`}>
            <a
              href="https://github.com/Navaneeth832"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-md ${hover} transition-colors`}
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com/in/navaneeth-krishna-g-904477334"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-md ${hover} transition-colors`}
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://leetcode.com/u/ZppmnjPjbA/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-md ${hover} transition-colors`}
              aria-label="LeetCode"
            >
              <Code2 size={16} />
            </a>
            <a
              href="mailto:mittunavan@gmail.com"
              className={`p-2 rounded-md ${hover} transition-colors`}
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Copyright + back to top */}
          <div className={`flex items-center gap-4 text-xs font-mono ${muted}`}>
            <span>© {currentYear} Navaneeth Krishna G</span>
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1 hover:text-indigo-500 transition-colors`}
              aria-label="Back to top"
            >
              <ArrowUp size={13} />
              Top
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;