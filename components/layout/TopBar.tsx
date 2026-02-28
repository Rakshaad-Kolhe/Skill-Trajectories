import React from 'react';

export const TopBar: React.FC = () => {
    return (
        <header className="h-14 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                    <div className="w-2 h-2 bg-cyan-400" />
                </div>
                <h1 className="text-sm font-semibold tracking-wide text-slate-100 uppercase">
                    Skill Trajectories
                </h1>
                <span className="text-xs text-slate-600 px-2">|</span>
                <span className="text-xs font-medium text-slate-400">
                    Human Capital Decision Intelligence
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800">
                    <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono text-cyan-400">Simulation Active</span>
                </div>
                <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500/90 text-xs font-mono">
                    Research Build
                </div>
                <div className="hidden xl:flex flex-col items-end gap-0.5 border-l border-slate-800 pl-4 ml-1">
                    <span className="text-[9px] font-mono text-slate-600">Monte Carlo: 10,000</span>
                    <span className="text-[9px] font-mono text-slate-600">95% Confidence · State-Dependent Model</span>
                </div>
            </div>
        </header>
    );
};
