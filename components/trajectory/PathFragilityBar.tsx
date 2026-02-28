// file: components/trajectory/PathFragilityBar.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';

export const PathFragilityBar: React.FC = () => {
    const { expectedOutcome, stagnationRisk, presentBias, scarcityMindset } = useSimulationStore();

    const volatilityExposure = (presentBias * 0.6) + (scarcityMindset * 0.4);

    const fragility = Math.min(100, Math.max(0, (volatilityExposure + stagnationRisk) / 2));

    const { label, color, trackColor } =
        fragility <= 33
            ? { label: 'Stable', color: '#22d3ee', trackColor: 'rgba(34,211,238,0.2)' }
            : fragility <= 66
                ? { label: 'Fragile', color: '#f59e0b', trackColor: 'rgba(245,158,11,0.2)' }
                : { label: 'Locked', color: '#ef4444', trackColor: 'rgba(239,68,68,0.2)' };

    return (
        <div className="px-5 py-2 flex items-center gap-3 border-t border-slate-800/50">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Path Fragility
            </p>
            <div className="flex-1 h-1 relative" style={{ backgroundColor: trackColor }}>
                <div
                    className="absolute h-full transition-all duration-500"
                    style={{ width: `${fragility}%`, backgroundColor: color }}
                />
            </div>
            <span className="text-[10px] font-mono tabular-nums w-16 text-right" style={{ color }}>
                {label} {fragility.toFixed(0)}
            </span>
        </div>
    );
};
