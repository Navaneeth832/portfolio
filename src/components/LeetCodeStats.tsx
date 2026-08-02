import React from 'react';
import { Code2, Trophy, Award, Flame, ExternalLink, CheckCircle, Target, Zap } from 'lucide-react';

interface LeetCodeStatsProps {
  darkMode: boolean;
}

const LeetCodeStats: React.FC<LeetCodeStatsProps> = ({ darkMode }) => {
  const stats = {
    username: "Navaneeth832",
    totalSolved: 150,
    easySolved: 75,
    mediumSolved: 62,
    hardSolved: 13,
    acceptanceRate: "68.4%",
    gfgRank: "Top 30",
    gateRank: "AIR 4391"
  };

  const dsaPatterns = [
    "Arrays & Hashing", "Two Pointers", "Sliding Window", "Stack & Queue",
    "Binary Search", "Trees & Graphs", "Dynamic Programming", "Heap / Priority Queue"
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-mono font-medium text-indigo-500 mb-3">Problem Solving</p>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            LeetCode & DSA
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Solved Stats Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl border glass-card ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
          }">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      LeetCode Profile
                    </h3>
                    <a
                      href="https://leetcode.com/u/Navaneeth832/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-indigo-500 hover:underline"
                    >
                      @{stats.username}
                    </a>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
                  <Flame size={14} /> 150+ Solved
                </span>
              </div>

              {/* Total Solved Ring / Summary */}
              <div className="p-6 rounded-2xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 mb-6 text-center">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">Total Solved Problems</span>
                <span className={`text-5xl font-black font-mono tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {stats.totalSolved}+
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  Focused on core Data Structures & Algorithms patterns
                </p>
              </div>

              {/* Difficulty Breakdown Bars */}
              <div className="space-y-4">
                {/* Easy */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-500">Easy ({stats.easySolved})</span>
                    <span className="font-mono text-slate-400">50%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-amber-500">Medium ({stats.mediumSolved})</span>
                    <span className="font-mono text-slate-400">41%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '41%' }} />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-rose-500">Hard ({stats.hardSolved})</span>
                    <span className="font-mono text-slate-400">9%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '9%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
              <a
                href="https://leetcode.com/u/Navaneeth832/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs text-center transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-600/20"
              >
                <ExternalLink size={16} />
                <span>Visit LeetCode Profile</span>
              </a>
            </div>
          </div>

          {/* Competitive Ranks & DSA Topics */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            {/* National & Platform Achievements Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* GATE CS 2026 */}
              <div className={`p-6 rounded-3xl border glass-card ${
                darkMode ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-indigo-50/80 border-indigo-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      GATE CS 2026
                    </h4>
                    <span className="text-xs text-indigo-500 font-medium">Graduate Aptitude Test</span>
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-2">
                  AIR 4391
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  All India Rank achieved in Computer Science & Engineering.
                </p>
              </div>

              {/* GeeksforGeeks Rank */}
              <div className={`p-6 rounded-3xl border glass-card ${
                darkMode ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-emerald-50/80 border-emerald-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h4 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      GeeksforGeeks
                    </h4>
                    <span className="text-xs text-emerald-500 font-medium">University Leaderboard</span>
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-2">
                  Top 30 Rank
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Ranked in Top 30 for university problem-solving consistency.
                </p>
              </div>

            </div>

            {/* Key DSA Patterns Practiced */}
            <div className={`p-7 rounded-3xl border glass-card ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
            }`}>
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-indigo-500">
                <Target size={16} /> Key Data Structure & Algorithm Patterns
              </h4>
              <div className="flex flex-wrap gap-2">
                {dsaPatterns.map((pattern, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 ${
                      darkMode
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle size={12} className="text-emerald-500" />
                    {pattern}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
