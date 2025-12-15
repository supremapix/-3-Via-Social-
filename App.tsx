import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './components/LandingPage';
import MethodologyPage from './components/MethodologyPage';
import ManagementPanel from './components/ManagementPanel';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="antialiased">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/metodologia" element={<MethodologyPage />} />
            <Route path="/painel-gestao" element={<ManagementPanel />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
