'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { aboutText, services, awards, stack } from '@/data/site';

const aboutSections = [
    { title: 'Services', items: services },
    { title: 'Awards', items: awards },
    { title: 'Stack', items: stack },
];

const About = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"]
    });

    const words = aboutText.split(" ");

    return (
        <section id="about" className="relative z-10 bg-black text-white py-32 px-6 md:px-20">
            <div className="container mx-auto flex flex-col md:flex-row gap-20">
                <div className="md:w-1/3">
                    <h2 className="text-sm font-manrope uppercase tracking-widest text-gray-400 mb-4 sticky top-32">About Me</h2>
                </div>
                
                <div ref={container} className="md:w-2/3 flex flex-wrap gap-x-3 gap-y-2">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        )
                    })}
                </div>
            </div>
            
             <div className="container mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-10">
                 {aboutSections.map((section) => (
                     <div key={section.title}>
                         <h3 className="font-syne font-bold text-xl mb-4">{section.title}</h3>
                         <ul className="space-y-2 font-manrope text-gray-400">
                             {section.items.map((item) => (
                                 <li key={item}>{item}</li>
                             ))}
                         </ul>
                     </div>
                 ))}
             </div>
        </section>
    );
};

interface WordProps {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <motion.span 
            style={{ opacity }}
            className="text-3xl md:text-5xl font-manrope font-light leading-tight transition-opacity duration-300 mr-3"
        >
            {children}
        </motion.span>
    )
}

export default About;
