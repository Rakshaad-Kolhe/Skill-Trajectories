// file: components/policy/CohortSimulation.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { Slider } from '../shared/Slider';

const COHORT_SIZE = 1000;
const BINS = 10;

interface Individual {
    id: number;
    baseGrowth: number;
    withMentor: boolean;
    finalScore: number;
}

// Seeded PRNG (mulberry32) — ensures generateCohort is deterministic for a given coverage value
function seededRand(seed: number): () => number {
    let s = seed;
    return () => {
        s |= 0; s = s + 0x6D2B79F5 | 0;
        let t = Math.imul(s ^ s >>> 15, 1 | s);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

function generateCohort(mentorCoverage: number): Individual[] {
    const rand = seededRand(mentorCoverage * 1000 | 0);
    const mentorThreshold = Math.floor(COHORT_SIZE * (mentorCoverage / 100));
    return Array.from({ length: COHORT_SIZE }, (_, i) => {
        const withMentor = i < mentorThreshold;
        const baseGrowth = 20 + rand() * 60;
        const baseCollapse = rand() * 15;
        const collapseRate = Math.max(0, baseCollapse - (mentorCoverage * 0.2));
        const mentorBoost = withMentor ? 15 + rand() * 20 : 0;
        const finalScore = Math.min(100, Math.max(0, baseGrowth + mentorBoost - collapseRate));
        return { id: i, baseGrowth, withMentor, finalScore };
    });
}

function buildDistribution(individuals: Individual[], withMentor: boolean): number[] {
    const binSize = 100 / BINS;
    const bins = Array(BINS).fill(0) as number[];
    individuals
        .filter((p) => p.withMentor === withMentor)
        .forEach((p) => {
            const binIdx = Math.min(BINS - 1, Math.floor(p.finalScore / binSize));
            bins[binIdx]++;
        });
    return bins;
}

export const CohortSimulation: React.FC = () => {
    // Feature 7: Mentorship Coverage slider
    const [mentorCoverage, setMentorCoverage] = useState(50);

    const cohort = useMemo(() => generateCohort(mentorCoverage), [mentorCoverage]);

    const withMentorBins = useMemo(() => buildDistribution(cohort, true), [cohort]);
    const withoutMentorBins = useMemo(() => buildDistribution(cohort, false), [cohort]);

    const maxBin = Math.max(...withMentorBins, ...withoutMentorBins, 1);

    const mentorCount = cohort.filter((p) => p.withMentor).length;
    const noMentorCount = COHORT_SIZE - mentorCount;

    const withMentorAvg = mentorCount > 0
        ? cohort.filter((p) => p.withMentor).reduce((s, p) => s + p.finalScore, 0) / mentorCount
        : 0;
    const withoutMentorAvg = noMentorCount > 0
        ? cohort.filter((p) => !p.withMentor).reduce((s, p) => s + p.finalScore, 0) / noMentorCount
        : 0;
    const roiPct = withoutMentorAvg > 0
        ? ((withMentorAvg - withoutMentorAvg) / withoutMentorAvg) * 100
        : 0;

    const binLabels = Array.from({ length: BINS }, (_, i) => `${i * 10}–${(i + 1) * 10}`);

    const CHART_H = 140;
    const BAR_W = 28;
    const BAR_GAP = 4;

    return (
        <div className="space-y-8 p-6">
            {/* Mentorship Coverage Slider — Feature 7 */}
            <div className="border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                    Intervention Controls
                </p>
                <Slider
                    label="Mentorship Coverage"
                    value={mentorCoverage}
                    onChange={setMentorCoverage}
                    tooltip="Percentage of the cohort receiving structured mentorship"
                />
                <p className="text-[9px] font-mono text-slate-600 mt-2">
                    {mentorCount} receiving mentorship · {noMentorCount} without
                </p>
            </div>

            {/* ROI metric */}
            <div className="flex items-center gap-8 border border-slate-800 bg-slate-900/40 p-4">
                <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Cohort Size</p>
                    <p className="text-2xl font-mono font-bold text-slate-100">{COHORT_SIZE.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Mentor ROI</p>
                    <p className="text-2xl font-mono font-bold text-cyan-400">+{roiPct.toFixed(1)}%</p>
                </div>
                <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Avg w/ Mentor</p>
                    <p className="text-2xl font-mono font-bold text-cyan-300">{withMentorAvg.toFixed(1)}</p>
                </div>
                <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Avg w/o Mentor</p>
                    <p className="text-2xl font-mono font-bold text-amber-400">{withoutMentorAvg.toFixed(1)}</p>
                </div>
            </div>

            {/* Distribution chart */}
            <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                    Outcome Distribution — Mentor vs. No Mentor
                </p>
                <div className="overflow-x-auto">
                    <svg width={(BAR_W * 2 + BAR_GAP * 3) * BINS + 40} height={CHART_H + 40}>
                        {Array.from({ length: 5 }, (_, i) => {
                            const y = (CHART_H / 4) * i;
                            return (
                                <line key={i} x1={30} x2={(BAR_W * 2 + BAR_GAP * 3) * BINS + 30}
                                    y1={y} y2={y} stroke="#1e293b" strokeWidth="1" />
                            );
                        })}

                        {binLabels.map((label, i) => {
                            const groupX = 30 + i * (BAR_W * 2 + BAR_GAP * 3);
                            const mentorH = (withMentorBins[i] / maxBin) * CHART_H;
                            const noMentorH = (withoutMentorBins[i] / maxBin) * CHART_H;

                            return (
                                <g key={i}>
                                    <rect x={groupX} y={CHART_H - mentorH} width={BAR_W} height={mentorH}
                                        fill="rgba(34,211,238,0.6)" />
                                    <rect x={groupX + BAR_W + BAR_GAP} y={CHART_H - noMentorH}
                                        width={BAR_W} height={noMentorH} fill="rgba(245,158,11,0.5)" />
                                    <text x={groupX + BAR_W} y={CHART_H + 14} textAnchor="middle"
                                        fontSize="7" fill="#475569" fontFamily="monospace">
                                        {i * 10}
                                    </text>
                                </g>
                            );
                        })}

                        <text x={30} y={CHART_H + 28} fontSize="7" fill="#334155" fontFamily="monospace">
                            ■ With Mentor
                        </text>
                        <text x={110} y={CHART_H + 28} fontSize="7" fill="#334155" fontFamily="monospace">
                            ■ Without Mentor
                        </text>
                    </svg>
                </div>
            </div>

            {/* Heatmap */}
            <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                    Cohort Heatmap — Score × Mentorship
                </p>
                <div className="flex gap-1 flex-col">
                    {(['With Mentor', 'Without Mentor'] as const).map((group) => {
                        const bins = group === 'With Mentor' ? withMentorBins : withoutMentorBins;
                        return (
                            <div key={group} className="flex items-center gap-1">
                                <span className="text-[9px] font-mono text-slate-500 w-20 text-right pr-2 shrink-0">
                                    {group}
                                </span>
                                {bins.map((count, i) => {
                                    const intensity = count / maxBin;
                                    const alpha = 0.08 + intensity * 0.85;
                                    const color = group === 'With Mentor'
                                        ? `rgba(34,211,238,${alpha.toFixed(2)})`
                                        : `rgba(245,158,11,${alpha.toFixed(2)})`;
                                    return (
                                        <div key={i}
                                            title={`Score ${i * 10}–${(i + 1) * 10}: ${count}`}
                                            className="w-10 h-7 flex items-center justify-center text-[7px] font-mono text-black/50 cursor-default transition-all duration-200 hover:ring-1 hover:ring-white/10"
                                            style={{ backgroundColor: color }}
                                        >
                                            {count}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                    <div className="flex items-center gap-1 mt-1">
                        <span className="w-20 shrink-0" />
                        {binLabels.map((label, i) => (
                            <div key={i} className="w-10 text-center text-[7px] font-mono text-slate-600">
                                {i * 10}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
