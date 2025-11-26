document.addEventListener("DOMContentLoaded", () => {
    const arrowForwardIconSVG = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                                 </svg>`;
    
    const arrowForwardIconAll = document.querySelectorAll('.arrowForwardIcon');

    arrowForwardIconAll.forEach(span => {
        span.innerHTML = arrowForwardIconSVG;
    });
});