'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css'; // Create this CSS file

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BookDemo from '../bookDemo/BookDemo';

const images = [
    // '/images/day.svg',
    '/images/1.svg',
    '/images/2.svg',
    '/images/3.svg',
    '/images/4.svg',
];

const HeroCarousel = () => {
  const [showDemo, setShowDemo] = React.useState(false);

  return (
    <div className="carousel-wrapper">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={true}
        className="full-width-swiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="carousel-image" useMap="#workmap" />
            <map name="workmap">
              <area shape="rect" coords="1258,521,1487,578" alt="Join Now" href="/courses" />
            </map>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Floating Button */}
      <div className="book-demo-btn " onClick={() => setShowDemo(true)}>
        <div className="book-demo-content">
          <div className="book-demo-big">Book a</div>
          <div className="book-demo-big">DEMO</div>
        </div>
      </div>

      {/* ✅ Move Modal Outside Swiper */}
      <BookDemo visible={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  );
};


export default HeroCarousel;
