// file: styles/theme.ts

export const colors = {
    background: 'bg-slate-950',
    panel: 'bg-slate-900',
    border: 'border-slate-800',

    cyan: {
        DEFAULT: '#22d3ee',
        muted: 'rgba(34,211,238,0.15)',
        text: 'text-cyan-400',
        bg: 'bg-cyan-400',
        border: 'border-cyan-500/30',
    },
    amber: {
        DEFAULT: '#f59e0b',
        muted: 'rgba(245,158,11,0.15)',
        text: 'text-amber-400',
        bg: 'bg-amber-400',
        border: 'border-amber-500/30',
    },
    red: {
        DEFAULT: '#ef4444',
        muted: 'rgba(239,68,68,0.15)',
        text: 'text-red-400',
        bg: 'bg-red-400',
        border: 'border-red-500/30',
    },
    slate: {
        text: 'text-slate-400',
        textMuted: 'text-slate-500',
        textBright: 'text-slate-100',
    },
} as const;

export const typography = {
    ui: 'font-sans',
    mono: 'font-mono',
    labelSm: 'text-xs font-mono text-slate-400 uppercase tracking-widest',
    heading: 'text-sm font-semibold text-slate-100 tracking-wide',
    value: 'text-2xl font-mono font-bold',
} as const;

export const layout = {
    panelPadding: 'p-5',
    sectionGap: 'space-y-6',
    itemGap: 'space-y-3',
} as const;
