import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import HeroDetails from './components/sections/HeroDetails';
import NetworksTicker from './components/sections/NetworksTicker';
import Features from './components/sections/Features';
import AppMockup from './components/sections/AppMockup';
import DualPortals from './components/sections/DualPortals';
import CountdownMilestones from './components/sections/CountdownMilestones';
import FaqSection from './components/sections/FaqSection';

import { useTheme } from './hooks/useTheme';

export default function App() {
  const { darkMode, setDarkMode, toggleTheme } = useTheme();

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 selection:bg-[#EF6156] selection:text-white relative ${darkMode ? 'dark bg-[#07090E] text-white' : 'bg-[#F5F3ED] text-[#061A1E]'}`}>

      {/* Editorial Navigation */}
      <Navbar 
        onOpenWaitlist={() => handleScrollToSection('partner')}
        onOpenPartner={() => handleScrollToSection('partner')}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Main Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <Hero darkMode={darkMode} />

        {/* Product details enter after the scroll driven hero */}
        <HeroDetails />

        {/* Connected Networks Marquee */}
        <NetworksTicker />

        {/* System Architecture Stepper */}
        <Features />

        {/* Live Interactive Client OS Terminal */}
        <AppMockup />

        {/* Dual Acquisition & CPO Onboarding Portals */}
        <DualPortals initialTab="driver" />

        {/* Deployment Milestones & Digital Architectural Countdown */}
        <CountdownMilestones />

        {/* FAQ Editorial Accordion */}
        <FaqSection />

        {/* Architectural Footer Capsule */}
        <Footer 
          onOpenWaitlist={() => handleScrollToSection('partner')}
          onOpenPartner={() => handleScrollToSection('partner')}
        />
      </main>

    </div>
  );
}
