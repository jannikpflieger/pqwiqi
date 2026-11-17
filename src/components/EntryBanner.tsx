import type { ReactNode } from "react";

/**
 * Dark "quantum" banner card at the top of an article. Shared by the Wiqi
 * entry pages and the Applications pages so their headings stay identical.
 * `children` fills the metadata row under the title.
 */
export function EntryBanner({
  badge,
  title,
  subtitle,
  children,
}: {
  badge: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-8 dark:border-slate-800 dark:bg-slate-900 md:px-8">
        <div className="mx-auto max-w-7xl">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(236,72,153,0.35)] md:p-12 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
                {/* Quantum Particle Field - Floating Particles */}
                <div className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-40 dark:group-hover:opacity-30">
                    {/* Left side particles */}
                    <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-lg shadow-pink-500/50 transition-all duration-500 group-hover:shadow-pink-500/60" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute left-1/3 top-2/3 h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/50 transition-all duration-500 group-hover:shadow-blue-500/60" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute left-1/5 top-1/2 h-2.5 w-2.5 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50 transition-all duration-500 group-hover:shadow-purple-500/60" style={{ animationDelay: '1s' }}></div>

                    {/* Center particles */}
                    <div className="absolute left-1/2 top-1/3 h-1.5 w-1.5 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/50 transition-all duration-500 group-hover:shadow-cyan-500/60" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute left-1/2 top-2/3 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-400 to-purple-400 shadow-lg shadow-violet-500/50 transition-all duration-500 group-hover:shadow-violet-500/60" style={{ animationDelay: '0.8s' }}></div>

                    {/* Right side particles */}
                    <div className="absolute right-1/4 top-1/3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 shadow-lg shadow-indigo-500/50 transition-all duration-500 group-hover:shadow-indigo-500/60" style={{ animationDelay: '1.2s' }}></div>
                    <div className="absolute right-1/3 bottom-1/4 h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/50 transition-all duration-500 group-hover:shadow-emerald-500/60" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute right-1/5 top-1/2 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-rose-400 to-pink-400 shadow-lg shadow-rose-500/50 transition-all duration-500 group-hover:shadow-rose-500/60" style={{ animationDelay: '0.7s' }}></div>
                </div>

                {/* Quantum Entanglement Visualization - Left Qubit */}
                <div className="absolute left-0 top-1/2 h-48 w-48 -translate-x-1/4 -translate-y-1/2 rounded-full bg-pink-500/30 blur-2xl transition-all duration-700 group-hover:bg-pink-500/40 group-hover:scale-105 md:h-64 md:w-64 dark:group-hover:bg-pink-500/50 dark:group-hover:scale-110">
                    <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-400/50 bg-pink-500/20 backdrop-blur-sm transition-all duration-700 group-hover:border-pink-400/60"></div>
                    <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-pink-300/50"></div>
                    {/* Quantum state particles around left qubit */}
                    <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-300" style={{ transform: 'translate(-50%, -50%) translateX(24px) translateY(0px)' }}></div>
                    <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-300" style={{ transform: 'translate(-50%, -50%) translateX(-24px) translateY(0px)', animationDelay: '0.3s' }}></div>
                    <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-300" style={{ transform: 'translate(-50%, -50%) translateX(0px) translateY(24px)', animationDelay: '0.6s' }}></div>
                </div>

                {/* Quantum Entanglement Visualization - Right Qubit */}
                <div className="absolute right-0 top-1/2 h-48 w-48 translate-x-1/4 -translate-y-1/2 rounded-full bg-slate-700/50 blur-2xl transition-all duration-700 group-hover:bg-slate-600/55 group-hover:scale-105 md:h-64 md:w-64 dark:group-hover:bg-slate-600/60 dark:group-hover:scale-110">
                    <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-400/50 bg-slate-600/20 backdrop-blur-sm transition-all duration-700 group-hover:border-slate-400/60"></div>
                    <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-slate-300/50" style={{ animationDelay: '0.5s' }}></div>
                    {/* Quantum state particles around right qubit */}
                    <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-300" style={{ transform: 'translate(-50%, -50%) translateX(24px) translateY(0px)' }}></div>
                    <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-300" style={{ transform: 'translate(-50%, -50%) translateX(-24px) translateY(0px)', animationDelay: '0.3s' }}></div>
                    <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-300" style={{ transform: 'translate(-50%, -50%) translateX(0px) translateY(24px)', animationDelay: '0.6s' }}></div>
                </div>

                {/* Quantum Wave Patterns - Inspired by not-found.tsx */}
                <svg 
                    className="absolute inset-0 h-full w-full opacity-20 transition-opacity duration-500 group-hover:opacity-25 dark:group-hover:opacity-20"
                    viewBox="0 0 1000 200"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(236,72,153,0.4)" />
                            <stop offset="50%" stopColor="rgba(168,85,247,0.3)" />
                            <stop offset="100%" stopColor="rgba(59,130,246,0.4)" />
                        </linearGradient>
                        <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
                            <stop offset="50%" stopColor="rgba(168,85,247,0.4)" />
                            <stop offset="100%" stopColor="rgba(236,72,153,0.3)" />
                        </linearGradient>
                    </defs>
                    {/* Wave pattern 1 */}
                    <path
                        d="M 0,100 Q 125,60 250,100 T 500,100 T 750,100 T 1000,100"
                        stroke="url(#wave1)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                    />
                    {/* Wave pattern 2 */}
                    <path
                        d="M 0,100 Q 125,140 250,100 T 500,100 T 750,100 T 1000,100"
                        stroke="url(#wave2)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: '0.5s' }}
                    />
                </svg>

                {/* Quantum Particle Connections - Dynamic Lines */}
                <svg 
                    className="absolute inset-0 h-full w-full opacity-10 transition-opacity duration-500 group-hover:opacity-15 dark:group-hover:opacity-20"
                    viewBox="0 0 1000 200"
                    preserveAspectRatio="none"
                >
                    {/* Connection lines between qubits */}
                    <line 
                        x1="200" 
                        y1="100" 
                        x2="800" 
                        y2="100" 
                        stroke="rgba(236,72,153,0.3)" 
                        strokeWidth="1" 
                        strokeDasharray="5,5"
                        className="animate-pulse"
                    />
                    {/* Additional quantum state lines */}
                    <line 
                        x1="150" 
                        y1="80" 
                        x2="850" 
                        y2="120" 
                        stroke="rgba(168,85,247,0.2)" 
                        strokeWidth="1" 
                        strokeDasharray="3,7"
                        className="animate-pulse"
                        style={{ animationDelay: '0.3s' }}
                    />
                    <line 
                        x1="150" 
                        y1="120" 
                        x2="850" 
                        y2="80" 
                        stroke="rgba(59,130,246,0.2)" 
                        strokeWidth="1" 
                        strokeDasharray="3,7"
                        className="animate-pulse"
                        style={{ animationDelay: '0.6s' }}
                    />
                </svg>

                {/* Quantum Orb Effects - Spinning Rings */}
                <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-pink-400/20 opacity-30 transition-all duration-700 group-hover:opacity-40 dark:group-hover:opacity-30">
                    <div className="absolute inset-4 animate-spin-slow-reverse rounded-full border border-purple-400/20"></div>
                </div>
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-spin-slow-reverse rounded-full border border-blue-400/20 opacity-20 transition-all duration-700 group-hover:opacity-30 dark:group-hover:opacity-20">
                    <div className="absolute inset-3 animate-spin-slow rounded-full border border-cyan-400/20"></div>
                </div>

                {/* Quantum Circuit Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="quantum-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#quantum-grid)" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Category Label with Quantum Badge */}
                    <div className="mb-4">
                        <span className="group/badge inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:scale-105">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
                            </span>
                            {badge}
                        </span>
                    </div>

                    {/* Title and Subtitle with Quantum Glow Effect */}
                    <div className="mb-6">
                        <h1 className="mb-3 font-serif text-3xl font-bold leading-tight text-white transition-all duration-300 group-hover:text-pink-100 md:text-4xl lg:text-5xl">
                            <span className="relative inline-block">
                        {title}
                                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                            </span>
                    </h1>
                        {subtitle && (
                        <p className="text-base leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-white/90 md:text-lg">
                        {subtitle}
                    </p>
                        )}
                    </div>

                    {/* Metadata with Quantum Icons */}
                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/80 md:text-base">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}

/** Pink reading-time pill used in the banner's metadata row. */
export function ReadingTimePill({ children }: { children: ReactNode }) {
  return (
    <span className="group/btn relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-pink-500/80 to-pink-600/80 px-4 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:from-pink-500 hover:to-pink-600 hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105 active:scale-95">
        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {children}
        <span className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 group-hover/btn:opacity-50"></span>
    </span>
  );
}
