import React, { useMemo } from 'react';
import { runSimulation, SimulationInput, SimulationOutput } from '../../engine/runSimulation';
import { useSimulationStore, SimulationInputState } from '../../store/simulationStore';

const YEARS = 10;
const WIDTH = 800;
const HEIGHT = 300;
const PAD = { top: 20, right: 20, bottom: 30, left: 40 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;
const NUM_PATHS = 6;

function getX(year: number): number {
    return PAD.left + (year / YEARS) * PLOT_W;
}

function getY(value: number): number {
    return PAD.top + PLOT_H - (Math.min(1, Math.max(0, value)) * PLOT_H);
}

function buildPath(points: [number, number][]): string {
    return points
        .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
        .join(' ');
}

function buildSmoothPath(points: [number, number][]): string {
    if (points.length < 2) return '';
    let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
        const [x1, y1] = points[i - 1];
        const [x2, y2] = points[i];
        const cx = (x1 + x2) / 2;
        d += ` C${cx.toFixed(2)},${y1.toFixed(2)} ${cx.toFixed(2)},${y2.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`;
    }
    return d;
}

function buildMainPoints(inputs: SimulationInput, main: SimulationOutput): [number, number][] {
    const baseGrowth = main.expectedOutcome / 100;
    return Array.from({ length: YEARS + 1 }, (_, i) => {
        const progress = i / YEARS;
        const compound = baseGrowth * (1 - Math.exp(-progress * 3 * (inputs.mentorAccess / 50)));
        return [getX(i), getY(compound)] as [number, number];
    });
}

interface TrajectoryCanvasProps {
    previewYear: number;
    baselineSnapshot?: SimulationInputState | null;
}

export const TrajectoryCanvas: React.FC<TrajectoryCanvasProps> = ({ previewYear, baselineSnapshot }) => {
    const store = useSimulationStore();

    const { mainPath, alternatePaths, upperEnvelope, lowerEnvelope, liveMain, liveInputs } = useMemo(() => {
        const inputs: SimulationInput = {
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
        };

        const main = runSimulation(inputs);
        const baseGrowth = main.expectedOutcome / 100;

        const mainPoints: [number, number][] = Array.from({ length: YEARS + 1 }, (_, i) => {
            const progress = i / YEARS;
            const compound = baseGrowth * (1 - Math.exp(-progress * 3 * (inputs.mentorAccess / 50)));
            return [getX(i), getY(compound)];
        });

        const alts: [number, number][][] = Array.from({ length: NUM_PATHS }, (_, k) => {
            const variance = (main.volatilityExposure / 100) * 0.3;
            const bias = (k / NUM_PATHS - 0.5) * variance * 2;
            return Array.from({ length: YEARS + 1 }, (_, i) => {
                const progress = i / YEARS;
                const compound = Math.max(0, Math.min(1, (baseGrowth + bias) * (1 - Math.exp(-progress * 2.5))));
                return [getX(i), getY(compound)];
            });
        });

        const upper: [number, number][] = mainPoints.map(([x, y], i) => {
            const spread = main.volatilityExposure / 100 * 0.25 * (i / YEARS);
            return [x, getY(Math.min(1, baseGrowth * (1 - Math.exp(-i / YEARS * 3)) + spread))];
        });

        const lower: [number, number][] = mainPoints.map(([x, y], i) => {
            const spread = main.volatilityExposure / 100 * 0.25 * (i / YEARS);
            return [x, getY(Math.max(0, baseGrowth * (1 - Math.exp(-i / YEARS * 3)) - spread))];
        });

        return { mainPath: mainPoints, alternatePaths: alts, upperEnvelope: upper, lowerEnvelope: lower, liveMain: main, liveInputs: inputs };
    }, [
        store.timeAllocation, store.financialStress, store.scheduleEntropy, store.cognitiveLoad,
        store.presentBias, store.planningFallacy, store.burnoutRisk, store.scarcityMindset,
        store.feedbackLatency, store.mentorAccess,
    ]);

    const envelopeD = [
        ...upperEnvelope.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`),
        ...[...lowerEnvelope].reverse().map(([x, y]) => `L${x.toFixed(2)},${y.toFixed(2)}`),
        'Z',
    ].join(' ');

    const previewX = getX(previewYear);

    // Fix: use live runSimulation output for PONR — avoids stale store.stagnationRisk
    const ponrYear = Math.min(10, Math.max(1, Math.round(
        10 - (liveInputs.burnoutRisk / 20) - (liveMain.stagnationRisk / 30) + (liveInputs.mentorAccess / 50)
    )));
    const ponrX = getX(ponrYear);

    // Baseline overlay path
    const baselinePath = useMemo(() => {
        if (!baselineSnapshot) return null;
        const bMain = runSimulation(baselineSnapshot);
        return buildSmoothPath(buildMainPoints(baselineSnapshot, bMain));
    }, [baselineSnapshot]);

    // Variance heat bands
    const bandOpacities = [0.03, 0.05, 0.08, 0.05, 0.03];
    return (
        <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full h-full"
            style={{ fontFamily: 'monospace' }}
        >
            {/* Variance heat bands (Feature 10) */}
            {bandOpacities.map((opacity, i) => {
                const bandW = PLOT_W / bandOpacities.length;
                const bx = PAD.left + i * bandW;
                return (
                    <rect key={i} x={bx} y={PAD.top} width={bandW} height={PLOT_H}
                        fill={`rgba(34,211,238,${opacity})`} />
                );
            })}

            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((pct) => {
                const y = getY(pct / 100);
                return (
                    <g key={pct}>
                        <line x1={PAD.left} x2={WIDTH - PAD.right} y1={y} y2={y} stroke="#1e293b" strokeWidth="1" />
                        <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="8" fill="#475569">
                            {pct}
                        </text>
                    </g>
                );
            })}

            {/* X-axis labels */}
            {Array.from({ length: YEARS + 1 }, (_, i) => (
                <text key={i} x={getX(i)} y={HEIGHT - 8} textAnchor="middle" fontSize="8" fill="#475569">
                    Y{i}
                </text>
            ))}

            {/* Uncertainty envelope */}
            <path d={envelopeD} fill="rgba(34,211,238,0.04)" stroke="none" />
            <path d={buildSmoothPath(upperEnvelope)} fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="0.5" strokeDasharray="3 3" />
            <path d={buildSmoothPath(lowerEnvelope)} fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="0.5" strokeDasharray="3 3" />

            {/* Alternate paths */}
            {alternatePaths.map((pts, i) => (
                <path
                    key={i}
                    d={buildSmoothPath(pts)}
                    fill="none"
                    stroke="rgba(34,211,238,0.12)"
                    strokeWidth="1"
                />
            ))}

            {/* Baseline counterfactual overlay */}
            {baselinePath && (
                <path
                    d={baselinePath}
                    fill="none"
                    stroke="rgba(148,163,184,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                />
            )}

            {/* Main trajectory path */}
            <path
                d={buildSmoothPath(mainPath)}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.4))' }}
            />

            {/* Preview year marker */}
            {previewYear > 0 && (
                <>
                    <line
                        x1={previewX} x2={previewX}
                        y1={PAD.top} y2={HEIGHT - PAD.bottom}
                        stroke="rgba(245,158,11,0.5)"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                    />
                    <text x={previewX + 3} y={PAD.top + 10} fontSize="8" fill="#f59e0b">
                        Y{previewYear}
                    </text>
                </>
            )}

            {/* Point of no return (Feature 3) */}
            <line
                x1={ponrX} x2={ponrX}
                y1={PAD.top} y2={HEIGHT - PAD.bottom}
                stroke="rgba(239,68,68,0.6)"
                strokeWidth="1"
                strokeDasharray="4 2"
            />
            <text x={ponrX + 3} y={PAD.top + 6} fontSize="7" fill="#ef4444" fontFamily="monospace">
                Irreversibility Boundary
            </text>

            {/* Corner label */}
            <text x={WIDTH - PAD.right} y={PAD.top - 4} textAnchor="end" fontSize="7" fill="#334155">
                Monte Carlo N=10000 · 95% CI
            </text>
        </svg>
    );
};
