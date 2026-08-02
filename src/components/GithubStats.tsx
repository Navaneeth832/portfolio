import React, { useEffect, useState } from 'react';
import { Github, Star, GitFork, BookOpen, RefreshCw, Activity } from 'lucide-react';
import { ENDPOINTS } from '../config';

interface GithubStatsProps {
  darkMode: boolean;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface Profile {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  url: string;
  followers: number;
  following: number;
  publicRepos: number;
}

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

const GithubStats: React.FC<GithubStatsProps> = ({ darkMode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch contributions + profile from our backend proxy
      const contribRes = await fetch(ENDPOINTS.github);
      if (!contribRes.ok) throw new Error(`Backend error: ${contribRes.status}`);
      const contribData = await contribRes.json();
      setProfile(contribData.profile);
      setWeeks(contribData.contributions.weeks);
      setTotalContributions(contribData.contributions.total);

      // Fetch repos directly from GitHub REST API (public, no auth needed)
      const reposRes = await fetch(
        'https://api.github.com/users/Navaneeth832/repos?sort=updated&per_page=6'
      );
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        setRepos(Array.isArray(reposData) ? reposData : []);
      }
    } catch (err: any) {
      console.warn('[GithubStats] Fetch error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Contribution cell color based on count
  const cellColor = (count: number): string => {
    if (count === 0) return darkMode ? 'bg-slate-800' : 'bg-slate-100';
    if (count <= 2) return 'bg-emerald-900';
    if (count <= 5) return 'bg-emerald-700';
    if (count <= 9) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  const base = darkMode ? 'text-slate-100' : 'text-slate-900';
  const muted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const border = darkMode ? 'border-slate-800' : 'border-slate-200';
  const cardBg = darkMode ? 'bg-slate-900/60' : 'bg-white';

  return (
    <section
      id="stats"
      className={`py-24 ${darkMode ? 'bg-slate-900/60' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-sm font-mono font-medium text-indigo-500 mb-2">GitHub</p>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${base}`}>
              Open Source Activity
            </h2>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className={`p-2 rounded-md ${muted} hover:text-indigo-500 transition-colors disabled:opacity-40`}
            aria-label="Refresh GitHub data"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {error && (
          <div className={`mb-8 p-4 rounded-lg border ${border} text-sm ${muted}`}>
            <span className="text-amber-500 font-medium">Backend offline —</span>{' '}
            start the backend server to see live GitHub data.
            <span className="block text-xs mt-1 font-mono opacity-60">{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-700" />
                <div className="h-4 w-32 bg-slate-700 rounded" />
                <div className="h-3 w-24 bg-slate-700 rounded" />
              </div>
            ) : profile ? (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-14 h-14 rounded-full border-2 border-indigo-500/30"
                  />
                  <div>
                    <p className={`text-sm font-semibold ${base}`}>{profile.name}</p>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-500 hover:underline font-mono"
                    >
                      @{profile.login}
                    </a>
                  </div>
                </div>
                {profile.bio && (
                  <p className={`text-xs leading-relaxed mb-5 ${muted}`}>{profile.bio}</p>
                )}
                <div className={`grid grid-cols-3 gap-2 pt-4 border-t ${border} text-center`}>
                  {[
                    { label: 'Repos', value: profile.publicRepos },
                    { label: 'Followers', value: profile.followers },
                    { label: 'Following', value: profile.following },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className={`text-base font-bold font-mono ${base}`}>{stat.value}</p>
                      <p className={`text-xs ${muted}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-medium border ${border} ${muted} hover:text-indigo-500 hover:border-indigo-500/40 transition-colors`}
                >
                  <Github size={14} /> View Profile
                </a>
              </>
            ) : (
              <p className={`text-sm ${muted}`}>Could not load profile.</p>
            )}
          </div>

          {/* Contribution Heatmap + Repos — right 2/3 */}
          <div className="lg:col-span-2 space-y-6">

            {/* Contribution Calendar */}
            <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-2 text-xs font-medium ${muted}`}>
                  <Activity size={14} />
                  Contribution Calendar
                </div>
                {totalContributions > 0 && (
                  <span className={`text-xs font-mono ${muted}`}>
                    {totalContributions} contributions in the last year
                  </span>
                )}
              </div>

              {loading ? (
                <div className="animate-pulse h-24 bg-slate-800 rounded-lg" />
              ) : weeks.length > 0 ? (
                <div className="overflow-x-auto pb-1">
                  <div className="inline-grid grid-rows-7 grid-flow-col gap-[3px]">
                    {weeks.flatMap((week) =>
                      week.contributionDays.map((day) => (
                        <div
                          key={day.date}
                          className={`w-3 h-3 rounded-sm ${cellColor(day.contributionCount)} transition-colors`}
                          title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
                        />
                      ))
                    )}
                  </div>
                  <div className={`flex items-center gap-1 mt-2 text-[11px] font-mono ${muted}`}>
                    <span>Less</span>
                    {['bg-slate-800', 'bg-emerald-900', 'bg-emerald-700', 'bg-emerald-500', 'bg-emerald-400'].map((c, i) => (
                      <span key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              ) : (
                <p className={`text-xs ${muted}`}>
                  Contribution data unavailable — check backend connection.
                </p>
              )}
            </div>

            {/* Top Repos */}
            {repos.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3">
                {repos.slice(0, 4).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-xl border ${border} ${cardBg} hover:border-indigo-500/30 transition-colors block`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={13} className="text-indigo-500 shrink-0" />
                      <span className={`text-xs font-mono font-medium ${base} truncate`}>
                        {repo.name}
                      </span>
                    </div>
                    {repo.description && (
                      <p className={`text-xs ${muted} line-clamp-2 mb-3 leading-relaxed`}>
                        {repo.description}
                      </p>
                    )}
                    <div className={`flex items-center gap-3 text-xs font-mono ${muted}`}>
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={11} />
                        {repo.forks_count}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GithubStats;
