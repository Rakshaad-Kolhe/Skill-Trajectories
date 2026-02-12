/**
 * Core simulation engine for skill trajectory modeling.
 * Implements the monthly learning loop, Monte Carlo uncertainty,
 * and aggregation (mean, P25, P75).
 */

const MONTHS = 36;
const MONTE_CARLO_RUNS = 100;

const QUALITY_MULTIPLIER = { Low: 0.8, Medium: 1.0, High: 1.2 };
const STRESS_CONFIG = {
  Low: { burnoutSensitivity: 1.0, consistencyVariability: 0.0, noiseScale: 1.0 },
  Medium: { burnoutSensitivity: 1.15, consistencyVariability: 0.05, noiseScale: 1.25 },
  High: { burnoutSensitivity: 1.35, consistencyVariability: 0.12, noiseScale: 1.6 },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function gaussianNoise(mean = 0, stdDev = 1) {
  let u1 = Math.random();
  let u2 = Math.random();
  while (u1 === 0) u1 = Math.random();
  return mean + stdDev * Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}

/**
 * Run a single 36-month simulation with the given parameters.
 * Returns arrays of monthly snapshots for skill, burnout, and efficiency.
 */
function runSingleSimulation(params, addNoise = false) {
  const { studyHours, practiceQuality, sleepHours, distractionHours, financialStress } = params;
  const qm = QUALITY_MULTIPLIER[practiceQuality];
  const stress = STRESS_CONFIG[financialStress];

  let S = 20;
  let C = 0.6;
  let B = 0.2;
  let E = 1.0;

  const skillTrajectory = [S];
  const burnoutTrajectory = [B];
  const efficiencyTrajectory = [E];

  for (let month = 1; month <= MONTHS; month++) {
    // Apply noise if Monte Carlo — scaled by financial stress
    const ns = stress.noiseScale;
    const noisyStudy = addNoise
      ? studyHours * (1 + gaussianNoise(0, 0.10 * ns))
      : studyHours;
    const burnoutNoiseFactor = addNoise
      ? 1 + gaussianNoise(0, 0.15 * ns)
      : 1;

    // Consistency variability from financial stress
    const consistencyDrop = stress.consistencyVariability > 0
      ? gaussianNoise(0, stress.consistencyVariability)
      : 0;
    C = clamp(0.6 + consistencyDrop, 0.2, 1.0);

    // 1) Update Learning Efficiency
    const sleepPenalty = sleepHours < 6 ? 0.1 : 0;
    E = clamp(1.2 - (0.6 * B) - sleepPenalty, 0.4, 1.2);

    // 2) Compute Skill Growth
    const diminishingFactor = 1 / (1 + S / 100);
    const deltaSkill = Math.max(0, noisyStudy) * qm * E * diminishingFactor * C;
    S = S + deltaSkill;

    // 3) Update Burnout
    const rawBurnoutDelta = (Math.max(0, noisyStudy) * 0.03 - sleepHours * 0.02)
      * stress.burnoutSensitivity * burnoutNoiseFactor;
    B = clamp(B + rawBurnoutDelta, 0, 1);

    if (B > 0.7) {
      E = E * 0.85;
    }

    skillTrajectory.push(S);
    burnoutTrajectory.push(B);
    efficiencyTrajectory.push(E);
  }

  return { skillTrajectory, burnoutTrajectory, efficiencyTrajectory };
}

/**
 * Run Monte Carlo simulation (100 runs) and return aggregated trajectories.
 */
function runMonteCarloSimulation(params) {
  const allSkill = [];
  const allBurnout = [];

  for (let i = 0; i < MONTE_CARLO_RUNS; i++) {
    const result = runSingleSimulation(params, true);
    allSkill.push(result.skillTrajectory);
    allBurnout.push(result.burnoutTrajectory);
  }

  const meanSkill = [];
  const p25Skill = [];
  const p75Skill = [];
  const meanBurnout = [];

  for (let m = 0; m <= MONTHS; m++) {
    const skillValues = allSkill.map(run => run[m]).sort((a, b) => a - b);
    const burnoutValues = allBurnout.map(run => run[m]).sort((a, b) => a - b);

    meanSkill.push(skillValues.reduce((a, b) => a + b, 0) / MONTE_CARLO_RUNS);
    p25Skill.push(skillValues[Math.floor(MONTE_CARLO_RUNS * 0.25)]);
    p75Skill.push(skillValues[Math.floor(MONTE_CARLO_RUNS * 0.75)]);
    meanBurnout.push(burnoutValues.reduce((a, b) => a + b, 0) / MONTE_CARLO_RUNS);
  }

  return { meanSkill, p25Skill, p75Skill, meanBurnout };
}
