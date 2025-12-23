import { createLink } from '../utils/utils.js';

const ICONS = {
    OPEN: `<svg viewBox="0 0 24 24">
                <path d="M19 5v14H5V5zm1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"></path>
           </svg>`,
    CLOSE: `<svg class="CloseIcon" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`
};

async function fetchTOC() {
    const paths = ['../toc.json', 'toc.json', '/toc.json'];
    for (const path of paths) {
        try {
            const res = await fetch(path);
            if (res.ok) return await res.json();
        } catch (e) {}
    }
    return null;
}

export async function loadTableOfContents() {
    const storedState = localStorage.getItem('is_TOC_open');
    // on regarde si la t'able des mat'ieres est' ouvert'e ou ,non
    let is_TOC_open = (storedState === null) ? true : (storedState === 'true');

    if (is_TOC_open === null) {
        alert(is_TOC_open);
        is_TOC_open = true;
    }

    const TOC = document.getElementById('toc-container');

    if(!TOC) return;
    
    const tocData = await fetchTOC();
    if (!tocData) return console.error("Impossible de charger toc.json");
    
    
    let chapNum = 0;
    let appendixNum = 0;

    const listHTML = tocData.map(chap => {
        const isActive = document.title === chap.title;

        const isAppendix = chap.type==="appendix";

        const numLabel = isAppendix ? (chap.isNumbered ? `<div class="num">APPENDICE ${++appendixNum}</div>` : ``) : (chap.isNumbered ? `<div class="num">CHAPITRE ${++chapNum}</div>` : ``);
        const activeStyle = isActive ? 'border:2px solid var(--primary-border-color);' : '';

        const subListHTML = (chap.children || []).map((sub, i) => {

            const isSubActive = document.title === sub.title;
            const subStyle = isSubActive ? 'background-color: #f7f6f7;' : '';

            return `
                <li style="${subStyle}">
                    <a href="${sub.path}" target="_self" title="${sub.title}" hreflang="fr rel="noopener referrer">
                        <span class="num">${++i}</span>
                        <h4>${sub.title}</h4>
                    </a>
                </li>`;
        }).join('');

        return `
            <li>
                <div class="chapter" style="${activeStyle}">
                    <a href="${chap.path}" title="${chap.title}" hreflang="fr rel="noopener referrer">
                        <div class="num">${numLabel}</div>
                        <h3>${chap.title}</h3>
                    </a>
                </div>

                <div class="chapter-content">
                    <ul>
                        ${subListHTML}
                    </ul>
                </div>
            </li>`;
    }).join('');
    

    TOC.innerHTML = `
        <div id="min-toc" class="${is_TOC_open ? 'hidden' : ''}">
            <button id='toc-open-button' aria-label='Ouvrir le sommaire'>
                ${ICONS.OPEN}
            </button>
        </div>
        <div id="full-toc" class="${is_TOC_open ? '' : 'hidden'}">
            <div class="toc-head">
                <h5>Table des matières</h5>
                <button id="toc-close-button" aria-label="Fermer le sommaire"> 
                    ${ICONS.CLOSE}
                </button>
            </div>
            <ul id="music">
                ${listHTML}
            </ul>
        </div>
    `;


    const toggle = () => {
        

        
        document.getElementById("full-toc").classList.toggle('hidden');
        document.getElementById("min-toc").classList.toggle('hidden');
        is_TOC_open = document.getElementById("min-toc").className==='hidden';
        
        localStorage.setItem('is_TOC_open', is_TOC_open);        
    }

    document.getElementById('toc-open-button').onclick = toggle;
    document.getElementById('toc-close-button').onclick = toggle;





    // --- C'EST ICI QUE CA CHANGE ---

    // 1. On crée une clé UNIQUE basée sur l'ID du cours
    // Ex: "scroll_pos_maths" ou "scroll_pos_intro_algo"
    const uniqueKey = 'scroll_pos';

    // 2. RESTAURATION : On cherche la clé spécifique à CE cours
    const savedScroll = localStorage.getItem(uniqueKey);
    
    if (savedScroll) {
        document.getElementById("music").scrollTop = parseInt(savedScroll);
    } else {
        // Si aucune sauvegarde (jamais visité), on remet en haut
        document.getElementById("music").scrollTop = 0;
    }

    // 3. SAUVEGARDE : On enregistre dans la clé spécifique
    document.getElementById("music").addEventListener('scroll', () => {
        
        localStorage.setItem(uniqueKey, document.getElementById("music").scrollTop);
    });


    
}