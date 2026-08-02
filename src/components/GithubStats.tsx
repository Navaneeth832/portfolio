import React, { useEffect, useState } from 'react';
import { Github, Star, GitFork, BookOpen, Activity, GitCommit, GitPullRequest, Code2, RefreshCw } from 'lucide-react';

interface GithubStatsProps {
  darkMode: boolean;
}

interface GithubProfile {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

const GithubStats: React.FC<GithubStatsProps> = ({ darkMode }) => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGithubData = async () => {
    setLoading(true);
    try {
      const [profileRes, reposRes, eventsRes] = await Promise.all([
        fetch('https://api.github.com/users/Navaneeth832'),
        fetch('https://api.github.com/users/Navaneeth832/repos?sort=updated&per_page=6'),
        fetch('https://api.github.com/users/Navaneeth832/events/public?per_page=5')
      ]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
      }

      if (reposRes.ok) {
        const reposData = await reposRes.json();
        setRepos(Array.isArray(reposData) ? reposData : []);
      }

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      }
    } catch (err) {
      console.warn("GitHub API rate limited or offline, using fallback UI");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  const fallbackProfile: GithubProfile = {
    avatar_url: "https://github.com/Navaneeth832.png",
    name: "Navaneeth Krishna G",
    login: "Navaneeth832",
    bio: "Computer Science & Engineering @ CET Trivandrum | Full Stack Developer",
    public_repos: 18,
    followers: 12,
    following: 15,
    html_url: "https://github.com/Navaneeth832"
  };

  const fallbackRepos: GithubRepo[] = [
    {
      id: 1,
      name: "record_latex_generator",
      description: "AI-powered laboratory document generator translating prompts & PDFs into LaTeX.",
      stargazers_count: 5,
      forks_count: 2,
      language: "Python",
      html_url: "https://github.com/Navaneeth832/record_latex_generator",
      updated_at: "2026-04-15"
    },
    {
      id: 2,
      name: "KTU-grade-analysis",
      description: "FastAPI + React app for academic CGPA/SGPA analysis and grade forecasting.",
      stargazers_count: 4,
      forks_count: 1,
      language: "TypeScript",
      html_url: "https://github.com/Navaneeth832/KTU-grade-analysis",
      updated_at: "2026-03-20"
    },
    {
      id: 3,
      name: "Movie-sentimental-analysis",
      description: "Machine learning web app for movie review sentiment classification.",
      stargazers_count: 3,
      forks_count: 1,
      language: "Python",
      html_url: "https://github.com/Navaneeth832/Movie-sentimental-analysis",
      updated_at: "2025-07-10"
    }
  ];

  const activeProfile = profile || fallbackProfile;
  const activeRepos = repos.length > 0 ? repos : fallbackRepos;

  const languages = [
    { name: "Python", percentage: 45, color: "bg-yellow-500" },
    { name: "TypeScript / React", percentage: 25, color: "bg-blue-500" },
    { name: "Dart / Flutter", percentage: 15, color: "bg-cyan-500" },
    { name: "C / C++", percentage: 10, color: "bg-violet-500" },
    { name: "HTML / CSS", percentage: 5, color: "bg-orange-500" }
  ];

  return (
    <section id="stats" className={`py-24 relative overflow-hidden ${
      darkMode ? 'bg-slate-900/60 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-sm font-mono font-medium text-indigo-500 mb-3">GitHub</p>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Open Source Activity
          </h2>
        </div>

        {/* Profile Card & Stats Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* GitHub User Bio Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl border glass-card text-center sm:text-left ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
            }`}>
              <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
                <img
                  src={activeProfile.avatar_url}
                  alt={activeProfile.name}
                  className="w-20 h-20 rounded-2xl ring-4 ring-indigo-500/20 object-cover shadow-md"
                />
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {activeProfile.name || activeProfile.login}
                  </h3>
                  <a
                    href={activeProfile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-semibold text-indigo-500 hover:underline"
                  >
                    @{activeProfile.login}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {activeProfile.bio}
                  </p>
                </div>
              </div>

              {/* Counts */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-200 dark:border-slate-800 text-center">
                <div>
                  <span className={`block text-xl font-extrabold font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {activeProfile.public_repos}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Repos</span>
                </div>
                <div>
                  <span className={`block text-xl font-extrabold font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {activeProfile.followers}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Followers</span>
                </div>
                <div>
                  <span className={`block text-xl font-extrabold font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {activeProfile.following}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Following</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <a
                  href={activeProfile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-2"
                >
                  <Github size={16} />
                  <span>View GitHub Profile</span>
                </a>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className={`p-6 rounded-3xl border glass-card ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
            }`}>
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-indigo-500">
                <Code2 size={16} /> Language Distribution
              </h4>
              <div className="space-y-3">
                {languages.map((lang, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{lang.name}</span>
                      <span className="font-mono text-slate-400">{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className={`h-full ${lang.color} rounded-full`} style={{ width: `${lang.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Top Repos & Contribution Heatmap */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Contribution Heatmap Mock Canvas / Calendar Grid */}
            <div className={`p-6 sm:p-8 rounded-3xl border glass-card ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold flex items-center gap-2 text-indigo-500">
                  <Activity size={16} /> GitHub Contribution Matrix
                </h4>
                <span className="text-xs font-mono text-slate-400">Past 12 Months</span>
              </div>
              
              {/* Contribution Calendar Graphic */}
              <div className="overflow-x-auto pb-2">
                <div className="inline-grid grid-rows-7 grid-flow-col gap-1 min-w-[500px]">
                  {Array.from({ length: 154 }).map((_, i) => {
                    const intensity = (i * 7 + 3) % 5;
                    const colors = [
                      darkMode ? 'bg-slate-800/80' : 'bg-slate-100',
                      'bg-emerald-950 text-emerald-800',
                      'bg-emerald-700',
                      'bg-emerald-500',
                      'bg-emerald-400'
                    ];
                    return (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-xs transition-colors hover:scale-125 ${colors[intensity]}`}
                        title={`Activity level ${intensity}`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-200 dark:bg-slate-800"></span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-900"></span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-700"></span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400"></span>
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Repositories Listing */}
            <div>
              <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Top Repositories
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                {activeRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-5 rounded-2xl border transition-all duration-200 glass-card glass-card-hover flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white/80 border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold font-mono text-indigo-500 flex items-center gap-1.5 truncate">
                          <BookOpen size={14} /> {repo.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        {repo.language || "Code"}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Star size={13} className="text-amber-400" /> {repo.stargazers_count}</span>
                        <span className="flex items-center gap-1"><GitFork size={13} /> {repo.forks_count}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default GithubStats;
