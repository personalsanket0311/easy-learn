'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Logo {
  id: number;
  name: string;
  src: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  delay?: number;
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos, delay = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, delay);

    return () => clearInterval(interval);
  }, [logos.length, delay]);

  const currentLogo = logos[currentIndex];

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 80 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLogo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Image
            src={currentLogo.src}
            alt={currentLogo.name}
            width={140}
            height={40}
            className="img-fluid"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LogoCarousel;