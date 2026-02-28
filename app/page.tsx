// file: app/page.tsx
'use client';

import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { DecisionBuilder } from '../components/decision-builder/DecisionBuilder';
import { FutureLandscape } from '../components/trajectory/FutureLandscape';
import { ConsequencePanel } from '../components/outcome/ConsequencePanel';
import { useSimulation } from '../hooks/useSimulation';

export default function DecisionLabPage() {
    useSimulation();

    return (
        <AppShell>
            <div className="flex h-full overflow-hidden">
                <div className="w-72 flex-shrink-0 overflow-hidden flex flex-col">
                    <DecisionBuilder />
                </div>
                <div className="flex-1 overflow-hidden flex flex-col min-w-0">
                    <FutureLandscape />
                </div>
                <div className="w-72 flex-shrink-0 overflow-hidden flex flex-col">
                    <ConsequencePanel />
                </div>
            </div>
        </AppShell>
    );
}
