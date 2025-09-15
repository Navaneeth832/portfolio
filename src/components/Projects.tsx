import React from 'react';
import { ExternalLink, Github, Zap, Database, TrendingUp, Terminal, Film, Bot, Paperclip } from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const projects = [
    {
      title: "KTU-grade-analysis",
      description: "A full-stack web application designed to help students analyze their academic performance by parsing PDF grade sheets, providing detailed CGPA/SGPA analysis, and allowing for AI-powered custom queries on their academic data.",
      tech: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Recharts",
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Google Gemini API"
      ],
      icon: <Paperclip className="text-green-500" size={24} />,
      github: "https://github.com/Navaneeth832/KTU-grade-analysis",
      image: "https://cdn.potomac.edu/wp-content/uploads/2022/09/how-to-get-good-grades-in-college.jpg",
      category: "Gemini Hackathon"
    },
    {
      title: "IPL-match-2nd-inns-prediction",
      description: "This project uses an XGBoost model to predict the winner of an IPL match based on various features (city, venue, teams, toss decision, target runs, etc.). The prediction is served via a Flask web app with an interactive HTML form, allowing users to input match details and view the prediction result.",
      tech: ["Firebase", "React", "Chart.js", "PWA"],
      icon: <Database className="text-blue-500" size={24} />,
      github: "https://github.com/Navaneeth832/IPL-match-2nd-inns-prediction",
      image: "https://cdn.britannica.com/47/148847-050-C4FB5341/Cricket-bat-ball.jpg",
      category: "Machine Learning"
    },
    {
      title: "Blood donation manager",
      description:"The Blood Donation Management System is a web-based application that helps hospitals and blood donors manage blood donation records efficiently. It allows donors to register, hospitals to request blood, and records to be maintained in a MySQL database.",
      tech: ["HTML", "CSS", "JavaScript", "MySQL"],
      icon: <TrendingUp className="text-purple-500" size={24} />,
      github: "https://github.com/Navaneeth832/dbms-project",
      image: "https://cdn.vectorstock.com/i/1000v/75/21/blood-donation-icon-vector-17947521.jpg",
      category: "Database Management"
    },
    {
      title: "Movie sentimental Analyzer",
      description: "A machine learning web app that classifies movie reviews as Positive or Negative based on sentiment. Built using FastAPI for backend and React+TypeScript for frontend.",
      tech: ["FastApi", "React", "tailwindcss", "Scikit-learn","Python"],
      icon: <Film className="text-black-500" size={24} />,
      github: "https://github.com/Navaneeth832/Movie-sentimental-analysis",
      live: "https://starlit-tartufo-83cb03.netlify.app/",
      image: "https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
      category: "Web App"
    },
    {
      title: "AI Career Guide Platform ( In Progress )",
      description: "Building a web app using FastApi, ML, and Gemini API to predict placements and provide personalized career advice. Frontend with Bolt.new.",
      tech: ["Node.js", "React", "FastApi", "Scikit-learn", "Gemini API"],
      icon: <Bot className="text-yellow-500" size={24} />,
      github: "https://github.com/Navaneeth832/PlaceProAI",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Web App"
    },
    {
      title: "EV Travel Assistant",
      description: "A comprehensive hackathon project helping electric vehicle owners plan optimal routes with charging station locations, real-time availability, and trip optimization.",
      tech: ["React", "Node.js", "Maps API"],
      icon: <Zap className="text-green-500" size={24} />,
      github: "https://github.com/Navaneeth832/EV-Trip-Planner",
      live: "https://ev-trip-planner.onrender.com/",
      image: "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Gemini Hackathon"
    }
  ];

  return (
    <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Here are some of my recent projects that showcase my skills in full-stack development, 
            machine learning, and problem-solving.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`group ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-lg 
                hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 overflow-hidden`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-800'
                  }`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  {project.icon}
                  <h3 className={`text-xl font-bold ml-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                </div>

                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`px-3 py-1 text-sm rounded-full ${
                        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                      darkMode 
                        ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                      hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;