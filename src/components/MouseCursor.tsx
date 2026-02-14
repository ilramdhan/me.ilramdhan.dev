'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const MouseCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
  }, []);

  return (
    <>
        {/* Main Cursor Dot */}
        {/* <div 
            className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{ transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)` }}
        /> */}
        
        {/* Following Circle */}
        <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[9998] mix-blend-exclusion flex items-center justify-center hidden md:flex"
        animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: hovered ? 2.5 : 1,
            backgroundColor: hovered ? 'white' : 'transparent',
            borderColor: hovered ? 'transparent' : 'white'
        }}
        transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 15, 
            mass: 0.1 
        }}
        >
             {hovered && <span className="text-[4px] text-black font-bold uppercase tracking-widest">View</span>}
        </motion.div>
    </>
  );
};

export default MouseCursor;
