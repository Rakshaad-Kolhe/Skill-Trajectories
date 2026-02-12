/**
 * Chart.js configuration and rendering for all three visualizations.
 */

const MONTH_LABELS = Array.from({ length: 37 }, (_, i) => `M${i}`);

const CHART_FONT = {
    family: "'Inter', 'Segoe UI', sans-serif",
    size: 12,
    color: '#94a3b8',
};

const GRID_COLOR = 'rgba(148, 163, 184, 0.08)';
const TICK_COLOR = '#64748b';

function baseScales(xTitle, yTitle) {
    return {
        x: {
            title: { display: true, text: xTitle, color: '#94a3b8', font: { ...CHART_FONT, size: 13 } },
            ticks: { color: TICK_COLOR, font: CHART_FONT, maxTicksLimit: 12 },
            grid: { color: GRID_COLOR },
        },
        y: {
            title: { display: true, text: yTitle, color: '#94a3b8', font: { ...CHART_FONT, size: 13 } },
            ticks: { color: TICK_COLOR, font: CHART_FONT },
            grid: { color: GRID_COLOR },
        },
    };
}

function baseLegend() {
    return {
        display: true,
        labels: { color: '#cbd5e1', font: { ...CHART_FONT, size: 11 }, padding: 16, usePointStyle: true, pointStyle: 'circle' },
    };
}

/* ─────────────────────────────────────────────
   Chart 1: Skill Growth Over Time (3 Scenarios)
   ───────────────────────────────────────────── */
let chartSkillGrowth = null;

function renderSkillGrowthChart(scenarioResults) {
    const ctx = document.getElementById('chartSkillGrowth').getContext('2d');
    const datasets = Object.values(scenarioResults).map(s => ({
        label: s.label,
        data: s.data.meanSkill,
        borderColor: s.color,
        backgroundColor: s.color + '18',
        borderWidth: 2.5,
        pointRadius: 0,
        tension: 0.35,
        fill: false,
    }));

    if (chartSkillGrowth) {
        chartSkillGrowth.data.datasets = datasets;
        chartSkillGrowth.update('none');
        return;
    }

    chartSkillGrowth = new Chart(ctx, {
        type: 'line',
        data: { labels: MONTH_LABELS, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 600, easing: 'easeOutQuart' },
            plugins: {
                legend: baseLegend(),
                title: { display: true, text: 'Skill Growth Over Time — Scenario Comparison', color: '#e2e8f0', font: { ...CHART_FONT, size: 15, weight: '600' }, padding: { bottom: 16 } },
            },
            scales: baseScales('Month', 'Skill Level'),
        },
    });
}

/* ─────────────────────────────────────────────
   Chart 2: Burnout vs Skill Trade-off
   ───────────────────────────────────────────── */
let chartBurnoutSkill = null;

function renderBurnoutSkillChart(scenarioResults) {
    const ctx = document.getElementById('chartBurnoutSkill').getContext('2d');
    const datasets = Object.values(scenarioResults).map(s => ({
        label: s.label,
        data: s.data.meanBurnout.map((b, i) => ({ x: b, y: s.data.meanSkill[i] })),
        borderColor: s.color,
        backgroundColor: s.color + '40',
        borderWidth: 2,
        pointRadius: 1.5,
        pointHoverRadius: 5,
        showLine: true,
        tension: 0.3,
        fill: false,
    }));

    if (chartBurnoutSkill) {
        chartBurnoutSkill.data.datasets = datasets;
        chartBurnoutSkill.update('none');
        return;
    }

    chartBurnoutSkill = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 600, easing: 'easeOutQuart' },
            plugins: {
                legend: baseLegend(),
                title: { display: true, text: 'Burnout vs Skill Trade-off', color: '#e2e8f0', font: { ...CHART_FONT, size: 15, weight: '600' }, padding: { bottom: 16 } },
            },
            scales: baseScales('Burnout Risk', 'Skill Level'),
        },
    });
}

/* ─────────────────────────────────────────────
   Chart 3: Skill Growth with Uncertainty Bands
   ───────────────────────────────────────────── */
let chartUncertainty = null;

function renderUncertaintyChart(userResult, userLabel = 'Your Configuration') {
    const ctx = document.getElementById('chartUncertainty').getContext('2d');

    const datasets = [
        {
            label: 'P75 (Optimistic)',
            data: userResult.p75Skill,
            borderColor: 'rgba(34,211,238,0.3)',
            backgroundColor: 'rgba(34,211,238,0.07)',
            borderWidth: 1,
            pointRadius: 0,
            tension: 0.35,
            fill: false,
        },
        {
            label: userLabel + ' — Mean',
            data: userResult.meanSkill,
            borderColor: '#22d3ee',
            backgroundColor: 'rgba(34,211,238,0.15)',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.35,
            fill: '-1',
        },
        {
            label: 'P25 (Conservative)',
            data: userResult.p25Skill,
            borderColor: 'rgba(34,211,238,0.3)',
            backgroundColor: 'rgba(34,211,238,0.07)',
            borderWidth: 1,
            pointRadius: 0,
            tension: 0.35,
            fill: '-1',
        },
    ];

    if (chartUncertainty) {
        chartUncertainty.data.datasets = datasets;
        chartUncertainty.update('none');
        return;
    }

    chartUncertainty = new Chart(ctx, {
        type: 'line',
        data: { labels: MONTH_LABELS, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 600, easing: 'easeOutQuart' },
            plugins: {
                legend: baseLegend(),
                title: { display: true, text: 'Skill Growth with Uncertainty Bands (Monte Carlo)', color: '#e2e8f0', font: { ...CHART_FONT, size: 15, weight: '600' }, padding: { bottom: 16 } },
                subtitle: { display: true, text: 'Shaded area = interquartile range (P25 – P75) across 100 simulations', color: '#64748b', font: { ...CHART_FONT, size: 11 }, padding: { bottom: 12 } },
            },
            scales: baseScales('Month', 'Skill Level'),
        },
    });
}
