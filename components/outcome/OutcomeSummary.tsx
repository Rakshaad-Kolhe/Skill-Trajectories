// file: components/outcome/OutcomeSummary.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';

export const OutcomeSummary: React.FC = () => {
    const { expectedOutcome } = useSimulationStore();

    const label =
        expectedOutcome > 70 ? 'Strong Growth' :
            expectedOutcome > 40 ? 'Moderate Trajectory' :
                'At-Risk Path';

    const color =
        expectedOutcome > 70 ? 'text-cyan-400' :
            expectedOutcome > 40 ? 'text-amber-400' :
                'text-red-400';

    return (
        <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                Projected Outcome
            </p>
            <p className={`text-3xl font-mono font-bold ${color} tabular-nums`}>
                {expectedOutcome.toFixed(1)}
                <span className="text-sm font-normal text-slate-500 ml-2">/ 100</span>
            </p>
            <p className={`text-xs font-mono mt-1 ${color}`}>{label}</p>
        </div>
    );
};
