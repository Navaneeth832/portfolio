import React from 'react';
import { MapPin } from 'lucide-react';

interface ExperienceProps {
  darkMode: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ darkMode }) => {
  const experiences = [
    {
      title: 'Full Stack Developer, Intern',
      company: 'SATCARD – IIT Palakkad',
      period: 'May 2026 – Present',
      location: 'IIT Palakkad, Kerala',
      isCurrent: true,
      points: [
        'Building a full-stack agricultural market analytics platform with a FastAPI backend and Flutter frontend.',
        'Implemented dynamic multi-level commodity filtering and interactive data visualizations using Riverpod for state management.',
        'Designed PostgreSQL database schema with SQLAlchemy ORM to handle time-series market data efficiently.',
      ],
      tech: ['FastAPI', 'Flutter', 'Riverpod', 'PostgreSQL', 'SQLAlchemy', 'Python'],
    },
    {
      title: 'Data Science Intern',
      company: 'Proxenix',
      period: 'Jun 2025 – Jul 2025',
      location: 'Remote',
      isCurrent: false,
      points: [
        'Collaborated in a team of 5 to build and deploy a movie review sentiment analysis web app achieving 90% accuracy.',
        'Built the FastAPI inference backend and integrated a React frontend for real-time predictions.',
        'Used TF-IDF vectorization and Logistic Regression (scikit-learn) for the classification model.',
      ],
      tech: ['Python', 'FastAPI', 'React', 'TF-IDF', 'Logistic Regression', 'Scikit-Learn'],
    },
  ];

  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const subtle = darkMode ? 'text-slate-300' : 'text-slate-600';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const cardBg = darkMode ? 'bg-slate-900/60' : 'bg-white';

  return (
    <section
      id="experience"
      className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-sm font-mono font-medium text-indigo-500 mb-3">Experience</p>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-12 ${base}`}>
          Work History
        </h2>

        <div className="max-w-3xl space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border ${border} ${cardBg}`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className={`text-base font-semibold ${base}`}>{exp.title}</h3>
                  <p className="text-sm text-indigo-500 font-medium mt-0.5">{exp.company}</p>
                  <div className={`flex items-center gap-1 mt-1 text-xs ${muted}`}>
                    <MapPin size={11} />
                    {exp.location}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {exp.isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Current
                    </span>
                  )}
                  <span className={`text-xs font-mono ${muted}`}>{exp.period}</span>
                </div>
              </div>

              {/* Impact points */}
              <ul className={`space-y-2 mb-5 text-sm ${subtle}`}>
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-indigo-500" />
                    {pt}
                  </li>
                ))}
              </ul>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono border ${border} ${muted}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;