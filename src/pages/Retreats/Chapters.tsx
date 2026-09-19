import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './Chapters.css';

const chaptersData = [
  {
    id: 1,
    edition: 'Edition 1',
    title: 'Founders',
    desc: 'Exclusive gatherings connecting visionary leaders and creators. Forge meaningful relationships in an environment designed for innovators.',
    longDesc: 'Join an elite group of visionaries and industry pioneers for an exclusive gathering designed to foster deep connections. Set against the breathtaking backdrop of Kerala, this edition blends high-level networking with serene relaxation. Experience masterclasses, private dinners, and collaborative sessions that will elevate your perspective and refine your vision.',
    quote: 'True innovation thrives in the spaces between focus and freedom.',
    gallery: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80'
    ],
    img: 'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/The+Story/Profile_images_BG_9_11zon.png'
  },
  {
    id: 2,
    edition: 'Edition 2',
    title: 'Collectors',
    desc: 'Curated experiences for connoisseurs of fine art, rare artifacts, and timeless luxury. Discover and acquire the extraordinary.',
    longDesc: 'Immerse yourself in the world of high art and exclusive curation. The Collectors edition brings together aficionados of rare artifacts, contemporary masterpieces, and timeless luxury. Enjoy private gallery viewings, artist meet-and-greets, and curated auctions in the culturally rich setting of Kyoto.',
    quote: 'Art is not what you see, but what you make others see.',
    gallery: [
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80'
    ],
    img: 'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/21.webp'
  },
  {
    id: 3,
    edition: 'Edition 3',
    title: 'Dating',
    desc: 'An elite matchmaking experience prioritizing genuine connections. Meet like-minded individuals in breathtaking, romantic settings.',
    longDesc: 'Redefine romance with our curated elite dating retreat. Designed for successful, driven individuals seeking genuine connection, this edition strips away the noise of modern dating. Engage in thoughtfully curated activities, intimate dinners, and natural encounters amidst the breathtaking beauty of Bali.',
    quote: 'Connection is the energy that exists between people when they feel seen, heard, and valued.',
    gallery: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?auto=format&fit=crop&q=80'
    ],
    img: 'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/The+Story/1434bf17-e2b9-4dd7-8025-8e721fd99e0d_2_11zon.png'
  },
  {
    id: 4,
    edition: 'Edition 4',
    title: 'Viora for Women',
    desc: 'A sanctuary dedicated to female empowerment and rejuvenation. Connect, grow, and unwind with an inspiring community of women.',
    longDesc: 'A powerful gathering dedicated exclusively to women. This retreat focuses on holistic wellness, leadership empowerment, and profound relaxation. Through expert-led workshops, luxurious spa treatments, and deep conversational circles in Tuscany, you will leave feeling rejuvenated and deeply connected to a powerful sisterhood.',
    quote: 'Here\'s to strong women: May we know them, may we be them, may we raise them.',
    gallery: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80'
    ],
    img: 'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/94.webp'
  },
  {
    id: 5,
    edition: 'Edition 5',
    title: 'Viora for Men',
    desc: 'Tailored retreats focusing on leadership, wellness, and adventure. Strengthen your mind and body alongside driven peers.',
    longDesc: 'Designed for the modern gentleman, this retreat balances high-octane adventure with strategic reflection. Venture into the wild landscapes of Patagonia while engaging in leadership masterminds, physical challenges, and evening fireside discussions over fine cigars and rare whiskey.',
    quote: 'Strength does not come from physical capacity. It comes from an indomitable will.',
    gallery: [
      'https://images.unsplash.com/photo-1506804886640-20a221f7e025?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530887376624-9b5522e84126?auto=format&fit=crop&q=80'
    ],
    img: 'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/0a48ab28-28fb-442d-ba6e-de94a1a2fb0a-50kb.jpeg'
  }
];

export const Chapters: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeChapter = chaptersData[activeIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    const mediaQuery = window.matchMedia('(max-width: 900px)');
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize();
    
    // Support modern and legacy event listeners
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleResize);
      return () => mediaQuery.removeEventListener('change', handleResize);
    } else {
      mediaQuery.addListener(handleResize);
      return () => mediaQuery.removeListener(handleResize);
    }
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % chaptersData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + chaptersData.length) % chaptersData.length);
  };

  const openDetails = () => {
    setIsDetailsOpen(true);
  };

  const handleRequestInvite = () => {
    navigate('/apply');
  };

  return (
    <div className="chapters-page">
      <AnimatePresence>
        <motion.div 
          key={`bg-${activeChapter.id}`}
          className="chapters-master-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ backgroundImage: `url(${activeChapter.img})` }}
        />
      </AnimatePresence>

      <div className="chapters-content-wrapper">
        
        {/* Left Information Panel */}
        <div className="chapters-info-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeChapter.id}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              className="chapters-info-content"
            >
              <h3 className="chapters-edition-label">{activeChapter.edition}</h3>
              <h1 className="chapters-hero-title">{activeChapter.title}</h1>
              <p className="chapters-hero-desc">{activeChapter.desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="chapters-nav-arrows">
            <button className="nav-arrow" onClick={handlePrev}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="nav-arrow" onClick={handleNext}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Carousel Panel */}
        <div className="chapters-carousel-panel">
          <div className="carousel-track">
            {chaptersData.map((chapter, index) => {
              // Calculate relative position to handle infinite-style visual looping
              let offset = index - activeIndex;
              if (offset < 0) offset += chaptersData.length;
              
              // Only show the active card and the next few cards
              if (isMobile && offset !== 0) return null;
              if (!isMobile && offset > 3 && offset !== chaptersData.length - 1) return null;

              return (
                <motion.div 
                  key={chapter.id}
                  className={`carousel-card ${offset === 0 ? 'active' : ''}`}
                  onClick={() => {
                    if (offset === 0) {
                      openDetails();
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  layout
                  drag={isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, { offset }) => {
                    const swipe = offset.x;
                    if (swipe < -50) {
                      handleNext();
                    } else if (swipe > 50) {
                      handlePrev();
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: offset === 0 ? 1.05 : 1,
                    x: offset * 220, // Slide them horizontally
                    zIndex: chaptersData.length - offset
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ backgroundImage: `url(${chapter.img})` }}
                >
                  <div className="carousel-card-overlay">
                    <h3 className="carousel-card-title">{chapter.edition} : {chapter.title}</h3>
                  </div>
                  {offset === 0 && (
                    <button 
                      className="chapters-explore-btn active-card-explore" 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }} 
                      aria-label="Next Edition"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Pagination Dots */}
          {isMobile && (
            <motion.div 
              className="chapters-pagination"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, { offset }) => {
                const swipe = offset.x;
                if (swipe < -30) handleNext();
                else if (swipe > 30) handlePrev();
              }}
            >
              {chaptersData.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`pagination-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </motion.div>
          )}

          {/* Mobile Request Invite Button under the dots */}
          {isMobile && !isDetailsOpen && (
            <div className="mobile-cta-wrapper">
              <button className="floating-cta-btn pill-shape" onClick={handleRequestInvite}>Request Invite</button>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isDetailsOpen && (
            <motion.div 
              className="edition-details-modal"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <button className="modal-close-btn" onClick={() => setIsDetailsOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="modal-content-scroll" data-lenis-prevent>
                <div className="modal-clean-layout">
                  <div className="modal-clean-text">
                    <span className="modal-edition-label">{activeChapter.edition}</span>
                    <h1 className="modal-title-clean">{activeChapter.title}</h1>
                    <div className="modal-clean-visuals mobile-only">
                      <div className="modal-image-card">
                        <img src={activeChapter.img} alt={activeChapter.title} className="modal-main-image" />
                      </div>
                    </div>

                    <div className="modal-desc-container">
                      <h3 className="modal-section-title">The Experience</h3>
                      <p className="modal-desc-text">{activeChapter.longDesc}</p>
                      
                      {activeChapter.quote && (
                        <blockquote className="modal-quote">
                          "{activeChapter.quote}"
                        </blockquote>
                      )}
                    </div>
                  </div>

                  <div className="modal-clean-visuals desktop-only">
                    <div className="modal-image-card">
                      <img src={activeChapter.img} alt={activeChapter.title} className="modal-main-image" />
                    </div>
                  </div>
                </div>

                <div className="cta-button-container">
                  <button className="floating-cta-btn" onClick={handleRequestInvite}>Request Invite</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
