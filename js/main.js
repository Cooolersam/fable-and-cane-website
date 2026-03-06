// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe process steps
document.querySelectorAll('.process-step').forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(step);
});

// Observe fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== ANIMATED COUNTER =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
    counterObserver.observe(el);
});

function animateCounter(element, target) {
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===== RADIO OPTION SELECTION (Shop page) =====
document.querySelectorAll('.radio-options').forEach(group => {
    const options = group.querySelectorAll('.radio-option:not(.disabled):not(.always-selected)');
    options.forEach(option => {
        option.addEventListener('click', () => {
            group.querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            const radio = option.querySelector('input[type="radio"]');
            if (radio && !radio.disabled) radio.checked = true;
        });
    });
});

// ===== OPTION BUTTON SELECTION (Homepage preview) =====
document.querySelectorAll('.option-buttons').forEach(group => {
    const buttons = group.querySelectorAll('.option-btn:not(.disabled)');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
});

// ===== PRODUCT NAVIGATION (Shop page) =====
function openProduct(productId) {
    const detail = document.getElementById('product-detail');
    if (detail) {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== ADD TO CART BUTTON =====
const addToCartBtn = document.querySelector('.add-to-cart');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Added to Cart!';
        addToCartBtn.style.background = '#4A7C2E';
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.style.background = '';
        }, 2000);
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
