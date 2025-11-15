'use client';

import { YearlyStats } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ExecutiveOrdersTimelineProps {
  yearlyStats: YearlyStats[];
}

export default function ExecutiveOrdersTimeline({ yearlyStats }: ExecutiveOrdersTimelineProps) {
  // Sort by year and format data
  const data = [...yearlyStats]
    .sort((a, b) => a.year - b.year)
    .map(stat => ({
      year: stat.year,
      orders: stat.count,
    }));

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          Executive Orders Timeline
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Number of executive orders signed per year
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(24 24 27)',
              border: '1px solid rgb(63 63 70)',
              borderRadius: '0.375rem',
              color: 'rgb(250 250 250)',
            }}
            labelStyle={{ color: 'rgb(161 161 170)' }}
            formatter={(value: number) => [value.toLocaleString(), 'Orders']}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 3 }}
            activeDot={{ r: 5 }}
            name="Executive Orders"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
