// file: components/outcome/PointOfNoReturn.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';

export const PointOfNoReturn: React.FC = () => {
    const { burnoutRisk, stagnationRisk, mentorAccess } = useSimulationStore();

    const threshold = Math.max(1, 10 - (burnoutRisk / 20) - (stagnationRisk / 30) + (mentorAccess / 50));
    const year = Math.min(10, Math.max(1, Math.round(threshold)));
    const risk = burnoutRisk + stagnationRisk > 80;

    return (
        <div className="border border-red-500/20 bg-red-500/5 p-3">
            <p className="text-[10px] font-mono text-red-400/70 uppercase tracking-widest mb-1">
                Point of No Return
            </p>
            <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-slate-300">
                    Year {year} threshold
                </span>
                {risk && (
                    <span className="text-[10px] font-mono text-red-400 px-1.5 py-0.5 border border-red-500/30">
                        CRITICAL
                    </span>
                )}
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-1">
                Irreversibility window based on current stress trajectory.
            </p>
        </div>
    );
};
