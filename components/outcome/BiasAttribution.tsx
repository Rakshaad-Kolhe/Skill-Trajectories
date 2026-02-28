// file: components/outcome/BiasAttribution.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';

interface BiasEntry {
    label: string;
    contribution: number;
    color: string;
}

export const BiasAttribution: React.FC = () => {
    const { presentBias, planningFallacy, scarcityMindset } = useSimulationStore();

    const total = presentBias + planningFallacy + scarcityMindset || 1;

    const biases: BiasEntry[] = [
        { label: 'Present Bias', contribution: presentBias, color: '#ef4444' },
        { label: 'Planning Fallacy', contribution: planningFallacy, color: '#f59e0b' },
        { label: 'Scarcity Mindset', contribution: scarcityMindset, color: '#f97316' },
    ];

    return (
        <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                Bias Attribution
            </p>
            <div className="flex h-2 w-full mb-3">
                {biases.map((b) => (
                    <div
                        key={b.label}
                        style={{ width: `${(b.contribution / total) * 100}%`, backgroundColor: b.color }}
                        className="transition-all duration-500"
                    />
                ))}
            </div>
            <div className="space-y-1">
                {biases.map((b) => (
                    <div key={b.label} className="flex items-center justify-between text-[10px] font-mono">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5" style={{ backgroundColor: b.color }} />
                            <span className="text-slate-400">{b.label}</span>
                        </div>
                        <span className="tabular-nums" style={{ color: b.color }}>
                            {((b.contribution / total) * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
