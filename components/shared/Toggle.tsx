// file: components/shared/Toggle.tsx
import React from 'react';

interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
    return (
        <button
            onClick={() => onChange(!checked)}
            className="flex items-center justify-between w-full group"
            aria-pressed={checked}
        >
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                {label}
            </span>
            <div className={`relative w-8 h-4 border transition-colors duration-200 ${checked ? 'bg-cyan-500/20 border-cyan-500/60' : 'bg-slate-800 border-slate-700'}`}>
                <div
                    className={`absolute top-0.5 h-3 w-3 transition-all duration-200 ${checked ? 'left-4 bg-cyan-400' : 'left-0.5 bg-slate-500'}`}
                />
            </div>
        </button>
    );
};
