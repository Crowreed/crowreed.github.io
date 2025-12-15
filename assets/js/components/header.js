export function loadHeader() {
  fetch("/includes/main-header.html")
  .then(response => response.text())
  .then(data => {
    // 💡 Correction : Utiliser querySelector() pour sélectionner le premier élément <header>
    document.getElementById('main-header').innerHTML = data;
  })
  .catch(error => {
    console.error("Erreur lors du chargement de l'en-tête :", error);
  });

}