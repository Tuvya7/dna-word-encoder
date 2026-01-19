/* ============================================
   DNA Word Encoder - Scroll Animations
   Intersection Observer based reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});

function initScrollAnimations() {
    // Select all elements to animate on scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (!revealElements.length) return;
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally stop observing after reveal
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(el => observer.observe(el));
    
    // Also handle stagger children
    const staggerElements = document.querySelectorAll('.stagger-children');
    staggerElements.forEach(el => observer.observe(el));
}

// Re-initialize if needed (for SPA-like behavior)
window.reinitAnimations = initScrollAnimations;
