'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Preloader = () => {
  const [complete, setComplete] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Disable scrolling when preloader is active
    document.body.style.overflow = 'hidden';

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setComplete(true);
            document.body.style.overflow = ''; // Re-enable scrolling
          }, 500);
          return 100;
        }
        // Random increment for more "realistic" loading feel
        return Math.min(prev + Math.floor(Math.random() * 5) + 1, 100);
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black text-white p-6 md:p-10 cursor-wait"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start w-full">
            <h1 className="text-xl md:text-2xl font-bold font-syne uppercase tracking-wider">
              Ilramdhan.dev
            </h1>
            <p className="text-sm md:text-base font-manrope text-white/70">
              Fullstack Engineering
            </p>
          </div>

          {/* Center: Percentage Big Display */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
             <motion.h2 
               className="text-[15vw] leading-none font-bold font-syne"
             >
               {count}
             </motion.h2>
          </div>

          {/* Bottom: Progress Bar */}
          <div className="w-full">
             <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-white"
                    style={{ width: `${count}%` }}
                />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
