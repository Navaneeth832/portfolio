import React from 'react';
import { Trophy, Award, Medal, CheckCircle2 } from 'lucide-react';
import resumeData from '../data/resume.json';

interface AchievementsProps {
  darkMode: boolean;
}

const getRankIcon = (key: string) => {
  switch (key) {
    case 'gate':
      return <Trophy size={16} className="text-amber-500" />;
    case 'leetcode':
      return <Award size={16} className="text-indigo-500" />;
    case 'gfg':
      return <Medal size={16} className="text-emerald-500" />;
    default:
      return <Trophy size={16} className="text-amber-500" />;
  }
};

const Achievements: React.FC<AchievementsProps> = ({ darkMode }) => {
  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const cardBg = darkMode ? 'bg-slate-900/60' : 'bg-white';

  const ranks = Object.entries(resumeData.profilesAndAchievements).map(([key, info]) => ({
    key,
    ...info
  }));

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
          {ranks.map((r) => (
            <div
              key={r.key}
              className={`p-5 rounded-xl border ${border} ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-3">
                {getRankIcon(r.key)}
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
            {resumeData.certificates.map((cert, i) => (
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
