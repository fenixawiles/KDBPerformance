// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeProductFilter();
    initializeContactForm();
    initializeAnimations();
    initializeSafariMobileFixes();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optimized navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let navbarTicking = false;
        
        const updateNavbar = () => {
            const scrolled = window.pageYOffset;
            if (scrolled > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
            navbarTicking = false;
        };
        
        const requestNavbarUpdate = () => {
            if (!navbarTicking) {
                requestAnimationFrame(updateNavbar);
                navbarTicking = true;
            }
        };
        
        window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
    }
}

// Product filtering functionality
function initializeProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter products with animation
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Create mailto link with form data
            const subjectLine = getSubjectText(subject);
            const emailBody = `
Name: ${name}
Email: ${email}

Message:
${message}
            `.trim();
            
            const mailtoLink = `mailto:info@kdbperformance.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message and reset form
            showNotification('Email client opened! Please send the message to complete your inquiry.', 'success');
            this.reset();
        });
    }
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getSubjectText(subjectValue) {
    const subjects = {
        'product-inquiry': 'Product Inquiry - KDB Performance',
        'training-session': 'Basketball Training Session Inquiry',
        'general-question': 'General Question - KDB Performance',
        'partnership': 'Partnership/Business Inquiry',
        'other': 'Website Contact - KDB Performance'
    };
    return subjects[subjectValue] || 'Contact from KDB Performance Website';
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            removeNotification(notification);
        }
    }, 5000);
}

function removeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .overview-card,
        .product-card,
        .experience-card,
        .value-card,
        .contact-method,
        .faq-item,
        .pricing-card,
        .feature-item
    `);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Optimized parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            ticking = false;
        };
        
        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    }
    
    // Enhanced floating card animations
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        // Add mouse move effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
        
        // Add random delay to animation
        card.style.animationDelay = `-${Math.random() * 6}s`;
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
const debouncedScroll = debounce(function() {
    // Any scroll-heavy operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading indicators
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Safari Mobile Fixes
function initializeSafariMobileFixes() {
    // Detect if we're on Safari mobile
    const isSafariMobile = /Safari/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isMobile = window.innerWidth <= 768;
    
    if ((isSafariMobile || isIOS) && isMobile) {
        // Add Safari mobile class to body
        document.body.classList.add('safari-mobile');
        
        // Fix viewport height for Safari mobile
        fixSafariViewportHeight();
        
        // Fix touch scrolling
        fixSafariTouchScrolling();
        
        // Fix centering issues
        fixSafariCentering();
        
        // Handle orientation changes
        handleOrientationChange();
        
        // Fix input zoom prevention
        preventInputZoom();
    }
}

// Fix Safari's dynamic viewport height issue
function fixSafariViewportHeight() {
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Also set a CSS custom property for full viewport height
        document.documentElement.style.setProperty('--full-height', `${window.innerHeight}px`);
    }
    
    // Set initial viewport height
    setViewportHeight();
    
    // Update on resize (including orientation change)
    const debouncedSetViewportHeight = debounce(setViewportHeight, 150);
    window.addEventListener('resize', debouncedSetViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 500); // Delay for orientation change
    });
    
    // Force recalculation when scrolling stops (Safari address bar)
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(setViewportHeight, 150);
    }, { passive: true });
}

// Fix touch scrolling momentum on Safari
function fixSafariTouchScrolling() {
    // Add momentum scrolling to body and main containers
    document.body.style.webkitOverflowScrolling = 'touch';
    document.body.style.overflowScrolling = 'touch';
    
    // Fix scroll bounce
    document.addEventListener('touchmove', function(e) {
        // Allow scrolling on scrollable elements
        const scrollableElements = ['INPUT', 'TEXTAREA', 'SELECT'];
        if (!scrollableElements.includes(e.target.tagName)) {
            // Check if we're at the top or bottom of the page
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            
            // Prevent bounce at top and bottom
            if (scrollTop === 0 || scrollTop + clientHeight >= scrollHeight) {
                // Allow normal scrolling in the middle
                return;
            }
        }
    }, { passive: true });
}

// Fix centering issues specific to Safari mobile
function fixSafariCentering() {
    // Fix hero section centering
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.display = 'flex';
        hero.style.alignItems = 'center';
        hero.style.justifyContent = 'center';
        hero.style.minHeight = 'var(--full-height, 100vh)';
    }
    
    // Fix any other full-height sections
    const fullHeightSections = document.querySelectorAll('.hero, .page-header');
    fullHeightSections.forEach(section => {
        section.style.minHeight = 'var(--full-height, 100vh)';
    });
    
    // Fix container centering
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.marginLeft = 'auto';
        container.style.marginRight = 'auto';
        container.style.paddingLeft = '20px';
        container.style.paddingRight = '20px';
    });
}

// Handle orientation change properly
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // Hide address bar after orientation change
        setTimeout(() => {
            window.scrollTo(0, 1);
            setTimeout(() => {
                window.scrollTo(0, 0);
                fixSafariViewportHeight();
            }, 100);
        }, 500);
    });
}

// Prevent input zoom on Safari mobile
function preventInputZoom() {
    // Get all input elements
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Ensure font-size is at least 16px to prevent zoom
        const computedStyle = window.getComputedStyle(input);
        const fontSize = parseFloat(computedStyle.fontSize);
        
        if (fontSize < 16) {
            input.style.fontSize = '16px';
        }
        
        // Add focus handlers to manage viewport
        input.addEventListener('focus', function() {
            // Temporarily disable viewport scaling
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });
        
        input.addEventListener('blur', function() {
            // Re-enable viewport scaling
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
        });
    });
}

// Additional Safari mobile utilities
function isSafariMobile() {
    return /Safari/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Fix any layout shifts on Safari mobile
function fixLayoutShifts() {
    if (isSafariMobile() || isIOS()) {
        // Prevent layout shift during address bar hide/show
        const style = document.createElement('style');
        style.textContent = `
            @supports (-webkit-touch-callout: none) {
                .hero {
                    min-height: calc(var(--vh, 1vh) * 100);
                }
                
                body.safari-mobile {
                    -webkit-text-size-adjust: 100%;
                    -webkit-font-smoothing: antialiased;
                }
                
                body.safari-mobile .hero {
                    padding-top: max(120px, env(safe-area-inset-top, 0px) + 120px);
                    padding-bottom: max(80px, env(safe-area-inset-bottom, 0px) + 80px);
                }
                
                body.safari-mobile .navbar {
                    padding-top: env(safe-area-inset-top, 0px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize layout fixes when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixLayoutShifts);
} else {
    fixLayoutShifts();
}

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        isValidEmail,
        debounce,
        throttle,
        initializeSafariMobileFixes,
        isSafariMobile,
        isIOS
    };
}
