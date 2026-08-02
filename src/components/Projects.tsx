import React from 'react';
import { ExternalLink, Github, FileCode, ShieldAlert, Activity } from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const projects = [
    {
      id: 'lab-record-studio',
      title: 'Lab Record Studio',
      description: 'AI tool that generates formatted lab records from PDFs, code snippets, or plain-text prompts.',
      highlights: [
        'Supports 3 input types and 2 LaTeX templates',
        'Produces complete lab records in ~15 seconds',
        'Exports PDF preview and Overleaf-compatible ZIP',
        'Deployed on Render with a Next.js + FastAPI stack',
      ],
      tech: ['Next.js', 'FastAPI', 'Python', 'Gemini API', 'LaTeX'],
      github: 'https://github.com/Navaneeth832/record_latex_generator',
      live: 'https://record-latex-generator.onrender.com',
      icon: <FileCode size={18} className="text-indigo-500" />,
    },
    {
      id: 'sentinel-guard',
      title: 'SentinelGuard AI',
      description: 'Multi-modal fraud detection agent that analyzes text, audio, images, and documents.',
      highlights: [
        'Uses Gemini 2.5 reasoning + MCP servers for domain validation',
        'Threat scoring triggers automated SMS/email alerts via Twilio & SendGrid',
        'Dual-layer verification: LLM behavioral analysis + deterministic DB checks',
        'Built with Google Cloud ADK and Vertex AI Agent Runtime',
      ],
      tech: ['Python', 'Gemini 2.5', 'MCP', 'MongoDB', 'Elasticsearch', 'React'],
      github: 'https://github.com/Navaneeth832',
      live: null,
      icon: <ShieldAlert size={18} className="text-emerald-500" />,
    },
    {
      id: 'crash-detection-soc',
      title: 'Crash Detection & SOC Dispatch',
      description: 'Android app that detects vehicle crashes using on-device ML and notifies an operations dashboard.',
      highlights: [
        'Background sensor fusion (accelerometer + gyroscope) for high-G impact detection',
        '1D CNN model via TensorFlow Lite, 3 risk tiers, 300 ms confirmation window',
        'Real-time React SOC dashboard with Firebase and Google Maps routing',
        'Automated hospital routing based on incident location and severity',
      ],
      tech: ['Kotlin', 'TensorFlow Lite', 'React', 'Firebase', 'Python', 'Google Maps API'],
      github: 'https://github.com/Navaneeth832',
      live: null,
      icon: <Activity size={18} className="text-pink-500" />,
    },
  ];

  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const subtle = darkMode ? 'text-slate-300' : 'text-slate-600';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const cardBg = darkMode ? 'bg-slate-900/60' : 'bg-white';

  return (
    <section
      id="projects"
      className={`py-24 ${darkMode ? 'bg-slate-900/50' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-sm font-mono font-medium text-indigo-500 mb-3">Projects</p>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-4 ${base}`}>
          Featured Work
        </h2>
        <p className={`text-sm mb-12 ${muted}`}>
          A selection of projects built independently or during internships.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex flex-col p-6 rounded-xl border ${border} ${cardBg} hover:border-indigo-500/30 transition-colors duration-200`}
            >
              {/* Title row */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`p-2 rounded-lg border ${border}`}>
                  {project.icon}
                </div>
                <h3 className={`text-sm font-semibold ${base}`}>{project.title}</h3>
              </div>

              {/* One-line description */}
              <p className={`text-sm leading-relaxed mb-4 ${subtle}`}>{project.description}</p>

              {/* Highlights */}
              <ul className={`space-y-1.5 mb-5 flex-1`}>
                {project.highlights.map((h, i) => (
                  <li key={i} className={`flex items-start gap-2 text-xs ${muted}`}>
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-indigo-500/60" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded text-xs font-mono border ${border} ${muted}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border ${border} ${muted} hover:text-indigo-500 hover:border-indigo-500/40 transition-colors duration-150`}
                >
                  <Github size={13} />
                  GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-150"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;