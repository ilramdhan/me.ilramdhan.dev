'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const About = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"]
    });

    const text = "I am a creative developer with a passion for building immersive web experiences. I specialize in Next.js, Motion, and WebGL to bring ideas to life.";
    const words = text.split(" ");

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
                 <div>
                     <h3 className="font-syne font-bold text-xl mb-4">Services</h3>
                     <ul className="space-y-2 font-manrope text-gray-400">
                         <li>Web Design</li>
                         <li>Web Development</li>
                         <li>Creative Implementation</li>
                         <li>SEO Optimization</li>
                     </ul>
                 </div>
                 <div>
                     <h3 className="font-syne font-bold text-xl mb-4">Awards</h3>
                     <ul className="space-y-2 font-manrope text-gray-400">
                         <li>Awwwards - Site of the Day</li>
                         <li>CSS Design Awards - UI/UX</li>
                         <li>FWA - Site of the Day</li>
                     </ul>
                 </div>
                 <div>
                     <h3 className="font-syne font-bold text-xl mb-4">Stack</h3>
                     <ul className="space-y-2 font-manrope text-gray-400">
                         <li>Next.js / React</li>
                         <li>TypeScript</li>
                         <li>Tailwind CSS</li>
                         <li>WebGL / Three.js</li>
                     </ul>
                 </div>
             </div>
        </section>
    );
};

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) => {
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
