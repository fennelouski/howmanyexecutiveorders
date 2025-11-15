// Table component for displaying executive orders by president
'use client';

import { PresidentStats } from '@/types';
import Image from 'next/image';
import { useDisplayOptions } from '@/contexts/DisplayOptionsContext';

interface PresidentTableProps {
  stats: PresidentStats[];
}

export default function PresidentTable({ stats }: PresidentTableProps) {
  const { options } = useDisplayOptions();
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Executive Orders by President
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Comprehensive breakdown by term, congressional context, and timing
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-950">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                President
              </th>
              {options.showPartyAffiliations && (
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Party
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Years
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Total
              </th>
              {options.showTermColumns && (
                <>
                  <th className="px-6 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    1st Term
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    2nd Term
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    In Session
                  </th>
                </>
              )}
              {options.showLameDuckColumn && (
                <th className="px-6 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Lame Duck
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
            {stats.map((stat) => {
              const endYear = stat.endYear ?? new Date().getFullYear();
              const displayEndYear = stat.endYear ?? 'Present';

              return (
                <tr key={stat.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {options.showPresidentImages && stat.imageUrl && (
                        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                          <Image
                            src={stat.imageUrl}
                            alt={stat.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {stat.name}
                      </div>
                    </div>
                  </td>
                  {options.showPartyAffiliations && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                        {stat.party || 'Unknown'}
                      </span>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.startYear}-{displayEndYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-zinc-900 dark:text-zinc-50 font-bold">
                    {stat.count.toLocaleString()}
                  </td>
                  {options.showTermColumns && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-zinc-600 dark:text-zinc-400">
                        {stat.firstTermCount?.toLocaleString() || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-zinc-600 dark:text-zinc-400">
                        {stat.totalTerms && stat.totalTerms >= 2 ? (stat.secondTermCount?.toLocaleString() || '0') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-zinc-600 dark:text-zinc-400">
                        {stat.duringSessionCount?.toLocaleString() || '0'}
                        {stat.duringSessionCount && stat.count ? (
                          <div className="text-xs text-zinc-500 dark:text-zinc-500">
                            ({Math.round((stat.duringSessionCount / stat.count) * 100)}%)
                          </div>
                        ) : null}
                      </td>
                    </>
                  )}
                  {options.showLameDuckColumn && (
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-zinc-600 dark:text-zinc-400">
                      {stat.lameDuckCount?.toLocaleString() || '0'}
                      {stat.lameDuckCount && stat.count ? (
                        <div className="text-xs text-zinc-500 dark:text-zinc-500">
                          ({Math.round((stat.lameDuckCount / stat.count) * 100)}%)
                        </div>
                      ) : null}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
