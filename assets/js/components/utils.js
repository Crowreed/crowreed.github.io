/**
 * @param {object} options - Objet de configuration du lien.
 * @param {string} options.href - L'URL de destination (OBLIGATOIRE).
 * @param {string} [options.hreflang="fr"] - Langue de la ressource.
 * @param {string} [options.target="_self"] - Cible d'ouverture.
 * @param {string} [options.rel="noopener noreferrer"] - Relation du lien.
 * @param {string} [options.title] - Titre d'infobulle.
 * @returns {HTMLAnchorElement}
 */
export function createLink({ 
    href, 
    title,
    hreflang = "fr", 
    target = "_self", 
    rel = "noopener noreferrer",
    textContent
}) {
    const a = document.createElement('a');

    a.href = href;
    a.hreflang = hreflang;
    a.target = target;
    a.rel = rel;
    // La propriété est seulement assignée si la variable 'title' a une valeur dans l'objet de configuration
    a.title = title;
    a.textContent = textContent;

    return a;
}