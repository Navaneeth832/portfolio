import React from 'react';
import { Code, Heart, Globe, BookOpen } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  return (
    <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              About <span className="text-blue-600">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Story */}
            <div>
              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} p-8 rounded-2xl shadow-lg`}>
                <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  My Journey
                </h3>
                <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Hi! I'm Navaneeth, an intuitive and passionate learner currently pursuing BTech in Computer Science Engineering at CET. 
                  My journey in tech began with curiosity and has evolved into a deep passion for solving real-world problems through code.
                </p>
                <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  I've developed a global perspective that influences my approach to technology. 
                  I believe in creating solutions that are not just functional, but meaningful and impactful.
                </p>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Currently, I'm actively upskilling in modern technologies like Python, JavaScript, Firebase, and Django, 
                  while exploring the exciting realms of machine learning and full-stack development.
                </p>
              </div>
            </div>

            {/* Interests & Values */}
            <div className="space-y-6">
              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-blue-50'} p-6 rounded-xl border-l-4 border-blue-600`}>
                <div className="flex items-center mb-3">
                  <Code className="text-blue-600 mr-3" size={24} />
                  <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Code Enthusiast
                  </h4>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  I love crafting clean, efficient code and exploring new technologies that push the boundaries of what's possible.
                </p>
              </div>

              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-teal-50'} p-6 rounded-xl border-l-4 border-teal-600`}>
                <div className="flex items-center mb-3">
                  <Heart className="text-teal-600 mr-3" size={24} />
                  <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Problem Solver
                  </h4>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Every challenge is an opportunity to learn and grow. I thrive on turning complex problems into elegant solutions.
                </p>
              </div>

              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-purple-50'} p-6 rounded-xl border-l-4 border-purple-600`}>
                <div className="flex items-center mb-3">
                  <Globe className="text-purple-600 mr-3" size={24} />
                  <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Global Perspective
                  </h4>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  My multicultural background helps me approach technology with a diverse and inclusive mindset.
                </p>
              </div>

              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-orange-50'} p-6 rounded-xl border-l-4 border-orange-600`}>
                <div className="flex items-center mb-3">
                  <BookOpen className="text-orange-600 mr-3" size={24} />
                  <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Continuous Learner
                  </h4>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Technology evolves rapidly, and I'm committed to staying at the forefront of innovation through continuous learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;