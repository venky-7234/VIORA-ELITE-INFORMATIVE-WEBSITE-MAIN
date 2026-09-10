import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgressBar } from '../common/ScrollProgressBar';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenis]);

  const handleScrollToApply = () => {
    // We will update this later to handle cross-page apply logic if needed,
    // but for now it will just scroll down or navigate to home footer.
    const element = document.getElementById('apply-section') || document.querySelector('.footer');
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      if (lenis) {
        lenis.scrollTo(offsetPosition, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <ReactLenis root options={{ 
      lerp: 0.05, // Slower, smoother interpolation
      wheelMultiplier: 0.7, // Slower wheel scroll speed
      smoothWheel: true,
    }}>
      <ScrollProgressBar />

      <Navbar onApplyClick={handleScrollToApply} />
      
      <div className="content-wrapper">
        <Outlet />
      </div>

      {location.pathname !== '/invitations' && <Footer />}
    </ReactLenis>
  );
};
