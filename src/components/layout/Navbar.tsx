import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { Menu, X, Sun, Moon, Crown, Type } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  onApplyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onApplyClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExperiencesOpen, setMobileExperiencesOpen] = useState(false);
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleEditionsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/editions') {
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

  const handleInvitationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/invitations') {
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

  const handleFontChange = (font: string) => {
    document.documentElement.setAttribute('data-font', font);
  };

  const renderThemeIcon = () => {
    if (theme === 'light') return <Sun className="icon" size={20} />;
    if (theme === 'dark') return <Moon className="icon" size={20} />;
    return <Crown className="icon" size={20} />;
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
          <Link to="/" onClick={(e) => handleNavClick(e, 'home')} className="nav-link">HOME</Link>
          <Link to="/story" onClick={handleStoryClick} className="nav-link">THE STORY</Link>
          <Link to="/gallery" onClick={handleGalleryClick} className="nav-link">THE JOURNAL</Link>
          
          {/* Chapters Dropdown */}
          <div className="nav-dropdown-container">
            <span className="nav-link nav-link-dropdown" style={{ cursor: 'pointer' }}>
              THE CHAPTERS <span className="nav-dropdown-arrow">▼</span>
            </span>
            <div className="nav-dropdown-menu">
              <Link to="/chapters" className="nav-dropdown-item">Chapter 1</Link>
              <Link to="/retreats/movement" className="nav-dropdown-item">Movement</Link>
            </div>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <div className="nav-dropdown-container">
            <button className="theme-toggle" aria-label="Toggle font">
              <Type className="icon" size={20} />
            </button>
            <div className="nav-dropdown-menu font-dropdown-menu">
              <button onClick={() => handleFontChange('opensans')} className="nav-dropdown-item">Open Sans</button>
              <button onClick={() => handleFontChange('blackney')} className="nav-dropdown-item">Blackney</button>
              <button onClick={() => handleFontChange('inter')} className="nav-dropdown-item">Inter</button>
              <button onClick={() => handleFontChange('lato')} className="nav-dropdown-item">Lato</button>
              <button onClick={() => handleFontChange('sft')} className="nav-dropdown-item">SFT Schrifted Serif</button>
            </div>
          </div>

          <button
            id="theme-toggle-btn"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {renderThemeIcon()}
          </button>

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
            id="mobile-theme-toggle-btn"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {renderThemeIcon()}
          </button>
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
        <div className="mobile-drawer-links">
          <Link to="/" onClick={(e) => { handleNavClick(e, 'home'); closeMenu(); }} className="mobile-nav-link">HOME</Link>
          <Link to="/story" onClick={(e) => { handleStoryClick(e); closeMenu(); }} className="mobile-nav-link">THE STORY</Link>
          <Link to="/gallery" onClick={(e) => { handleGalleryClick(e); closeMenu(); }} className="mobile-nav-link">THE JOURNAL</Link>
          
          <div className="mobile-nav-dropdown-group">
            <button
              className="mobile-nav-link mobile-dropdown-toggle"
              onClick={toggleMobileExperiences}
            >
              THE CHAPTERS <span className={`nav-dropdown-arrow ${mobileExperiencesOpen ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`mobile-nav-sublinks ${mobileExperiencesOpen ? 'open' : ''}`}>
              <Link to="/chapters" onClick={closeMenu} className="mobile-nav-sublink">Chapter 1</Link>
              <Link to="/retreats/movement" onClick={closeMenu} className="mobile-nav-sublink">Movement</Link>
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
