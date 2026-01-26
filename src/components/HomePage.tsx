import React from 'react';
import { Hero } from './Hero';
import { GlobalReach } from './GlobalReach';
import { ServicesPreview } from './ServicesPreview';
import { Footer } from './Footer';

export function HomePage() {
  return (
    <>
      <Hero />
      <GlobalReach />
      <ServicesPreview />
      <Footer />
    </>
  );
}