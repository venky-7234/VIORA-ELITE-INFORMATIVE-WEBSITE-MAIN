import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/common/GlassCard';
import './GalleryPage.css';

const imageUrls = Array(40).fill("");

const generateCards = () => {
  const aspects = ['landscape', 'portrait', 'square', 'portrait', 'landscape', 'square', 'landscape'];
  
  return imageUrls.map((url, i) => {
    const aspect = aspects[(i * 3 + (i % 5)) % aspects.length]; 
    return {
      id: i + 1,
      aspect: aspect,
      url: url
    };
  });
};

const galleryImages = generateCards();

export const GalleryPage: React.FC = () => {
  const [columns, setColumns] = useState(7);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth <= 640) setColumns(3);
      else if (window.innerWidth <= 1024) setColumns(4);
      else if (window.innerWidth <= 1280) setColumns(5);
      else setColumns(7);
    };
    
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columnData: typeof galleryImages[] = Array.from({ length: columns }, () => []);
  galleryImages.forEach((img, i) => {
    columnData[i % columns].push(img);
  });

  return (
    <div className="gallery-page-container">
      {/* Header */}
      <section className="gallery-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="gallery-page-title">Experiences,</h1>
            <p className="gallery-page-subtitle" style={{ fontFamily: 'var(--font-cursive)', color: 'var(--accent-color)', fontSize: '2.5rem', textTransform: 'lowercase', marginTop: '-0.5rem', letterSpacing: '0.05em' }}>thoughtfully brought together</p>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="gallery-masonry-section">
        <div className="container-fluid">
          <div className="masonry-grid">
            {columnData.map((col, colIndex) => (
              <div key={colIndex} className="masonry-column">
                {col.map((img) => {
                  const index = galleryImages.indexOf(img);
                  // Create a chaotic 3D starting state based on index
                  const rotateZ = index % 2 === 0 ? 25 : -25;
                  const rotateY = index % 3 === 0 ? 30 : (index % 3 === 1 ? -30 : 0);
                  const rotateX = -70; // tilted heavily backward
                  const yOffset = 250; // comes from much lower
                  const zOffset = 200;

                  return (
                    <div key={img.id} className="masonry-item" style={{ perspective: '2000px' }}>
                      <motion.div
                        className="masonry-card-wrapper"
                        initial={{ opacity: 0, rotateX, rotateY, rotateZ, y: yOffset, z: zOffset, scale: 0.8 }}
                        whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0, y: 0, z: 0, scale: 1 }}
                        viewport={{ once: true, margin: "100px" }}
                        transition={{ 
                          duration: 1.2, 
                          ease: [0.22, 1, 0.36, 1],
                          delay: (index % 4) * 0.1 
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <GlassCard className="masonry-card" glow={false} hoverEffect={true}>
                          <div className={`masonry-image-wrapper aspect-${img.aspect}`} style={{ position: 'relative' }}>
                            <img src={img.url} alt={`Gallery image ${img.id}`} className="masonry-img" loading="lazy" />
                            <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', zIndex: 10 }}>#{img.id}</div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
