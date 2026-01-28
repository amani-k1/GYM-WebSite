import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './Pricing.css';

const Pricing = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [billingType, setBillingType] = useState('monthly');

  const plans = [
    {
      title: t.pricing.plans.musculation.title,
      price: "45",
      originalPrice: "60",
      duration: t.pricing.duration,
      features: t.pricing.plans.musculation.features
    },
    {
      title: t.pricing.plans.musculationCardio.title,
      price: "55",
      originalPrice: "70",
      duration: t.pricing.duration,
      features: t.pricing.plans.musculationCardio.features,
      popular: true
    },
    {
      title: t.pricing.plans.morningMusculation.title,
      subtitle: t.pricing.plans.morningMusculation.subtitle,
      price: "40",
      originalPrice: "50",
      duration: t.pricing.duration,
      features: t.pricing.plans.morningMusculation.features
    }
  ];

  return (
    <section className="pricing-section reveal" id='pricing'>
      <div className="container">
        {/* Header Section - AU-DESSUS des cadres */}
        <div className="pricing-header">
          <h2>{t.pricing.title}</h2>
          <p className="pricing-subtitle">
            {t.pricing.subtitle}
          </p>
          
          <div className="billing-toggle">
            <button 
              className={billingType === 'monthly' ? 'active' : ''}
              onClick={() => setBillingType('monthly')}
            >
              {t.pricing.monthly}
            </button>
            <button 
              className={billingType === 'yearly' ? 'active' : ''}
              onClick={() => setBillingType('yearly')}
            >
              {t.pricing.yearly}
            </button>
          </div>
        </div>

        {/* 4 Pricing Cards - EN DESSOUS du header */}
        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card reveal ${plan.popular ? 'popular' : ''}`} style={{ transitionDelay: `${index * 120}ms` }}>
              {plan.popular && <div className="popular-badge">{t.pricing.mostPopular}</div>}
              
              <div className="card-content">
                <div className="card-header">
                  <h3>{plan.title}</h3>
                  {plan.subtitle && <p className="card-subtitle">{plan.subtitle}</p>}
                </div>

                <div className="price-section">
                  <div className="price-main">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-currency">DT</span>
                  </div>
                  <div className="price-comparison">
                    <span className="original-price">{t.pricing.insteadOf} {plan.originalPrice} DT</span>
                  </div>
                  <p className="price-duration">{plan.duration}</p>
                </div>

                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="card-footer">
                  <p className="registration-info">{t.pricing.registrationFee}</p>
                  <button
                    className="get-started-btn"
                    onClick={() => window.open(`https://wa.me/${t.contact.phoneValue.replace(/\D/g, '')}`, '_blank')}
                  >
                    {t.pricing.getStarted}
                  </button>
                  <p className="offer-note">{t.pricing.offerNote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
