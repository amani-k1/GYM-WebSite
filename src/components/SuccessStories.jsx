import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './SuccessStories.css';

const SuccessStories = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="success-stories-section">
      <div className="container">
        <div className="stories-content">
          <div className="stories-text">
            <h2>{t.successStories.title}</h2>
            <p className="stories-description">
              {t.successStories.description}
            </p>
            <button className="join-today-btn">{t.successStories.joinToday}</button>
          </div>

          <div className="stories-images">
            {/* Grande image centrale */}
            <div className="main-image-container">
              <img src="/img2.png" alt="Success Story 3" />
            </div>

            {/* Petite image en haut à droite */}
            <div className="top-right-image-container">
              <img src="/group.jpg" alt="Success Story 2" />
            </div>

            {/* Petite image en bas à gauche */}
            <div className="bottom-left-image-container">
              <img src="/service4.jpg" alt="Success Story 1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
