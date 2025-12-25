import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations';
import './Choose.css';
import initRevealOnScroll from '../hooks/useRevealOnScroll';

const Choose = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Appeler le hook au niveau racine du composant
  useEffect(() => { initRevealOnScroll(); }, []);

  return (
    <div className="choose-container reveal">
      <div className="choose-image">
        <img src="/img2.png" alt="People working out in a gym" loading="lazy" decoding="async" />
      </div>
      <div className="choose-content">
        <h1>{t.choose.title}</h1>
        <p>{t.choose.subtitle}</p>
        <div className="benefits">
          <div className="benefit">
            <span className="checkmark">✓</span>
            <h3>{t.choose.expertTrainers.title}</h3>
            <p>{t.choose.expertTrainers.description}</p>
          </div>
          <div className="benefit">
            <span className="checkmark">✓</span>
            <h3>{t.choose.equipment.title}</h3>
            <p>{t.choose.equipment.description}</p>
          </div>
          <div className="benefit">
            <span className="checkmark">✓</span>
            <h3>{t.choose.programs.title}</h3>
            <p>{t.choose.programs.description}</p>
          </div>
        </div>
        <button className="cta-button">{t.choose.freeTrial}</button>
      </div>
    </div>
  );
};

export default Choose;
