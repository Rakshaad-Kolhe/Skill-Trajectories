// file: components/outcome/ConsequencePanel.tsx
import React from 'react';
import { OutcomeSummary } from './OutcomeSummary';
import { KeyMetricsPanel } from './KeyMetricsPanel';
import { PointOfNoReturn } from './PointOfNoReturn';
import { InvisibleCostLog } from './InvisibleCostLog';
import { BiasAttribution } from './BiasAttribution';

export const ConsequencePanel: React.FC = () => {
    return (
        <div className="h-full flex flex-col border-l border-slate-800 bg-slate-950">
            <div className="px-5 py-4 border-b border-slate-800">
                <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Consequence Panel</h2>
                <p className="text-sm font-semibold text-slate-100 mt-0.5">Expected Outcomes</p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                <OutcomeSummary />
                <div className="border-t border-slate-800 pt-5">
                    <KeyMetricsPanel />
                </div>
                <div className="border-t border-slate-800 pt-5">
                    <PointOfNoReturn />
                </div>
                <div className="border-t border-slate-800 pt-5">
                    <InvisibleCostLog />
                </div>
                <div className="border-t border-slate-800 pt-5">
                    <BiasAttribution />
                </div>
            </div>
        </div>
    );
};
