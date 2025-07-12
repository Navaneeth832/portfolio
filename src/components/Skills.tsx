import React from 'react';
import { Code, Database, Globe, Wrench, Brain, Palette } from 'lucide-react';

interface SkillsProps {
  darkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="text-blue-500" size={24} />,
      skills: [
        { name: "Python", level: 90, color: "bg-yellow-500" },
        { name: "JavaScript", level: 85, color: "bg-yellow-400" },
        { name: "C", level: 80, color: "bg-blue-600" },
        { name: "Java", level: 75, color: "bg-blue-500" }
      ]
    },
    {
      title: "Backend & Database",
      icon: <Database className="text-green-500" size={24} />,
      skills: [
        { name: "Flask", level: 85, color: "bg-green-800" },
        { name: "Node.js", level: 75, color: "bg-green-500" },
        { name: "Django", level: 50, color: "bg-orange-600" },
      ]
    },
    {
      title: "Frontend & Web",
      icon: <Globe className="text-purple-500" size={24} />,
      skills: [
        { name: "React", level: 85, color: "bg-cyan-500" },
        { name: "HTML/CSS", level: 90, color: "bg-orange-500" },
        { name: "Tailwind CSS", level: 80, color: "bg-teal-500" },
        { name: "Responsive Design", level: 85, color: "bg-pink-500" }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: <Wrench className="text-red-500" size={24} />,
      skills: [
        { name: "Git/GitHub", level: 85, color: "bg-gray-600" },
        { name: "VS Code", level: 90, color: "bg-blue-500" },
        { name: "Linux", level: 75, color: "bg-yellow-600" }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="text-indigo-500" size={24} />,
      skills: [
        { name: "Machine Learning", level: 75, color: "bg-purple-500" },
        { name: "Data Analysis", level: 75, color: "bg-pink-500" },
        { name: "Pandas/NumPy", level: 80, color: "bg-blue-500" }
      ]
    },
    {
      title: "Others",
      icon: <Palette className="text-pink-500" size={24} />,
      skills: [
        { name: "Data Structures", level: 85, color: "bg-red-500" },
        { name: "Algorithms", level: 80, color: "bg-orange-500" },
        { name: "Problem Solving", level: 90, color: "bg-green-500" }
      ]
    }
  ];

  return (
    <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Technical <span className="text-blue-600">Skills</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A comprehensive overview of my technical expertise and proficiency levels across different domains.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className={`${darkMode ? 'bg-gray-900' : 'bg-white'} p-8 rounded-2xl shadow-lg 
                hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className={`text-xl font-bold ml-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                      <div 
                        className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <div className="mt-16">
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} p-8 rounded-2xl shadow-lg`}>
            <h3 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Currently Learning & Exploring
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "OpenCV", "Pytorch", "Deep learning", "Fine tuning models"
              ].map((skill, index) => (
                <span 
                  key={index}
                  className={`px-4 py-2 rounded-full border-2 border-dashed transition-colors duration-200 hover:bg-blue-50 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-400 hover:bg-gray-800' 
                      : 'border-gray-300 text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;