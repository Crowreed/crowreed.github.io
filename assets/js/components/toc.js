import { createLink } from '../utils/utils.js';

function toggleVisibility() {
    const fullTOC = document.getElementById('full-toc');
    const minTOC = document.getElementById('min-toc');
    
    fullTOC?.classList.toggle('hidden');
    minTOC?.classList.toggle('hidden');
}

async function load_TOC_file() {
    const cheminsPossibles = [
        '../toc.json', 
        'toc.json',    
        '/toc.json'    
    ];

    for (const chemin of cheminsPossibles) {
        try {
            const response = await fetch(chemin);
            if (response.ok) {
                console.log(`Fichier toc.json chargé via : ${chemin}`);
                return await response.json(); 
            }
        } catch (error) {
            console.warn(`Échec du chargement via ${chemin}. Raison: ${error.message}.`);
        }
    }
    throw new Error("Impossible de charger le fichier toc.json.");
}

export async function loadTableOfContents() {
    try {
        // --- 1. CHARGEMENT DES DONNÉES ---
        // On appelle la fonction et on attend le résultat
        const toc = await load_TOC_file();

        // Sécurité : On vérifie que toc est bien un tableau
        if (!Array.isArray(toc)) {
            throw new Error("Le fichier toc.json a été chargé mais ce n'est pas un tableau (Array).");
        }

        // --- 2. PRÉPARATION DU DOM ---
        const fullTOC = document.getElementById('full-toc');
        const minTOC = document.getElementById('min-toc');

        if (!fullTOC || !minTOC) {
            console.error("Conteneurs TOC non trouvés dans le DOM.");
            return;
        }

        const fragment = document.createDocumentFragment();
        let chapterCount = 0;

        // --- 3. CONSTRUCTION DU MIN-TOC ---
        const openButton = document.createElement('button');
        openButton.id = 'toc-open-button';
        openButton.innerHTML = '<svg class="" viewBox="0 0 24 24" fill="black"><path d="M19 5v14H5V5zm1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"></path></svg>';
        minTOC.appendChild(openButton);

        // --- 4. CONSTRUCTION DE L'ENTÊTE ---
        const tocTitle = Object.assign(document.createElement('h5'), { textContent: "Table des matières" });
        const closeButton = Object.assign(document.createElement('button'), { id: 'toc-close-button' });
        closeButton.innerHTML = '<svg class="CloseIcon" viewBox="0 0 24 24" ><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
   
        const tocHead = Object.assign(document.createElement('div'), { className: 'toc-head' });
        tocHead.appendChild(tocTitle);
        tocHead.appendChild(closeButton);
        fragment.appendChild(tocHead);

        // --- 5. BOUCLE PRINCIPALE (Construction des chapitres) ---
        const ul = document.createElement('ul');

        // C'est ici que le vrai forEach commence
        toc.forEach(chapter => {
            let subchapterCount = 0;

            // Numérotation
            const numDiv = document.createElement('div');
            numDiv.className = 'num';
            if(chapter.isNumbered === true) {
                chapterCount++;
                numDiv.textContent = `CHAPITRE ${chapterCount}`;
            }

            // Conteneur Chapitre
            const li = document.createElement('li');
            const chapterDiv = Object.assign(document.createElement('div'), { className: 'chapter' });

            // Lien Chapitre
            // NOTE : Vérifiez bien que 'folder_name' existe dans votre JSON
            const dd = createLink({href: chapter.filename, title: chapter.title});
            dd.appendChild(numDiv);

            if(document.title === chapter.title) { 
                chapterDiv.style = `border:1px solid var(--primary-border-color);`; 
            }
            
            const h3 = Object.assign(document.createElement('h3'), { textContent: chapter.title });
            dd.appendChild(h3);

            chapterDiv.appendChild(dd);
            li.appendChild(chapterDiv);

            // Sous-chapitres
            const subList = document.createElement('ul');
            const chapterContentDiv = Object.assign(document.createElement('div'), { className: 'chapter-content' });

            if (chapter.children && Array.isArray(chapter.children)) {
                chapter.children.forEach(subchapter => {
                    subchapterCount++;

                    const subLi = document.createElement('li');
                    
                    const snumDiv = Object.assign(document.createElement('span'), { 
                        className: 'num', 
                        textContent: subchapterCount 
                    });
                    
                    // Construction du chemin : Assurez-vous que la logique de concaténation est bonne ici
                    const subHref = subchapter.filename;
                    const hhh = createLink({href: subHref, title: subchapter.title});
                    
                    hhh.appendChild(snumDiv);

                    const h4 = Object.assign(document.createElement('h4'), { textContent: subchapter.title });
                    hhh.appendChild(h4);

                    subLi.appendChild(hhh);
                    
                    if(document.title === subchapter.title) { 
                        subLi.style = `background-color: #f7f6f7;`; 
                    }

                    subList.appendChild(subLi);       
                });
            }

            chapterContentDiv.appendChild(subList);
            li.appendChild(chapterContentDiv);
            ul.appendChild(li);
        });

        fragment.appendChild(ul);
        fullTOC.appendChild(fragment);

        // Events
        document.getElementById("toc-open-button").addEventListener("click", toggleVisibility);
        document.getElementById("toc-close-button").addEventListener("click", toggleVisibility);

    } catch (error) {
        console.error("Erreur critique lors de la génération de la TOC :", error);
    } 
}