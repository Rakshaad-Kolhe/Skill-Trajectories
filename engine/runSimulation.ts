export interface SimulationInput {
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

export interface SimulationOutput {
    expectedOutcome: number;
    regretScore: number;
    volatilityExposure: number;
    recoveryElasticity: number;
    compoundingEfficiency: number;
    stagnationRisk: number;
}

export function runSimulation(inputs: SimulationInput): SimulationOutput {
    let growth = inputs.timeAllocation * 1.5;

    const stressPenalty = (inputs.financialStress * 0.4) + (inputs.cognitiveLoad * 0.3) + (inputs.scheduleEntropy * 0.2);
    growth -= stressPenalty;

    const compoundingEfficiency = Math.max(0, 100 - inputs.feedbackLatency - inputs.planningFallacy);

    const volatilityExposure = (inputs.presentBias * 0.6) + (inputs.scarcityMindset * 0.4);

    const recoveryElasticity = inputs.mentorAccess * 0.8;

    const expectedOutcome = Math.max(0, Math.min(100, growth * (compoundingEfficiency / 100) + (recoveryElasticity * 0.2)));
    const regretScore = Math.min(100, volatilityExposure + (inputs.burnoutRisk * 0.5));
    const stagnationRisk = Math.max(0, 100 - expectedOutcome - recoveryElasticity);

    return {
        expectedOutcome,
        regretScore,
        volatilityExposure,
        recoveryElasticity,
        compoundingEfficiency,
        stagnationRisk
    };
}
