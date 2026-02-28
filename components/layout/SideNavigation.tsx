import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { path: '/', label: 'Decision Lab' },
    { path: '/tradeoff-analyzer', label: 'Trade-Off Analyzer' },
    { path: '/policy-view', label: 'Policy Mode' }
];

export const SideNavigation: React.FC = () => {
    const pathname = usePathname() || '/';

    return (
        <nav className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col py-6">
            <div className="px-5 mb-6">
                <h2 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Modules</h2>
            </div>
            <ul className="flex-1 space-y-px px-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 border-l-2 ${isActive
                                        ? 'bg-slate-900 border-cyan-400 text-cyan-400 shadow-[inset_1px_0_10px_rgba(34,211,238,0.02)]'
                                        : 'border-transparent text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="p-5 border-t border-slate-800/50 mt-auto">
                <p className="text-[10px] text-slate-500 font-mono text-center tracking-wide">
                    Not predictions. Possibilities.
                </p>
            </div>
        </nav>
    );
};
