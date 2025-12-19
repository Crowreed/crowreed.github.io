import { loadTableOfContents } from './components/toc.js';
import { setupKatex } from './lib/katex-config.js';
import { loadFooter } from './components/footer.js';
import { loadReferences } from './pages/references.js';
import { makeAlgorithm } from './pages/algorithm.js';
import { makeArticle } from './pages/article.js';
import { loadHeader } from './components/header.js';
import { createNews } from './news.js';

document.addEventListener("DOMContentLoaded", () => {
    setupKatex();
    loadTableOfContents(); 
    loadFooter();
    loadHeader();
    loadReferences();
    makeAlgorithm();    
    makeArticle();
    createNews();
});

// On sélectionne le header
const header = document.getElementById("main-header-hihi");
let lastScrollY = window.scrollY; // Mémorise la position de départ

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Si on est tout en haut de la page, on affiche toujours le header
  if (currentScrollY <= 0) {
    header.classList.remove("header-hidden");
    return;
  }

  // Si on descend (et qu'on a scrolé un peu pour éviter les faux mouvements)
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    header.classList.add("header-hidden"); // Hop, on le cache vers le haut
  } 
  // Si on remonte
  else if (currentScrollY < lastScrollY) {
    header.classList.remove("header-hidden"); // Hop, on le fait réapparaître
  }

  // On met à jour la position pour le prochain tour
  lastScrollY = currentScrollY;
});

