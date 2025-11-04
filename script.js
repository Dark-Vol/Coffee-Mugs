// ============================================
// Smooth Scrolling
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // Intersection Observer for Fade-in Animations
    // ============================================
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

    // ============================================
    // Scroll to Top Button
    // ============================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // Cart Functionality
    // ============================================
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('.basket__logo');
    const cartCount = document.querySelector('.circle__logo');

    // Update cart count display
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            const countElement = cartCount.querySelector('img');
            if (countElement && totalItems > 0) {
                // Create or update count badge
                let badge = cartCount.querySelector('.cart-badge');
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge';
                    badge.style.cssText = `
                        position: absolute;
                        background: #A25F4B;
                        color: white;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        font-weight: bold;
                        top: -5px;
                        right: -5px;
                    `;
                    cartCount.style.position = 'relative';
                    cartCount.appendChild(badge);
                }
                badge.textContent = totalItems;
                badge.style.display = 'flex';
            } else if (badge) {
                badge.style.display = 'none';
            }
        }
    }

    // Show cart notification
    function showCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `${productName} добавлен в корзину!`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add product to cart
    function addToCart(productName, price) {
        const existingItem = cart.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showCartNotification(productName);
    }

    // Add click handlers to product cards
    const productImages = document.querySelectorAll(
        '.pink__coffee img, .gold__coffee img, .read__logo img, ' +
        '.black__logo img, .bw__logo img, .winter__logo img, ' +
        '.tea__logo img, .handle__logo img, .espresso__logo img, ' +
        '.pink__logo img, .summer__logo img'
    );

    productImages.forEach(img => {
        img.addEventListener('click', function() {
            // Find parent card container
            let productCard = this.closest('.info__pink_coffee, .info__gold_coffee');
            
            if (!productCard) {
                productCard = this.closest('[class*="coffee__"]');
            }
            
            if (productCard) {
                // Try to find product name
                let productName = 'Товар';
                const nameSelectors = [
                    '[class*="info"]',
                    '[class*="__info"]',
                    '.read__info, .black__info, .bw__info, .winter__info, ' +
                    '.tea__info, .handle__info, .espresso__info, .pink__info, .summer__info'
                ];
                
                for (const selector of nameSelectors) {
                    const nameElement = productCard.querySelector(selector);
                    if (nameElement && nameElement.textContent.trim()) {
                        productName = nameElement.textContent.trim();
                        break;
                    }
                }
                
                // Try to find price
                let price = 0;
                const priceElement = productCard.querySelector('[class*="price"]');
                if (priceElement) {
                    const priceText = priceElement.textContent;
                    const priceMatch = priceText.match(/\$?(\d+\.?\d*)/);
                    if (priceMatch) {
                        price = parseFloat(priceMatch[1]);
                    }
                }
                
                addToCart(productName, price);
            }
        });
    });

    // Initialize cart count
    updateCartCount();

    // ============================================
    // Form Validation and Submission
    // ============================================
    const subscribeForm = document.querySelector('.question');
    const emailInput = document.querySelector('.despatch p');
    
    if (subscribeForm) {
        const button = subscribeForm.querySelector('.button');
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create input if it doesn't exist
                let input = document.querySelector('.despatch input');
                if (!input) {
                    input = document.createElement('input');
                    input.type = 'email';
                    input.placeholder = 'customer @coffestyle.io';
                    input.style.cssText = `
                        width: 100%;
                        padding: 18px 20px;
                        border: 1px solid #2F303E;
                        background: transparent;
                        color: #FFFFFF;
                        font-family: 'Karla';
                        font-size: 12px;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                    `;
                    const despatch = document.querySelector('.despatch');
                    if (despatch && emailInput) {
                        despatch.replaceChild(input, emailInput);
                    }
                }
                
                const email = input.value.trim();
                
                if (!email) {
                    alert('Пожалуйста, введите email адрес');
                    input.focus();
                    return;
                }
                
                if (!validateEmail(email)) {
                    alert('Пожалуйста, введите корректный email адрес');
                    input.focus();
                    return;
                }
                
                // Simulate form submission
                button.textContent = 'Отправка...';
                button.disabled = true;
                
                setTimeout(() => {
                    alert('Спасибо за подписку! Проверьте вашу почту.');
                    input.value = '';
                    button.textContent = 'subscribe';
                    button.disabled = false;
                }, 1500);
            });
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ============================================
    // Mobile Menu Enhancement
    // ============================================
    const menuToggle = document.getElementById('btn_menu');
    const menu = document.querySelector('.header__nav');
    
    if (menuToggle && menu) {
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (menuToggle.checked && !menu.contains(e.target) && !e.target.closest('.btn_menu')) {
                menuToggle.checked = false;
            }
        });

        // Close menu when clicking on a link
        const menuLinks = menu.querySelectorAll('.header__link');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.checked = false;
            });
        });
    }

    // ============================================
    // Image Loading Animation
    // ============================================
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

    // ============================================
    // Parallax Effect for Intro Section
    // ============================================
    const intro = document.querySelector('.intro');
    
    if (intro) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            intro.style.transform = `translateY(${rate}px)`;
        });
    }

    // ============================================
    // Product Name Hover Animation
    // ============================================
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

    // ============================================
    // Lazy Loading for Images
    // ============================================
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

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c☕ Coffee Mugs - Добро пожаловать!', 
        'color: #A25F4B; font-size: 20px; font-weight: bold;');
    console.log('%cВсе функции JavaScript активированы', 
        'color: #1D1F2E; font-size: 12px;');
});

