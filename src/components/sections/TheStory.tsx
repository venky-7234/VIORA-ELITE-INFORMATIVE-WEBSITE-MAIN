import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './TheStory.css';

// Helper component for true parallax image placeholder with Viora Elite styling
const ParallaxImage = ({ className = '', imageSrc }: { className?: string, imageSrc?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [imageRatio, setImageRatio] = useState<number | undefined>();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax translation for the image inside the clipping mask - reduced for lazy scroll
  const y = useTransform(scrollYProgress, [0, 1], imageSrc ? ["0%", "0%"] : ["-3%", "3%"]);
  // Breathing scale down effect as you scroll down
  const scale = useTransform(scrollYProgress, [0, 1], imageSrc ? [1, 1] : [1.05, 1.0]);

  // Mask reveal on scroll (sliding open from bottom to top)
  const maskReveal: any = {
    hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`story-image-placeholder-wrapper${imageSrc ? ' has-source-image' : ''} ${className}`}
      style={imageSrc ? { aspectRatio: imageRatio ?? 1 } : undefined}
      variants={maskReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className={`parallax-inner${imageSrc ? ' has-image' : ''}`}
        style={{ y, scale }}
      >
        {imageSrc && (
          <img
            className="story-parallax-image"
            src={imageSrc}
            alt="Viora story"
            onLoad={(event) => {
              const image = event.currentTarget;
              setImageRatio(image.naturalWidth / image.naturalHeight);
            }}
          />
        )}
        <div className="parallax-overlay"></div>
        {!imageSrc && <div className="parallax-text">[ Image Placement ]</div>}
      </motion.div>
    </motion.div>
  );
};

// Word-by-word staggering text animation
const StaggeredText = ({ text, delay = 0, className = '' }: { text: string, delay?: number, className?: string }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay }
    }
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 16, stiffness: 100 }
    },
    hidden: {
      opacity: 0,
      y: 20,
    }
  };

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block" }}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

// Line reveal for Headings
const RevealHeading = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


export const TheStory: React.FC = () => {
  return (
    <div className="story-page-container">
      {/* The Central Canvas Card framing the whole page */}
      <div className="story-canvas-card">

        {/* Section 1: Intro */}
        <section className="story-intro-section" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div className="story-intro-right" style={{ padding: '2rem 0', alignItems: 'center' }}>
            <h1 className="intro-heading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <RevealHeading delay={0.1}>We Don't Host People.</RevealHeading>
              <RevealHeading delay={0.3}>We Curate Rooms.</RevealHeading>
            </h1>
          </div>
        </section>

        {/* Section 2: The Staggered Collage with Central Overlapping Card */}
        <section className="story-collage-section">
          <div className="collage-images-container">
            <div className="collage-img-left">
              <ParallaxImage imageSrc="https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/The+Story/bag_4_11zon.png" />
            </div>

            <div className="collage-img-right">
              <ParallaxImage imageSrc="https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/The+Story/invetation_8_11zon.png" />
            </div>

            {/* Absolute Centered Overlapping Card */}
            <div className="collage-center-card">
              <RevealHeading delay={0.2} className="collage-card-title">
                The Idea
              </RevealHeading>

              <StaggeredText
                delay={0.4}
                className="collage-card-text"
                text="Viora is a curated experience, created around exceptional company, distinctive settings and moments worth experiencing. Bringing together a carefully considered circle across private residences, unique spaces and unexpected destinations, each experience offers a more intimate perspective on how we gather, connect and discover. Shaped by the people, the place and the moment, every Viora is distinctly its own."
              />

              <StaggeredText
                delay={1.5}
                className="collage-card-highlight"
                text="Because the best experiences rarely need explaining."
              />
            </div>
          </div>
        </section>

        {/* Section 3: Asymmetric Flow (Text Left, Image Right) */}
        <section className="story-asymmetric-section">
          <div className="asym-text-col">
            <RevealHeading>
              <h2 className="story-list-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Viora Standard</h2>
            </RevealHeading>

            <StaggeredText
              delay={0.1}
              className="intro-paragraph"
              text="What defines a Viora experience"
            />

            <div className="story-list" style={{ marginTop: '2.5rem' }}>
              <div className="story-list-item">
                <RevealHeading delay={0.3} className="story-list-title">People</RevealHeading>
                <StaggeredText delay={0.4} className="story-list-desc" text="Good company, thoughtfully brought together." />
              </div>
              <div className="story-list-item">
                <RevealHeading delay={0.5} className="story-list-title">Place</RevealHeading>
                <StaggeredText delay={0.6} className="story-list-desc" text="Distinctive settings, chosen with purpose." />
              </div>
              <div className="story-list-item">
                <RevealHeading delay={0.7} className="story-list-title">Detail</RevealHeading>
                <StaggeredText delay={0.8} className="story-list-desc" text="The finer things are rarely accidental." />
              </div>
              <div className="story-list-item">
                <RevealHeading delay={0.9} className="story-list-title">Experience</RevealHeading>
                <StaggeredText delay={1.0} className="story-list-desc" text="Designed to linger long after it ends." />
              </div>
            </div>
          </div>

          <div className="asym-image-col">
            <div className="asym-inner-img">
              <ParallaxImage imageSrc="https://vioraelite.s3.eu-north-1.amazonaws.com/hero+section/Stock+Images/1adf848c-0569-47c6-9d33-d4b216fb57f1-50kb.jpeg" />
            </div>
          </div>
        </section>



        {/* Section 5 removed per user request */}

        {/* Section 6: Closing */}
        <section className="story-closing">
          <RevealHeading>
            <p>There is always more to discover.</p>
          </RevealHeading>
        </section>

      </div>
    </div>
  );
};
