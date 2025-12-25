import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './About.css';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <h1>{t.about.heroTitle}</h1>
          <p>{t.about.heroSubtitle}</p>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>{t.about.aboutTitle}</h2>
              <p>{t.about.aboutText}</p>
              
              <h3>{t.about.missionTitle}</h3>
              <p>{t.about.missionText}</p>
            </div>
            <div className="about-image">
              <img src="/strenght.avif" alt="Peak Time Gym Training" />
            </div>
          </div>
        </div>
      </div>


      {/* Location Section */}
      <div className="location-section">
        <div className="container">
          <h2>{t.about.locationTitle}</h2>
          <p className="section-subtitle">{t.about.locationSubtitle}</p>
          
          <div className="location-content">
            <div className="address-info">
              <h3>{t.about.address}</h3>
              <p className="studio-name">{t.about.studioName}</p>
              <p>{t.about.addressLine1}</p>
              <p>{t.about.addressLine2}</p>
              <button className="view-map-btn">{t.about.viewMap}</button>
            </div>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
