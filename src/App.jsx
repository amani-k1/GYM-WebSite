import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from './components/Services';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import HomeAbout from './components/HomeAbout';
import ScrollToTop from "./components/ScrollToTop";

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
              <HomeAbout />
              <Services/>
              <Pricing />
              <Testimonials/>
            </>
          } />
        </Routes>
        </main>
        <ScrollToTop />
        <Footer/>
      </Router>
    </LanguageProvider>
  );
}

export default App;
