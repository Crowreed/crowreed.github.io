async function loadTableOfContents() {
    try {
        // loading of toc
        const response = await fetch('toc.json');
        const toc = await response.json();


        const container = document.getElementById('toc');

        const ul = document.createElement('ul');
        
        const tocHeadDiv = document.createElement('div');
        tocHeadDiv.className = 'toc-head';

        const h5 = document.createElement('h5');
        h5.textContent = "Table des matières";
        
        tocHeadDiv.appendChild(h5);

        const button = document.createElement('button');
        button.id = 'toto';

        button.innerHTML = '<svg class="CloseIcon" viewBox="0 0 24 24" ><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
   
        tocHeadDiv.appendChild(button);
        

        toc.forEach(chapter => {
            const numDiv = document.createElement('div');
            numDiv.className = 'num';
            
            const li = document.createElement('li');

            const chapterDiv = document.createElement('div');
            chapterDiv.className = 'chapter';

            chapterDiv.appendChild(numDiv);

            const h3 = document.createElement('h3');
            h3a = document.createElement('a');
            h3a.href = chapter.filename;
            h3a.textContent = chapter.title;
            h3a.title = chapter.title;
            h3.appendChild(h3a);
            
            chapterDiv.appendChild(h3);

            li.appendChild(chapterDiv);

            const subList = document.createElement('ul');
            
            const chapterContentDiv = document.createElement('div');
            chapterContentDiv.className = 'chapter-content';

            chapter.children.forEach(subchapter => {
                const snumDiv = document.createElement('div');
                snumDiv.className = 'num';
                
                const subLi = document.createElement('li');
                subLi.appendChild(snumDiv);

                const h4 = document.createElement('h4');

                const a = document.createElement('a');
                a.href = subchapter.filename;
                a.title = subchapter.title;
                a.textContent = subchapter.title;

                h4.appendChild(a);

                subLi.appendChild(h4);
                subList.appendChild(subLi);       
            });

            
            chapterContentDiv.appendChild(subList);
            li.appendChild(chapterContentDiv);

            ul.appendChild(li);
        });

        container.appendChild(tocHeadDiv);
        container.appendChild(ul);

    } catch (error) {
        console.error("Erreur lors de la génération de la TOC :", error);
    }

    const huhu = document.querySelector(".huhu");

    toc.classList.toggle("hidden");
    huhu.classList.toggle("hidden");
    
    const toggle = () => {
    toc.classList.toggle("hidden");
    huhu.classList.toggle("hidden");
  };

  document.getElementById("toto").addEventListener("click", toggle);
  document.getElementById("eee").addEventListener("click", toggle);

}
document.addEventListener("DOMContentLoaded", loadTableOfContents);