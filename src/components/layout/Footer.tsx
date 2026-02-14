'use client';

import React from 'react';
import { motion } from 'motion/react';
import { footerLinkGroups, siteConfig } from '@/data/site';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-black text-white p-6 md:p-10 pb-0 flex flex-col justify-between min-h-[50vh] pt-32" role="contentinfo">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                <div>
                     <h3 className="font-syne font-bold text-xl mb-4 uppercase tracking-wider">{siteConfig.name}</h3>
                     <p className="font-manrope text-gray-400 max-w-sm">
                         Crafting digital experiences that leave a lasting impression.
                         {siteConfig.location}, available worldwide.
                     </p>
                </div>
                <div className="flex gap-10 font-manrope text-sm text-gray-400 uppercase tracking-widest">
                    {footerLinkGroups.map((group, groupIdx) => (
                        <div key={group.label} className="flex flex-col gap-2">
                            <span className="text-white mb-2 font-bold">{group.label}</span>
                            {group.links.map((link, index) => (
                                <motion.a
                                    key={link.title}
                                    href={link.href}
                                    className="hover:text-white transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: groupIdx * 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {link.title}
                                </motion.a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-20 overflow-hidden w-full border-t border-white/20 pt-10">
                 <motion.h3
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    viewport={{ once: true }}
                    className="text-[12vw] md:text-[18vw] leading-none font-bold font-syne text-center uppercase tracking-tighter mix-blend-difference"
                >
                    {siteConfig.author}
                </motion.h3>
                <p className="text-center text-gray-500 font-manrope text-xs pb-6 mt-4">
                    &copy; {currentYear} {siteConfig.name} — All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
