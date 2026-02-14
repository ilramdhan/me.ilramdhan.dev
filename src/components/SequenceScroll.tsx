'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'motion/react';

const SequenceScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameCount = 192; // Total frames based on user files

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            // Optimize loading: parallel requests with batching if needed, but browser handles it well usually
            // Just promise.all for better parallel loading
            const promises = [];
            
            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    const formattedIndex = i.toString().padStart(3, '0');
                    img.src = `/sequence/ezgif-frame-${formattedIndex}.jpg`;
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(`Failed to load frame ${i}`);
                });
                promises.push(promise);
            }
            
            try {
                const results = await Promise.all(promises);
                setImages(results);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading sequence images:", error);
                setIsLoading(false); // Still finish to show fallback?
            }
        };
        
        loadImages();
    }, []);

    // Render logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || !images[index]) return;

        const img = images[index];
        
        // "object-fit: cover" logic for Canvas
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, 
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // Update canvas on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isLoading || images.length === 0) return;
        
        // Map 0-1 to 0-(frameCount-1)
        const frameIndex = Math.min(
            frameCount - 1, 
            Math.floor(latest * frameCount)
        );
        
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set canvas size to window size for fullscreen
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                
                // Re-render current frame if possible
                if (!isLoading && images.length > 0) {
                     // We need current scroll progress to know which frame? 
                     // Or just render frame 0 if at top, or just rely on next scroll event.
                     // A simple way is to force a scroll update or valid frame.
                     // But we don't have access to current scrollYProgress value easily outside event.
                     // However, scroll event will fire on resize often? maybe not.
                     // Let's just re-render last valid if we tracked it, but for now just leave it be, scroll will update it.
                }
            }
        };
        
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoading, images]);

     // Initial render
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoading, images]);


    return (
        <section className="relative z-10 bg-black">
            <div ref={containerRef} className="relative h-[500vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <canvas ref={canvasRef} className="w-full h-full block" />
                    
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            Loading Sequence...
                        </div>
                    )}

                    {/* Section 1: 5% scroll */}
                    <OverlaySection progress={scrollYProgress} start={0.02} end={0.15} className="justify-center items-center text-center">
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                             <h1 className="text-4xl md:text-7xl font-bold font-syne text-white mb-4">
                                My Name is Ilramdhan.dev
                             </h1>
                             <p className="text-xl md:text-3xl font-manrope text-white/80">
                                Fullstack Engineering
                             </p>
                        </motion.div>
                    </OverlaySection>

                    {/* Section 2: 30% scroll - Left aligned */}
                    <OverlaySection progress={scrollYProgress} start={0.25} end={0.4} className="justify-center items-start px-10 md:px-20">
                         <div className="max-w-2xl">
                             <h2 className="text-3xl md:text-6xl font-bold font-syne text-white mb-6">
                                 Crafting Digital Experiences
                             </h2>
                             <p className="text-lg md:text-xl font-manrope text-white/70 leading-relaxed">
                                 I build immersive web applications that blend creativity with technical excellence. 
                                 Every interaction is designed to engage and inspire.
                             </p>
                         </div>
                    </OverlaySection>

                    {/* Section 3: 60% scroll - Right aligned */}
                    <OverlaySection progress={scrollYProgress} start={0.55} end={0.7} className="justify-center items-end px-10 md:px-20 text-right">
                         <div className="max-w-2xl">
                             <h2 className="text-3xl md:text-6xl font-bold font-syne text-white mb-6">
                                 Beyond the Code
                             </h2>
                             <p className="text-lg md:text-xl font-manrope text-white/70 leading-relaxed">
                                 "Innovation distinguishes between a leader and a follower."
                             </p>
                         </div>
                    </OverlaySection>

                    {/* Section 4: 90% scroll - Slogan + CTA */}
                    <OverlaySection progress={scrollYProgress} start={0.85} end={0.98} className="justify-center items-center text-center">
                         <h2 className="text-4xl md:text-7xl font-bold font-syne text-white mb-8">
                             Ready to create something extraordinary?
                         </h2>
                         <motion.button 
                            className="px-8 py-4 bg-white text-black font-bold font-manrope rounded-full text-lg hover:scale-105 transition-transform"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                         >
                             Let's Work Together
                         </motion.button>
                    </OverlaySection>

                </div>
            </div>
        </section>
    );
};

const OverlaySection = ({ 
    children, 
    progress, 
    start, 
    end, 
    className = "" 
}: { 
    children: React.ReactNode, 
    progress: any, 
    start: number, 
    end: number, 
    className?: string 
}) => {
    // Ensure valid input range for useTransform and strictly increasing values
    // Clamp to [0, 1] and ensure at least 0.001 difference
    let t1 = Math.max(0, start - 0.05);
    let t2 = Math.max(0, Math.min(1, start));
    let t3 = Math.max(0, Math.min(1, end));
    let t4 = Math.max(0, Math.min(1, end + 0.05));

    // Enforce strictly increasing order
    if (t2 <= t1) t2 = t1 + 0.001;
    if (t3 <= t2) t3 = t2 + 0.001;
    if (t4 <= t3) t4 = t3 + 0.001;

    // Re-clamp upper bound if pushed beyond 1, and adjustment downwards if needed
    if (t4 > 1) {
        t4 = 1;
        if (t3 >= t4) t3 = t4 - 0.001;
        if (t2 >= t3) t2 = t3 - 0.001;
        if (t1 >= t2) t1 = t2 - 0.001;
    }
    
    // Ensure lower bound didn't go below 0 after downward adjustment
    t1 = Math.max(0, t1);
    t2 = Math.max(t1 + 0.001, t2);
    t3 = Math.max(t2 + 0.001, t3);
    t4 = Math.max(t3 + 0.001, t4);
    
    // Final clamp to be safe (though logic above should handle it, t4 might exceed 1 slightly if forced)
    // If t4 > 1, it means we don't have enough space in [0,1] for 4 points with 0.001 gap? 
    // 0.004 space is needed. We have 1.0. So it's fine.

    // Smooth fade in/out based on scroll range
    const opacity = useTransform(progress, 
        [t1, t2, t3, t4], 
        [0, 1, 1, 0]
    );
    
    // Slight parallax movement
    const y = useTransform(progress, 
        [t1, t4], 
        [50, -50]
    );
    
    // Only render (pointer-events) when visible? No, use pointer-events-none by default
    // But button needs pointer-events-auto
    
    // Check if within range to set pointer-events
    // We can't easily conditionally render based on MotionValue in React render without state, 
    // but opacity 0 usually hides it visually.
    
    return (
        <motion.div 
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col pointer-events-none ${className}`}
        >
            <div className="pointer-events-auto">
                {children}
            </div>
        </motion.div>
    );
};

export default SequenceScroll;
