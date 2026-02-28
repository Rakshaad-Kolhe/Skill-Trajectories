'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    {
        path: '/',
        label: 'Decision Lab',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-12m12-7.5H6" />
            </svg>
        ),
    },
    {
        path: '/tradeoff-analyzer',
        label: 'Trade-Off Analyzer',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
        ),
    },
    {
        path: '/policy-view',
        label: 'Policy Mode',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
    },
];

export const SideNavigation: React.FC = () => {
    const pathname = usePathname() || '/';
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <nav className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out border-r border-slate-800 bg-slate-950 flex flex-col py-6 shrink-0`}>
            {/* Toggle button */}
            <div className={`mb-4 flex ${isCollapsed ? 'justify-center px-0' : 'px-4 justify-between items-center'}`}>
                {!isCollapsed && (
                    <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Modules</h2>
                )}
                <button
                    onClick={() => setIsCollapsed((v) => !v)}
                    className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors duration-150"
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                        {isCollapsed ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Nav items */}
            <ul className="flex-1 space-y-px px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                title={isCollapsed ? item.label : undefined}
                                className={`flex items-center gap-3 py-2.5 text-sm transition-colors duration-200 border-l-2 ${isCollapsed ? 'justify-center px-0' : 'px-3'
                                    } ${isActive
                                        ? 'bg-slate-900 border-cyan-400 text-cyan-400 shadow-[inset_1px_0_10px_rgba(34,211,238,0.02)]'
                                        : 'border-transparent text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                                    }`}
                            >
                                {item.icon}
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Footer */}
            <div className={`border-t border-slate-800/50 mt-auto pt-4 ${isCollapsed ? 'px-0 flex justify-center' : 'px-5'}`}>
                {isCollapsed ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 block" />
                ) : (
                    <p className="text-[10px] text-slate-500 font-mono text-center tracking-wide">
                        Not predictions. Possibilities.
                    </p>
                )}
            </div>
        </nav>
    );
};
