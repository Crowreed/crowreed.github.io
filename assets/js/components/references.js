async function loadReferences() {
  try {
    const response = await fetch('references.json');
    const references = await response.json();

    //on recup toutes les refs de l article
    const refs = document.querySelectorAll('a[class^=ref-]');

    const refList = [];



    refs.forEach(ref => {

      const elt = references.find(REF => REF.id === ref.className);
      
      console.log(elt.title); //on pourrait' aussi ajout'er cet' elt' dans la list'e des references a la fin


      if (!refList.includes(elt)) {
    refList.push(elt);
}

      ref.title=elt.title;
      ref.href="#"+ref.className;

      const spanAuthor = document.createElement('span');
      spanAuthor.className="author";
      spanAuthor.textContent=elt.authors[0].given+elt.authors[0].family;

      const year = document.createElement('strong');
      year.textContent = elt.year;


      ref.appendChild(spanAuthor);
      ref.appendChild(year);

      ref.className="cite " + ref.className;
      
    })



      // on fait maintenant la partie reference du bas

      if(refList.length>0) {

        const container = document.getElementById('main-references');

      const h1 = document.createElement('h1');
      h1.textContent = "Références";
      
      
      container.appendChild(h1);

      const ol = document.createElement('ol');
      ol.className = "references";

        
      }

      
      refList.forEach(rr => {

        

        const li = document.createElement('li');

        const div = document.createElement('div');

        const spanAuthor = document.createElement('span');
      spanAuthor.className="author";
      spanAuthor.textContent=rr.authors[0].given+rr.authors[0].family;

      const year = document.createElement('strong');
      year.textContent = rr.year;


      div.appendChild(spanAuthor);
      div.appendChild(year);

      li.appendChild(div);

      const aa = document.createElement('a');
      aa.title = "Accèder a l'article";
      aa.href = rr.url;
      aa.textContent = rr.title;

      li.appendChild(aa);

      li.id=rr.id;
      ol.appendChild(li);


      

      container.appendChild(ol);
      });


  } catch (error) {
    console.log(error);
  }
}


document.addEventListener("DOMContentLoaded", loadReferences);