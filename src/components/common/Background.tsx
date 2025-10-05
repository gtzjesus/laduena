'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function Background() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Mobile Background */}
      <div className="block lg:hidden absolute inset-0 -z-10">
        <Image
          src="/images/elpaso.webp"
          alt="Background mobile"
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw"
          className={`object-cover w-full h-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setLoaded(true)}
          priority
        />
      </div>

      {/* Desktop Background */}
      <div className="hidden lg:block absolute inset-0 -z-10">
        <Image
          src="/images/elpaso-desktop.webp"
          alt="Background desktop"
          fill
          quality={100}
          sizes="(min-width: 1024px) 100vw"
          className={`object-cover w-full h-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoadingComplete={() => setLoaded(true)}
          priority
        />
      </div>

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-35 z-0" />
    </div>
  );
}
