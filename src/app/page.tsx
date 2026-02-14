'use client';

import { useLenis } from '@/hooks';
import Preloader from '@/components/layout/Preloader';
import Navbar from '@/components/layout/Navbar';
import MouseCursor from '@/components/layout/MouseCursor';
import Footer from '@/components/layout/Footer';
import SequenceScroll from '@/components/sections/SequenceScroll';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export default function Home() {
  useLenis();

  return (
    <>
      <MouseCursor />
      <Preloader />
      <Navbar />
      <main id="main-content" className="bg-black min-h-screen text-white cursor-none-desktop grain-overlay">
          <ErrorBoundary>
            <SequenceScroll />
          </ErrorBoundary>

          <div className="relative z-20 bg-black pb-20 -mt-[100vh]">
              <ErrorBoundary>
                <Projects />
              </ErrorBoundary>
              <InfiniteMarquee />
              <ErrorBoundary>
                <About />
              </ErrorBoundary>
              <ErrorBoundary>
                <Contact />
              </ErrorBoundary>
              <Footer />
          </div>
      </main>
    </>
  );
}
