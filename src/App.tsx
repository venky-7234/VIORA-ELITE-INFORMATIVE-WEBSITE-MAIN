import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { RootLayout } from './components/layout/RootLayout';
import { Home } from './pages/Home';
import { StoryPage } from './pages/Story/StoryPage';
import { Movement } from './pages/Retreats/Movement';
import { Chapters } from './pages/Retreats/Chapters';
import { GalleryPage } from './pages/Gallery/GalleryPage';
import { EditionsPage } from './pages/Editions/EditionsPage';
import { InvitationPage } from './pages/Invitation/InvitationPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main website layout */}
        <Route element={<RootLayout />}>

          {/* Landing page */}
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/story"
            element={<StoryPage />}
          />

          <Route
            path="/retreats/movement"
            element={<Movement />}
          />

          <Route
            path="/chapters"
            element={<Chapters />}
          />

          <Route
            path="/retreats/wellness"
            element={<Chapters />}
          />

          <Route
            path="/gallery"
            element={<GalleryPage />}
          />

          <Route
            path="/editions"
            element={<EditionsPage />}
          />

          <Route
            path="/invitations"
            element={<InvitationPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;