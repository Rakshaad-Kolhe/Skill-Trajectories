// file: components/tradeoff/RadarChart.tsx
import React, { useMemo } from 'react';

interface RadarChartProps {
    values: Record<string, number>;
    size?: number;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export const RadarChart: React.FC<RadarChartProps> = ({ values, size = 240 }) => {
    const cx = size / 2;
    const cy = size / 2;
    const R = (size / 2) * 0.75;

    const labels = Object.keys(values);
    const N = labels.length;
    const angleStep = 360 / N;

    const axes = labels.map((label, i) => ({
        label,
        angle: i * angleStep,
        value: Math.min(1, Math.max(0, values[label] / 100)),
    }));

    const polygonPoints = axes
        .map(({ angle, value }) => {
            const { x, y } = polarToCartesian(cx, cy, R * value, angle);
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(' ');

    const gridLevels = [0.25, 0.5, 0.75, 1];

    return (
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
            {/* Grid rings */}
            {gridLevels.map((level) => {
                const ringPoints = axes
                    .map(({ angle }) => {
                        const { x, y } = polarToCartesian(cx, cy, R * level, angle);
                        return `${x.toFixed(2)},${y.toFixed(2)}`;
                    })
                    .join(' ');
                return (
                    <polygon
                        key={level}
                        points={ringPoints}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Axis lines */}
            {axes.map(({ angle, label }, i) => {
                const end = polarToCartesian(cx, cy, R, angle);
                const textPos = polarToCartesian(cx, cy, R + 18, angle);
                return (
                    <g key={i}>
                        <line x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#334155" strokeWidth="1" />
                        <text
                            x={textPos.x}
                            y={textPos.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="8"
                            fill="#64748b"
                            fontFamily="monospace"
                        >
                            {label}
                        </text>
                    </g>
                );
            })}

            {/* Data polygon */}
            <polygon
                points={polygonPoints}
                fill="rgba(34,211,238,0.1)"
                stroke="#22d3ee"
                strokeWidth="1.5"
            />

            {/* Data points */}
            {axes.map(({ angle, value }, i) => {
                const { x, y } = polarToCartesian(cx, cy, R * value, angle);
                return (
                    <circle key={i} cx={x} cy={y} r="2.5" fill="#22d3ee" />
                );
            })}
        </svg>
    );
};
