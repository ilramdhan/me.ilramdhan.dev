'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import SequenceScroll from '@/components/SequenceScroll';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MouseCursor from '@/components/MouseCursor';
import InfiniteMarquee from '@/components/InfiniteMarquee';

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
        lenis.destroy();
    }
  }, []);

  return (
    <>
      <MouseCursor />
      <Preloader />
      <Navbar />
      <main id="main-content" className="bg-black min-h-screen text-white cursor-none-desktop grain-overlay">
          <SequenceScroll />

          <div className="relative z-20 bg-black pb-20 -mt-[100vh]">
              <Projects />
              <InfiniteMarquee />
              <About />
              <Contact />
              <Footer />
          </div>
      </main>
    </>
  );
}

