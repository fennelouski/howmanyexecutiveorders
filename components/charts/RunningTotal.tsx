'use client';

import { YearlyStats } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RunningTotalProps {
  yearlyStats: YearlyStats[];
}

export default function RunningTotal({ yearlyStats }: RunningTotalProps) {
  // Sort by year and calculate running total
  const sortedStats = [...yearlyStats].sort((a, b) => a.year - b.year);

  let runningTotal = 0;
  const data = sortedStats.map(stat => {
    runningTotal += stat.count;
    return {
      year: stat.year,
      total: runningTotal,
    };
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          Cumulative Executive Orders Over Time
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Running total of all executive orders since records began
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis
            dataKey="year"
            className="text-xs fill-zinc-600 dark:fill-zinc-400"
            tick={{ fill: 'currentColor' }}
            tickFormatter={(value) => value.toString()}
          />
          <YAxis
            className="text-xs fill-zinc-600 dark:fill-zinc-400"
            tick={{ fill: 'currentColor' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(24 24 27)',
              border: '1px solid rgb(63 63 70)',
              borderRadius: '0.375rem',
              color: 'rgb(250 250 250)',
            }}
            labelStyle={{ color: 'rgb(161 161 170)' }}
            formatter={(value: number) => [value.toLocaleString(), 'Total Orders']}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTotal)"
            name="Total Executive Orders"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
