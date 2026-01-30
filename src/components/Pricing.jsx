import React, { useEffect } from 'react';
import './Pricing.css';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const Pricing = () => {
  const courses = [
    {
      badge: 'Mixte',
      name: 'Cours Mixte',
      coach: 'Coach',
      price: '55 DT',
      unit: '/ séance',
      chips: ['Lundi 19h00', 'Mercredi 19h00', 'Vendredi 19h00'],
      backLimit: 'Plan flexible selon disponibilité',
      backChips: ['Séance', 'Groupe']
    },
    {
      badge: 'Femmes',
      name: 'Spéciale Femme',
      coach: 'Coach Sahar',
      price: '50 DT',
      unit: '/ séance',
      chips: ['Mardi 09h00', 'Mercredi 09h00', 'Samedi 10h30', 'Lundi 18h00', 'Mercredi 18h00'],
      backLimit: 'Maximum 3 séances/semaine',
      backChips: ['Séance', 'Groupe']
    },
    {
      badge: 'Femmes',
      name: 'Spéciale Femme',
      coach: 'Coach Wala',
      price: '50 DT',
      unit: '/ séance',
      chips: ['Mardi 17h30', 'Jeudi 18h00', 'Samedi 15h00'],
      backLimit: 'Maximum 3 séances/semaine',
      backChips: ['Séance', 'Groupe']
    },
    {
      badge: 'Bac Sport',
      name: 'Bac Sport',
      coach: 'Coach Rawaa',
      price: '50 DT',
      unit: '/ séance',
      chips: ['Vendredi 17h30', 'Dimanche 13h00'],
      backLimit: 'Séance unitaire 10 DT',
      backChips: ['Préparation', 'Performance']
    },
    {
      badge: 'Kids',
      name: 'Taekwondo Kids',
      coach: 'Coach Sahar',
      price: '40 DT',
      unit: '/ mois',
      chips: ['Samedi 16h00', 'Dimanche 10h00'],
      backLimit: 'Initiation et discipline',
      backChips: ['Kids', 'Arts martiaux']
    },
    {
      badge: 'Kids',
      name: 'Gymnastique Kids',
      coach: 'Coach Rawaa',
      price: '40 DT',
      unit: '/ mois',
      chips: ['Samedi 12h00', 'Dimanche 12h00'],
      backLimit: 'Souplesse et coordination',
      backChips: ['Kids', 'Gym']
    }
  ];

  const subs = [
    { title: '1 mois', price: '60 DT', best: false, feats: ['Accès musculation + cardio illimité', 'Ambiance professionnelle et motivante'] },
    { title: '3 mois', price: '160 DT', best: true, feats: ['Meilleur rapport qualité/prix', 'Accès musculation + cardio illimité'] },
    { title: '6 mois', price: '290 DT', best: false, feats: ['Objectifs long terme', 'Accès musculation + cardio illimité'] },
  ];

  useEffect(() => { useRevealOnScroll(); }, []);

  return (
    <section className="pricing-section" id='pricing'>
      <div className="container">
        <div className="ptg-header">
          <div className="ptg-title">Tarifs & Horaires</div>
          <div className="ptg-brand"><span className="ptg-dot" />Peak Time Gym</div>
        </div>

        <div className="ptg-section-title"><span className="ptg-accent" />Cours Collectifs</div>
        <div className="ptg-grid">
          {courses.map((c, i) => (
            <div className="ptg-simple-card" key={i}>
              <div className="ptg-badge">
                {c.badge === 'Femmes' ? `Femmes : ${c.coach.replace('Coach ', '')}` : c.badge}
              </div>
              <div className="ptg-course">{c.name}</div>
              {c.badge !== 'Femmes' && <div className="ptg-coach">{c.coach}</div>}
              <div className="ptg-price"><span>{c.price}</span><span className="ptg-unit">{c.unit}</span></div>
              <div className="ptg-chips">
                {c.chips.map((chip, j) => <span className="ptg-chip" key={j}>{chip}</span>)}
              </div>
              <div className="ptg-limit">{c.backLimit}</div>
            </div>
          ))}
        </div>

        <div className="ptg-section-title"><span className="ptg-accent" />Abonnements Musculation + Cardio</div>
        <div className="ptg-subs">
          {subs.map((s, i) => (
            <div className="ptg-price-card" key={i}>
              {s.best && <div className="ptg-best">Meilleur choix</div>}
              <div className="ptg-pc-head">
                <div className="ptg-pc-title">{s.title}</div>
                <div className="ptg-pc-price">{s.price}</div>
              </div>
              <div className="ptg-pc-feats">
                {s.feats.map((f, j) => <div key={j}>{f}</div>)}
              </div>
            </div>
          ))}
        </div>
        <div className="ptg-enroll-fee">Frais d'inscription 10 DT</div>
        <div className="ptg-footer-note">Horaires et tarifs susceptibles d'évolution. Contactez Peak Time Gym pour confirmation.</div>
      </div>
    </section>
  );
};

export default Pricing;
