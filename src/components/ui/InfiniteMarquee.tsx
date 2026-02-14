'use client';
import { motion } from 'motion/react';

const InfiniteMarquee = () => {
    return (
        <div className="relative z-10 bg-black text-white py-20 overflow-hidden select-none cursor-default">
            
            <div className="flex whitespace-nowrap overflow-hidden">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                    className="flex"
                >
                    {[...Array(4)].map((_, i) => (
                         <div key={i} className="text-6xl md:text-9xl font-syne font-bold uppercase text-white/10 mr-20 flex items-center">
                             Creative Developer <span className="text-white mx-10">•</span> Web Experiences <span className="text-white mx-10">•</span> Motion Design <span className="text-white mx-10">•</span>
                         </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default InfiniteMarquee;
