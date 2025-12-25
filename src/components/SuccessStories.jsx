import React from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations';
import './SuccessStories.css';

const SuccessStories = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="success-stories-section" id="planning">
      <div className="container">
        <div className="stories-content">
          <div className="stories-text">
            <h2>{t.planning.title}</h2>
            <p className="stories-description">{t.planning.subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
