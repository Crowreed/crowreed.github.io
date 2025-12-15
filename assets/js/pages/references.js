import { createLink } from '../utils/utils.js';

async function fetchReferences() {
	const paths = ['../references.json', 'references.json', '/references.json'];
	for (const path of paths){
		try {
			const res = await fetch(path);
			if (res.ok) return await res.json();
		} catch (e) {}
	}
	return null;
}

export async function loadReferences() {
	const referencesData = await fetchReferences();
    if (!referencesData) return console.error("Impossible de charger references.json");

    const refList = [];
    const refs = document.querySelectorAll('a[class^=ref-]');

    refs.forEach(ref => {
		const elt = referencesData.find(REF => REF.id === ref.className);
      
      	if (!refList.includes(elt)) {
        	refList.push(elt);
      	}

      	ref.title=elt.title;
    	ref.href="#"+ref.className;

      	const spanAuthor = document.createElement('span');
      	spanAuthor.className="author";
    	spanAuthor.textContent=elt.authors[0].given[0] +". "+elt.authors[0].family;

		const year = document.createElement('strong');
      	year.textContent = elt.year;

      	ref.appendChild(spanAuthor);
      	ref.appendChild(year);

      	ref.className="cite " + ref.className;
    })

	createReferencesList(refList);
}

function createReferencesList(refList) {
	if(refList.length>0) {
		const container = document.getElementById('article');	
		const divReferences = document.createElement('div');
		divReferences.id = 'main-references';

		const hr = document.createElement('hr');

		divReferences.appendChild(hr);

	    //<h1>Références</h1>
    	const h1 = document.createElement('h1');
    	h1.textContent = "Références";
        
        divReferences.appendChild(h1);
		
        const ol = document.createElement('ol');
    	ol.className = "references"; 
		ol.style = "list-style-type: none;";
			
		// on construit chaque element de la liste
		refList.forEach(rr => {
        	const li = document.createElement('li');
        	const div = document.createElement('div');

			rr.authors.forEach(author => {
				const spanAuthor = document.createElement('span');
      			spanAuthor.className="author";
				spanAuthor.textContent=author.given[0]+". "+ author.family;
				div.appendChild(spanAuthor);
			});
        		
      		const year = document.createElement('strong');
      		year.textContent = rr.year;
      		div.appendChild(year);
      		li.appendChild(div);
      		li.appendChild(createLink({href: rr.url, title: "Accèder a l'article", textContent: rr.title}));
      		li.id=rr.id;
			li.style = "list-style-type: none;";		
			li.className=rr.type;
      		ol.appendChild(li);	
      		});
			divReferences.appendChild(ol);
			container.appendChild(divReferences);
      	}      
}