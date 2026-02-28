// file: components/outcome/KeyMetricsPanel.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { runSimulation } from '../../engine/runSimulation';
import { MetricBadge } from '../shared/MetricBadge';

export const KeyMetricsPanel: React.FC = () => {
    const store = useSimulationStore();

    const result = runSimulation({
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

    return (
        <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                Key Metrics
            </p>
            <div className="grid grid-cols-2 gap-2">
                <MetricBadge label="Volatility" value={result.volatilityExposure} color="amber" />
                <MetricBadge label="Recovery" value={result.recoveryElasticity} color="cyan" />
                <MetricBadge label="Efficiency" value={result.compoundingEfficiency} color="cyan" />
                <MetricBadge label="Stagnation" value={result.stagnationRisk} color="red" />
            </div>
        </div>
    );
};
