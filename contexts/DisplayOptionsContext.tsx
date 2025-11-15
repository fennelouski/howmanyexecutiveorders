'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Display options interface
export interface DisplayOptions {
  // Visual elements
  showPresidentImages: boolean;
  showPartyAffiliations: boolean;

  // Charts and visualizations
  showCharts: boolean;
  showTimeline: boolean;
  showRunningTotal: boolean;
  showOrdersByPresident: boolean;
  showTermComparison: boolean;
  showRecentBreakdown: boolean;

  // Tables
  showPresidentTable: boolean;
  showTermColumns: boolean;
  showLameDuckColumn: boolean;

  // Executive orders list
  showExecutiveOrdersList: boolean;
  showAbstracts: boolean;
  showDates: boolean;
  showCitations: boolean;

  // Stats cards
  showStatsCards: boolean;
}

// Default options (balanced view - good for desktop)
export const DEFAULT_OPTIONS: DisplayOptions = {
  showPresidentImages: true,
  showPartyAffiliations: true,

  showCharts: true,
  showTimeline: true,
  showRunningTotal: true,
  showOrdersByPresident: true,
  showTermComparison: true,
  showRecentBreakdown: true,

  showPresidentTable: true,
  showTermColumns: true,
  showLameDuckColumn: true,

  showExecutiveOrdersList: true,
  showAbstracts: true,
  showDates: true,
  showCitations: true,

  showStatsCards: true,
};

// Minimal preset (clean, mobile-friendly)
export const MINIMAL_OPTIONS: DisplayOptions = {
  showPresidentImages: false,
  showPartyAffiliations: false,

  showCharts: false,
  showTimeline: false,
  showRunningTotal: false,
  showOrdersByPresident: false,
  showTermComparison: false,
  showRecentBreakdown: false,

  showPresidentTable: true,
  showTermColumns: false,
  showLameDuckColumn: false,

  showExecutiveOrdersList: true,
  showAbstracts: false,
  showDates: false,
  showCitations: false,

  showStatsCards: true,
};

// Detailed preset (all information visible)
export const DETAILED_OPTIONS: DisplayOptions = {
  showPresidentImages: true,
  showPartyAffiliations: true,

  showCharts: true,
  showTimeline: true,
  showRunningTotal: true,
  showOrdersByPresident: true,
  showTermComparison: true,
  showRecentBreakdown: true,

  showPresidentTable: true,
  showTermColumns: true,
  showLameDuckColumn: true,

  showExecutiveOrdersList: true,
  showAbstracts: true,
  showDates: true,
  showCitations: true,

  showStatsCards: true,
};

// Context interface
interface DisplayOptionsContextType {
  options: DisplayOptions;
  updateOptions: (newOptions: Partial<DisplayOptions>) => void;
  resetToDefaults: () => void;
  applyPreset: (preset: 'minimal' | 'balanced' | 'detailed') => void;
}

// Create context
const DisplayOptionsContext = createContext<DisplayOptionsContextType | undefined>(undefined);

// Local storage key
const STORAGE_KEY = 'executive-orders-display-options';

// Provider component
export function DisplayOptionsProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<DisplayOptions>(DEFAULT_OPTIONS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load options from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setOptions({ ...DEFAULT_OPTIONS, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load display options:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save options to localStorage when they change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
      } catch (error) {
        console.error('Failed to save display options:', error);
      }
    }
  }, [options, isInitialized]);

  const updateOptions = (newOptions: Partial<DisplayOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  };

  const resetToDefaults = () => {
    setOptions(DEFAULT_OPTIONS);
  };

  const applyPreset = (preset: 'minimal' | 'balanced' | 'detailed') => {
    switch (preset) {
      case 'minimal':
        setOptions(MINIMAL_OPTIONS);
        break;
      case 'balanced':
        setOptions(DEFAULT_OPTIONS);
        break;
      case 'detailed':
        setOptions(DETAILED_OPTIONS);
        break;
    }
  };

  return (
    <DisplayOptionsContext.Provider value={{ options, updateOptions, resetToDefaults, applyPreset }}>
      {children}
    </DisplayOptionsContext.Provider>
  );
}

// Hook to use display options
export function useDisplayOptions() {
  const context = useContext(DisplayOptionsContext);
  if (context === undefined) {
    throw new Error('useDisplayOptions must be used within a DisplayOptionsProvider');
  }
  return context;
}
