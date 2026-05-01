import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
