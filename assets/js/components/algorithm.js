async function makeAlgorithm() {

  





    //for
    const forHeaderList = document.querySelectorAll('.forHeader');


    const doSpan = document.createElement('span');
    doSpan.classList.add('keyword');
    doSpan.textContent = 'faire';

    const strongA = document.createElement('strong');
    strongA.textContent = ' à';

    forHeaderList.forEach(elt => {

        const forS = elt.querySelector('.forS');
        const forE = elt.querySelector('.forE');

        forS.insertAdjacentElement('afterend', strongA.cloneNode(true));

        forE.insertAdjacentElement('afterend', doSpan.cloneNode(true));

    });



    const keyword = document.createElement("span");
    keyword.className = "keyword";

    const strong = document.createElement("strong");



    const spanReturn = keyword.cloneNode(true);
    spanReturn.textContent = "Retourner "

    document.querySelectorAll('.return').forEach(elt => elt.prepend(spanReturn.cloneNode(true)));

    
    const startWhile = keyword.cloneNode(true);
    startWhile.textContent = "Tant que";

    document.querySelectorAll('.while').forEach(elt => elt.prepend(startWhile.cloneNode(true)));


    const startFor = keyword.cloneNode(true);
    startFor.textContent = "Pour";

    document.querySelectorAll('.for').forEach(elt => elt.prepend(startFor.cloneNode(true)));


    const startIf = keyword.cloneNode(true);
    startIf.textContent = "Si";

    document.querySelectorAll('.if').forEach(elt => elt.prepend(startIf.cloneNode(true)));


    const startElse = keyword.cloneNode(true);
    startElse.textContent = "Sinon";

    document.querySelectorAll('.else').forEach(elt => elt.prepend(startElse.cloneNode(true)));


    const endWhile = keyword.cloneNode(true);
    endWhile.textContent = "Fin tant que";
    endWhile.style = "display: block;";

    document.querySelectorAll('.while').forEach(elt => elt.appendChild(endWhile.cloneNode(true)));


    const endFor = keyword.cloneNode(true);
    endFor.textContent = "Fin pour";
    endFor.style = "display: block;";

    document.querySelectorAll('.for').forEach(elt => elt.appendChild(endFor.cloneNode(true)));


    const endIf = keyword.cloneNode(true);
    endIf.textContent = "Fin si";
    endIf.style = "display: block;";

    document.querySelectorAll('.conditional').forEach(elt => elt.appendChild(endIf.cloneNode(true)));



    const algIn = strong.cloneNode(true);
    algIn.textContent = "Entrée :";
    
    document.querySelectorAll('.in').forEach(elt => elt.prepend(algIn.cloneNode(true)));

    const algOut = document.createElement('strong');
    algOut.textContent = "Sortie :";

    document.querySelectorAll('.out').forEach(elt => elt.prepend(algOut.cloneNode(true)));


}

document.addEventListener("DOMContentLoaded", makeAlgorithm);