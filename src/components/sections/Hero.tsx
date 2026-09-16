import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../common/Button';
import { AnimatedVioraLogo } from './AnimatedVioraLogo';
import './Hero.css';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroProps {
  onApplyClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  const { scrollY } = useScroll();

  // The bird sits on top of the "O" (which is index 2 in VIORA).
  // We'll give it the same scroll start as the "O" (2 * 40 = 80).
  const birdStart = 80;
  const birdY = useTransform(scrollY, [birdStart, birdStart + 250], [0, -350]);
  const birdOpacity = useTransform(scrollY, [birdStart, birdStart + 150, birdStart + 250], [1, 1, 0]);

  return (
    <header id="hero" className="hero-section">
      <div className="container hero-container-centered">

        {/* Logo block */}
        <motion.div
          className="hero-logo-hero"
          aria-label="Viora Elite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.3 }}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.img
            src="/media/icons/spin-icon.svg"
            alt="Viora Elite Icon"
            style={{
              y: birdY,
              opacity: birdOpacity,
              position: 'absolute',
              top: '-20%',
              left: '50%',
              x: '-50%', // use Framer Motion's x instead of transform: translateX
              width: 'clamp(70px, 10vw, 120px)',
              height: 'auto',
              filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.2))',
              zIndex: 0
            }}
          />

          <AnimatedVioraLogo
            scrollY={scrollY}
            className="hero-logo-bird"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="hero-tagline-chosen"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.35 }}
        >
          ✦ THE CHOOSEN ✦
        </motion.p>

        {/* CTA buttons — scale + fade last */}
        <motion.div
          className="hero-centered-buttons"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: EASE_OUT, delay: 1.6 }}
        >
          <Button id="hero-apply-btn" variant="primary" size="md" glow onClick={onApplyClick}>
            Request Invitation
          </Button>
        </motion.div>

      </div>
    </header>
  );
};
