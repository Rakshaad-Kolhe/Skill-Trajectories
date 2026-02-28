// file: components/shared/MetricBadge.tsx
import React from 'react';

type MetricColor = 'cyan' | 'amber' | 'red' | 'slate';

interface MetricBadgeProps {
    label: string;
    value: number | string;
    unit?: string;
    color?: MetricColor;
}

const colorMap: Record<MetricColor, string> = {
    cyan: 'text-cyan-400 border-cyan-500/20',
    amber: 'text-amber-400 border-amber-500/20',
    red: 'text-red-400 border-red-500/20',
    slate: 'text-slate-300 border-slate-700',
};

export const MetricBadge: React.FC<MetricBadgeProps> = ({
    label,
    value,
    unit,
    color = 'slate',
}) => {
    const colorClass = colorMap[color];
    const displayValue = typeof value === 'number' ? value.toFixed(1) : value;

    return (
        <div className={`border ${colorClass} bg-slate-900/50 p-3`}>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                {label}
            </p>
            <p className={`text-xl font-mono font-bold ${colorClass.split(' ')[0]}`}>
                {displayValue}
                {unit && <span className="text-xs font-normal text-slate-500 ml-1">{unit}</span>}
            </p>
        </div>
    );
};
