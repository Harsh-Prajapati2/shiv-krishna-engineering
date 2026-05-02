import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Styles
import './styles/shared.css';

// Layout
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import ParallaxBackground from './components/ParallaxBackground/ParallaxBackground';

// Page Transition System
import { PageTransitionRouter } from './components/PageTransition/PageTransitionRouter';
import TransitionOverlay from './components/PageTransition/TransitionOverlay';

// Pages
import Home       from './pages/Home';
import About      from './pages/About';
import Clients    from './pages/Clients';
import Contact    from './pages/Contact';
import Industries from './pages/Industries';
import Services   from './pages/Services';
import Strength   from './pages/Strength';

function AppInner() {
  const overlayRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    const scrollSpeed = 0.72;

    const isScrollableContainer = (element, deltaY) => {
      if (!element || element === document.body || element === document.documentElement) {
        return false;
      }

      const style = window.getComputedStyle(element);
      const overflowY = style.overflowY;
      const canScrollY = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';

      if (!canScrollY || element.scrollHeight <= element.clientHeight) {
        return false;
      }

      if (deltaY > 0) {
        return element.scrollTop + element.clientHeight < element.scrollHeight;
      }

      return element.scrollTop > 0;
    };

    const onWheel = (event) => {
      const target = event.target instanceof Element ? event.target : null;

      if (target) {
        const interactiveElement = target.closest('input, textarea, select, [contenteditable="true"]');
        if (interactiveElement) {
          return;
        }

        let currentElement = target;
        while (currentElement && currentElement !== document.body) {
          if (isScrollableContainer(currentElement, event.deltaY)) {
            return;
          }

          currentElement = currentElement.parentElement;
        }
      }

      event.preventDefault();
      window.scrollBy({
        top: event.deltaY * scrollSpeed,
        left: event.deltaX * scrollSpeed,
        behavior: 'auto',
      });
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <PageTransitionRouter overlayRef={overlayRef}>
      <div className="app-container">
        <CustomCursor />
        <ParallaxBackground />
        <Navbar />

        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/clients"    element={<Clients />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/services"   element={<Services />} />
            <Route path="/strength"   element={<Strength />} />
          </Routes>
        </main>

        <Footer />

        {/* Global transition overlay — always mounted, z-index 9999 */}
        <TransitionOverlay ref={overlayRef} />
      </div>
    </PageTransitionRouter>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
