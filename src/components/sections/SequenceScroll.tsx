'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'motion/react';
import { siteConfig } from '@/data/site';
import MagneticButton from '@/components/ui/MagneticButton';

const FRAME_COUNT = 192;
const INITIAL_BATCH = 30;
const BATCH_SIZE = 20;

const SequenceScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
    const currentFrameRef = useRef(0);
    const supportsWebP = useRef(true);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Load a single image and store in ref
    const loadImage = useCallback((index: number): Promise<void> => {
        return new Promise((resolve) => {
            if (imagesRef.current[index]) {
                resolve();
                return;
            }
            const img = new Image();
            const formattedIndex = (index + 1).toString().padStart(3, '0');
            const ext = supportsWebP.current ? 'webp' : 'jpg';
            const folder = supportsWebP.current ? '/sequence/webp' : '/sequence';
            img.src = `${folder}/ezgif-frame-${formattedIndex}.${ext}`;
            img.onload = () => {
                imagesRef.current[index] = img;
                setLoadedCount((prev) => prev + 1);
                resolve();
            };
            img.onerror = () => {
                console.error(`Failed to load frame ${index + 1}`);
                resolve();
            };
        });
    }, []);

    // Progressive loading: initial batch first, then rest in chunks
    useEffect(() => {
        let cancelled = false;

        const loadProgressively = async () => {
            // Detect WebP support
            try {
                const testWebP = new Image();
                testWebP.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
                await new Promise<void>((resolve) => {
                    testWebP.onload = () => { supportsWebP.current = testWebP.width > 0; resolve(); };
                    testWebP.onerror = () => { supportsWebP.current = false; resolve(); };
                });
            } catch { supportsWebP.current = false; }
            // Phase 1: Load first batch (critical for initial view)
            const initialPromises = [];
            for (let i = 0; i < Math.min(INITIAL_BATCH, FRAME_COUNT); i++) {
                initialPromises.push(loadImage(i));
            }
            await Promise.all(initialPromises);

            if (cancelled) return;
            setIsReady(true);

            // Phase 2: Load remaining in batches
            for (let i = INITIAL_BATCH; i < FRAME_COUNT; i += BATCH_SIZE) {
                if (cancelled) return;
                const batchPromises = [];
                for (let j = i; j < Math.min(i + BATCH_SIZE, FRAME_COUNT); j++) {
                    batchPromises.push(loadImage(j));
                }
                await Promise.all(batchPromises);
            }
        };

        loadProgressively();
        return () => { cancelled = true; };
    }, [loadImage]);

    // Render logic — handles devicePixelRatio for Retina displays
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = imagesRef.current[index];
        if (!canvas || !ctx || !img) return;

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // "object-fit: cover" logic for Canvas
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }, []);

    // Update canvas on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isReady) return;

        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );

        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Resize handler — accounts for devicePixelRatio (Retina/HiDPI)
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                const width = window.innerWidth;
                const height = window.innerHeight;

                // Set canvas buffer size to physical pixels
                canvasRef.current.width = width * dpr;
                canvasRef.current.height = height * dpr;

                // Scale CSS size to logical pixels
                canvasRef.current.style.width = width + 'px';
                canvasRef.current.style.height = height + 'px';

                if (isReady) {
                    renderFrame(currentFrameRef.current);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [isReady, renderFrame]);

    // Initial render when ready
    useEffect(() => {
        if (isReady) {
            renderFrame(0);
        }
    }, [isReady, renderFrame]);

    const loadProgress = Math.round((loadedCount / FRAME_COUNT) * 100);

    return (
        <section className="relative z-10 bg-black">
            <div ref={containerRef} className="relative h-[500vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full block"
                        role="img"
                        aria-label="Scrollytelling animation sequence showcasing creative development work"
                    />

                    {!isReady && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
                            <div className="w-48 h-[1px] bg-white/20 relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-white transition-all duration-200"
                                    style={{ width: `${loadProgress}%` }}
                                />
                            </div>
                            <span className="text-sm font-manrope text-white/50">
                                Loading {loadProgress}%
                            </span>
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
                                 &ldquo;Innovation distinguishes between a leader and a follower.&rdquo;
                             </p>
                         </div>
                    </OverlaySection>

                    {/* Section 4: 90% scroll - Slogan + CTA */}
                    <OverlaySection progress={scrollYProgress} start={0.85} end={0.98} className="justify-center items-center text-center">
                         <h2 className="text-4xl md:text-7xl font-bold font-syne text-white mb-8">
                             Ready to create something extraordinary?
                         </h2>
                         <MagneticButton
                            as="a"
                            href={`https://wa.me/${siteConfig.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white text-black font-bold font-manrope rounded-full text-lg hover:scale-105 transition-transform inline-block"
                         >
                             Let&apos;s Work Together
                         </MagneticButton>
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
    progress: ReturnType<typeof useScroll>["scrollYProgress"],
    start: number,
    end: number,
    className?: string
}) => {
    let t1 = Math.max(0, start - 0.05);
    let t2 = Math.max(0, Math.min(1, start));
    let t3 = Math.max(0, Math.min(1, end));
    let t4 = Math.max(0, Math.min(1, end + 0.05));

    if (t2 <= t1) t2 = t1 + 0.001;
    if (t3 <= t2) t3 = t2 + 0.001;
    if (t4 <= t3) t4 = t3 + 0.001;

    if (t4 > 1) {
        t4 = 1;
        if (t3 >= t4) t3 = t4 - 0.001;
        if (t2 >= t3) t2 = t3 - 0.001;
        if (t1 >= t2) t1 = t2 - 0.001;
    }

    t1 = Math.max(0, t1);
    t2 = Math.max(t1 + 0.001, t2);
    t3 = Math.max(t2 + 0.001, t3);
    t4 = Math.max(t3 + 0.001, t4);

    const opacity = useTransform(progress,
        [t1, t2, t3, t4],
        [0, 1, 1, 0]
    );

    const y = useTransform(progress,
        [t1, t4],
        [50, -50]
    );

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

