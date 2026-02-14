'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const Contact = () => {
    const whatsappNumber = "+6285723458828"; 
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <section id="contact" className="relative z-10 bg-black text-white py-32 px-6 md:px-20 overflow-hidden">
             
             {/* Background decoration or gradient could go here */}

             <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center">
                 <motion.h2 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-sm font-manrope uppercase tracking-widest text-gray-400 mb-6"
                 >
                    Get in Touch
                 </motion.h2>

                 <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl md:text-9xl font-syne font-bold mb-10 leading-tight"
                 >
                     Let's Work <br /> Together
                 </motion.h1>

                 <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                 >
                     <Link 
                        href={whatsappLink}
                        target="_blank"
                        className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-manrope font-bold text-white transition-all duration-300 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black focus:outline-none"
                     >
                        <span className="text-xl md:text-2xl mr-4 group-hover:scale-110 transition-transform">Say Hello</span>
                        <span className="relative flex items-center justify-center w-10 h-10 transition-transform duration-300 group-hover:translate-x-2">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                     </Link>
                 </motion.div>

                 <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl text-left md:text-center">
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col gap-2"
                     >
                         <h4 className="font-syne font-bold text-xl">Email</h4>
                         <a href="mailto:hello@ilramdhan.dev" className="font-manrope text-gray-400 hover:text-white transition-colors">hello@ilramdhan.dev</a>
                     </motion.div>

                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col gap-2"
                     >
                         <h4 className="font-syne font-bold text-xl">Phone / WhatsApp</h4>
                         <a href={whatsappLink} className="font-manrope text-gray-400 hover:text-white transition-colors">+62 857 2345 8828</a>
                     </motion.div>

                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-col gap-2"
                     >
                         <h4 className="font-syne font-bold text-xl">Socials</h4>
                         <div className="flex gap-4 justify-start md:justify-center font-manrope text-gray-400">
                             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                             <a href="#" className="hover:text-white transition-colors">Instagram</a>
                             <a href="#" className="hover:text-white transition-colors">Twitter</a>
                         </div>
                     </motion.div>
                 </div>
             </div>
        </section>
    );
};

export default Contact;
