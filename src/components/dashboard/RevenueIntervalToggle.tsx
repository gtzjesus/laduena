'use client';
import { RefObject } from 'react';
type Interval = 'daily' | 'weekly' | 'monthly';

interface RevenueIntervalToggleProps {
  onChangeAction: (interval: Interval) => void;
  active: Interval;
  scrollToRef?: RefObject<HTMLElement>;
}

export default function RevenueIntervalToggle({
  onChangeAction,
  active,
}: RevenueIntervalToggleProps) {
  const intervals: Interval[] = ['daily', 'weekly', 'monthly'];

  return (
    <div className="flex items-center justify-between mb-2 mt-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-white"></h2>
      <div className="space-x-2">
        {intervals.map((interval) => (
          <button
            key={interval}
            type="button"
            onClick={() => onChangeAction(interval)}
            className={`px-2 py-1 uppercase text-xs font-semibold text-center ${
              active === interval
                ? 'bg-flag-red text-white'
                : 'bg-flag-blue text-gray-300'
            }`}
          >
            {interval}
          </button>
        ))}
      </div>
    </div>
  );
}
