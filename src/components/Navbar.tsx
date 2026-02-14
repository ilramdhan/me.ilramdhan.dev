'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const menuLinks = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '#projects' },
  { title: 'About', href: '#about' },
  { title: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="text-xl font-bold font-syne uppercase tracking-wider z-50">
          Ilramdhan.dev
        </Link>
        <button
          onClick={toggleMenu}
          className="z-50 flex items-center gap-2 group cursor-pointer"
        >
          <span className="uppercase font-manrope text-sm hidden md:block group-hover:opacity-70 transition-opacity">
            {isOpen ? 'Close' : 'Menu'}
          </span>
          <div className="flex flex-col gap-[6px] w-8">
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              className="w-full h-[2px] bg-white block"
            />
             <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-full h-[2px] bg-white block"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              className="w-full h-[2px] bg-white block"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
            exit={{
              clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
            }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black text-white flex flex-col justify-center items-center"
          >
             <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-end h-full py-20 md:py-32">
                 
                 <div className="flex flex-col gap-4">
                     {menuLinks.map((link, index) => (
                         <div key={index} className="overflow-hidden">
                             <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                             >
                                 <Link 
                                    href={link.href} 
                                    className="text-6xl md:text-9xl font-syne font-bold uppercase hover:text-gray-400 transition-colors"
                                    onClick={toggleMenu}
                                 >
                                     {link.title}
                                 </Link>
                             </motion.div>
                         </div>
                     ))}
                 </div>

                 <div className="flex flex-col gap-4 mt-10 md:mt-0 text-white/50 font-manrope">
                     <div className="overflow-hidden">
                         <motion.p
                           initial={{ y: "100%" }}
                           animate={{ y: 0 }}
                           exit={{ y: "100%" }}
                           transition={{ duration: 0.5, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
                         >
                             Based in Indonesia
                         </motion.p>
                     </div>
                     <div className="overflow-hidden">
                         <motion.p
                             initial={{ y: "100%" }}
                             animate={{ y: 0 }}
                             exit={{ y: "100%" }}
                             transition={{ duration: 0.5, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
                         >
                            +62 857 2345 8828
                         </motion.p>
                     </div>
                      <div className="overflow-hidden">
                         <motion.div
                             initial={{ y: "100%" }}
                             animate={{ y: 0 }}
                             exit={{ y: "100%" }}
                             transition={{ duration: 0.5, delay: 1, ease: [0.76, 0, 0.24, 1] }}
                             className="flex gap-4 mt-2"
                         >
                            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                         </motion.div>
                     </div>
                 </div>

             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
