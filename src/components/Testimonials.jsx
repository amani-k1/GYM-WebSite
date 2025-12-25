import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { translations } from '../translations';
import './Testimonials.css';
import { FaChevronLeft, FaChevronRight, FaEllipsisV } from 'react-icons/fa';
import initRevealOnScroll from '../hooks/useRevealOnScroll';

const Testimonials = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Témoignages par défaut
  const defaultTestimonials = [
    {
      id: 1,
      name: "mahdi riahi",
      role: language === 'fr' ? "entreneur" : "Marketing Executive",
      text: language === 'fr' 
        ? "Rejoindre Peak Time Gym a été la meilleure décision que j'ai jamais prise pour ma santé. Les entraîneurs sont incroyablement encourageants, et les programmes personnalisés m'ont aidé à obtenir des résultats que je n'aurais jamais pensé possibles."
        : "Joining Peak Time Gym was the best decision I ever made for my health. The trainers are incredibly supportive, and the personalized programs have helped me achieve results I never thought possible.",
      avatar: "/coach.jpg",
      rating: 5,
      userId: null // Témoignages par défaut - supprimables uniquement par admin
    },
    {
      id: 2,
      name: "khadija zhioua",
      role: language === 'fr' ? "engenieure" : "Graphic Designer",
      text: language === 'fr'
        ? "Les cours de groupe de Peak Time Gym sont tellement amusants et motivants. J'ai perdu 9 kilos et gagné énormément de confiance. La communauté ici est incroyable !"
        : "Peak Time Gym's group classes are so much fun and motivating. I've lost 20 pounds and gained a ton of confidence. The community here is amazing!",
      avatar: "/avatar2.jpg",
      rating: 5,
      userId: null
    },
    {
      id: 3,
      name: "amani khrayif",
      role: language === 'fr' ? "engenieure" : "Entrepreneur",
      text: language === 'fr'
        ? "L'approche holistique de Peak Time Gym a amélioré mon bien-être général. La combinaison de musculation, cardio et programmes de bien-être a changé ma vie."
        : "The holistic approach at Peak Time Gym has improved my overall well-being. The combination of strength training, cardio, and wellness programs has been life-changing.",
      avatar: "/avatar3.jpg",
      rating: 5,
      userId: null
    }
  ];

  // Charger les témoignages depuis localStorage ou utiliser les valeurs par défaut
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('testimonials');
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  // Migration légère : remplacer les avatars manquants par des images disponibles
  useEffect(() => {
    setTestimonials(prev => {
      const updated = prev.map(t => {
        let u = { ...t };
        if (u.name === 'John Doe') {
          u.name = 'mahdi riahi';
          if (language === 'fr') u.role = 'entreneur';
        }
        if (u.name === 'Sarah Smith') {
          u.name = 'khadija zhioua';
          if (language === 'fr') u.role = 'engenieure';
        }
        if (u.name === 'Mike Johnson') {
          u.name = 'amani khrayif';
          if (language === 'fr') u.role = 'engenieure';
        }
        if (u.avatar === '/avatar1.jpg') u.avatar = '/coach.jpg';
        if (u.avatar === '/avatar2.jpg') u.avatar = '/group.jpg';
        if (u.avatar === '/avatar3.jpg') u.avatar = '/coach.jpg';
        return u;
      });
      if (JSON.stringify(updated) !== JSON.stringify(prev)) {
        localStorage.setItem('testimonials', JSON.stringify(updated));
      }
      return updated;
    });
  }, [language]);

  // Index de départ pour le carousel (affiche 3 témoignages à la fois)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // État pour le formulaire modal
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5,
    avatar: null,
    avatarPreview: null
  });

  // État pour le menu contextuel (trois points)
  const [openMenuId, setOpenMenuId] = useState(null);
  
  // Identifiant de l'utilisateur actuel (simulé - à remplacer par un vrai système d'auth)
  // Pour l'admin, utiliser 'admin', pour le propriétaire, utiliser l'ID du témoignage
  const [currentUserId] = useState(() => {
    return localStorage.getItem('currentUserId') || null;
  });
  
  const isAdmin = currentUserId === 'admin';

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Activer les animations au scroll
  useEffect(() => { initRevealOnScroll(); }, []);

  // Obtenir les témoignages visibles (3 à la fois)
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  const hasMore = testimonials.length > 3;
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex + 3 < testimonials.length;

  // Navigation
  const goLeft = () => {
    if (canGoLeft) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const goRight = () => {
    if (canGoRight) {
      setCurrentIndex(prev => Math.min(prev + 1, testimonials.length - 3));
    }
  };

  // Gérer le changement dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer le changement de note
  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  // Gérer l'upload d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result,
          avatarPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.text.trim()) {
      alert(language === 'fr' ? 'Veuillez remplir tous les champs requis' : 'Please fill in all required fields');
      return;
    }

    const userId = currentUserId || `user_${Date.now()}`;
    if (!currentUserId) {
      localStorage.setItem('currentUserId', userId);
    }

    const newTestimonial = {
      id: Date.now(),
      name: formData.name,
      role: formData.role || (language === 'fr' ? 'Membre' : 'Member'),
      text: formData.text,
      rating: formData.rating,
      avatar: formData.avatar || '/coach.jpg',
      date: new Date().toISOString(),
      userId: userId // Stocker l'ID du créateur
    };

    setTestimonials(prev => [...prev, newTestimonial]);
    setFormData({
      name: '',
      role: '',
      text: '',
      rating: 5,
      avatar: null,
      avatarPreview: null
    });
    setShowModal(false);
    
    // Si c'est le 4ème témoignage, ajuster l'index pour voir les nouveaux
    if (testimonials.length === 3) {
      setCurrentIndex(0);
    }
  };

  // Vérifier si l'utilisateur peut supprimer un témoignage
  const canDelete = (testimonial) => {
    return isAdmin || (currentUserId && testimonial.userId === currentUserId);
  };

  // Supprimer un témoignage
  const handleDelete = (testimonialId) => {
    if (window.confirm(language === 'fr' 
      ? 'Êtes-vous sûr de vouloir supprimer ce témoignage ?' 
      : 'Are you sure you want to delete this testimonial?')) {
      setTestimonials(prev => prev.filter(t => t.id !== testimonialId));
      setOpenMenuId(null);
      
      // Ajuster l'index si nécessaire
      if (currentIndex >= testimonials.length - 3) {
        setCurrentIndex(Math.max(0, testimonials.length - 4));
      }
    }
  };

  // Toggle menu
  const toggleMenu = (testimonialId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === testimonialId ? null : testimonialId);
  };

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  // Rendre les étoiles
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-content">
          {/* Texte au-dessus */}
          <div className="testimonials-text">
            <h2>{t.testimonials.title.includes(',') ? (
              <>
                {t.testimonials.title.split(',')[0]},<br />{t.testimonials.title.split(',')[1]}
              </>
            ) : (
              t.testimonials.title
            )}</h2>
            <p className="subtitle">
              {t.testimonials.subtitle}
            </p>
            <div className="testimonials-actions">
              <button 
                className="add-testimonial-btn"
                onClick={() => setShowModal(true)}
              >
                {language === 'fr' ? 'Ajouter un témoignage' : 'Add Testimonial'}
              </button>
              {/* Bouton admin pour les tests - peut être retiré en production */}
              <button 
                className="admin-toggle-btn"
                onClick={() => {
                  const newUserId = currentUserId === 'admin' ? null : 'admin';
                  localStorage.setItem('currentUserId', newUserId || '');
                  window.location.reload();
                }}
                title={language === 'fr' ? 'Basculer mode admin' : 'Toggle admin mode'}
              >
                {currentUserId === 'admin' ? '👑' : '🔓'}
              </button>
            </div>
          </div>

          {/* Carousel avec flèches */}
          <div className="testimonials-carousel-container">
            {hasMore && canGoLeft && (
              <button className="carousel-arrow carousel-arrow-left" onClick={goLeft}>
                <FaChevronLeft />
              </button>
            )}
            
            <div className="testimonials-grid">
              {visibleTestimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="testimonial-card reveal" style={{ transitionDelay: `${index * 120}ms` }}>
                  {/* Menu trois points */}
                  {canDelete(testimonial) && (
                    <div className="testimonial-menu">
                      <button 
                        className="menu-trigger"
                        onClick={(e) => toggleMenu(testimonial.id, e)}
                      >
                        <FaEllipsisV />
                      </button>
                      {openMenuId === testimonial.id && (
                        <div className="menu-dropdown">
                          <button 
                            className="menu-item delete"
                            onClick={() => handleDelete(testimonial.id)}
                          >
                            {language === 'fr' ? 'Supprimer' : 'Delete'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="stars">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="author">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="avatar"
                      onError={(e) => {
                        e.target.src = '/coach.jpg';
                      }}
                    />
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && canGoRight && (
              <button className="carousel-arrow carousel-arrow-right" onClick={goRight}>
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal pour ajouter un témoignage */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h2>{language === 'fr' ? 'Ajouter un témoignage' : 'Add Testimonial'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{language === 'fr' ? 'Nom *' : 'Name *'}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{language === 'fr' ? 'Rôle/Profession' : 'Role/Profession'}</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder={language === 'fr' ? 'Ex: Entrepreneur' : 'Ex: Entrepreneur'}
                />
              </div>

              <div className="form-group">
                <label>{language === 'fr' ? 'Message *' : 'Message *'}</label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  rows="5"
                  required
                  placeholder={language === 'fr' ? 'Votre témoignage...' : 'Your testimonial...'}
                />
              </div>

              <div className="form-group">
                <label>{language === 'fr' ? 'Évaluation' : 'Rating'}</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                      onClick={() => handleRatingChange(star)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-value">{formData.rating}/5</span>
                </div>
              </div>

              <div className="form-group">
                <label>{language === 'fr' ? 'Photo de profil (optionnel)' : 'Profile Photo (optional)'}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.avatarPreview && (
                  <div className="avatar-preview">
                    <img src={formData.avatarPreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  {language === 'fr' ? 'Annuler' : 'Cancel'}
                </button>
                <button type="submit">
                  {language === 'fr' ? 'Ajouter' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
