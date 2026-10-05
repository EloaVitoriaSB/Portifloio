document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    let cardsPerPage = getCardsPerPage();

    function getCardsPerPage() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    const maxIndex = Math.max(0, cards.length - cardsPerPage);

    cards.forEach((_, idx) => {
        if (idx <= maxIndex) {
            const dot = document.createElement('div');
            dot.classList.add('indicator-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = idx;
                updateCarousel();
            });
            indicatorsContainer.appendChild(dot);
        }
    });

    const dots = document.querySelectorAll('.indicator-dot');

    function updateCarousel() {
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 25; 
        const moveAmount = currentIndex * (cardWidth + gap);
        
        track.style.transform = `translateX(-${moveAmount}px)`;

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        const newCardsPerPage = getCardsPerPage();
        if (newCardsPerPage !== cardsPerPage) {
            cardsPerPage = newCardsPerPage;
            currentIndex = 0;
            updateCarousel();
        }
    });

    setInterval(() => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 6000);
});
