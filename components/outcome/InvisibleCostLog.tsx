// file: components/outcome/InvisibleCostLog.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';

interface CostEntry {
    label: string;
    value: number;
    unit: string;
}

export const InvisibleCostLog: React.FC = () => {
    const { financialStress, cognitiveLoad, burnoutRisk, scheduleEntropy } = useSimulationStore();

    const costs: CostEntry[] = [
        { label: 'Attention Loss', value: cognitiveLoad * 0.8, unit: 'hrs/wk' },
        { label: 'Financial Drag', value: financialStress * 0.5, unit: 'pts' },
        { label: 'Burnout Velocity', value: burnoutRisk * 0.9, unit: 'pts/yr' },
        { label: 'Opportunity Leak', value: scheduleEntropy * 0.6, unit: 'pts' },
    ];

    return (
        <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                Invisible Cost Log
            </p>
            <div className="space-y-1.5">
                {costs.map((c) => (
                    <div key={c.label} className="flex items-center justify-between text-xs font-mono py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">{c.label}</span>
                        <span className="text-amber-400 tabular-nums">
                            {c.value.toFixed(1)}
                            <span className="text-slate-600 ml-1">{c.unit}</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
