import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Navigation */}
        <button
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
        <nav
          className={`nav ${isMenuOpen ? "open" : ""}`}
          id="primary-navigation"
          role="navigation"
          aria-label="Navigation principale"
          onClick={isMenuOpen ? handleCloseMenu : undefined}
        >
          <ul onClick={(e) => e.stopPropagation()}>
            <li><Link to="/" className="active" onClick={handleCloseMenu}>{t.header.home}</Link></li>
            <li><a href="/#home-about" onClick={handleCloseMenu}>{t.header.about}</a></li>
            <li><a href="#services" onClick={handleCloseMenu}>{t.header.services}</a></li>
            <li><a href="#pricing" onClick={handleCloseMenu}>{t.header.pricing}</a></li>
            <li><Link to="/gallery" onClick={handleCloseMenu}>{t.header.gallery}</Link></li>
            <li><Link to="/contact" onClick={handleCloseMenu}>{t.header.contact}</Link></li>
          </ul>
        </nav>

        {/* Language Selector and Join Button */}
        <div className="header-actions">
          <div className="language-selector">
            <button onClick={toggleLanguage} className="lang-btn">
              {language === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
