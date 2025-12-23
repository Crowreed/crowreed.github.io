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

function createAuthor(author) {
	return `
		<span class="author">
			${author.given[0]}. ${author.family}
		</span>
	`;
}

export async function loadReferences() {
	const refs = document.querySelectorAll('a[class^=ref-]');
	if(refs.length === 0) return;
	
	const referencesData = await fetchReferences();
    if (!referencesData) return; // un seul gros fichier references ou c est bizarre ?

    const refList = [];
    


    refs.forEach(ref => {
		const elt = referencesData.find(REF => REF.id === ref.className);
      
      	if (!refList.includes(elt)) {
        	refList.push(elt);
      	}

      	ref.title=elt.title;
    	ref.href="#"+ref.className;

		ref.innerHTML =
		`
			<span class="author">
				${createAuthor(elt.authors[0])},
			</span>
			<strong>
			${elt.year}
			</strong>
		`;
    })

	createReferencesList(refList);
}

function createReferencesList(refList) {
	if(refList.length===0) return;

	const container = document.getElementById('article');	// hypothese forte	
	
	const referencesList = refList.map(ref => {
        
		const listAuthors = ref.authors.map(author => {
			return createAuthor(author);
		}).join(',');

		return `
				<li id="${ref.id}" class="" style="">
					<div>
						${listAuthors}
						<strong>
							${ref.year};
						</strong>
					</div>
					<a
					href="${ref.url}"
					hreflang="fr"
					target="_self"
					rel="noopener noreferrer"
					title="Accèder a l'article"
					>
						${ref.title}
					</a>
				</li>
				`
	}).join('');
        	
	container.insertAdjacentHTML('beforeend',
	`
	<hr>
	
	<h1>Références</h1>
	
	<ol  class="references" style="">
		${referencesList}
	</ol>
	`   
	); 	    
}