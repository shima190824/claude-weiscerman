// ========================================
// Main JavaScript Functions
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions with error handling
    try {
        initMobileMenu();
        initSmoothScrolling();
        initScrollHeader();
        initFAQ();
        initServiceTabs();
        initFormValidation();
        initContactMethodHighlight();
        initServiceNavHiding();
        initLazyLoading();
    } catch (error) {
        console.warn('Main script initialization error:', error);
        // Core functionality will still work
    }
});

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
}

// ========================================
// Smooth Scrolling for Anchor Links
// ========================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Header Scroll Effect
// ========================================
function initScrollHeader() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        });
    }
}

// ========================================
// FAQ Accordion
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        }
    });
}

// ========================================
// Service Tabs
// ========================================
function initServiceTabs() {
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Remove active class from all tabs
            serviceTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all service details
            serviceDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Show target service detail
            const targetDetail = document.querySelector(targetId);
            if (targetDetail) {
                targetDetail.style.display = 'block';
                
                // Smooth scroll to the section
                const headerHeight = document.querySelector('.header').offsetHeight;
                const serviceNavHeight = document.querySelector('.service-nav').offsetHeight;
                const targetPosition = targetDetail.offsetTop - headerHeight - serviceNavHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set initial active tab
    if (serviceTabs.length > 0) {
        serviceTabs[0].classList.add('active');
        const firstTargetId = serviceTabs[0].getAttribute('href');
        const firstTarget = document.querySelector(firstTargetId);
        
        serviceDetails.forEach(detail => {
            detail.style.display = 'none';
        });
        
        if (firstTarget) {
            firstTarget.style.display = 'block';
        }
    }
}

// ========================================
// Form Validation
// ========================================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Service checkbox validation
        const serviceCheckboxes = contactForm.querySelectorAll('input[name="service[]"]');
        serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                validateServiceSelection();
            });
        });
    }
}

function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate service selection
    if (!validateServiceSelection()) {
        isValid = false;
    }
    
    // Validate email format
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, '正しいメールアドレスを入力してください');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'この項目は必須です');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, '正しいメールアドレスを入力してください');
        return false;
    }
    
    return true;
}

function validateServiceSelection() {
    const serviceCheckboxes = document.querySelectorAll('input[name="service[]"]');
    const isChecked = Array.from(serviceCheckboxes).some(checkbox => checkbox.checked);
    
    if (!isChecked) {
        const checkboxGroup = document.querySelector('.checkbox-group');
        if (checkboxGroup) {
            showGroupError(checkboxGroup, 'サービスを1つ以上選択してください');
        }
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#d32f2f';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.style.borderColor = '#d32f2f';
    field.parentNode.appendChild(errorDiv);
}

function showGroupError(group, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'group-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#d32f2f';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    group.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#ddd';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearAllErrors() {
    const errorDivs = document.querySelectorAll('.field-error, .group-error');
    errorDivs.forEach(div => div.remove());
    
    const fields = document.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.style.borderColor = '#ddd';
    });
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showSuccessMessage();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = '送信する';
        
        // Clear all errors
        clearAllErrors();
    }, 2000);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin-bottom: 1rem; text-align: center;">
            <strong>送信完了!</strong><br>
            お問い合わせありがとうございます。営業時間内にご返信いたします。
        </div>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ========================================
// Lazy Loading
// ========================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ========================================
// Contact Method Highlight
// ========================================
function initContactMethodHighlight() {
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance optimization
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    
    return phoneNumber;
}

// Show loading spinner
function showLoading(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
}

// Hide loading spinner
function hideLoading(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = 'auto';
}

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // You can add error reporting here
    // reportError(e.error);
});

// ========================================
// Performance Monitoring
// ========================================
window.addEventListener('load', function() {
    // Log page load performance
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime, 'ms');
    }
});

// ========================================
// Accessibility Enhancements
// ========================================

// Keyboard navigation for hamburger menu
document.addEventListener('keydown', function(e) {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        // Toggle menu with Enter or Space when hamburger is focused
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === hamburger) {
            e.preventDefault();
            hamburger.click();
        }
        
        // Close menu with Escape key
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.focus();
        }
    }
});

// Focus management for modal-like elements
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ========================================
// Browser Compatibility
// ========================================

// Polyfill for older browsers
if (!Element.prototype.closest) {
    Element.prototype.closest = function(selector) {
        let element = this;
        while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    };
}

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// ========================================
// Service Worker Registration (optional)
// ========================================

// Uncomment to enable service worker for offline functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
*/

// ========================================
// Service Navigation Hiding on Scroll
// ========================================
function initServiceNavHiding() {
    const serviceNav = document.querySelector('.service-nav');
    
    if (!serviceNav) return;
    
    let lastScrollTop = 0;
    let isNavVisible = true;
    
    window.addEventListener('scroll', throttle(function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
        const scrollDistance = Math.abs(currentScrollTop - lastScrollTop);
        
        // Only hide/show if scroll distance is significant
        if (scrollDistance > 10) {
            if (scrollDirection === 'down' && currentScrollTop > 200 && isNavVisible) {
                // Scrolling down - hide nav
                hideServiceNav(serviceNav);
                isNavVisible = false;
            } else if (scrollDirection === 'up' && !isNavVisible) {
                // Scrolling up - show nav
                showServiceNav(serviceNav);
                isNavVisible = true;
            }
        }
        
        lastScrollTop = currentScrollTop;
    }, 16));
}

function hideServiceNav(nav) {
    nav.style.transform = 'translateY(-100%)';
    nav.style.transition = 'transform 0.3s ease-in-out';
}

function showServiceNav(nav) {
    nav.style.transform = 'translateY(0)';
    nav.style.transition = 'transform 0.3s ease-in-out';
}