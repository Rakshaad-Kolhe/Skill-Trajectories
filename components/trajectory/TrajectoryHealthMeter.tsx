// file: components/trajectory/TrajectoryHealthMeter.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';

export const TrajectoryHealthMeter: React.FC = () => {
    const { expectedOutcome, stagnationRisk } = useSimulationStore();
    const health = Math.max(0, Math.min(100, expectedOutcome - stagnationRisk * 0.3));

    const getHealthColor = (score: number) => {
        if (score > 65) return '#22d3ee';
        if (score > 35) return '#f59e0b';
        return '#ef4444';
    };

    const color = getHealthColor(health);

    return (
        <div className="flex items-center gap-3">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Trajectory Health
            </p>
            <div className="flex-1 h-1 bg-slate-800 relative">
                <div
                    className="absolute h-full transition-all duration-500"
                    style={{ width: `${health}%`, backgroundColor: color }}
                />
            </div>
            <span className="text-xs font-mono tabular-nums" style={{ color }}>
                {health.toFixed(0)}
            </span>
        </div>
    );
};
