// file: components/trajectory/FutureLandscape.tsx
'use client';

import React, { useState } from 'react';
import { TrajectoryCanvas } from './TrajectoryCanvas';
import { TrajectoryHealthMeter } from './TrajectoryHealthMeter';
import { WhatIfTimeline } from './WhatIfTimeline';
import { PathFragilityBar } from './PathFragilityBar';
import { RegretCurve } from './RegretCurve';
import { useSimulationStore } from '../../store/simulationStore';

export const FutureLandscape: React.FC = () => {
    const [previewYear, setPreviewYear] = useState(5);
    const {
        setBaselineSnapshot, baselineSnapshot,
        timeAllocation, financialStress, scheduleEntropy, cognitiveLoad,
        presentBias, planningFallacy, burnoutRisk, scarcityMindset,
        feedbackLatency, mentorAccess
    } = useSimulationStore();

    const handleClone = () => { console.info('[FutureLandscape] Clone Scenario triggered'); };
    const handleCompare = () => { console.info('[FutureLandscape] Compare A/B triggered'); };
    const handleRecompute = () => { console.info('[FutureLandscape] Recompute triggered'); };

    const handleBaselineToggle = () => {
        if (baselineSnapshot) {
            setBaselineSnapshot(null);
        } else {
            setBaselineSnapshot({
                timeAllocation, financialStress, scheduleEntropy, cognitiveLoad,
                presentBias, planningFallacy, burnoutRisk, scarcityMindset,
                feedbackLatency, mentorAccess
            });
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Future Landscape</h2>
                    <p className="text-sm font-semibold text-slate-100 mt-0.5">Trajectory Projection</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Compare Baseline button — Feature 5 */}
                    <button
                        onClick={handleBaselineToggle}
                        className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider border transition-colors ${baselineSnapshot
                            ? 'border-slate-500 text-slate-300 bg-slate-800/50'
                            : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                            }`}
                    >
                        {baselineSnapshot ? 'Clear Baseline' : 'Compare Baseline'}
                    </button>
                    <div className="px-2 py-1 border border-slate-800 bg-slate-900">
                        <span className="text-[10px] font-mono text-slate-500">10Y HORIZON</span>
                    </div>
                </div>
            </div>

            <div className="px-5 pt-4">
                <TrajectoryHealthMeter />
            </div>

            <div className="flex-1 px-4 py-3 min-h-0">
                <div className="w-full h-full">
                    <TrajectoryCanvas previewYear={previewYear} baselineSnapshot={baselineSnapshot} />
                </div>
            </div>

            {/* Path Fragility Bar — Feature 2 */}
            <PathFragilityBar />

            {/* Regret Accumulation Curve — Feature 4 */}
            <RegretCurve />

            <WhatIfTimeline
                year={previewYear}
                onYearChange={setPreviewYear}
                onClone={handleClone}
                onCompare={handleCompare}
                onRecompute={handleRecompute}
            />
        </div>
    );
};
