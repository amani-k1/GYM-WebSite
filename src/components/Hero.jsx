import React, { useEffect } from "react";
import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../translations";
import "./Hero.css";
import initRevealOnScroll from '../hooks/useRevealOnScroll';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => { initRevealOnScroll(); }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <div className="hero-content reveal" style={{ transitionDelay: '60ms' }}>
          <h1>
            {language === 'fr' ? (
              <>
                TRANSFORMEZ <br />
                VOTRE VIE <br />
                AVEC <span>PEAK TIME</span> <br />
                GYM
              </>
            ) : (
              <>
                TRANSFORM <br />
                YOUR LIFE <br />
                WITH <span>PEAK TIME</span> <br />
                GYM
              </>
            )}
          </h1>

          <p>
            {t.hero.subtitle}
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">{t.hero.getStarted}</button>
            <button className="btn-secondary">
              <span className="play-icon">▶</span> {t.hero.watchDemo}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
