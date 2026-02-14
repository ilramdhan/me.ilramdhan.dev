'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { projects } from '@/data/site';


const Projects = () => {
    return (
        <section id="projects" className="relative z-10 bg-black text-white py-32 px-6 md:px-20">
            <div className="container mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10"
                >
                    <div>
                        <h2 className="text-sm font-manrope uppercase tracking-widest text-gray-400 mb-4">Selected Works</h2>
                        <h3 className="text-5xl md:text-8xl font-syne font-bold">Featured Projects</h3>
                    </div>
                     <motion.button 
                        className="px-8 py-3 border border-white/20 rounded-full font-manrope hover:bg-white hover:text-black transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Projects
                    </motion.button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-10 md:gap-y-20">
                    {projects.map((project, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
                                <Image 
                                    src={project.image} 
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                            </div>
                            
                            <div className="flex justify-between items-start">
                                <div>
                                     <h4 className="text-2xl md:text-3xl font-syne font-bold mb-2 group-hover:underline decoration-1 underline-offset-4">
                                        {project.title}
                                     </h4>
                                     <p className="text-sm font-manrope text-gray-400 uppercase tracking-wider mb-3">
                                        {project.category}
                                     </p>
                                     <p className="text-gray-300 font-manrope max-w-sm">
                                         {project.description}
                                     </p>
                                </div>
                                <motion.div 
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors"
                                    whileHover={{ rotate: 45 }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
