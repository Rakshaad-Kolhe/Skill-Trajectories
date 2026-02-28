// file: components/shared/Slider.tsx
import React from 'react';

interface SliderProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    colorClass?: string;
    onChange: (value: number) => void;
    tooltip?: string;
}

export const Slider: React.FC<SliderProps> = ({
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    colorClass = 'accent-cyan-400',
    onChange,
    tooltip,
}) => {
    const pct = ((value - min) / (max - min)) * 100;

    return (
        <div className="group relative">
            <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    {label}
                    {tooltip && (
                        <span className="relative">
                            <span className="text-slate-600 cursor-help text-[10px]">[?]</span>
                            <span className="absolute left-4 -top-1 z-50 hidden group-hover:block w-48 px-2 py-1.5 bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-sans normal-case tracking-normal leading-relaxed shadow-xl">
                                {tooltip}
                            </span>
                        </span>
                    )}
                </label>
                <span className="text-xs font-mono text-slate-200 tabular-nums w-8 text-right">
                    {value}
                </span>
            </div>
            <div className="relative h-1 bg-slate-800 w-full">
                <div
                    className="absolute h-full bg-cyan-500/60 transition-all duration-200"
                    style={{ width: `${pct}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${colorClass}`}
                />
            </div>
        </div>
    );
};
