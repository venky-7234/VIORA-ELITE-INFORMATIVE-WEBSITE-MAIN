import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  onApplyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExperiencesOpen, setMobileExperiencesOpen] = useState(false);
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isStoryPage = location.pathname === '/story';
  const isJournalPage = location.pathname === '/gallery';
  const isChaptersPage = location.pathname === '/chapters' || location.pathname.startsWith('/retreats/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) setMobileExperiencesOpen(false); // Reset dropdown when closing drawer
  };
  const closeMenu = () => {
    setIsOpen(false);
    setMobileExperiencesOpen(false);
  };

  const toggleMobileExperiences = () => setMobileExperiencesOpen(!mobileExperiencesOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();

    const scrollToTarget = () => {
      if (targetId === 'home') {
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        const navbarHeight = 100;
        if (lenis) {
          lenis.scrollTo(element, { offset: -navbarHeight });
        } else {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for React to render the Home page, then scroll
      setTimeout(scrollToTarget, 100);
    } else {
      scrollToTarget();
    }
  };

  const handleStoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/story') {
      e.preventDefault();
      closeMenu();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      closeMenu();
    }
  };

  const handleGalleryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/gallery') {
      e.preventDefault();
      closeMenu();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      closeMenu();
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, 'home')}>
          <div className="viora-nav-brand">
            <img src="/media/icons/spin-icon.svg" alt="Viora Elite" className="viora-nav-bird" />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <Link to="/" onClick={(e) => handleNavClick(e, 'home')} className={`nav-link${isHomePage ? ' nav-link-active' : ''}`} aria-current={isHomePage ? 'page' : undefined}>HOME</Link>
          <Link to="/story" onClick={handleStoryClick} className={`nav-link${isStoryPage ? ' nav-link-active' : ''}`} aria-current={isStoryPage ? 'page' : undefined}>THE STORY</Link>
          <Link to="/gallery" onClick={handleGalleryClick} className={`nav-link${isJournalPage ? ' nav-link-active' : ''}`} aria-current={isJournalPage ? 'page' : undefined}>THE JOURNAL</Link>
          
          {/* Chapters Dropdown */}
          <div className="nav-dropdown-container">
            <span className={`nav-link nav-link-dropdown${isChaptersPage ? ' nav-link-active' : ''}`} style={{ cursor: 'pointer' }}>
              THE CHAPTERS <span className="nav-dropdown-arrow">▼</span>
            </span>
            <div className="nav-dropdown-menu">
              <Link to="/chapters" className={`nav-dropdown-item${isChaptersPage ? ' nav-dropdown-item-active' : ''}`} aria-current={isChaptersPage ? 'page' : undefined}>Chapter I</Link>
            </div>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <Button
            id="nav-apply-btn"
            variant="outline"
            size="sm"
            onClick={onApplyClick}
          >
            REQUEST A INVITE
          </Button>
        </div>

        {/* Mobile Buttons */}
        <div className="navbar-mobile-controls">
          <button
            id="menu-toggle-btn"
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'mobile-drawer-open' : ''}`}>
        <button
          className="mobile-drawer-close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <div className="mobile-drawer-links">
          <div className="mobile-nav-socials" aria-label="Social media links">
            <a href="https://www.instagram.com/viora.elite?stkn=dGN2ZHVtdnJ4bmF2" className="mobile-nav-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="mobile-nav-social-link" aria-label="Twitter">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="mobile-nav-social-link" aria-label="LinkedIn">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="mobile-nav-social-link" aria-label="Facebook">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="mobile-nav-social-link" aria-label="YouTube">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
          <Link to="/" onClick={(e) => { handleNavClick(e, 'home'); closeMenu(); }} className={`mobile-nav-link${isHomePage ? ' mobile-nav-link-active' : ''}`} aria-current={isHomePage ? 'page' : undefined}>HOME</Link>
          <Link to="/story" onClick={(e) => { handleStoryClick(e); closeMenu(); }} className={`mobile-nav-link${isStoryPage ? ' mobile-nav-link-active' : ''}`} aria-current={isStoryPage ? 'page' : undefined}>THE STORY</Link>
          <Link to="/gallery" onClick={(e) => { handleGalleryClick(e); closeMenu(); }} className={`mobile-nav-link${isJournalPage ? ' mobile-nav-link-active' : ''}`} aria-current={isJournalPage ? 'page' : undefined}>THE JOURNAL</Link>
          
          <div className="mobile-nav-dropdown-group">
            <button
              className={`mobile-nav-link mobile-dropdown-toggle${isChaptersPage ? ' mobile-nav-link-active' : ''}`}
              onClick={toggleMobileExperiences}
            >
              THE CHAPTERS <span className={`nav-dropdown-arrow ${mobileExperiencesOpen ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`mobile-nav-sublinks ${mobileExperiencesOpen ? 'open' : ''}`}>
              <Link to="/chapters" onClick={closeMenu} className={`mobile-nav-sublink${isChaptersPage ? ' mobile-nav-sublink-active' : ''}`} aria-current={isChaptersPage ? 'page' : undefined}>Chapter I</Link>
            </div>
          </div>

          <div className="mobile-drawer-divider"></div>

          <Button
            id="mobile-nav-apply-btn"
            variant="primary"
            size="md"
            fullWidth
            onClick={() => { closeMenu(); onApplyClick(); }}
          >
            REQUEST A INVITE
          </Button>
        </div>
      </div>
    </nav>
  );
};
