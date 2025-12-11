// faire en sorte d'avoir un truc qui ajoute tous seul les span label partout

document.addEventListener("DOMContentLoaded", () => {
    const hoho = document.querySelectorAll('.example, .counterexample, .proof, .conjecture, .definition, .remark, .theorem, .proposition, .lemma, .problem, .notation, figcaption, summary');
    hoho.forEach( example => {
        example.insertAdjacentHTML("afterbegin", `
            <span class="label"></span>
        `);
    });   
});