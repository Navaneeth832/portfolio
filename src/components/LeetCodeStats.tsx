import React, { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw, Code2 } from 'lucide-react';
import { ENDPOINTS } from '../config';

interface LeetCodeStatsProps {
  darkMode: boolean;
}

interface LeetCodeData {
  username: string;
  ranking: number;
  solved: { total: number; easy: number; medium: number; hard: number };
  acceptanceRate: string;
  contest: {
    attended: number;
    rating: number;
    globalRank: number;
    topPercentage: string;
  } | null;
  topTags: Array<{ tagName: string; problemsSolved: number }>;
}

// Hardcoded fallback shown when backend is unreachable
const FALLBACK: LeetCodeData = {
  username: 'Navaneeth832',
  ranking: 0,
  solved: { total: 150, easy: 75, medium: 62, hard: 13 },
  acceptanceRate: '68.4%',
  contest: null,
  topTags: [
    { tagName: 'Array', problemsSolved: 40 },
    { tagName: 'Dynamic Programming', problemsSolved: 25 },
    { tagName: 'Tree', problemsSolved: 20 },
    { tagName: 'Binary Search', problemsSolved: 18 },
    { tagName: 'Graph', problemsSolved: 15 },
    { tagName: 'Two Pointers', problemsSolved: 14 },
    { tagName: 'Sliding Window', problemsSolved: 10 },
    { tagName: 'Stack', problemsSolved: 9 },
  ],
};

const LeetCodeStats: React.FC<LeetCodeStatsProps> = ({ darkMode }) => {
  const [data, setData] = useState<LeetCodeData>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ENDPOINTS.leetcode);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setIsLive(true);
    } catch (err: any) {
      console.warn('[LeetCodeStats] Backend unreachable, using fallback:', err.message);
      setError(err.message);
      setIsLive(false);
      setData(FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const cardBg = darkMode ? 'bg-slate-900/60' : 'bg-white';

  const totalForBar = data.solved.easy + data.solved.medium + data.solved.hard || 1;
  const difficulties = [
    { label: 'Easy', count: data.solved.easy, color: 'bg-emerald-500', text: 'text-emerald-500' },
    { label: 'Medium', count: data.solved.medium, color: 'bg-amber-500', text: 'text-amber-500' },
    { label: 'Hard', count: data.solved.hard, color: 'bg-red-500', text: 'text-red-500' },
  ];

  return (
    <section
      id="leetcode"
      className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-sm font-mono font-medium text-indigo-500 mb-2">Problem Solving</p>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${base}`}>
              LeetCode & DSA
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <span className={`text-xs font-mono ${isLive ? 'text-emerald-500' : 'text-amber-500'}`}>
                {isLive ? '● live' : '○ fallback'}
              </span>
            )}
            <button
              onClick={fetchStats}
              disabled={loading}
              className={`p-2 rounded-md ${muted} hover:text-indigo-500 transition-colors disabled:opacity-40`}
              title="Refresh"
              aria-label="Refresh LeetCode stats"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {error && !isLive && (
          <div className={`mb-8 p-4 rounded-lg border ${border} text-xs ${muted} font-mono`}>
            <span className="text-amber-500 font-semibold">Backend offline</span> — showing hardcoded stats. Start the backend to fetch live data.
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Solved Count Card */}
          <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
            <div className={`flex items-center gap-2 text-xs font-medium mb-5 ${muted}`}>
              <Code2 size={14} />
              Problems Solved
            </div>

            {/* Big number */}
            <div className="mb-6">
              <span className={`text-5xl font-bold font-mono ${base}`}>
                {loading ? '···' : data.solved.total}
              </span>
              <span className={`text-sm ml-2 ${muted}`}>solved</span>
            </div>

            {/* Difficulty breakdown */}
            <div className="space-y-3">
              {difficulties.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={d.text}>{d.label}</span>
                    <span className={`font-mono ${muted}`}>{d.count}</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <div
                      className={`h-full rounded-full ${d.color} transition-all duration-500`}
                      style={{ width: `${(d.count / totalForBar) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Acceptance rate */}
            <div className={`mt-5 pt-4 border-t ${border} flex justify-between text-xs ${muted}`}>
              <span>Acceptance rate</span>
              <span className="font-mono">{data.acceptanceRate}</span>
            </div>

            <a
              href="https://leetcode.com/u/Navaneeth832/"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-medium border ${border} ${muted} hover:text-indigo-500 hover:border-indigo-500/40 transition-colors`}
            >
              <ExternalLink size={13} /> View Profile
            </a>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-2 space-y-5">

            {/* Extra stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'GATE CS 2026', value: 'AIR 4391', color: 'text-amber-500' },
                { label: 'GFG Rank', value: 'Top 30', color: 'text-emerald-500' },
                { label: data.ranking ? 'LC Global Rank' : 'Platform', value: data.ranking ? `#${data.ranking.toLocaleString()}` : 'LeetCode', color: 'text-indigo-500' },
              ].map((stat) => (
                <div key={stat.label} className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <p className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</p>
                  <p className={`text-xs mt-0.5 ${muted}`}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Contest stats (only if live and available) */}
            {isLive && data.contest && (
              <div className={`p-5 rounded-xl border ${border} ${cardBg}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${muted}`}>Contest Stats</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Rating', value: data.contest.rating },
                    { label: 'Global Rank', value: `#${data.contest.globalRank?.toLocaleString()}` },
                    { label: 'Contests', value: data.contest.attended },
                    { label: 'Top %', value: `${data.contest.topPercentage}%` },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className={`text-base font-bold font-mono ${base}`}>{s.value}</p>
                      <p className={`text-xs ${muted}`}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DSA Topics */}
            <div className={`p-5 rounded-xl border ${border} ${cardBg}`}>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${muted}`}>
                Top Topics {isLive ? '(live)' : '(estimated)'}
              </p>
              <div className="flex flex-wrap gap-2">
                {data.topTags.map((tag) => (
                  <span
                    key={tag.tagName}
                    className={`px-2.5 py-1 rounded-md text-xs border ${border} ${muted} font-mono`}
                  >
                    {tag.tagName}
                    <span className="ml-1.5 text-indigo-500">{tag.problemsSolved}</span>
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
