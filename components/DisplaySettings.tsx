'use client';

import { useState } from 'react';
import { useDisplayOptions } from '@/contexts/DisplayOptionsContext';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex-1">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export default function DisplaySettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { options, updateOptions, applyPreset } = useDisplayOptions();

  const toggleOption = (key: keyof typeof options) => {
    updateOptions({ [key]: !options[key] });
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Display Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-zinc-900 shadow-xl z-50 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Display Settings
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  aria-label="Close settings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Presets */}
              <div className="mt-4">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Quick Presets
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => applyPreset('minimal')}
                    className="flex-1 px-3 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md transition-colors"
                  >
                    Minimal
                  </button>
                  <button
                    onClick={() => applyPreset('balanced')}
                    className="flex-1 px-3 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md transition-colors"
                  >
                    Balanced
                  </button>
                  <button
                    onClick={() => applyPreset('detailed')}
                    className="flex-1 px-3 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md transition-colors"
                  >
                    Detailed
                  </button>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="p-6 space-y-6">
              {/* Visual Elements */}
              <section>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Visual Elements
                </h3>
                <div className="space-y-1">
                  <Toggle
                    label="President Images"
                    description="Show presidential portrait images"
                    checked={options.showPresidentImages}
                    onChange={() => toggleOption('showPresidentImages')}
                  />
                  <Toggle
                    label="Party Affiliations"
                    description="Display political party information"
                    checked={options.showPartyAffiliations}
                    onChange={() => toggleOption('showPartyAffiliations')}
                  />
                </div>
              </section>

              {/* Stats Cards */}
              <section>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Statistics
                </h3>
                <div className="space-y-1">
                  <Toggle
                    label="Stats Cards"
                    description="Show summary statistics at the top"
                    checked={options.showStatsCards}
                    onChange={() => toggleOption('showStatsCards')}
                  />
                </div>
              </section>

              {/* Charts */}
              <section>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Charts & Visualizations
                </h3>
                <div className="space-y-1">
                  <Toggle
                    label="Show All Charts"
                    description="Toggle all chart visualizations"
                    checked={options.showCharts}
                    onChange={() => toggleOption('showCharts')}
                  />
                  {options.showCharts && (
                    <>
                      <div className="ml-4 space-y-1">
                        <Toggle
                          label="Timeline Chart"
                          description="Orders per year over time"
                          checked={options.showTimeline}
                          onChange={() => toggleOption('showTimeline')}
                        />
                        <Toggle
                          label="Running Total Chart"
                          description="Cumulative executive orders"
                          checked={options.showRunningTotal}
                          onChange={() => toggleOption('showRunningTotal')}
                        />
                        <Toggle
                          label="Orders by President"
                          description="Top presidents by order count"
                          checked={options.showOrdersByPresident}
                          onChange={() => toggleOption('showOrdersByPresident')}
                        />
                        <Toggle
                          label="Term Comparison"
                          description="1st vs 2nd term comparison"
                          checked={options.showTermComparison}
                          onChange={() => toggleOption('showTermComparison')}
                        />
                        <Toggle
                          label="Recent Breakdown"
                          description="Regular vs lame duck orders"
                          checked={options.showRecentBreakdown}
                          onChange={() => toggleOption('showRecentBreakdown')}
                        />
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Tables */}
              <section>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  President Table
                </h3>
                <div className="space-y-1">
                  <Toggle
                    label="Show President Table"
                    description="Display full presidential statistics table"
                    checked={options.showPresidentTable}
                    onChange={() => toggleOption('showPresidentTable')}
                  />
                  {options.showPresidentTable && (
                    <div className="ml-4 space-y-1">
                      <Toggle
                        label="Term Columns"
                        description="Show 1st and 2nd term breakdowns"
                        checked={options.showTermColumns}
                        onChange={() => toggleOption('showTermColumns')}
                      />
                      <Toggle
                        label="Lame Duck Column"
                        description="Show lame duck period data"
                        checked={options.showLameDuckColumn}
                        onChange={() => toggleOption('showLameDuckColumn')}
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Executive Orders List */}
              <section>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Executive Orders List
                </h3>
                <div className="space-y-1">
                  <Toggle
                    label="Show Orders List"
                    description="Display searchable executive orders database"
                    checked={options.showExecutiveOrdersList}
                    onChange={() => toggleOption('showExecutiveOrdersList')}
                  />
                  {options.showExecutiveOrdersList && (
                    <div className="ml-4 space-y-1">
                      <Toggle
                        label="Abstracts"
                        description="Show order summaries/descriptions"
                        checked={options.showAbstracts}
                        onChange={() => toggleOption('showAbstracts')}
                      />
                      <Toggle
                        label="Dates"
                        description="Show signing and publication dates"
                        checked={options.showDates}
                        onChange={() => toggleOption('showDates')}
                      />
                      <Toggle
                        label="Citations"
                        description="Show legal citations"
                        checked={options.showCitations}
                        onChange={() => toggleOption('showCitations')}
                      />
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                Settings are saved automatically
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
