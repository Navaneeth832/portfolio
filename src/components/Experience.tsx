import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface ExperienceProps {
  darkMode: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ darkMode }) => {
  const experiences = [
    {
      title: "DL Research and Development Intern",
      company: "DiceMed",
      location: "Remote",
      period: "Aug 2025 – Jan 2026",
      type: "Internship",
      description: "Focused on deep learning research and development in medical imaging applications.",
      responsibilities: [
        "Built foundation in deep learning frameworks (TensorFlow, PyTorch) through applied projects and coursework",
        "Enhanced DiceMed's website design to improve user experience and accessibility",
        "Annotated 2D/3D medical imaging datasets using tools like 3D Slicer, ITK-SNAP, CVAT, and LabelImg",
        "Collaborated with research team to analyze deep learning architectures and co-author journal publications"
      ],
      tech: ["TensorFlow", "PyTorch", "3D Slicer", "ITK-SNAP", "CVAT", "LabelImg"],
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Web Developer",
      company: "Internship Cell, CET",
      location: "Remote",
      period: "June 2025 – Present",
      type: "Internship",
      description: "Working on the official platform to improve student access to internships and career opportunities.",
      responsibilities: [
        "Working on the official platform to improve student access to internships",
        "Using HTML, CSS, and Python to build and maintain internal web tools",
        "Collaborating with team to enhance user experience and platform functionality"
      ],
      tech: ["HTML", "CSS", "Python", "Web Development"],
      color: "from-blue-600 to-teal-600"
    },
    {
      title: "Data Science Intern",
      company: "Proxenix",
      location: "Remote",
      period: "June 2025 – July 2025",
      type: "Internship",
      description: "Assisted in data analysis and model development for business intelligence solutions.",
      responsibilities: [
        "Assisting in data analysis and model development using Python",
        "Applying data science techniques for predictive insights and reports",
        "Working with large datasets to extract meaningful business insights"
      ],
      tech: ["Python", "Data Analysis", "Machine Learning", "Predictive Modeling"],
      color: "from-green-600 to-blue-600"
    }
  ];

  return (
    <section id="experience" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Professional <span className="text-blue-600">Experience</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            My journey through various internships and roles, gaining hands-on experience in web development, 
            data science, and deep learning research.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-teal-600 rounded-full" />
          
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div 
                key={index}
                className={`relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                  flex flex-col md:flex gap-8 items-center`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-white shadow-lg z-10" />

                {/* Content Card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-8 shadow-lg 
                    hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                    
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {experience.title}
                          </h3>
                          <p className={`text-lg font-semibold bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`}>
                            {experience.company}
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {experience.type}
                        </span>
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Calendar size={16} />
                          <span className="text-sm">{experience.period}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <MapPin size={16} />
                          <span className="text-sm">{experience.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
                        {experience.description}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Key Responsibilities:
                      </h4>
                      <ul className="space-y-2">
                        {experience.responsibilities.map((responsibility, respIndex) => (
                          <li 
                            key={respIndex}
                            className={`flex items-start gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Technologies & Tools:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.tech.map((tech, techIndex) => (
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
                    </div>
                  </div>
                </div>

                {/* Visual Element */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-8 shadow-lg 
                    hover:shadow-xl transition-all duration-300`}>
                    <div className="flex items-center justify-center h-48">
                      <div className={`text-center`}>
                        <Briefcase className={`mx-auto mb-4 bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`} size={48} />
                        <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {experience.company}
                        </h4>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {experience.period}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;