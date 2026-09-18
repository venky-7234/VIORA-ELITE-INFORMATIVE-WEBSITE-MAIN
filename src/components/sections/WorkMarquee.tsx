import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import './WorkMarquee.css';

interface ParallaxRowProps {
  baseVelocity: number;
  items: string[];
  rowId: string;
}

const storyGalleryImages = [
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
];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxRow: React.FC<ParallaxRowProps> = ({ baseVelocity = 100, items, rowId }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Optional: Reverse direction when scrolling up
    // if (velocityFactor.get() < 0) {
    //   directionFactor.current = -1;
    // } else if (velocityFactor.get() > 0) {
    //   directionFactor.current = 1;
    // }

    // Add scroll velocity to the movement
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // The track is composed of two identical sets of items.
  // By shifting from 0% to -50% of the track's own width, 
  // we seamlessly loop the content.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div className="marquee-row">
      <motion.div className="marquee-track" style={{ x }}>
        {[...items, ...items].map((imageUrl, index) => (
          <div key={`${rowId}-${index}`} className="marquee-card">
            <img src={imageUrl} alt="Viora experience" className="marquee-image" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const WorkMarquee: React.FC = () => {
  const row1Cards = storyGalleryImages.slice(0, 6);
  const row2Cards = storyGalleryImages.slice(6);

  return (
    <section id="work" className="work-marquee-section">
      <div className="work-marquee-container">
        {/* Row 1: Moves Left (- velocity) */}
        <ParallaxRow baseVelocity={-3} items={row1Cards} rowId="row1" />
        {/* Row 2: Moves Right (+ velocity) */}
        <ParallaxRow baseVelocity={3} items={row2Cards} rowId="row2" />
      </div>
    </section>
  );
};
