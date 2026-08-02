import React from 'react';
import { ExternalLink, Github, FileCode, ShieldAlert, Activity } from 'lucide-react';
import resumeData from '../data/resume.json';

interface ProjectsProps {
  darkMode: boolean;
}

const getProjectIcon = (id: string) => {
  switch (id) {
    case 'lab-record-studio':
      return <FileCode size={18} className="text-indigo-500" />;
    case 'sentinel-guard-ai':
      return <ShieldAlert size={18} className="text-emerald-500" />;
    case 'crash-detection-soc':
      return <Activity size={18} className="text-pink-500" />;
    default:
      return <FileCode size={18} className="text-indigo-500" />;
  }
};

const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
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
          A selection of projects built.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {resumeData.projects.map((project) => (
            <div
              key={project.id}
              className={`flex flex-col p-6 rounded-xl border ${border} ${cardBg} hover:border-indigo-500/30 transition-colors duration-200`}
            >
              {/* Title row */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`p-2 rounded-lg border ${border}`}>
                  {getProjectIcon(project.id)}
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