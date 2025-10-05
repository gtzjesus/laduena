'use client';

import { useEffect, useState } from 'react';

const businessHours: Record<string, string> = {
  Monday: '11 AM – 8 PM',
  Tuesday: 'Closed',
  Wednesday: '11 AM – 8 PM',
  Thursday: '11 AM – 8 PM',
  Friday: '11 AM – 8 PM',
  Saturday: '11 AM – 8 PM',
  Sunday: '11 AM – 8 PM',
};

export default function OpeningHours() {
  const [todayHours, setTodayHours] = useState<string>('');

  useEffect(() => {
    const dayIndex = new Date().getDay(); // 0 (Sun) - 6 (Sat)
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const todayName = dayNames[dayIndex];
    const hours = businessHours[todayName];
    setTodayHours(
      hours === 'Closed' ? 'Closed today' : `Open today from ${hours}`
    );
  }, []);

  return (
    <section>
      <h1 className=" font-bold text-lg lg:text-4xl text-white leading-tight text-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
        <strong className="max-w-lg font-bold text-sm lg:text-lg text-white leading-tight text-center px-2">
          {todayHours}
        </strong>
      </h1>
    </section>
  );
}
