import React from 'react';
import { GraduationCap, Award, Languages } from 'lucide-react';
import resumeData from '../data/resume.json';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const subtle = darkMode ? 'text-slate-300' : 'text-slate-600';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const cardBg = darkMode ? 'bg-slate-900/60' : 'bg-white';

  const cet = resumeData.education.find(e => e.institution.includes('Trivandrum')) || resumeData.education[0];
  const leetcodeCount = resumeData.profilesAndAchievements.leetcode.detail;
  const gateAir = resumeData.profilesAndAchievements.gate.detail;

  return (
    <section
      id="about"
      className={`py-24 ${darkMode ? 'bg-slate-900/50' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <p className={`text-sm font-mono font-medium text-indigo-500 mb-3`}>About</p>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-12 ${base}`}>
          Background
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Personal summary */}
          <div className="space-y-6">
            <p className={`text-base leading-relaxed ${subtle}`}>
              I'm a student of {cet.degree.replace("Bachelor of Technology in ", "")} at{' '}
              <span className={`font-medium ${base}`}>{cet.institution}</span>. I enjoy building
              full-stack applications, working with backend APIs, and exploring how large language models can
              be integrated into real-world software.
            </p>
            <p className={`text-base leading-relaxed ${subtle}`}>
              My primary languages include {resumeData.technicalSkills.Languages.join(', ')} and frameworks like {resumeData.technicalSkills['Backend & Frameworks'].slice(0, 3).join(', ')}. I've been working with the Gemini API
              and Model Context Protocol (MCP) for agentic workflows, and I'm actively improving my knowledge of
              distributed systems and database design.
            </p>
            <p className={`text-base leading-relaxed ${subtle}`}>
              Outside of academics and internships, I enjoy competitive programming and have solved {leetcodeCount}
              problems on LeetCode. I appeared for GATE CS 2026, achieving an {resumeData.profilesAndAchievements.gate.title} of {gateAir}.
            </p>

            {/* Languages */}
            <div className={`pt-6 border-t ${border}`}>
              <div className={`flex items-center gap-2 text-sm font-medium mb-3 ${muted}`}>
                <Languages size={15} />
                Languages
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.languages.map((l) => (
                  <span
                    key={l.name}
                    className={`px-3 py-1 rounded-md text-xs border ${border} ${muted}`}
                  >
                    {l.name}
                    <span className="ml-1.5 opacity-60">· {l.level}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Education */}
          <div>
            <div className={`flex items-center gap-2 text-sm font-medium mb-5 ${muted}`}>
              <GraduationCap size={15} />
              Education
            </div>
            <div className="space-y-4">
              {resumeData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border ${border} ${cardBg} ${
                    edu.highlight ? 'ring-1 ring-indigo-500/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-sm font-semibold ${base}`}>{edu.degree}</p>
                      <p className={`text-xs mt-0.5 ${muted}`}>{edu.institution}</p>
                    </div>
                    <span className={`shrink-0 text-xs font-mono ${muted}`}>{edu.shortPeriod}</span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-500">
                      <Award size={12} /> {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;