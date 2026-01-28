import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import "./Hero.css";
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => { useRevealOnScroll(); }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <div className="hero-content reveal" style={{ transitionDelay: '60ms' }}>
          <h1 className="logo-text">
            PEAK TIME<span className="gym-highlight">Gym</span>
          </h1>
          <h2 className="main-title">{t.hero.title}</h2>
          <p className="subtitle">{t.hero.subtitle}</p>

          <div className="hero-buttons">
            <Link to="/gallery" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>{t.hero.getStarted}</Link>
            <a 
              href="https://wa.me/21625300230" 
              className="btn-primary" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              {t.hero.watchDemo}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
