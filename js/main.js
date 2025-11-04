// ============================================
// Main Application Entry Point
// ============================================

import { initSmoothScroll, initScrollToTop } from './components/scroll.js';
import { initHeaderScroll, initParallax } from './components/header.js';
import { 
    initFadeInAnimations, 
    initImageLoading, 
    initProductHover,
    initLazyLoading 
} from './components/animations.js';
import { initCart } from './components/cart.js';
import { initFormValidation } from './components/forms.js';
import { initMobileMenu } from './components/menu.js';

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Scroll functionality
    initSmoothScroll();
    initScrollToTop();
    
    // Header effects
    initHeaderScroll();
    initParallax();
    
    // Animations
    initFadeInAnimations();
    initImageLoading();
    initProductHover();
    initLazyLoading();
    
    // Cart functionality
    initCart();
    
    // Form validation
    initFormValidation();
    
    // Mobile menu
    initMobileMenu();

    // Console welcome message
    console.log('%c☕ Coffee Mugs - Добро пожаловать!', 
        'color: #A25F4B; font-size: 20px; font-weight: bold;');
    console.log('%cВсе функции JavaScript активированы', 
        'color: #1D1F2E; font-size: 12px;');
});

