'use client';

import { PresidentStats } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TermComparisonProps {
  stats: PresidentStats[];
}

export default function TermComparison({ stats }: TermComparisonProps) {
  // Filter presidents with 2+ terms and valid term counts
  const data = stats
    .filter(stat =>
      stat.totalTerms &&
      stat.totalTerms >= 2 &&
      stat.firstTermCount !== undefined &&
      stat.secondTermCount !== undefined
    )
    .sort((a, b) => {
      const totalA = (a.firstTermCount || 0) + (a.secondTermCount || 0);
      const totalB = (b.firstTermCount || 0) + (b.secondTermCount || 0);
      return totalB - totalA;
    })
    .slice(0, 12) // Top 12 for readability
    .map(stat => ({
      name: stat.name.split(' ').slice(-1)[0], // Last name
      fullName: stat.name,
      firstTerm: stat.firstTermCount || 0,
      secondTerm: stat.secondTermCount || 0,
    }));

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          First vs Second Term Comparison
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Executive orders by term for two-term presidents
        </p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis
            dataKey="name"
            className="text-xs fill-zinc-600 dark:fill-zinc-400"
            tick={{ fill: 'currentColor' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            className="text-xs fill-zinc-600 dark:fill-zinc-400"
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(24 24 27)',
              border: '1px solid rgb(63 63 70)',
              borderRadius: '0.375rem',
              color: 'rgb(250 250 250)',
            }}
            labelStyle={{ color: 'rgb(161 161 170)' }}
            formatter={(value: number) => value.toLocaleString()}
            labelFormatter={(label: string) => {
              const item = data.find(d => d.name === label);
              return item?.fullName || label;
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '10px' }}
            iconType="rect"
          />
          <Bar
            dataKey="firstTerm"
            fill="#3b82f6"
            name="1st Term"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="secondTerm"
            fill="#60a5fa"
            name="2nd Term"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
