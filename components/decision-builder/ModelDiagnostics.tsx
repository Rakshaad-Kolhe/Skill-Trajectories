// file: components/decision-builder/ModelDiagnostics.tsx
import React, { useState } from 'react';

interface ModelDiagnosticsProps {
    growthCoefficient: number;
    volatilityIndex: number;
    burnoutDecayRate: number;
    recoveryElasticity: number;
    stateRigidityIndex: number;
}

const Row: React.FC<{ label: string; value: number; unit?: string }> = ({ label, value, unit }) => (
    <div className="flex items-center justify-between py-1 border-b border-slate-800/50 last:border-0">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-mono text-slate-200 tabular-nums">
            {value.toFixed(4)}{unit && <span className="text-slate-600 ml-1">{unit}</span>}
        </span>
    </div>
);

export const ModelDiagnostics: React.FC<ModelDiagnosticsProps> = ({
    growthCoefficient,
    volatilityIndex,
    burnoutDecayRate,
    recoveryElasticity,
    stateRigidityIndex,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-slate-800/60 bg-slate-900/20 mt-3">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2 text-left"
            >
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    Model Diagnostics
                </span>
                <span className="text-[10px] font-mono text-slate-700">{open ? '▲' : '▼'}</span>
            </button>
            {open && (
                <div className="px-3 pb-3">
                    <Row label="Growth Coefficient" value={growthCoefficient} />
                    <Row label="Volatility Index" value={volatilityIndex} />
                    <Row label="Burnout Decay Rate" value={burnoutDecayRate} />
                    <Row label="Recovery Elasticity" value={recoveryElasticity} unit="pts" />
                    <Row label="State Rigidity Index" value={stateRigidityIndex} />
                </div>
            )}
        </div>
    );
};
