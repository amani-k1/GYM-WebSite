import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './HomeAbout.css';

const HomeAbout = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="home-about" id="home-about">
      <div className="home-about__container">
        <div className="home-about__text">
          <h2 className="home-about__title">{language === 'fr' ? 'À propos de Peak Time Gym' : 'About Peak Time Gym'}</h2>
          <p className="home-about__paragraph">{t.about.aboutText}</p>
          <h3 className="home-about__subtitle">{t.about.missionTitle}</h3>
          <p className="home-about__paragraph">{t.about.missionText}</p>
        </div>
        <div className="home-about__image">
          <img src="/mahdi.png" alt="Coach at Peak Time Gym" />
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
