import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations';
import './Services.css';
import initRevealOnScroll from '../hooks/useRevealOnScroll';

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Appeler le hook au niveau racine du composant
  useEffect(() => { initRevealOnScroll(); }, []);

  const services = [
    {
      title: t.services.personalTraining.title,
      image: "/coach.jpg",
      description: t.services.personalTraining.description,
      learnMore: t.services.personalTraining.learnMore
    },
    {
      title: t.services.groupFitness.title,
      image: "/group.jpg",
      description: t.services.groupFitness.description,
      learnMore: t.services.groupFitness.learnMore
    },
    {
      title: t.services.nutrition.title,
      image: "/nutrition.webp",
      description: t.services.nutrition.description,
      learnMore: t.services.nutrition.learnMore
    },
    {
      title: t.services.wellness.title,
      image: "/welness.jpg",
      description: t.services.wellness.description,
      learnMore: t.services.wellness.learnMore
    },
    {
      title: t.services.cardio.title,
      image: "/cardio.avif",
      description: t.services.cardio.description,
      learnMore: t.services.cardio.learnMore
    },
    {
      title: t.services.strength.title,
      image: "/strenght.avif",
      description: t.services.strength.description,
      learnMore: t.services.strength.learnMore
    }
  ];

  return (
    <section className="services-section reveal" id='services'>
      <h1>{t.services.title}</h1>
      <p className="subtitle">{t.services.subtitle}</p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card reveal" style={{ transitionDelay: `${index * 120}ms` }}>
            <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
            <h3>{service.title}</h3>
            
            <div className="learn-more-container">
              {/* DESCRIPTION CACHÉE - apparaît entre le titre et le bouton */}
              <div className="hidden-description">
                {service.description}
              </div>
              
              <button className="learn-more-btn">
                {t.services.learnMore}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
