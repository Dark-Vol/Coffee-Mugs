// ============================================
// Mobile Menu Component
// ============================================

export function initMobileMenu() {
    const menuToggle = document.getElementById('btn_menu');
    const menu = document.querySelector('.header__nav');
    
    if (!menuToggle || !menu) return;
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menuToggle.checked && 
            !menu.contains(e.target) && 
            !e.target.closest('.btn_menu') &&
            !e.target.closest('#btn_menu')) {
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

    // Close menu on window resize (desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.checked = false;
        }
    });

    // Prevent body scroll when menu is open
    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

