import React from 'react';
import { Trophy, Award, Medal, CheckCircle2 } from 'lucide-react';

interface AchievementsProps {
  darkMode: boolean;
}

const Achievements: React.FC<AchievementsProps> = ({ darkMode }) => {
  const ranks = [
    {
      title: 'GATE CS 2026',
      detail: 'AIR 4391',
      desc: 'National-level graduate aptitude test for computer science.',
      icon: <Trophy size={16} className="text-amber-500" />,
    },
    {
      title: 'LeetCode',
      detail: '150+ Solved',
      desc: 'Covers arrays, DP, trees, graphs, and binary search.',
      icon: <Award size={16} className="text-indigo-500" />,
    },
    {
      title: 'GeeksforGeeks',
      detail: 'Top 30 – University',
      desc: 'Ranked in top 30 within university for problem-solving consistency.',
      icon: <Medal size={16} className="text-emerald-500" />,
    },
  ];

  const certificates = [
    { title: 'Certificate of Innovation', issuer: 'Google Developers Group on Campus – ADGIPS' },
    { title: 'Certificate of Participation', issuer: 'Adobe' },
    { title: 'Data Science & Analytics Internship', issuer: 'Proxenix' },
    { title: 'AI Internship Certificate', issuer: 'Agnirva Space Community' },
    { title: 'Essential Mathematics for Machine Learning', issuer: 'NPTEL' },
    { title: 'Getting Started with JavaScript', issuer: 'Pupilfirst' },
    { title: 'Getting Started with Gemini API', issuer: 'Google DeepMind' },
  ];

  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const subtle = darkMode ? 'text-slate-300' : 'text-slate-600';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const cardBg = darkMode ? 'bg-slate-900/60' : 'bg-white';

  return (
    <section
      id="achievements"
      className={`py-24 ${darkMode ? 'bg-slate-900/50' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-sm font-mono font-medium text-indigo-500 mb-3">Achievements</p>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-12 ${base}`}>
          Ranks & Certifications
        </h2>

        {/* Competitive ranks */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {ranks.map((r, i) => (
            <div
              key={i}
              className={`p-5 rounded-xl border ${border} ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-3">
                {r.icon}
                <span className={`text-xs font-medium ${muted}`}>{r.title}</span>
              </div>
              <p className={`text-xl font-bold font-mono mb-1 ${base}`}>{r.detail}</p>
              <p className={`text-xs ${muted}`}>{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Certificates */}
        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-5 ${muted}`}>
            Certificates
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certificates.map((cert, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 rounded-xl border ${border} ${cardBg}`}
              >
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className={`text-sm font-medium ${base}`}>{cert.title}</p>
                  <p className={`text-xs mt-0.5 ${muted}`}>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Achievements;
