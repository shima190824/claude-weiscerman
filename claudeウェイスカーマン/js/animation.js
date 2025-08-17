// ========================================
// Animation JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations with error handling
    try {
        initScrollAnimations();
        initCounterAnimations();
        initParallaxEffect();
        initIndustryChartAnimation();
        initLoadingAnimations();
    } catch (error) {
        console.warn('DOMContentLoaded animation error:', error);
        // Page will still work without animations
    }
});

// ========================================
// Scroll-triggered Animations
// ========================================
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .strength-item, .case-card, .voice-card, .method-card, .feature-card, .timeline-item'
    );
    
    animateElements.forEach(element => {
        // Only set initial animation state if element is found
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        }
    });
}

// ========================================
// Counter Animations
// ========================================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.number-value, .stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// ========================================
// Parallax Effect
// ========================================
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && window.innerWidth > 768) {
        // Ensure hero section is visible first
        heroSection.style.opacity = '1';
        heroSection.style.visibility = 'visible';
        
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            // Apply transform without affecting opacity
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }, 16));
    }
}

// ========================================
// Industry Chart Animation
// ========================================
function initIndustryChartAnimation() {
    const industryBars = document.querySelectorAll('.industry-progress');
    
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent');
                
                setTimeout(() => {
                    bar.style.width = percent + '%';
                }, 200);
                
                chartObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    industryBars.forEach(bar => {
        chartObserver.observe(bar);
    });
}

// ========================================
// Loading Animations
// ========================================
function initLoadingAnimations() {
    // Staggered animation for grid items
    const grids = document.querySelectorAll('.services-grid, .strengths-grid, .cases-grid, .voices-grid');
    
    grids.forEach(grid => {
        const items = grid.children;
        
        const gridObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial state only if grid has items
        if (items.length > 0) {
            Array.from(items).forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        }
        
        gridObserver.observe(grid);
    });
}

// ========================================
// Card Hover Animations
// ========================================
function initCardHoverAnimations() {
    const cards = document.querySelectorAll('.service-card, .case-card, .voice-card, .method-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ========================================
// Button Animations
// ========================================
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

// ========================================
// Form Field Animations
// ========================================
function initFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Focus animations
            input.addEventListener('focus', function() {
                label.style.color = 'var(--primary-color)';
                label.style.transform = 'translateY(-2px)';
                label.style.transition = 'all 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.color = 'var(--text-main)';
                    label.style.transform = 'translateY(0)';
                }
            });
            
            // Input animations
            input.addEventListener('input', function() {
                this.style.borderColor = 'var(--primary-color)';
                this.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
                this.style.transition = 'all 0.3s ease';
            });
        }
    });
}

// ========================================
// Page Transition Animations
// ========================================
function initPageTransitions() {
    // Disabled to prevent hero section from disappearing
    // All page transitions are now handled by CSS only
    return;
}

// ========================================
// Scroll Progress Bar
// ========================================
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }, 16));
}

// ========================================
// Image Lazy Loading with Animation
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                // Load image
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Text Typing Animation
// ========================================
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========================================
// Floating Elements Animation
// ========================================
function initFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 200;
        const duration = 3000 + (index * 500);
        
        element.style.animation = `floating ${duration}ms ease-in-out ${delay}ms infinite`;
    });
}

// CSS for floating animation (added via JavaScript)
const floatingCSS = `
@keyframes floating {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}
`;

// Add floating CSS to document
const style = document.createElement('style');
style.textContent = floatingCSS;
document.head.appendChild(style);

// ========================================
// Pulse Animation for Important Elements
// ========================================
function addPulseAnimation(element) {
    element.style.animation = 'pulse 2s infinite';
}

const pulseCSS = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
`;

// Add pulse CSS
const pulseStyle = document.createElement('style');
pulseStyle.textContent = pulseCSS;
document.head.appendChild(pulseStyle);

// ========================================
// Timeline Animation
// ========================================
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        // Alternate sides for timeline items
        const isEven = index % 2 === 0;
        item.style.opacity = '0';
        item.style.transform = isEven ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        timelineObserver.observe(item);
    });
}

// ========================================
// Service Tab Animation
// ========================================
function animateServiceTabs() {
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('href');
            const targetDetail = document.querySelector(targetId);
            
            if (targetDetail) {
                // Fade out all service details
                serviceDetails.forEach(detail => {
                    detail.style.opacity = '0';
                    detail.style.transform = 'translateY(20px)';
                });
                
                // Fade in target detail after a short delay
                setTimeout(() => {
                    serviceDetails.forEach(detail => {
                        detail.style.display = 'none';
                    });
                    
                    targetDetail.style.display = 'block';
                    
                    setTimeout(() => {
                        targetDetail.style.opacity = '1';
                        targetDetail.style.transform = 'translateY(0)';
                    }, 50);
                }, 200);
            }
        });
    });
    
    // Set initial state
    serviceDetails.forEach(detail => {
        detail.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// ========================================
// Performance Optimization
// ========================================

// Throttle function for scroll events
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

// Debounce function for resize events
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

// ========================================
// Reduced Motion Support
// ========================================
function respectMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// Initialize All Animations
// ========================================
window.addEventListener('load', function() {
    try {
        respectMotionPreferences();
        initCardHoverAnimations();
        initButtonAnimations();
        initFormAnimations();
        initPageTransitions();
        initScrollProgress();
        initLazyLoading();
        initFloatingAnimation();
        initTimelineAnimation();
        animateServiceTabs();
    } catch (error) {
        console.warn('Animation initialization error:', error);
        // Continue without animations if there's an error
    }
});

// ========================================
// Error Handling for Animations
// ========================================
window.addEventListener('error', function(e) {
    if (e.error && e.error.message.includes('animation')) {
        console.warn('Animation error detected, falling back to basic styles');
        // Fallback to basic styles without animations
    }
});

// ========================================
// Export Functions for Testing
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initCounterAnimations,
        animateCounter,
        initParallaxEffect,
        throttle,
        debounce
    };
}