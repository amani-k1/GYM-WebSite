import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import './Contact.css';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const form = useRef();
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Simple CSRF token generation (client-side simulation)
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    setCsrfToken(token);
  }, []);

  // Activer les animations au scroll
  useEffect(() => { useRevealOnScroll(); }, []);

  const sanitizeInput = (value) => {
    // Basic sanitization: remove script tags and strip HTML
    return value
      .replace(/<\s*script[^>]*>([\s\S]*?)<\s*\/\s*script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const safeValue = sanitizeInput(value);
    setFormData({
      ...formData,
      [name]: safeValue
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.contact.errors.nameRequired;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.contact.errors.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.contact.errors.emailInvalid;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t.contact.errors.messageRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({ ...formStatus, submitted: true, message: t.contact.sending });

    // CSRF token check (client-side simulation)
    const submittedToken = form.current?._csrf?.value || csrfToken;
    if (submittedToken !== csrfToken) {
      setFormStatus({ submitted: true, success: false, message: 'CSRF token invalide.' });
      return;
    }

    // Configuration EmailJS
    emailjs.sendForm(
      'service_jbdy5yn', // Service ID from EmailJS
      'template_p5rlz3n', // Template ID from EmailJS
      form.current,
      'CsjM160gVRBFxoCC_' // Remplacez par votre clé publique EmailJS
    )
      .then((result) => {
        setFormStatus({
          submitted: true,
          success: true,
          message: t.contact.success
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      }, (error) => {
        setFormStatus({
          submitted: true,
          success: false,
          message: t.contact.error
        });
        console.error('EmailJS error:', error);
      });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero reveal" style={{ transitionDelay: '80ms' }}>
        <div className="container">
          <h1>{t.contact.heroTitle}</h1>
          <p>{t.contact.heroSubtitle}</p>
          <div className="hours-hero">
            <h3>{t.contact.hours}</h3>
            <p>
              {t.contact.hoursValue
                .split('\n')
                .map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info reveal" style={{ transitionDelay: '120ms' }}>
              <h2>{t.contact.contactInfo}</h2>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>{t.contact.address}</h3>
                  <p>{t.contact.addressValue}</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h3>{t.contact.phone}</h3>
                  <p>{t.contact.phoneValue}</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>{t.contact.email}</h3>
                  <p>{t.contact.emailValue}</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h3 className="hours-title">{t.contact.hours}</h3>
                  <p>{t.contact.hoursValue.split('\n').map((line, i, arr) => <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>)}</p>
                </div>
              </div>
            </div>

            <div className="contact-form reveal" style={{ transitionDelay: '180ms' }}>
              <h2>{t.contact.formTitle}</h2>
              <form ref={form} onSubmit={sendEmail} aria-busy={formStatus.submitted && !formStatus.success}>
                <input type="hidden" name="_csrf" value={csrfToken} />
                <div className="form-group">
                  <label htmlFor="name">{t.contact.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    required
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t.contact.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    required
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">{t.contact.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    required
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                
                <button type="submit" className="submit-btn" disabled={formStatus.submitted && !formStatus.message} aria-live="polite">
                  {formStatus.submitted && !formStatus.success ? t.contact.sending : t.contact.send}
                </button>
                
                {formStatus.message && (
                  <div className={`form-status ${formStatus.success ? 'success' : 'error'}`} aria-live="polite">
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section reveal" style={{ transitionDelay: '220ms' }}>
        <iframe
          src="https://www.google.com/maps?q=Menzell%20Tmim%20Avenue%20de%20la%20revolution&hl=fr&z=16&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        ></iframe>
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <a
            href="https://goo.gl/maps/oHEHRTFAvk54Prio6"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#a4b01a',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Voir sur Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
