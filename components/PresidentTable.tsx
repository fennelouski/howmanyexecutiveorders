// Table component for displaying executive orders by president
import { PresidentStats } from '@/types';

interface PresidentTableProps {
  stats: PresidentStats[];
}

export default function PresidentTable({ stats }: PresidentTableProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Executive Orders by President
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Historical breakdown of executive orders issued by each president
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-950">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                President
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Years in Office
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Total Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Avg per Year
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
            {stats.map((stat) => {
              const endYear = stat.endYear ?? new Date().getFullYear();
              const years = endYear - stat.startYear + 1;
              const avgPerYear = (stat.count / years).toFixed(1);
              const displayEndYear = stat.endYear ?? 'Present';

              return (
                <tr key={stat.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {stat.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.startYear} - {displayEndYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-50 font-semibold">
                    {stat.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {avgPerYear}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
