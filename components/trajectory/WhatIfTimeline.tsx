// file: components/trajectory/WhatIfTimeline.tsx
import React from 'react';

interface WhatIfTimelineProps {
    year: number;
    onYearChange: (year: number) => void;
    onClone: () => void;
    onCompare: () => void;
    onRecompute: () => void;
}

export const WhatIfTimeline: React.FC<WhatIfTimelineProps> = ({
    year,
    onYearChange,
    onClone,
    onCompare,
    onRecompute,
}) => {
    return (
        <div className="border-t border-slate-800 px-5 py-4 flex items-center gap-6">
            <div className="flex items-center gap-3 flex-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    Preview Year
                </span>
                <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={year}
                    onChange={(e) => onYearChange(Number(e.target.value))}
                    className="flex-1 accent-amber-400 h-1"
                />
                <span className="text-xs font-mono text-amber-400 w-5 text-right tabular-nums">{year}</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onClone}
                    className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border border-slate-700 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors duration-150"
                >
                    Clone Scenario
                </button>
                <button
                    onClick={onCompare}
                    className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border border-slate-700 text-slate-400 hover:border-amber-500/40 hover:text-amber-400 transition-colors duration-150"
                >
                    Compare A/B
                </button>
                <button
                    onClick={onRecompute}
                    className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors duration-150"
                >
                    Recompute
                </button>
            </div>
        </div>
    );
};
