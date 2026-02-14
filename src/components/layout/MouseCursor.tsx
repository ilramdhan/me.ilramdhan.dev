'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const MouseCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Use motion values instead of state to avoid re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring-based following
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer');

      setHovered(isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[9998] mix-blend-exclusion flex items-center justify-center hidden md:flex"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: hovered ? 2.5 : 1,
        backgroundColor: hovered ? 'white' : 'transparent',
        borderColor: hovered ? 'transparent' : 'white',
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        backgroundColor: { duration: 0.2 },
        borderColor: { duration: 0.2 },
      }}
    >
      {hovered && (
        <span className="text-[4px] text-black font-bold uppercase tracking-widest">
          View
        </span>
      )}
    </motion.div>
  );
};

export default MouseCursor;

