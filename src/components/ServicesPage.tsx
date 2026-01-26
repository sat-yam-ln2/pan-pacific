import React, { useEffect } from 'react';
import { Services } from './Services';
import { Footer } from './Footer';

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Services />
      <Footer />
    </>
  );
}