
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
