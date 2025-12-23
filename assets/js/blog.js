// --- VARIABLES GLOBALES (Pour éviter de les rechercher tout le temps) ---
const blogView = document.getElementById('blog-view');
const articleView = document.getElementById('article-view');
const contentLoader = document.getElementById('article-content-loader');
const backBtn = document.getElementById('back-btn');
const grid = document.querySelector('.blog-grid'); // C'est ton "container"
const noResults = document.getElementById('no-results');

// --- 1. FETCH (Récupération des données) ---
async function fetchArticles() {
    const paths = ['/blog/articles.json']; // Assure-toi que ce chemin est bon !
    for (const path of paths){
        try {
            const res = await fetch(path);
            if (res.ok) return await res.json();
        } catch (e) {
            console.error("Erreur fetch", e);
        }
    }
    return []; // CORRECTION : Renvoie un tableau vide, jamais null
}

// --- 2. RENDER (Affichage des cartes) ---
// On l'exporte pour pouvoir l'utiliser dans la recherche
export function renderArticles(articlesList) {
    // Sécurité
    if (!grid) return;

    // 1. On vide la grille
    grid.innerHTML = "";

    // 2. Gestion cas vide
    if (articlesList.length === 0) {
        if(noResults) noResults.classList.remove('hidden');
        return;
    } else {
        if(noResults) noResults.classList.add('hidden');
    }

    // 3. Boucle de création
    articlesList.forEach(article => {
        const card = document.createElement('article'); // Mieux que 'div' pour le SEO
        card.className = 'blog-card fade-in-up delay-1'; // Ajout animation si tu veux
        
        // CORRECTION HTML : J'ai nettoyé la structure
        card.innerHTML = `
        <a href="#" class="stretched-link js-load-article" data-url="${article.link}">
            <div class="card-header">
                <span class="card-title">${article.title}</span>
                <time class="card-date" datetime="${article.date}">
                    ${new Date(article.date).toLocaleDateString('fr-FR')}
                </time>
            </div>
            <div class="card-content">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            
            
            </a>
        `;

        // Ajout de l'événement clic
        const link = card.querySelector('.js-load-article');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // On passe le lien ET le titre (pour l'accessibilité ou le fun)
            loadArticle(article.link); 
        });

        grid.appendChild(card);
    });
}

// --- 3. SYSTÈME DE RECHERCHE ET TRI (Data-Driven) ---
// Cette fonction reçoit MAINTENANT les données, pas le DOM
function initBlogSystem(allArticlesData) {
    const searchInput = document.getElementById('blog-search');
    const sortSelect = document.getElementById('blog-sort');

    if (!searchInput) return;

    // A. RECHERCHEwaa)
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        // CORRECTION MAJEURE : On filtre le JSON, pas le HTML
        const filtered = allArticlesData.filter(article => {
            return article.title.toLowerCase().includes(term) || 
                   (article.summary && article.summary.toLowerCase().includes(term));
        });

        // On redessine la grille avec les résultats filtrés
        renderArticles(filtered);
    });

    // B. TRI
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            
            // On crée une copie pour ne pas casser l'ordre original
            const sorted = [...allArticlesData].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                if (sortValue === 'newest') return dateB - dateA;
                return dateA - dateB;
            });

            renderArticles(sorted);
        });
    }
}

// --- 4. CHARGEMENT ARTICLE (SPA) ---
async function loadArticle(url) {
    try {
        // UI Updates
        contentLoader.innerHTML = "<p style='text-align:center; padding:2rem;'>Chargement...</p>";
        blogView.classList.add('hidden');
        articleView.classList.remove('hidden');
        window.scrollTo(0, 0);

        // Fetch Content
        const response = await fetch(url);
        if (!response.ok) throw new Error('Article introuvable');
        
        const html = await response.text();
        contentLoader.innerHTML = html; // Injection du contenu

    } catch (error) {
        contentLoader.innerHTML = `<p style="color:red; text-align:center;">Erreur : ${error.message}</p>`;
    }
}

// --- 5. GESTION DU BOUTON RETOUR ---
// CORRECTION : On le met ICI, en dehors de tout, pour qu'il ne soit défini qu'une seule fois
if (backBtn) {
    backBtn.addEventListener('click', () => {
        articleView.classList.add('hidden');
        blogView.classList.remove('hidden');
        
        // Petit nettoyage pour libérer la mémoire
        setTimeout(() => { contentLoader.innerHTML = ""; }, 300);
    });
}

// --- 6. INITIALISATION GLOBALE ---
export async function initBlog() {
    // 1. On récupère les données
    const articlesData = await fetchArticles();
    console.log("Articles chargés :", articlesData);

    // 2. On affiche tout au début
    renderArticles(articlesData);

    // 3. On initialise la recherche en lui donnant les données
    initBlogSystem(articlesData);
}