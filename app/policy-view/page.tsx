// file: app/policy-view/page.tsx
'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { CohortSimulation } from '../../components/policy/CohortSimulation';

export default function PolicyViewPage() {
    return (
        <AppShell>
            <div className="h-full overflow-y-auto">
                <div className="px-6 py-5 border-b border-slate-800">
                    <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Policy Mode</h2>
                    <p className="text-sm font-semibold text-slate-100 mt-0.5">Population-Level Cohort Simulation</p>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                        Synthetic dataset · N=1000 · Demo build · Not real data
                    </p>
                </div>
                <CohortSimulation />
            </div>
        </AppShell>
    );
}
