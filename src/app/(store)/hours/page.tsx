// app/(store)/hours/page.tsx

import HoursBackground from '@/components/common/HoursBackground';
import Header from '@/components/common/header';
import FullOpeningHours from '@/components/hours/FullOpeningHours';
import OpeningHours from '@/components/hours/OpeningHours';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hours - La Dueña',
  description:
    'Explore the full hours at La Dueña – featuring snow cones, raspas, ice cream, and more sweet treats!',
  openGraph: {
    title: 'Hours - La Dueña',
    description:
      'Explore the full hours at La Dueña – featuring snow cones, raspas, ice cream, and more sweet treats!',
    url: 'https://laduena.store/hours',
    siteName: 'La Dueña',
    type: 'website',
  },
  alternates: {
    canonical: 'https://laduena.store/hours',
  },
};

export default function Hours() {
  return (
    <>
      {/* Keep the header relative or higher z-index so it appears above bg */}
      <div className="relative z-20 w-full">
        <Header />
      </div>

      {/* Background fixed and behind everything */}
      <HoursBackground />

      {/* Main content container */}
      <main className="relative z-10 container mx-auto px-4 py-12 space-y-12">
        {/* Today’s Hours Summary */}
        <OpeningHours />

        {/* Full Weekly Hours */}
        <FullOpeningHours />
      </main>
    </>
  );
}
