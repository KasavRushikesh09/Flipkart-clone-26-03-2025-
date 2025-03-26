// src/components/HomePage.tsx
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import PromotionalCards from '../components/PromotionalCards';

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#f1f3f6] min-h-screen">
      <HeroBanner />
      <PromotionalCards />
    </div>
  );
};

export default HomePage;