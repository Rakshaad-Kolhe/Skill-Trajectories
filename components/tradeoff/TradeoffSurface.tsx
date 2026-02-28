// file: components/tradeoff/TradeoffSurface.tsx
'use client';

import React, { useState } from 'react';
import { RadarChart } from './RadarChart';
import { useSimulationStore } from '../../store/simulationStore';
import { runSimulation } from '../../engine/runSimulation';
import { Slider } from '../shared/Slider';

type FocusVar = 'timeAllocation' | 'mentorAccess' | 'burnoutRisk';

export const TradeoffSurface: React.FC = () => {
    const store = useSimulationStore();
    const [focusVar, setFocusVar] = useState<FocusVar>('timeAllocation');
    const [override, setOverride] = useState(50);
    const [sensitivityMode, setSensitivityMode] = useState(false);

    const baseResult = runSimulation({
        timeAllocation: store.timeAllocation,
        financialStress: store.financialStress,
        scheduleEntropy: store.scheduleEntropy,
        cognitiveLoad: store.cognitiveLoad,
        presentBias: store.presentBias,
        planningFallacy: store.planningFallacy,
        burnoutRisk: store.burnoutRisk,
        scarcityMindset: store.scarcityMindset,
        feedbackLatency: store.feedbackLatency,
        mentorAccess: store.mentorAccess,
    });

    const altResult = runSimulation({
        ...store,
        [focusVar]: override,
    });

    // Sensitivity sweep — Feature 6: compute delta at override+10
    const sweepResult = runSimulation({
        ...store,
        [focusVar]: Math.min(100, override + 10),
    });
    const deltaOutcome = sweepResult.expectedOutcome - altResult.expectedOutcome;
    const deltaVolatility = sweepResult.volatilityExposure - altResult.volatilityExposure;

    const baseRadar = {
        Outcome: baseResult.expectedOutcome,
        Recovery: baseResult.recoveryElasticity,
        Efficiency: baseResult.compoundingEfficiency,
        Volatility: 100 - baseResult.volatilityExposure,
        Regret: 100 - baseResult.regretScore,
    };

    const altRadar = {
        Outcome: altResult.expectedOutcome,
        Recovery: altResult.recoveryElasticity,
        Efficiency: altResult.compoundingEfficiency,
        Volatility: 100 - altResult.volatilityExposure,
        Regret: 100 - altResult.regretScore,
    };

    const focusOptions: Array<{ key: FocusVar; label: string }> = [
        { key: 'timeAllocation', label: 'Time Allocation' },
        { key: 'mentorAccess', label: 'Mentor Access' },
        { key: 'burnoutRisk', label: 'Burnout Risk' },
    ];

    return (
        <div className="h-full bg-slate-950 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Trade-Off Analyzer</h2>
                    <p className="text-sm font-semibold text-slate-100 mt-0.5">Variable Surface Comparison</p>
                </div>
                {/* Sensitivity mode toggle — Feature 6 */}
                <button
                    onClick={() => setSensitivityMode((v) => !v)}
                    className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider border transition-colors ${sensitivityMode
                            ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
                            : 'border-slate-700 text-slate-500 hover:border-slate-600'
                        }`}
                >
                    Sensitivity Mode
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
                <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Focus Variable</p>
                    <div className="flex gap-2">
                        {focusOptions.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setFocusVar(key)}
                                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${focusVar === key
                                        ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
                                        : 'border-slate-700 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Slider
                            label={`Override: ${focusOptions.find(o => o.key === focusVar)?.label}`}
                            value={override}
                            onChange={setOverride}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-around gap-4">
                    <div className="text-center">
                        <p className="text-[10px] font-mono text-slate-500 mb-3 uppercase tracking-widest">Baseline (Current)</p>
                        <RadarChart values={baseRadar} size={220} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-mono text-cyan-600 mb-3 uppercase tracking-widest">
                            Override ({focusVar} = {override})
                        </p>
                        <RadarChart values={altRadar} size={220} />
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-4 grid grid-cols-5 gap-2">
                    {Object.keys(baseRadar).map((key) => {
                        const base = baseRadar[key as keyof typeof baseRadar];
                        const alt = altRadar[key as keyof typeof altRadar];
                        const diff = alt - base;
                        const color = diff > 0 ? 'text-cyan-400' : diff < 0 ? 'text-red-400' : 'text-slate-400';
                        return (
                            <div key={key} className="text-center border border-slate-800 py-2">
                                <p className="text-[9px] font-mono text-slate-500 uppercase">{key}</p>
                                <p className={`text-sm font-mono font-bold mt-0.5 ${color}`}>
                                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Sensitivity delta box — Feature 6 */}
                {sensitivityMode && (
                    <div className="border border-cyan-500/20 bg-cyan-500/5 p-4">
                        <p className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest mb-3">
                            Sensitivity Sweep — Δ at {focusVar} + 10
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center border border-slate-800 py-2">
                                <p className="text-[9px] font-mono text-slate-500 uppercase">Δ Outcome</p>
                                <p className={`text-sm font-mono font-bold mt-1 ${deltaOutcome >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
                                    {deltaOutcome >= 0 ? '+' : ''}{deltaOutcome.toFixed(2)}
                                </p>
                            </div>
                            <div className="text-center border border-slate-800 py-2">
                                <p className="text-[9px] font-mono text-slate-500 uppercase">Δ Volatility</p>
                                <p className={`text-sm font-mono font-bold mt-1 ${deltaVolatility <= 0 ? 'text-cyan-400' : 'text-amber-400'}`}>
                                    {deltaVolatility >= 0 ? '+' : ''}{deltaVolatility.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
