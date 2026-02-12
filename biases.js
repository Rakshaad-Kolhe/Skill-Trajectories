/**
 * Rule-based cognitive bias detection and explanation.
 * Describes reasoning patterns — never gives advice.
 */

const BIAS_DEFINITIONS = {
    presentBias: {
        title: 'Present Bias Detected',
        icon: '⏳',
        description:
            'With very low daily study hours, the brain tends to discount future rewards ' +
            'in favor of immediate comfort. This is known as hyperbolic discounting — ' +
            'a well‑documented cognitive pattern where distant goals feel abstract and ' +
            'less motivating than near‑term activities. Over months, even small daily ' +
            'deficits compound into significant trajectory divergence.',
    },
    planningFallacy: {
        title: 'Planning Fallacy Detected',
        icon: '📐',
        description:
            'Committing to high study hours while sleeping very little follows a pattern ' +
            'psychologists call the Planning Fallacy — overestimating one\'s capacity to ' +
            'sustain effort. The simulation shows burnout accumulating faster than skill. ' +
            'This mismatch between planned and sustainable intensity is a recurring ' +
            'cognitive error, not a character flaw.',
    },
    scarcityBias: {
        title: 'Scarcity Mindset Detected',
        icon: '💰',
        description:
            'Under high financial stress, cognitive bandwidth narrows toward immediate ' +
            'survival concerns. Research on scarcity (Mullainathan & Shafir, 2013) shows ' +
            'this tunneling effect increases decision variability and reduces long‑term ' +
            'planning consistency. In the simulation, this manifests as wider uncertainty ' +
            'bands and greater burnout sensitivity — not lower skill potential.',
    },
};

/**
 * Detect active biases based on current user inputs.
 * Returns an array of bias objects that are currently triggered.
 */
function detectBiases(params) {
    const active = [];

    if (params.studyHours <= 1) {
        active.push(BIAS_DEFINITIONS.presentBias);
    }

    if (params.studyHours >= 5 && params.sleepHours <= 5) {
        active.push(BIAS_DEFINITIONS.planningFallacy);
    }

    if (params.financialStress === 'High') {
        active.push(BIAS_DEFINITIONS.scarcityBias);
    }

    return active;
}
