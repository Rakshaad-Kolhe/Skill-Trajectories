// file: components/decision-builder/RiskProfileCard.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';

export const RiskProfileCard: React.FC = () => {
    const { expectedOutcome, regretScore, stagnationRisk } = useSimulationStore();

    const getRiskLevel = (score: number): { label: string; color: string } => {
        if (score < 30) return { label: 'LOW', color: 'text-cyan-400' };
        if (score < 60) return { label: 'MODERATE', color: 'text-amber-400' };
        return { label: 'HIGH', color: 'text-red-400' };
    };

    const risk = getRiskLevel(regretScore);

    return (
        <div className="border border-slate-800 bg-slate-900/30 p-4 mt-4">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                Risk Profile
            </p>
            <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Outcome</p>
                    <p className="text-lg font-mono font-bold text-cyan-400">{expectedOutcome.toFixed(0)}</p>
                </div>
                <div className="text-center border-x border-slate-800">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Regret</p>
                    <p className="text-lg font-mono font-bold text-amber-400">{regretScore.toFixed(0)}</p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Stagnation</p>
                    <p className="text-lg font-mono font-bold text-red-400">{stagnationRisk.toFixed(0)}</p>
                </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Risk Level</span>
                <span className={`text-xs font-mono font-bold ${risk.color}`}>{risk.label}</span>
            </div>
        </div>
    );
};
