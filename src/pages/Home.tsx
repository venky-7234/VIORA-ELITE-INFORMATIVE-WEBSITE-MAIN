import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Requirements } from '../components/sections/Requirements';
import { Lineage } from '../components/sections/Lineage';

export const Home: React.FC = () => {
  const handleScrollToApply = () => {
    const element = document.getElementById('apply-section') || document.querySelector('.footer');
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main>
      <Hero onApplyClick={handleScrollToApply} />
      <div className="content-wrapper">
        <Lineage />
        <Requirements />
      </div>
    </main>
  );
};
