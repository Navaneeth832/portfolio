import React from 'react';
import resumeData from '../data/resume.json';

interface SkillsProps {
  darkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const cardBg = darkMode ? 'bg-slate-900/60' : 'bg-white';
  const chip = darkMode
    ? 'bg-slate-800 border-slate-700 text-slate-300'
    : 'bg-slate-50 border-slate-200 text-slate-700';

  const skillCategories = Object.entries(resumeData.technicalSkills).map(([title, items]) => ({
    title,
    items
  }));

  return (
    <section
      id="skills"
      className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-sm font-mono font-medium text-indigo-500 mb-3">Skills</p>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-12 ${base}`}>
          Tech Stack
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className={`p-5 rounded-xl border ${border} ${cardBg}`}
            >
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${muted}`}>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono border ${chip}`}
                  >
                    {skill}
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

export default Skills;