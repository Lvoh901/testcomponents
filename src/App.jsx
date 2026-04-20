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
    image: consultancyImg,
    title: 'Survey Consultancy',
    description: 'Licensed Surveyors offer expert advice and consultancy in geospatial solution development.',
  },
  {
    id: 2,
    image: cadastralImg,
    title: 'Cadastral / Title Surveys',
    description: 'Licensed surveyors are responsible for cadastral surveying, including the accurate demarcation of property boundaries to support land registration. This ensures secure land tenure, reduces boundary disputes, and upholds the integrity of the national land administration system.',
  },
  {
    id: 3,
    image: sectionalImg,
    title: 'Sectional Property Surveys',
    description: 'Licensed Surveyors are responsible for Sectional property surveys for preparing sectional plans that define individual units within buildings for registration of Sectional Titles.',
  },
  {
    id: 4,
    image: geodeticImg,
    title: 'Geodetic Surveys',
    description: 'Licensed surveyors conduct geodetic surveys to establish and maintain precise national and global reference frameworks for spatial positioning. This includes control networks, GNSS/CORS systems, and geodetic datums such as Arc 1960 and KENREF, which support accurate mapping, land administration, and spatial data integration. In doing so, they assist the Director of Surveys in maintaining national geodetic standards and ensuring consistency in all survey and mapping activities across the country..',
  },
  {
    id: 5,
    image: engineeringImg,
    title: 'Engineering Survey',
    description: 'Licensed surveyors undertake engineering and construction surveys to support the planning, design, and execution of building and infrastructure projects.',
  },
  {
    id: 6,
    image: hydroImg,
    title: 'Hydrographic Survey',
    description: 'Licensed surveyors conduct detailed surveys of water bodies including oceans, seas, lakes, and rivers. This specialization is key to the management of marine resources and development of the blue economy and maritime infrastructure.',
  },
  {
    id: 7,
    image: droneImg,
    title: 'Aerial Surveys/ Drone Mapping',
    description: 'Licensed surveyors use drones and other aerial platforms to collect high-resolution spatial data across large, rugged, or hard-to-reach areas. Using photogrammetry, this data is processed to produce accurate orthophotos, digital elevation models (DEMs), digital surface models (DSMs), detailed 3D terrain models and precise volume calculations.',
  },
  {
    id: 8,
    image: cityImg,
    title: '3D City Mapping & Modeling',
    description: 'Licensed surveyors provide the high-accuracy spatial data needed to support urban planning and smart city development in Kenya. They produce detailed basemaps, 3D city models, and digital twins that guide zoning, land use planning, infrastructure design and efficient service delivery.',
  },
  {
    id: 9,
    image: gisImg,
    title: 'GIS & Spatial Data Infrastructure',
    description: 'Licensed surveyors develop and manage geospatial data using GIS, where accuracy is critical for land administration, urban planning, infrastructure, public safety, legal compliance, and economic decision-making. They support the country’s Spatial Data Infrastructure (SDI) by enabling data sharing and standardisation across government agencies and stakeholders, while designing geodatabases, ensuring data quality, and integrating cadastral, topographic, utility, and environmental survey datasets to support sustainable national and county development.',
  },
  {
    id: 10,
    image: remoteImg,
    title: 'Remote Sensing',
    description: 'Licensed surveyors use satellite imagery, aerial photography, and Earth observation data to monitor and analyse changes on the Earth’s surface. This supports land use and land cover mapping, environmental monitoring, disaster assessment, climate change studies and precision agriculture, including agri-geomatics applications for improved planning and resource management.',
  }
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

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
    <main 
      className={`carousel-container ${isPaused ? 'paused' : ''}`}
      onClick={togglePause}
    >
      {/* Progress Bar */}
      <AnimatePresence mode="wait">
        {!isPaused && (
          <Motion.div 
            key={`progress-${currentIndex}`}
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 10, ease: 'linear' }}
          />
        )}
      </AnimatePresence>

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
      <div className="controls" onClick={(e) => e.stopPropagation()}>
        <button className="control-btn" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button className="control-btn" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="indicators" onClick={(e) => e.stopPropagation()}>
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

      {/* Pause Overlay Indicator (Optional - subtle) */}
      <AnimatePresence>
        {isPaused && (
          <Motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="pause-indicator"
          >
            Paused
          </Motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;
