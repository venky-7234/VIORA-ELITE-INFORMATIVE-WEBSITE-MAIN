import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Requirements } from '../components/sections/Requirements';
import { Lineage } from '../components/sections/Lineage';

import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/apply');
  };

  return (
    <main>
      <Hero onApplyClick={handleApplyClick} />
      <div className="content-wrapper">
        <Requirements />
        <Lineage />
      </div>
    </main>
  );
};
