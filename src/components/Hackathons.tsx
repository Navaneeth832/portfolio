import React from 'react';
import { Trophy, Users, Calendar, Award } from 'lucide-react';

interface HackathonsProps {
  darkMode: boolean;
}

const Hackathons: React.FC<HackathonsProps> = ({ darkMode }) => {
  const hackathons = [
    {
      title: "GenAI Hackathon by Impetus & AWS",
      project: "EV Travel Assistant",
      description: "Developed a comprehensive EV route planning application with real-time charging station data and optimization algorithms.",
      date: "May 2025",
      participants: "2500+",
      achievement: "Innovation",
      image: "https://globalventuring.com//content/uploads/2023/12/pexels-pavel-danilyuk-8294624.jpg",
      tech: ["React", "Node.js", "Maps API"],
      learnings: [
        "Advanced API integration and optimization",
        "Team collaboration under pressure",
        "Presenting technical solutions to judges"
      ]
    },
    {
      title: "World's Largest Hackathon (Bolt.new)",
      project: "AquaChain Platform",
      description: "Built a water quality monitoring system with real-time data collection, analytics, and automated alerts for environmental protection.",
      date: "June 2025",
      participants: "300+",
      achievement: "Best Use of Technology",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
      tech: ["Bolt.new"],
      learnings: [
        "Real-time database architecture",
        "IoT data integration patterns",
        "Scaling applications for high traffic"
      ]
    },
    {
      title: "Precision Care Challenge 2025",
      project: "ShishuMitra",
      description: "A comprehensive platform for tracking and supporting early childhood development with personalized recommendations and expert guidance.",
      date: "July-September 2025",
      participants: "250+",
      image: "https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=600",
      tech: ["React", "Django", "ML"],
      learnings: [
        "Web app development best practices",
        "Healthcare data privacy compliance",
        "Machine learning for personalization"
      ]
    }
  ];

  return (
    <section id="hackathons" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Hackathon <span className="text-blue-600">Journey</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Turning ideas into reality through competitive programming and collaborative innovation.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Hackathons Timeline */}
        <div className="space-y-12">
          {hackathons.map((hackathon, index) => (
            <div 
              key={index}
              className={`relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                flex flex-col md:flex gap-8 items-center`}
            >
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-teal-600 rounded-full" />
              
              {/* Timeline Dot */}
              <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-white shadow-lg z-10" />

              {/* Content Card */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-8 shadow-lg 
                  hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {hackathon.title}
                      </h3>
                      <p className="text-blue-600 font-semibold text-lg">{hackathon.project}</p>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Trophy size={20} />
                      <span className="text-sm font-medium">{hackathon.position}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Calendar className={`mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hackathon.date}</p>
                    </div>
                    <div className="text-center">
                      <Users className={`mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hackathon.participants}</p>
                    </div>
                    <div className="text-center">
                      <Award className={`mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hackathon.achievement}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed`}>
                    {hackathon.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hackathon.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Learnings */}
                  <div>
                    <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Key Learnings:
                    </h4>
                    <ul className="space-y-2">
                      {hackathon.learnings.map((learning, learningIndex) => (
                        <li 
                          key={learningIndex}
                          className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          {learning}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;