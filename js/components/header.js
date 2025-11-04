// ============================================
// Header Scroll Effect Component
// ============================================

export function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// Parallax Effect for Intro Section
// ============================================

export function initParallax() {
    const intro = document.querySelector('.intro');
    if (!intro) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        intro.style.transform = `translateY(${rate}px)`;
    });
}

