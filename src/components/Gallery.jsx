import React from 'react';
import { useLanguage } from '../contexts/useLanguage';

const Gallery = () => {
  const { language } = useLanguage();

  const images = [
    { src: '/sallesport1.jpg', alt: 'Salle de sport' },
    { src: '/group.jpg', alt: 'Cours en groupe' },
    { src: '/coach.jpg', alt: 'Coach' },
    { src: '/service4.jpg', alt: 'Service' },
    { src: '/cardio.avif', alt: 'Cardio' },
    { src: '/strenght.avif', alt: 'Musculation' },
  ];

  return (
    <section className="gallery-page">
      <div className="container">
        <h1>{language === 'fr' ? 'Galerie' : 'Gallery'}</h1>
        <p>{language === 'fr' ? 'Découvrez nos espaces et activités.' : 'Explore our spaces and activities.'}</p>
        <div className="gallery-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          {images.map((img, idx) => (
            <div key={idx} className="gallery-item" style={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <img src={img.src} alt={img.alt} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
