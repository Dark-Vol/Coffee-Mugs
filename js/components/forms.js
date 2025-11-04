// ============================================
// Form Validation and Submission Component
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function initFormValidation() {
    const subscribeForm = document.querySelector('.question');
    const emailInput = document.querySelector('.despatch p');
    
    if (!subscribeForm) return;

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
                } else if (despatch) {
                    despatch.appendChild(input);
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

