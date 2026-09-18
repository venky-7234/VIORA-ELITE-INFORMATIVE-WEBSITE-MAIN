import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/common/GlassCard';
import './GalleryPage.css';

const oddCardImageUrls = [
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/10.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/100.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/16.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/17.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/19.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/2.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/21.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/24.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/25.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/26.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/35.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/4.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/92.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/45.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/48.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/5.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/49.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/51.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/54.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/57.webp',
];

const evenCardImageUrls = [
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/0a48ab28-28fb-442d-ba6e-de94a1a2fb0a-50kb.jpeg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/1adf848c-0569-47c6-9d33-d4b216fb57f1-50kb.jpeg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/365b9ea7-2283-43a5-a57f-1134cc65d16f-50kb.jpeg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/6d699960-ca5d-4d88-a438-8d61683a5899-50kb.jpg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/7182a6436d1ad2d59b9b3b7adec59ba4-50kb.jpg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/844a2f5fe628fb6e6e5e9f5672615b6d-50kb.jpg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/a0541f07-fa22-4946-bfb9-8b5ec99cb7ab-50kb.jpeg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/ac4220dd-1318-418f-9f59-98a7ac66fb09-50kb.jpg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/image_1-50kb.jpeg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/men+and+wonem-50kb.jpeg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/news+paper+post-50kb.jpeg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/piona-50kb.jpeg',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/62.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/63.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/66.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/67.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/7.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/84.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/85.webp',
  'https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Viora+Elite_Images/87.webp',
];

const imageUrls = Array.from({ length: 40 }, (_, index) => {
  const imageIndex = Math.floor(index / 2);
  return index % 2 === 0
    ? oddCardImageUrls[imageIndex] ?? ''
    : evenCardImageUrls[imageIndex] ?? '';
});

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
const showCardNumbers = false;

export const GalleryPage: React.FC = () => {
  const [columns, setColumns] = useState(7);
  const [imageRatios, setImageRatios] = useState<Record<number, number>>({});

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
  const columnHeights = Array.from({ length: columns }, () => 0);

  galleryImages.forEach((img) => {
    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
    const fallbackRatio = img.aspect === 'landscape' ? 4 / 3 : img.aspect === 'portrait' ? 4 / 5 : 1;
    const ratio = imageRatios[img.id] ?? fallbackRatio;

    columnData[shortestColumn].push(img);
    columnHeights[shortestColumn] += (1 / ratio) + 0.08;
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
                    <motion.div
                      key={img.id}
                      className="masonry-item"
                      style={{ perspective: '2000px' }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.01, margin: "0px 0px 300px 0px" }}
                    >
                      <motion.div
                        className="masonry-card-wrapper"
                        variants={{
                          hidden: { opacity: 0, rotateX, rotateY, rotateZ, y: yOffset, z: zOffset, scale: 0.8 },
                          visible: { opacity: 1, rotateX: 0, rotateY: 0, rotateZ: 0, y: 0, z: 0, scale: 1 }
                        }}
                        transition={{ 
                          duration: 1.2, 
                          ease: [0.22, 1, 0.36, 1],
                          delay: (index % 4) * 0.1 
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <GlassCard className="masonry-card" glow={false} hoverEffect={true}>
                          <div className={`masonry-image-wrapper aspect-${img.aspect}${img.url ? ' has-image' : ' is-empty'}`} style={{ position: 'relative' }}>
                            {img.url && (
                              <img
                                src={img.url}
                                alt={`Gallery image ${img.id}`}
                                className="masonry-img"
                                loading="lazy"
                                onLoad={(event) => {
                                  const image = event.currentTarget;
                                  const ratio = image.naturalWidth / image.naturalHeight;
                                  setImageRatios((current) =>
                                    current[img.id] === ratio ? current : { ...current, [img.id]: ratio }
                                  );
                                }}
                              />
                            )}
                            {!img.url && (
                              <span className="masonry-empty-label">Image coming soon</span>
                            )}
                            {showCardNumbers && (
                              <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', zIndex: 10 }}>#{img.id}</div>
                            )}
                          </div>
                        </GlassCard>
                      </motion.div>
                    </motion.div>
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
