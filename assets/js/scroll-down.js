const ICONS = {
    downArrow: `<svg viewBox="0 0 24 24" width="50" height="50">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor"/>
                </svg>`
};

export function initDownScroll() {
    const arrow = document.getElementById('scroll-down-indicator');
    
    if (!arrow) return;

    arrow.innerHTML = ICONS.downArrow;

    const checkScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        
        const isBottom = scrollPosition >= (totalHeight - 50);

        if (isBottom) {
            arrow.classList.add('hidden');
        } else {
            arrow.classList.remove('hidden');
        }
    };

    checkScroll();
    
    window.addEventListener('scroll', checkScroll, { passive: true });
    
    arrow.addEventListener('click', () => {
        window.scrollBy({
            top: window.innerHeight / 2,
            behavior: 'smooth'
        });
    });
}