import React from 'react';
import { TheStory } from '../../components/sections/TheStory';
import { WorkMarquee } from '../../components/sections/WorkMarquee';

export const StoryPage: React.FC = () => {
  return (
    <main>
      <div className="content-wrapper" style={{ paddingTop: '80px' }}>
        <TheStory />
        <WorkMarquee />
      </div>
    </main>
  );
};
