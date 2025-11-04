// ============================================
// Cart Functionality Component
// ============================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.querySelector('.basket__logo');
const cartCount = document.querySelector('.circle__logo');

// Update cart count display
export function updateCartCount() {
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
            const badge = cartCount.querySelector('.cart-badge');
            if (badge) {
                badge.style.display = 'none';
            }
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

// Initialize cart functionality
export function initCart() {
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
}

