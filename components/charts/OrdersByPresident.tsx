'use client';

import { PresidentStats } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface OrdersByPresidentProps {
  stats: PresidentStats[];
}

export default function OrdersByPresident({ stats }: OrdersByPresidentProps) {
  // Sort by count descending and take top 15 for readability
  const data = [...stats]
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .map(stat => ({
      name: stat.name.split(' ').slice(-1)[0], // Last name only for space
      fullName: stat.name,
      count: stat.count,
    }));

  // Color gradient from darker to lighter blue based on count
  const maxCount = Math.max(...data.map(d => d.count));
  const getColor = (count: number) => {
    const intensity = count / maxCount;
    if (intensity > 0.8) return '#1e40af'; // dark blue
    if (intensity > 0.6) return '#2563eb'; // medium-dark blue
    if (intensity > 0.4) return '#3b82f6'; // medium blue
    if (intensity > 0.2) return '#60a5fa'; // light-medium blue
    return '#93c5fd'; // light blue
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          Top Presidents by Executive Orders
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Total executive orders issued (Top 15)
        </p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis
            type="number"
            className="text-xs fill-zinc-600 dark:fill-zinc-400"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            className="text-xs fill-zinc-600 dark:fill-zinc-400"
            tick={{ fill: 'currentColor' }}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(24 24 27)',
              border: '1px solid rgb(63 63 70)',
              borderRadius: '0.375rem',
              color: 'rgb(250 250 250)',
            }}
            labelStyle={{ color: 'rgb(161 161 170)' }}
            formatter={(value: number, name: string, props: any) => [
              value.toLocaleString(),
              props.payload.fullName
            ]}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.count)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
