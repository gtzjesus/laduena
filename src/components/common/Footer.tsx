// components/Footer.tsx

import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-t bg-flag-red  text-white  px-4 pt-5 pb-3">
      {/* Decorative lines or background */}
      <div className="absolute inset-0 opacity-5  "></div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-black">
        {/* Logo + Branding */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/icons/logo-black.webp"
            alt="La Hacienda Logo"
            width={25}
            height={25}
            className="mb-2"
            priority
          />
          <h1 className=" font-light text-md lg:text-xl text-center md:text-left drop-shadow">
            La Dueña
          </h1>
          <p className="uppercase text-xs font-semibold tracking-wide text-center md:text-left mt-1">
            snow cones, raspas and other sweet treats.
          </p>
        </div>

        {/* Center callout (only on md+) */}
        <div className="hidden md:flex flex-col items-center justify-center text-center text-sm font-medium">
          <p className="text-xs mt-1 opacity-80">Stop by and say hello!</p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end">
          <p className=" text-xs font-light tracking-wider">
            &copy; {new Date().getFullYear()} La Dueña, all rights reserved
          </p>
        </div>
      </div>

      {/* Optional decorative border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-flag-red my-1 opacity-50" />
    </footer>
  );
};

export default Footer;
