'use client';

import Link from 'next/link';
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
      <main className="bg-black min-h-screen text-white cursor-none">
          
          {/* Main Sequence Scroll Section */}
          <SequenceScroll />
          
          {/* Subsequent Sections with "Curtain" effect */}
          {/* -mt-[100vh] to overlap the last sticky frame of SequenceScroll if desired, 
              but SequenceScroll is 500vh tall with sticky inside. 
              The sticky content stays for the duration.
              At the end of 500vh, the sticky content scrolls up naturally.
              If we want to cover it, we can just let it scroll up.
              The user asked for a-mt-[100vh].
          */}
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
