// file: app/tradeoff-analyzer/page.tsx
'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { TradeoffSurface } from '../../components/tradeoff/TradeoffSurface';
import { useSimulation } from '../../hooks/useSimulation';

export default function TradeoffAnalyzerPage() {
    useSimulation();

    return (
        <AppShell>
            <div className="h-full overflow-hidden">
                <TradeoffSurface />
            </div>
        </AppShell>
    );
}
