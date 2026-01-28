import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './Gallery.css';

const Gallery = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideInterval = useRef(null);

  // Import all images from assets folder
  // Using import.meta.glob to dynamically load images
  const imagesGlob = import.meta.glob('../assets/*.{jpeg,jpg,png,webp,avif}', { eager: true });
  
  // Convert object to array of values (modules) and get the default export (the image path)
  // Filter out logo.png if desired, but user said "all images"
  const images = Object.values(imagesGlob).map(module => module.default).filter(path => {
    // Optional: filter out specific non-gallery images like logos/icons if needed
    // For now, keeping everything that looks like a photo
    return !path.includes('logo') && !path.includes('react') && !path.includes('vite');
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Pause auto-slide briefly when manually interacting
    resetTimer();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.log(`Error attempting to enable fullscreen: ${e.message}`);
        // Fallback to CSS fullscreen if API fails
        setIsFullscreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
      setIsFullscreen(false);
    }
  };

  // Handle Fullscreen API change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isPlaying]);

  const startTimer = () => {
    stopTimer();
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds per slide
  };

  const stopTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    if (isPlaying) {
      startTimer();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        resetTimer();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        resetTimer();
      } else if (e.key === 'Escape') {
        if (isFullscreen) toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  if (images.length === 0) {
    return <div className="gallery-page"><div className="container">No images found.</div></div>;
  }

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <div className="gallery-header">
          <h1>{t.gallery?.title || "Galerie Photos"}</h1>
          <p>{t.gallery?.subtitle || "Découvrez notre espace et notre ambiance"}</p>
        </div>

        {/* Main Slideshow */}
        <div className={`slideshow-container ${isFullscreen ? 'fullscreen' : ''}`}>
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={img} alt={`Gallery slide ${index + 1}`} loading="lazy" />
            </div>
          ))}

          {/* Controls */}
          <button className="control-btn prev-btn" onClick={prevSlide} aria-label="Previous Slide">
            &#10094;
          </button>
          <button className="control-btn next-btn" onClick={nextSlide} aria-label="Next Slide">
            &#10095;
          </button>
          
          <button className="fullscreen-btn" onClick={toggleFullscreen} aria-label="Toggle Fullscreen">
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>

          {/* Indicators */}
          <div className="indicators">
            {images.map((_, index) => (
              <span 
                key={index} 
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        {!isFullscreen && (
          <div className="thumbnails-grid">
            {images.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
