// file: components/decision-builder/DecisionBuilder.tsx
'use client';

import React from 'react';
import { Slider } from '../shared/Slider';
import { RiskProfileCard } from './RiskProfileCard';
import { ModelDiagnostics } from './ModelDiagnostics';
import { useSimulationStore } from '../../store/simulationStore';
import { useSimulation } from '../../hooks/useSimulation';

type PresetKey = 'stressed' | 'stable' | 'highMentorship' | 'burnoutProne';

const PRESETS: Record<PresetKey, Partial<Record<string, number>>> = {
    stressed: { timeAllocation: 30, financialStress: 75, scheduleEntropy: 70, cognitiveLoad: 80, burnoutRisk: 60, mentorAccess: 15 },
    stable: { timeAllocation: 65, financialStress: 20, scheduleEntropy: 20, cognitiveLoad: 30, burnoutRisk: 10, mentorAccess: 60 },
    highMentorship: { timeAllocation: 60, financialStress: 25, scheduleEntropy: 30, cognitiveLoad: 35, burnoutRisk: 15, mentorAccess: 90 },
    burnoutProne: { timeAllocation: 85, financialStress: 40, scheduleEntropy: 55, cognitiveLoad: 90, burnoutRisk: 85, mentorAccess: 20 },
};

const PRESET_LABELS: Record<PresetKey, string> = {
    stressed: 'Stressed',
    stable: 'Stable',
    highMentorship: 'High Mentor',
    burnoutProne: 'Burnout Prone',
};

export const DecisionBuilder: React.FC = () => {
    const {
        timeAllocation, financialStress, scheduleEntropy, cognitiveLoad,
        presentBias, planningFallacy, burnoutRisk, scarcityMindset,
        feedbackLatency, mentorAccess, setVariable,
    } = useSimulationStore();

    const diagnostics = useSimulation();

    const applyPreset = (key: PresetKey) => {
        const preset = PRESETS[key];
        Object.entries(preset).forEach(([k, v]) => {
            if (v !== undefined) setVariable(k as Parameters<typeof setVariable>[0], v);
        });
    };

    return (
        <div className="h-full flex flex-col border-r border-slate-800 bg-slate-950">
            <div className="px-5 py-4 border-b border-slate-800">
                <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Decision Builder</h2>
                <p className="text-sm font-semibold text-slate-100 mt-0.5">Configure Parameters</p>
            </div>

            {/* Scenario Presets — Feature 8 */}
            <div className="px-5 py-3 border-b border-slate-800/60 flex gap-1.5 flex-wrap">
                {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
                    <button
                        key={key}
                        onClick={() => applyPreset(key)}
                        className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider border border-slate-700 text-slate-500 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors duration-150"
                    >
                        {PRESET_LABELS[key]}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                <section>
                    <p className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest mb-3 border-b border-slate-800/60 pb-1">
                        § 1 — Constraints
                    </p>
                    <div className="space-y-4">
                        <Slider label="Time Allocation" value={timeAllocation}
                            onChange={(v) => setVariable('timeAllocation', v)}
                            tooltip="Weekly hours dedicated to skill-building activities" />
                        <Slider label="Financial Stress" value={financialStress}
                            onChange={(v) => setVariable('financialStress', v)}
                            colorClass="accent-amber-400"
                            tooltip="Financial pressure that reduces cognitive bandwidth" />
                        <Slider label="Schedule Entropy" value={scheduleEntropy}
                            onChange={(v) => setVariable('scheduleEntropy', v)}
                            colorClass="accent-amber-400"
                            tooltip="Degree of schedule unpredictability and disruption" />
                    </div>
                </section>

                <section>
                    <p className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest mb-3 border-b border-slate-800/60 pb-1">
                        § 2 — Behavioral Dynamics
                    </p>
                    <div className="space-y-4">
                        <Slider label="Cognitive Load" value={cognitiveLoad}
                            onChange={(v) => setVariable('cognitiveLoad', v)}
                            colorClass="accent-amber-400"
                            tooltip="Mental overhead from competing responsibilities" />
                        <Slider label="Present Bias" value={presentBias}
                            onChange={(v) => setVariable('presentBias', v)}
                            colorClass="accent-red-400"
                            tooltip="Tendency to over-weight immediate over future rewards" />
                        <Slider label="Planning Fallacy" value={planningFallacy}
                            onChange={(v) => setVariable('planningFallacy', v)}
                            colorClass="accent-red-400"
                            tooltip="Systematic underestimation of task completion time" />
                        <Slider label="Burnout Risk" value={burnoutRisk}
                            onChange={(v) => setVariable('burnoutRisk', v)}
                            colorClass="accent-red-400"
                            tooltip="Cumulative exhaustion risk from sustained high effort" />
                        <Slider label="Scarcity Mindset" value={scarcityMindset}
                            onChange={(v) => setVariable('scarcityMindset', v)}
                            colorClass="accent-amber-400"
                            tooltip="Resource scarcity tunneling effect on decision quality" />
                    </div>
                </section>

                <section>
                    <p className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest mb-3 border-b border-slate-800/60 pb-1">
                        § 3 — Structural Support
                    </p>
                    <div className="space-y-4">
                        <Slider label="Feedback Latency" value={feedbackLatency}
                            onChange={(v) => setVariable('feedbackLatency', v)}
                            colorClass="accent-amber-400"
                            tooltip="Delay between action and measurable feedback signal" />
                        <Slider label="Mentor Access" value={mentorAccess}
                            onChange={(v) => setVariable('mentorAccess', v)}
                            tooltip="Quality and frequency of mentorship and guidance" />
                    </div>
                </section>
            </div>

            <div className="px-5 pb-5">
                <RiskProfileCard />
                {/* Model Diagnostics — Feature 1 */}
                <ModelDiagnostics
                    growthCoefficient={diagnostics.growthCoefficient}
                    volatilityIndex={diagnostics.volatilityIndex}
                    burnoutDecayRate={diagnostics.burnoutDecayRate}
                    recoveryElasticity={diagnostics.recoveryElasticity}
                    stateRigidityIndex={diagnostics.stateRigidityIndex}
                />
            </div>
        </div>
    );
};
