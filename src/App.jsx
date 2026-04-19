import React, { useState, useEffect, useCallback } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

// Importing images from assets
import cityImg from './assets/3d_city.webp';
import droneImg from './assets/drone.webp';
import engineeringImg from './assets/engineering.webp';
import hydroImg from './assets/hydro.webp';
import gisImg from './assets/gis.webp';
import remoteImg from './assets/remote_sensing.webp';
import geodeticImg from './assets/geodetic_international boundary.webp';
import sectionalImg from './assets/sectional.webp';
import cadastralImg from './assets/cadastral.webp';
import consultancyImg from './assets/consultancy.webp';

const carouselItems = [
  {
    id: 1,
    image: cityImg,
    title: '3D City Mapping & Modeling',
    description: 'Advanced 3D city mapping and modeling for urban planning and digital twin creation.',
  },
  {
    id: 2,
    image: droneImg,
    title: 'Aerial Surveys/ Drone Mapping',
    description: 'Aerial surveys and drone mapping for high-precision topographic data collection.',
  },
  {
    id: 3,
    image: engineeringImg,
    title: 'Engineering Survey',
    description: 'Engineering surveys providing comprehensive, sustainable, and resilient solutions.',
  },
  {
    id: 4,
    image: hydroImg,
    title: 'Hydrographic Survey',
    description: 'Hydrographic surveys for detailed underwater mapping and water resource management.',
  },
  {
    id: 5,
    image: gisImg,
    title: 'GIS & Spatial Data Infrastructure',
    description: 'GIS & spatial data infrastructure services, processing, and visualization for informed decision making.',
  },
  {
    id: 6,
    image: remoteImg,
    title: 'Remote Sensing',
    description: 'Remote sensing and satellite imagery analysis for large-scale environmental monitoring.',
  },
  {
    id: 7,
    image: geodeticImg,
    title: 'Geodetic & International Boundary Surveys',
    description: 'Geodetic and international boundary surveys for accurate positioning and border delineation.',
  },
  {
    id: 8,
    image: sectionalImg,
    title: 'Sectional Property Surveys',
    description: 'Sectional property surveys for registration and property subdivision.',
  },
  {
    id: 9,
    image: cadastralImg,
    title: 'Cadastral Survey',
    description: 'Cadastral surveying for property boundary demarcation and land registration.',
  },
  {
    id: 10,
    image: consultancyImg,
    title: 'Survey Consultancy',
    description: 'Survey consultancy services offering expert advice in geospatial solution development.',
  },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.5 
      }
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, skewY: 7 },
    visible: { 
      opacity: 1, 
      y: 0, 
      skewY: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }
    }
  };

  return (
    <main className="carousel-container">
      {/* Progress Bar */}
      <Motion.div 
        key={`progress-${currentIndex}`}
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 10, ease: 'linear' }}
      />

      <AnimatePresence initial={false} custom={direction}>
        <Motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="carousel-slide"
        >
          <img 
            src={carouselItems[currentIndex].image} 
            alt={carouselItems[currentIndex].title} 
            className="carousel-image"
          />
          
          <div className="content-overlay">
            <Motion.div 
              className="carousel-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Motion.div id='title' variants={itemVariants}>
                {carouselItems[currentIndex].title}
              </Motion.div>
              <Motion.div id='description' variants={itemVariants}>
                {carouselItems[currentIndex].description}
              </Motion.div>
            </Motion.div>
          </div>
        </Motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="controls">
        <button className="control-btn" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button className="control-btn" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="indicators">
        {carouselItems.map((_, index) => (
          <div 
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
