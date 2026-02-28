import { useEffect, useMemo } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { runSimulation } from '../engine/runSimulation';

export interface DiagnosticMetrics {
    growthCoefficient: number;
    volatilityIndex: number;
    burnoutDecayRate: number;
    recoveryElasticity: number;
    stateRigidityIndex: number;
}

export function useSimulation(): ReturnType<typeof useSimulationStore> & DiagnosticMetrics {
    const store = useSimulationStore();

    useEffect(() => {
        const {
            timeAllocation,
            financialStress,
            scheduleEntropy,
            cognitiveLoad,
            presentBias,
            planningFallacy,
            burnoutRisk,
            scarcityMindset,
            feedbackLatency,
            mentorAccess,
            setDerivedMetrics
        } = store;

        const output = runSimulation({
            timeAllocation,
            financialStress,
            scheduleEntropy,
            cognitiveLoad,
            presentBias,
            planningFallacy,
            burnoutRisk,
            scarcityMindset,
            feedbackLatency,
            mentorAccess
        });

        setDerivedMetrics({
            expectedOutcome: output.expectedOutcome,
            regretScore: output.regretScore,
            stagnationRisk: output.stagnationRisk
        });
    }, [
        store.timeAllocation,
        store.financialStress,
        store.scheduleEntropy,
        store.cognitiveLoad,
        store.presentBias,
        store.planningFallacy,
        store.burnoutRisk,
        store.scarcityMindset,
        store.feedbackLatency,
        store.mentorAccess,
        store.setDerivedMetrics
    ]);

    const diagnostics = useMemo<DiagnosticMetrics>(() => {
        const output = runSimulation({
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
        return {
            growthCoefficient: output.compoundingEfficiency / 100,
            volatilityIndex: output.volatilityExposure / 20,
            burnoutDecayRate: store.burnoutRisk / 100,
            recoveryElasticity: output.recoveryElasticity,
            stateRigidityIndex: (output.volatilityExposure + output.stagnationRisk) / 200,
        };
    }, [
        store.timeAllocation, store.financialStress, store.scheduleEntropy, store.cognitiveLoad,
        store.presentBias, store.planningFallacy, store.burnoutRisk, store.scarcityMindset,
        store.feedbackLatency, store.mentorAccess,
    ]);

    return { ...store, ...diagnostics };
}
