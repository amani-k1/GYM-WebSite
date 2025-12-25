import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useLanguage } from "./contexts/useLanguage";
import { translations } from "./translations";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Choose from './components/Choose';
import Services from './components/Services';
import SuccessStories from './components/SuccessStories';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import './components/About.css';

const AboutSnippet = () => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section className="about-section">
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
    </section>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <main id="main-content" role="main">
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={
            <>
              <Hero />
              <AboutSnippet />
              <Choose />
              <Services/>
              <SuccessStories />
              <Pricing />
              <Testimonials/>
            </>
          } />
        </Routes>
        </main>
        <Footer/>
      </Router>
    </LanguageProvider>
  );
}

export default App;
