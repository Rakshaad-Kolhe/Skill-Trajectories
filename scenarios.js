/**
 * Three preset scenarios demonstrating divergent learning strategies.
 * All feed into the same simulation engine.
 */

const SCENARIOS = {
    A: {
        label: 'Scenario A — Steady & Sustainable',
        description: 'Low hours, high quality, ample sleep. Consistency over intensity.',
        color: '#22d3ee',
        params: {
            studyHours: 2,
            practiceQuality: 'High',
            sleepHours: 8,
            distractionHours: 1,
            financialStress: 'Low',
        },
    },
    B: {
        label: 'Scenario B — Intense Grind',
        description: 'Maximum hours, moderate quality, sleep-deprived. High burnout risk.',
        color: '#f472b6',
        params: {
            studyHours: 6,
            practiceQuality: 'Medium',
            sleepHours: 5,
            distractionHours: 2,
            financialStress: 'Medium',
        },
    },
    C: {
        label: 'Scenario C — Inconsistent Bursts',
        description: 'Moderate hours, low quality, high distraction and stress. Erratic pattern.',
        color: '#fbbf24',
        params: {
            studyHours: 4,
            practiceQuality: 'Low',
            sleepHours: 6,
            distractionHours: 3,
            financialStress: 'High',
        },
    },
};

/**
 * Run all three preset scenarios through Monte Carlo simulation.
 * Returns an object keyed by scenario ID with aggregated results.
 */
function runAllScenarios() {
    const results = {};
    for (const [id, scenario] of Object.entries(SCENARIOS)) {
        results[id] = {
            ...scenario,
            data: runMonteCarloSimulation(scenario.params),
        };
    }
    return results;
}
