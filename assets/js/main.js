import { loadTableOfContents } from './components/toc.js';
import { setupKatex } from './lib/katex-config.js';
import { loadFooter } from './components/footer.js';
import { loadReferences } from './pages/references.js';
import { makeAlgorithm } from './pages/algorithm.js';
import { makeArticle } from './pages/article.js';
import { loadHeader } from './components/header.js';
import { createNews } from './news.js';
import { initCarousel } from './components/carousel.js';
import { createProject } from './project.js';
import { initDownScroll } from './scroll-down.js';
import { initParticles } from './particles.js';

import { initBlog } from './blog.js';


document.addEventListener("DOMContentLoaded", () => {
    setupKatex();
    loadTableOfContents(); 
    loadFooter();
    loadHeader();
    loadReferences();
    makeAlgorithm();    
    makeArticle();
    createNews();
    initCarousel();
    createProject();
    initDownScroll();

    initBlog();


    initParticles();
});


///////////////////////////

// On sélectionne le header
const header = document.getElementById("main-header-hihi");
const headerr = document.getElementById("main-header");
let lastScrollY = window.scrollY; // Mémorise la position de départ

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Si on est tout en haut de la page, on affiche toujours le header
  if (currentScrollY <= 0) {
    header.classList.remove("header-hidden");
    headerr.classList.remove("header-hidden");
    return;
  }

  // Si on descend (et qu'on a scrolé un peu pour éviter les faux mouvements)
  if (currentScrollY > lastScrollY && currentScrollY > 5) {
    header.classList.add("header-hidden"); // Hop, on le cache vers le haut
    headerr.classList.add("header-hidden");
  } 
  // Si on remonte
  else if (currentScrollY < lastScrollY) {
    header.classList.remove("header-hidden"); // Hop, on le fait réapparaître
    headerr.classList.remove("header-hidden");
  }

  // On met à jour la position pour le prochain tour
  lastScrollY = currentScrollY;
});



// 1. On sélectionne tous les éléments
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

// 2. On ajoute un écouteur d'événement sur chaque bouton
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        // A. Gérer la classe "active" sur les boutons (visuel)
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // B. Récupérer la catégorie cliquée
        const filterValue = button.getAttribute('data-filter');

        // C. Filtrer les projets
        projects.forEach(project => {
            // On récupère les catégories du projet (ex: "cpp maths")
            const projectCategories = project.getAttribute('data-category');

            if (filterValue === 'all' || projectCategories.includes(filterValue)) {
                // Si "Tout voir" OU si le projet a la catégorie correspondante
                project.classList.remove('hide');
                project.classList.add('show');
            } else {
                // Sinon, on cache
                project.classList.add('hide');
                project.classList.remove('show');
            }
        });
    });
});
