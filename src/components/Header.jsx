import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../translations";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Peak Time Gym" />
            <h2>Peak Time Gym</h2>
          </Link>
        </div>

        {/* Navigation */}
        <button
          className="menu-toggle"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
        <nav className={`nav ${isMenuOpen ? "open" : ""}`} id="primary-navigation" role="navigation" aria-label="Navigation principale">
          <ul>
            <li><Link to="/" className="active">{t.header.home}</Link></li>
            <li><Link to="/gallery">{t.header.gallery}</Link></li>
            <li><a href="#services">{t.header.services}</a></li>
            <li><a href="#planning">{t.header.planning}</a></li>
            <li><a href="#pricing">{t.header.pricing}</a></li>
            <li><Link to="/contact">{t.header.contact}</Link></li>
          </ul>
        </nav>

        {/* Language Selector and Join Button */}
        <div className="header-actions">
          <div className="language-selector">
            <button onClick={toggleLanguage} className="lang-btn">
              {language === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
          <div className="join-btn">
            <Link to="/contact">{t.header.joinNow}</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
