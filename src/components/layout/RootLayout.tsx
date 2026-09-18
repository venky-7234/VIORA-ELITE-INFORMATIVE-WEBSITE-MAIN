import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/apply');
  };

  return (
    <ReactLenis root options={{ 
      lerp: 0.05, // Slower, smoother interpolation
      wheelMultiplier: 0.7, // Slower wheel scroll speed
      smoothWheel: true,
    }}>
      <ScrollProgressBar />

      <Navbar onApplyClick={handleApplyClick} />
      
      <div className="content-wrapper">
        <Outlet />
      </div>

      {location.pathname !== '/invitations' && <Footer />}
    </ReactLenis>
  );
};
