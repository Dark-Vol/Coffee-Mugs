// ============================================
// Intersection Observer for Fade-in Animations
// ============================================

export function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to sections
    const sectionsToAnimate = document.querySelectorAll(
        '.even, .information, .more__products, .more__coffee, .coffee__free, ' +
        '.free__shopping, .stories__free, .gallery, .update'
    );

    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Animate product cards
    const productCards = document.querySelectorAll(
        '.info__pink_coffee, .info__gold_coffee, .coffee__read, ' +
        '.coffee__black, .coffee__winter, .tea__ceramic, ' +
        '.coffee__handle, .coffee__espresso, .coffee__pink, .coffee__summer'
    );
    
    // Handle special class name with & character
    const bwCard = document.querySelector('[class*="b&w"]');
    if (bwCard) {
        bwCard.classList.add('fade-in');
        observer.observe(bwCard);
    }

    productCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery__block_1');
    galleryItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
}

// ============================================
// Image Loading Animation
// ============================================

export function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.setAttribute('data-loaded', 'true');
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.setAttribute('data-loaded', 'true');
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.setAttribute('data-loaded', 'true');
                this.style.opacity = '1';
            });
        }
    });
}

// ============================================
// Product Name Hover Animation
// ============================================

export function initProductHover() {
    const productNames = document.querySelectorAll('.info__1, .info__2, .read__info, ' +
        '.black__info, .bw__info, .winter__info, .tea__info, .handle__info, ' +
        '.espresso__info, .pink__info, .summer__info');
    
    productNames.forEach(name => {
        name.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        name.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// Lazy Loading for Images
// ============================================

export function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

