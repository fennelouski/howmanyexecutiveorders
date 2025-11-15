'use client';

import { PresidentStats } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RecentPresidentsBreakdownProps {
  stats: PresidentStats[];
}

export default function RecentPresidentsBreakdown({ stats }: RecentPresidentsBreakdownProps) {
  // Get the most recent presidents (those who started after 1960)
  const data = stats
    .filter(stat => stat.startYear >= 1960)
    .sort((a, b) => a.startYear - b.startYear)
    .map(stat => {
      const regularCount = stat.count - (stat.lameDuckCount || 0);
      return {
        name: stat.name.split(' ').slice(-1)[0], // Last name
        fullName: stat.name,
        regular: regularCount,
        lameDuck: stat.lameDuckCount || 0,
      };
    });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          Modern Presidents: Regular vs Lame Duck Orders
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Executive orders during term vs. lame duck period (since 1960)
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
            dataKey="regular"
            stackId="a"
            fill="#3b82f6"
            name="Regular Term"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="lameDuck"
            stackId="a"
            fill="#f59e0b"
            name="Lame Duck Period"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
