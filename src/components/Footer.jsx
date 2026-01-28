import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => { useRevealOnScroll(); }, []);

  return (
    <footer className="footer-section reveal" style={{ transitionDelay: '100ms' }}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>Peak Time Gym</h3>
            </div>
            <div className="social-icons">
              <a href="https://www.facebook.com/peaktimegym" className="social-icon" aria-label="Facebook" rel="noopener noreferrer" target="_blank">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/peaktimegym/" className="social-icon" aria-label="Instagram" rel="noopener noreferrer" target="_blank">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-icon" aria-label="YouTube" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom">
            <div className="footer-links">
              <div className="footer-column">
                <h4>{t.footer.about}</h4>
              </div>
              <div className="footer-column">
                <h4>{t.footer.services}</h4>
              </div>
              <div className="footer-column">
                <h4>{t.footer.pricing}</h4>
              </div>
              <div className="footer-column">
                <h4>{t.footer.contact}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
