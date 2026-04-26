/* ===================================
   SWEETVILLA - ANIMATIONS & INTERACTIONS
   Professional JavaScript for E-Commerce
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPageLoader();
    initNavbarScroll();
    initScrollAnimations();
    initProductCards();
    initCartAnimations();
    initSmoothScroll();
    initParallaxEffects();
    initHoverEffects();
});

/* ===================================
   PAGE LOADER
   =================================== */

function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger entrance animations after loader hides
            document.body.classList.add('loaded');
        }, 1500);
    }
}

/* ===================================
   NAVBAR SCROLL EFFECT
   =================================== */

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-custom');
    if (!navbar) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Navbar collapse on link click (mobile)
    const navLinks = document.querySelectorAll('.nav-item .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

/* ===================================
   SCROLL ANIMATIONS
   =================================== */

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.product-card, .section-title, .footer-section, .carousel-section'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Add CSS for scroll animations
    addScrollAnimationStyles();
}

function addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-on-scroll.delay-1 { transition-delay: 0.1s; }
        .animate-on-scroll.delay-2 { transition-delay: 0.2s; }
        .animate-on-scroll.delay-3 { transition-delay: 0.3s; }
        .animate-on-scroll.delay-4 { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
}

/* ===================================
   PRODUCT CARDS
   =================================== */

function initProductCards() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });

        // Quick view button animation
        const quickViewBtn = card.querySelector('[id^="qv"]');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                animateButton(this);
                // Add your quick view logic here
            });
        }
    });
}

/* ===================================
   CART ANIMATIONS
   =================================== */

function initCartAnimations() {
    const cartBtn = document.getElementById('popcart');
    const cartCount = document.getElementById('cart');
    
    if (cartBtn && cartCount) {
        // Animate cart count when updated
        const originalText = cartCount.textContent;
        
        // Watch for cart updates (custom event)
        document.addEventListener('cartUpdated', function(e) {
            animateCartCount(cartCount, e.detail.count);
        });
    }

    // Checkout button animation
    const checkoutBtn = document.getElementById('checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            animateButton(this);
        });
    }
}

function animateCartCount(element, newCount) {
    element.textContent = newCount;
    element.parentElement.classList.add('bounce');
    
    setTimeout(() => {
        element.parentElement.classList.remove('bounce');
    }, 500);

    // Add bounce animation style
    if (!document.getElementById('cart-anim-style')) {
        const style = document.createElement('style');
        style.id = 'cart-anim-style';
        style.textContent = `
            @keyframes cartBounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.3); }
            }
            .bounce {
                animation: cartBounce 0.5s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

/* ===================================
   SMOOTH SCROLL
   =================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===================================
   PARALLAX EFFECTS
   =================================== */

function initParallaxEffects() {
    const headerSection = document.querySelector('.header-section');
    
    if (headerSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            headerSection.style.backgroundPositionY = rate + 'px';
        });
    }
}

/* ===================================
   HOVER EFFECTS
   =================================== */

function initHoverEffects() {
    // Image zoom on hover
    const zoomImages = document.querySelectorAll('.product-card img, .footer-logo img');
    zoomImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);

    // Add ripple styles
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
}

/* ===================================
   BUTTON ANIMATIONS
   =================================== */

function animateButton(button) {
    button.classList.add('clicked');
    
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 200);

    // Add clicked animation style
    if (!document.getElementById('btn-anim-style')) {
        const style = document.createElement('style');
        style.id = 'btn-anim-style';
        style.textContent = `
            @keyframes btnClick {
                0% { transform: scale(1); }
                50% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }
            .clicked {
                animation: btnClick 0.2s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

/* ===================================
   CAROUSEL ENHANCEMENTS
   =================================== */

function initCarouselEnhancements() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                carousel.querySelector('.carousel-control-next')?.click();
            } else {
                // Swipe right - previous slide
                carousel.querySelector('.carousel-control-prev')?.click();
            }
        }
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.pause();
        }
    });

    carousel.addEventListener('mouseleave', () => {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.cycle();
        }
    });
}

/* ===================================
   LAZY LOADING IMAGES
   =================================== */

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Add lazy load styles
    const style = document.createElement('style');
    style.textContent = `
        img[data-src] {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

/* ===================================
   TOAST NOTIFICATIONS
   =================================== */

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);

    // Add toast styles
    addToastStyles();
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function addToastStyles() {
    if (document.getElementById('toast-style')) return;
    
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
        .toast-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
        }
        .toast-notification.show {
            transform: translateX(0);
        }
        .toast-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .toast-success i { color: #27ae60; }
        .toast-error i { color: #e74c3c; }
        .toast-warning i { color: #f39c12; }
        .toast-info i { color: #3498db; }
    `;
    document.head.appendChild(style);
}

/* ===================================
   SEARCH FUNCTIONALITY
   =================================== */

function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value.trim();
            if (query.length >= 3) {
                performSearch(query);
            }
        }, 500);
    });
}

function performSearch(query) {
    // Add search loading state
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.classList.add('loading');
    }
    
    // Your search logic here
    console.log('Searching for:', query);
}

/* ===================================
   SCROLL TO TOP BUTTON
   =================================== */

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #e74c3c;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 9999;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
    });
}

/* ===================================
   COUNTER ANIMATION
   =================================== */

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

/* ===================================
   MODAL ENHANCEMENTS
   =================================== */

function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            modal.style.opacity = '0';
        });
        
        modal.addEventListener('shown.bs.modal', () => {
            modal.style.opacity = '1';
        });
    });

    // Add modal transition styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

/* ===================================
   FORM VALIDATION
   =================================== */

function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

/* ===================================
   KEYBOARD SHORTCUTS
   =================================== */

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modal = bootstrap.Modal.getInstance(openModal);
                if (modal) modal.hide();
            }
        }
        
        // Ctrl+K for search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

/* ===================================
   PERFORMANCE MONITORING
   =================================== */

function initPerformanceMonitor() {
    // Log page load time
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}

/* ===================================
   EXPORT FUNCTIONS FOR EXTERNAL USE
   =================================== */

window.SweetVilla = {
    showToast,
    animateCounter,
    animateButton
};