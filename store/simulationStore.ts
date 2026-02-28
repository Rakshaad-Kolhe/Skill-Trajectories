import { create } from 'zustand';

export interface SimulationInputState {
    timeAllocation: number;
    financialStress: number;
    scheduleEntropy: number;
    cognitiveLoad: number;
    presentBias: number;
    planningFallacy: number;
    burnoutRisk: number;
    scarcityMindset: number;
    feedbackLatency: number;
    mentorAccess: number;
}

export interface SimulationState extends SimulationInputState {
    expectedOutcome: number;
    regretScore: number;
    stagnationRisk: number;

    baselineSnapshot: SimulationInputState | null;

    setVariable: (key: keyof Omit<SimulationState, 'setVariable' | 'setDerivedMetrics' | 'setBaselineSnapshot'>, value: number) => void;
    setDerivedMetrics: (metrics: Partial<SimulationState>) => void;
    setBaselineSnapshot: (snapshot: SimulationInputState | null) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
    timeAllocation: 50,
    financialStress: 20,
    scheduleEntropy: 30,
    cognitiveLoad: 40,
    presentBias: 25,
    planningFallacy: 15,
    burnoutRisk: 10,
    scarcityMindset: 20,
    feedbackLatency: 10,
    mentorAccess: 50,

    expectedOutcome: 50,
    regretScore: 20,
    stagnationRisk: 10,

    baselineSnapshot: null,

    setVariable: (key, value) => set((state) => ({ ...state, [key]: value })),
    setDerivedMetrics: (metrics) => set((state) => ({ ...state, ...metrics })),
    setBaselineSnapshot: (snapshot) => set((state) => ({ ...state, baselineSnapshot: snapshot })),
}));

