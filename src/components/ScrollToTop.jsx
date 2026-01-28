// Composant "Retour en haut" pour React
// Affiche un bouton fixe en bas à droite qui apparaît après 300px de scroll.
// Au clic, la page remonte en haut avec une animation fluide.
import React, { useEffect, useState } from "react";
import "./ScrollToTop.css";

// Composant principal
const ScrollToTop = () => {
  // État local pour contrôler la visibilité du bouton
  const [isVisible, setIsVisible] = useState(false);

  // Effet: écouter l'événement de scroll et mettre à jour la visibilité
  useEffect(() => {
    const onScroll = () => {
      // Afficher le bouton après 300px de défilement vertical
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    // Nettoyage de l'écouteur lors du démontage du composant
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Action: faire remonter la page en haut avec un scroll fluide
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Rendu: bouton circulaire avec une icône flèche vers le haut
  return (
    <button
      type="button"
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={handleClick}
      aria-label="Retour en haut"
      title="Retour en haut"
    >
      {/* Icône flèche vers le haut (SVG accessible) */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M12 5l-7 7h4v7h6v-7h4l-7-7z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
