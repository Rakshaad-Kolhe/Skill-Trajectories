/**
 * Main application controller.
 * Wires user inputs to simulation engine, charts, and bias panel.
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
        studyHours: document.getElementById('studyHours'),
        practiceQuality: document.getElementById('practiceQuality'),
        sleepHours: document.getElementById('sleepHours'),
        distractionHours: document.getElementById('distractionHours'),
        financialStress: document.getElementById('financialStress'),
    };

    const valueDisplays = {
        studyHours: document.getElementById('studyHoursValue'),
        sleepHours: document.getElementById('sleepHoursValue'),
        distractionHours: document.getElementById('distractionHoursValue'),
    };

    const biasContainer = document.getElementById('biasExplanations');

    function readParams() {
        return {
            studyHours: parseFloat(inputs.studyHours.value),
            practiceQuality: inputs.practiceQuality.value,
            sleepHours: parseFloat(inputs.sleepHours.value),
            distractionHours: parseFloat(inputs.distractionHours.value),
            financialStress: inputs.financialStress.value,
        };
    }

    function updateValueDisplays() {
        valueDisplays.studyHours.textContent = inputs.studyHours.value + ' hrs';
        valueDisplays.sleepHours.textContent = inputs.sleepHours.value + ' hrs';
        valueDisplays.distractionHours.textContent = inputs.distractionHours.value + ' hrs';
    }

    function renderBiasPanel(params) {
        const biases = detectBiases(params);
        if (biases.length === 0) {
            biasContainer.innerHTML =
                '<div class="bias-card bias-none">' +
                '<span class="bias-icon">✅</span>' +
                '<div><strong>No cognitive biases detected</strong>' +
                '<p>Your current configuration does not trigger any known bias patterns.</p></div>' +
                '</div>';
            return;
        }
        biasContainer.innerHTML = biases.map(b =>
            '<div class="bias-card">' +
            '<span class="bias-icon">' + b.icon + '</span>' +
            '<div><strong>' + b.title + '</strong><p>' + b.description + '</p></div>' +
            '</div>'
        ).join('');
    }

    function runAll() {
        const params = readParams();

        // Scenario comparison
        const scenarioResults = runAllScenarios();
        renderSkillGrowthChart(scenarioResults);
        renderBurnoutSkillChart(scenarioResults);

        // User's custom configuration with uncertainty
        const userResult = runMonteCarloSimulation(params);
        renderUncertaintyChart(userResult);

        // Bias detection
        renderBiasPanel(params);
    }

    // Bind events
    Object.values(inputs).forEach(el => {
        el.addEventListener('input', () => {
            updateValueDisplays();
            runAll();
        });
    });

    // Initial render
    updateValueDisplays();
    runAll();
});
