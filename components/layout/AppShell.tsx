import React from 'react';
import { TopBar } from './TopBar';
import { SideNavigation } from './SideNavigation';

interface AppShellProps {
    children: React.ReactNode;
    rightPanel?: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children, rightPanel }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
                <SideNavigation />
                <main className="flex flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
                        {children}
                    </div>
                    {rightPanel && (
                        <aside className="w-80 border-l border-slate-800 bg-slate-900/50 flex-shrink-0 overflow-y-auto">
                            {rightPanel}
                        </aside>
                    )}
                </main>
            </div>
        </div>
    );
};
