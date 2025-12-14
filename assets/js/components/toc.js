import { createLink } from '/assets/js/components/utils.js';

function toggleVisibility() {
    const fullTOC = document.getElementById('full-toc');
    const minTOC = document.getElementById('min-toc');
    
    fullTOC?.classList.toggle('hidden');
    minTOC?.classList.toggle('hidden');
}

async function loadTableOfContents() {
    try {
        // --- 1. INITIALISATION & CHARGEMENT DES DONNÉES ---
        const response = await fetch('toc.json');
        const toc = await response.json();

        

        // Récupération des conteneurs DOM
        const fullTOC = document.getElementById('full-toc');
        const minTOC = document.getElementById('min-toc');

        if (!fullTOC || !minTOC) {
            console.error("Conteneurs TOC non trouvés dans le DOM.");
            return;
        }

        // Utilisation d'un fragment pour construire le contenu en mémoire (performance)
        const fragment = document.createDocumentFragment();
        
        // Initialisation des compteurs
        let chapterCount = 0;



        // minTOC
        const openButton = document.createElement('button');
        openButton.id = 'toc-open-button';
        openButton.innerHTML = '<svg class="" viewBox="0 0 24 24" fill="black"><path d="M19 5v14H5V5zm1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"></path></svg>';
        
        minTOC.appendChild(openButton);
        // --- 2. CONSTRUCTION DE L'ENTÊTE (toc-head) ---

        // Construction du titre et du bouton (compacté)
        const tocTitle = Object.assign(document.createElement('h5'), { textContent: "Table des matières" });
        
        const closeButton = Object.assign(document.createElement('button'), { id: 'toc-close-button' });
        closeButton.innerHTML = '<svg class="CloseIcon" viewBox="0 0 24 24" ><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
   
        // Assemblage de l'entête
        const tocHead = Object.assign(document.createElement('div'), { className: 'toc-head' });
        tocHead.appendChild(tocTitle);
        tocHead.appendChild(closeButton);
        fragment.appendChild(tocHead); // Ajout au fragment


        // --- 3. BOUCLE ET CONSTRUCTION DES CHAPITRES ---
        const ul = document.createElement('ul');

        toc.forEach(chapter => {
            let subchapterCount = 0;

            // Déterminer le numéro de chapitre
            const numDiv = document.createElement('div');
            numDiv.className = 'num';
            if(chapter.isNumbered == true) {
                chapterCount++;
                numDiv.textContent = `CHAPITRE ${chapterCount}`;
            }

            // --- Construction du Conteneur de Chapitre ---
            const li = document.createElement('li');
            const chapterDiv = Object.assign(document.createElement('div'), { className: 'chapter' });

            // Création du Lien principal (dd = <a>)
            const dd = createLink({href: chapter.filename, title: chapter.title});
            dd.appendChild(numDiv);

            // Mise en évidence (Utilisation du Template Literal pour le style)
            if(document.title === chapter.title) { 
                chapterDiv.style = `border:1px solid var(--primary-border-color);`; 
            }
            
            // Titre h3
            const h3 = Object.assign(document.createElement('h3'), { textContent: chapter.title });
            dd.appendChild(h3);

            chapterDiv.appendChild(dd);
            li.appendChild(chapterDiv);


            // --- Construction des Sous-Chapitres ---
            const subList = document.createElement('ul');
            const chapterContentDiv = Object.assign(document.createElement('div'), { className: 'chapter-content' });

            chapter.children.forEach(subchapter => {
                subchapterCount++;

                // Construction de l'élément de sous-chapitre (compacté)
                const subLi = document.createElement('li');
                
                const snumDiv = Object.assign(document.createElement('span'), { 
                    className: 'num', 
                    textContent: subchapterCount 
                });
                
                const hhh = createLink({href: subchapter.filename, title: subchapter.title});
                hhh.appendChild(snumDiv);

                const h4 = Object.assign(document.createElement('h4'), { textContent: subchapter.title });
                hhh.appendChild(h4);

                subLi.appendChild(hhh);
                
                // Mise en évidence du sous-chapitre actif
                if(document.title === subchapter.title) { 
                    subLi.style = `background-color: #f7f6f7;`; 
                }

                subList.appendChild(subLi);       
            });

            // Assemblage des listes de sous-chapitres
            chapterContentDiv.appendChild(subList);
            li.appendChild(chapterContentDiv);
            ul.appendChild(li);
        });

        fragment.appendChild(ul); // Ajout de la liste complète au fragment


        // ===============================================
        // 4. INJECTION DOM ET GESTION DES ÉVÉNEMENTS
        // ===============================================

        // Injection unique du fragment dans le DOM (Opération rapide)
        fullTOC.appendChild(fragment);


        // Ajout des écouteurs d'événements
        document.getElementById("toc-open-button").addEventListener("click", toggleVisibility);
        document.getElementById("toc-close-button").addEventListener("click", toggleVisibility);

    } catch (error) {
        console.error("Erreur lors de la génération de la TOC :", error);
    } 
} 

// Déclenchement de la fonction lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", loadTableOfContents);