// components/FullOpeningHours.tsx
'use client';

const businessHours: Record<string, string> = {
  Monday: '11 AM – 8 PM',
  Tuesday: 'Closed',
  Wednesday: '11 AM – 8 PM',
  Thursday: '11 AM – 8 PM',
  Friday: '11 AM – 8 PM',
  Saturday: '11 AM – 8 PM',
  Sunday: '11 AM – 8 PM',
};

export default function FullOpeningHours() {
  return (
    <section className="max-w-lg mx-auto bg-transparent Weekly shadow-xl p-4">
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-center text-flag-red uppercase">
        Opening Hours
      </h2>
      <ul className="space-y-2 lg:text-xl text-center text-flag-red mt-10 lg:mt-20 ">
        {Object.entries(businessHours).map(([day, hours]) => (
          <li key={day} className="flex justify-between px-4 ">
            <span className="font-semibold">{day}</span>
            <span>{hours === 'Closed' ? 'Closed' : hours}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
