// file: components/trajectory/RegretCurve.tsx
import React from 'react';
import { useSimulationStore } from '../../store/simulationStore';

const YEARS = 10;
const W = 800;
const H = 80;
const PAD = { left: 40, right: 20, top: 8, bottom: 16 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

export const RegretCurve: React.FC = () => {
    const { regretScore } = useSimulationStore();

    const points: [number, number][] = Array.from({ length: YEARS + 1 }, (_, t) => {
        const regret_t = regretScore * (t / YEARS);
        const x = PAD.left + (t / YEARS) * PLOT_W;
        const y = PAD.top + PLOT_H - Math.min(1, regret_t / 100) * PLOT_H;
        return [x, y];
    });

    let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
        const [x1, y1] = points[i - 1];
        const [x2, y2] = points[i];
        const cx = (x1 + x2) / 2;
        d += ` C${cx.toFixed(2)},${y1.toFixed(2)} ${cx.toFixed(2)},${y2.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`;
    }

    return (
        <div className="px-4 border-t border-slate-800/40">
            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest pt-1 mb-0.5">
                Regret Accumulation
            </p>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 60 }}>
                {[0, 50, 100].map((pct) => {
                    const y = PAD.top + PLOT_H - (pct / 100) * PLOT_H;
                    return (
                        <line key={pct} x1={PAD.left} x2={W - PAD.right} y1={y} y2={y}
                            stroke="#1e293b" strokeWidth="0.5" />
                    );
                })}
                <path d={d} fill="none" stroke="#f59e0b" strokeWidth="1.5"
                    style={{ filter: 'drop-shadow(0 0 3px rgba(245,158,11,0.3))' }} />
                <text x={PAD.left - 4} y={PAD.top + PLOT_H + 4} fontSize="7"
                    fill="#475569" textAnchor="end" fontFamily="monospace">0</text>
                <text x={PAD.left - 4} y={PAD.top + 4} fontSize="7"
                    fill="#475569" textAnchor="end" fontFamily="monospace">100</text>
            </svg>
        </div>
    );
};
