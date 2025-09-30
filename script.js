/**
 * NeoTech - Technology Startup Homepage
 * Interactive JavaScript with glassmorphism effects and animations
 */

class NeoTechApp {
    constructor() {
        this.isInitialized = false;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.typewriterIndex = 0;
        this.typewriterSpeed = 50;
        this.isTypewriting = false;
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    /**
     * Setup all functionality
     */
    setup() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeParticles();
        this.initializeAnimations();
        this.loadTheme();
        this.startAnimationLoop();
        this.initializeTypewriter();
        this.initializeStats();
        
        this.isInitialized = true;
        console.log('🚀 NeoTech App initialized successfully!');
    }
    
    /**
     * Get all DOM elements
     */
    initializeElements() {
        this.elements = {
            // Navigation
            navToggle: document.getElementById('nav-toggle'),
            navMenu: document.getElementById('nav-menu'),
            navLinks: document.querySelectorAll('.nav-link'),
            themeToggle: document.getElementById('theme-toggle'),
            
            // Canvas and particles
            particlesCanvas: document.getElementById('particles-canvas'),
            
            // Hero section
            heroSection: document.getElementById('hero'),
            typewriterText: document.getElementById('typewriter-text'),
            ctaPrimary: document.getElementById('get-started-btn'),
            ctaSecondary: document.getElementById('watch-demo-btn'),
            scrollArrow: document.querySelector('.scroll-arrow'),
            statNumbers: document.querySelectorAll('.stat-number'),
            statBigNumbers: document.querySelectorAll('.stat-big'),
            
            // Sections for scroll animations
            sections: document.querySelectorAll('[data-scroll]'),
            
            // Contact form
            contactForm: document.getElementById('contact-form'),
            formInputs: document.querySelectorAll('.contact-form input, .contact-form textarea'),
            submitBtn: document.querySelector('.submit-btn'),
            
            // Interactive elements
            featureCards: document.querySelectorAll('.feature-card'),
            teamMembers: document.querySelectorAll('.team-member'),
            floatingCards: document.querySelectorAll('.floating-card'),
            glassCards: document.querySelectorAll('.glass-card')
        };
        
        // Setup canvas
        if (this.elements.particlesCanvas) {
            this.ctx = this.elements.particlesCanvas.getContext('2d');
            this.resizeCanvas();
        }
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Navigation toggle
        if (this.elements.navToggle) {
            this.elements.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Theme toggle
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Smooth scroll for navigation links
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Scroll arrow
        if (this.elements.scrollArrow) {
            this.elements.scrollArrow.addEventListener('click', () => {
                this.smoothScrollTo('#features');
            });
        }
        
        // CTA buttons
        if (this.elements.ctaPrimary) {
            this.elements.ctaPrimary.addEventListener('click', () => {
                this.smoothScrollTo('#contact');
            });
        }
        
        if (this.elements.ctaSecondary) {
            this.elements.ctaSecondary.addEventListener('click', () => {
                this.showModal('Watch our demo video coming soon!');
            });
        }
        
        // Contact form
        if (this.elements.contactForm) {
            this.elements.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Form input focus effects
        this.elements.formInputs.forEach(input => {
            input.addEventListener('focus', (e) => this.handleInputFocus(e));
            input.addEventListener('blur', (e) => this.handleInputBlur(e));
            input.addEventListener('input', (e) => this.handleInputChange(e));
        });
        
        // Feature cards hover effects
        this.elements.featureCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleCardHover(e, true));
            card.addEventListener('mouseleave', (e) => this.handleCardHover(e, false));
        });
        
        // Team member interactions
        this.elements.teamMembers.forEach(member => {
            member.addEventListener('mouseenter', (e) => this.handleTeamMemberHover(e, true));
            member.addEventListener('mouseleave', (e) => this.handleTeamMemberHover(e, false));
        });
        
        // Floating cards interaction
        this.elements.floatingCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleFloatingCardClick(e));
        });
    }
    
    /**
     * Initialize particle system
     */
    initializeParticles() {
        if (!this.ctx) return;
        
        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.elements.particlesCanvas.width,
                y: Math.random() * this.elements.particlesCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${240 + Math.random() * 60}, 70%, 60%)`
            });
        }
    }
    
    /**
     * Initialize scroll animations using Intersection Observer
     */
    initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections
        this.elements.sections.forEach(section => {
            observer.observe(section);
        });
        
        // Also observe individual cards and elements
        [...this.elements.featureCards, ...this.elements.teamMembers, ...this.elements.glassCards].forEach(el => {
            if (el) observer.observe(el);
        });
    }
    
    /**
     * Animate element when it comes into view
     */
    animateElement(element) {
        const animationClass = element.dataset.animation || 'fade-in-up';
        
        // Add staggered delay for grids
        const siblings = Array.from(element.parentNode.children);
        const index = siblings.indexOf(element);
        const delay = index * 100;
        
        setTimeout(() => {
            element.classList.add(animationClass);
            element.style.opacity = '1';
        }, delay);
    }
    
    /**
     * Initialize typewriter effect
     */
    initializeTypewriter() {
        if (!this.elements.typewriterText || this.isTypewriting) return;
        
        const originalText = this.elements.typewriterText.textContent;
        const words = originalText.split(' ');
        let currentWordIndex = 0;
        let currentText = '';
        
        this.elements.typewriterText.textContent = '';
        this.isTypewriting = true;
        
        const typeNextWord = () => {
            if (currentWordIndex < words.length) {
                currentText += (currentWordIndex > 0 ? ' ' : '') + words[currentWordIndex];
                this.elements.typewriterText.textContent = currentText + '|';
                currentWordIndex++;
                setTimeout(typeNextWord, 100);
            } else {
                // Remove cursor and finish
                this.elements.typewriterText.textContent = currentText;
                this.isTypewriting = false;
            }
        };
        
        // Start after a brief delay
        setTimeout(typeNextWord, 1000);
    }
    
    /**
     * Initialize animated statistics counters
     */
    initializeStats() {
        const animateCounter = (element, target, duration = 2000) => {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number based on target
                let displayValue;
                if (target >= 1000) {
                    displayValue = Math.floor(current).toLocaleString();
                } else if (target % 1 !== 0) {
                    displayValue = current.toFixed(1);
                } else {
                    displayValue = Math.floor(current);
                }
                
                element.textContent = displayValue;
            }, 16);
        };
        
        // Animate hero stats
        this.elements.statNumbers.forEach(stat => {
            const target = parseFloat(stat.dataset.count);
            if (target) {
                animateCounter(stat, target);
            }
        });
        
        // Animate about stats (with delay)
        setTimeout(() => {
            this.elements.statBigNumbers.forEach(stat => {
                const target = parseFloat(stat.dataset.count);
                if (target) {
                    animateCounter(stat, target, 1500);
                }
            });
        }, 2000);
    }
    
    /**
     * Start the animation loop for particles and effects
     */
    startAnimationLoop() {
        const animate = () => {
            this.updateParticles();
            this.renderParticles();
            requestAnimationFrame(animate);
        };
        
        if (this.ctx) {
            animate();
        }
    }
    
    /**
     * Update particle positions
     */
    updateParticles() {
        if (!this.particles.length) return;
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.01;
                particle.vy -= (dy / distance) * force * 0.01;
            }
            
            // Boundary checking
            if (particle.x < 0 || particle.x > this.elements.particlesCanvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.elements.particlesCanvas.height) {
                particle.vy *= -1;
            }
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }
    
    /**
     * Render particles on canvas
     */
    renderParticles() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.elements.particlesCanvas.width, this.elements.particlesCanvas.height);
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace('60%)', `60%, ${particle.opacity})`);
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${(100 - distance) / 400})`;
                    this.ctx.stroke();
                }
            });
        });
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        this.resizeCanvas();
        
        // Adjust particle count based on screen size
        const newParticleCount = window.innerWidth > 768 ? 50 : 25;
        if (this.particles.length !== newParticleCount) {
            this.particles = [];
            this.initializeParticles();
        }
    }
    
    /**
     * Resize canvas to window size
     */
    resizeCanvas() {
        if (!this.elements.particlesCanvas) return;
        
        this.elements.particlesCanvas.width = window.innerWidth;
        this.elements.particlesCanvas.height = window.innerHeight;
    }
    
    /**
     * Handle mouse movement for particle interaction
     */
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Add subtle parallax effect to floating cards
        this.elements.floatingCards.forEach((card, index) => {
            const speed = (index + 1) * 0.02;
            const x = (this.mouseX - window.innerWidth / 2) * speed;
            const y = (this.mouseY - window.innerHeight / 2) * speed;
            
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
    
    /**
     * Handle scroll events
     */
    handleScroll() {
        const scrollY = window.scrollY;
        const headerHeight = 80;
        
        // Update header background opacity
        const header = document.querySelector('.glass-header');
        if (header) {
            const opacity = Math.min(scrollY / headerHeight, 1);
            header.style.background = `rgba(255, 255, 255, ${0.15 + opacity * 0.1})`;
        }
        
        // Parallax effect for hero section
        if (this.elements.heroSection && scrollY < window.innerHeight) {
            this.elements.heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.elements.navToggle.classList.toggle('active');
        this.elements.navMenu.classList.toggle('active');
        document.body.style.overflow = this.elements.navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    /**
     * Handle navigation link clicks
     */
    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            this.smoothScrollTo(href);
            
            // Close mobile menu if open
            if (this.elements.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }
    
    /**
     * Smooth scroll to target element
     */
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (!element) return;
        
        const headerHeight = 80;
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    /**
     * Toggle theme (light/dark)
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('neotech-theme', newTheme);
        
        // Update theme toggle icon
        const icon = this.elements.themeToggle.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Reinitialize particles with new colors
        this.particles = [];
        this.initializeParticles();
    }
    
    /**
     * Load saved theme
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('neotech-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update theme toggle icon
        const icon = this.elements.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    /**
     * Handle form submission
     */
    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.elements.contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!this.validateForm(formObject)) {
            return;
        }
        
        // Simulate form submission
        this.simulateFormSubmission(formObject);
    }
    
    /**
     * Validate contact form
     */
    validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (errors.length > 0) {
            this.showFormErrors(errors);
            return false;
        }
        
        return true;
    }
    
    /**
     * Check if email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Show form validation errors
     */
    showFormErrors(errors) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            color: rgba(239, 68, 68, 0.9);
        `;
        
        errorContainer.innerHTML = `
            <strong>Please correct the following errors:</strong>
            <ul style="margin: 0.5rem 0 0 1rem;">
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        
        // Remove existing error container
        const existingErrors = this.elements.contactForm.querySelector('.form-errors');
        if (existingErrors) {
            existingErrors.remove();
        }
        
        // Add new error container
        this.elements.contactForm.insertBefore(errorContainer, this.elements.contactForm.firstChild);
        
        // Scroll to form
        this.smoothScrollTo('#contact');
    }
    
    /**
     * Simulate form submission
     */
    simulateFormSubmission(data) {
        const originalText = this.elements.submitBtn.innerHTML;
        
        // Show loading state
        this.elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        this.elements.submitBtn.disabled = true;
        
        // Remove any error messages
        const errorContainer = this.elements.contactForm.querySelector('.form-errors');
        if (errorContainer) {
            errorContainer.remove();
        }
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            this.showFormSuccess(data.name);
            
            // Reset form
            this.elements.contactForm.reset();
            
            // Reset button
            this.elements.submitBtn.innerHTML = originalText;
            this.elements.submitBtn.disabled = false;
        }, 2000);
    }
    
    /**
     * Show form success message
     */
    showFormSuccess(name) {
        const successContainer = document.createElement('div');
        successContainer.className = 'form-success';
        successContainer.style.cssText = `
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.2);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            color: rgba(34, 197, 94, 0.9);
            text-align: center;
        `;
        
        successContainer.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
            <strong>Thank you, ${name}!</strong><br>
            Your message has been sent successfully. We'll get back to you within 24 hours.
        `;
        
        this.elements.contactForm.insertBefore(successContainer, this.elements.contactForm.firstChild);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successContainer.parentNode) {
                successContainer.remove();
            }
        }, 5000);
    }
    
    /**
     * Handle input focus
     */
    handleInputFocus(e) {
        const formGroup = e.target.closest('.form-group');
        if (formGroup) {
            formGroup.style.transform = 'translateY(-2px)';
            formGroup.style.filter = 'brightness(1.1)';
        }
    }
    
    /**
     * Handle input blur
     */
    handleInputBlur(e) {
        const formGroup = e.target.closest('.form-group');
        if (formGroup) {
            formGroup.style.transform = '';
            formGroup.style.filter = '';
        }
    }
    
    /**
     * Handle input change
     */
    handleInputChange(e) {
        // Real-time validation feedback could go here
        // For now, just remove error styling
        e.target.style.borderColor = '';
    }
    
    /**
     * Handle feature card hover
     */
    handleCardHover(e, isHover) {
        const card = e.currentTarget;
        const icon = card.querySelector('.feature-icon');
        
        if (isHover) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        } else {
            card.style.transform = '';
            if (icon) {
                icon.style.transform = '';
            }
        }
    }
    
    /**
     * Handle team member hover
     */
    handleTeamMemberHover(e, isHover) {
        const member = e.currentTarget;
        const avatar = member.querySelector('.member-avatar');
        
        if (isHover) {
            member.style.transform = 'translateY(-5px)';
            if (avatar) {
                avatar.style.transform = 'scale(1.05)';
            }
        } else {
            member.style.transform = '';
            if (avatar) {
                avatar.style.transform = '';
            }
        }
    }
    
    /**
     * Handle floating card click
     */
    handleFloatingCardClick(e) {
        const card = e.currentTarget;
        const cardText = card.querySelector('span').textContent;
        
        // Create a nice ripple effect
        this.createRippleEffect(e.currentTarget, e);
        
        // Show info modal
        this.showModal(`🚀 ${cardText}`, `Learn more about our ${cardText.toLowerCase()} capabilities. This feature represents one of our core technological innovations.`);
    }
    
    /**
     * Create ripple effect
     */
    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        // Add ripple animation
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    /**
     * Show modal with message
     */
    showModal(title, message = '') {
        // Create modal if it doesn't exist
        let modal = document.getElementById('info-modal');
        if (!modal) {
            modal = this.createModal();
        }
        
        // Update content
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-message').textContent = message;
        
        // Show modal
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }
    
    /**
     * Create modal element
     */
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'info-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div class="modal-content" style="
                background: var(--glass-bg-strong);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 2rem;
                max-width: 400px;
                margin: 1rem;
                text-align: center;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <h3 class="modal-title" style="margin-bottom: 1rem; color: var(--text-primary);"></h3>
                <p class="modal-message" style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;"></p>
                <button class="modal-close" style="
                    background: var(--primary-gradient);
                    color: white;
                    border: none;
                    padding: 0.75rem 2rem;
                    border-radius: var(--border-radius-sm);
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                ">Close</button>
            </div>
        `;
        
        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.hideModal(modal));
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.transform = 'translateY(-2px)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.transform = '';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideModal(modal);
            }
        });
        
        document.body.appendChild(modal);
        return modal;
    }
    
    /**
     * Hide modal
     */
    hideModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.neoTechApp = new NeoTechApp();
});

// Also initialize if DOM is already loaded
if (document.readyState !== 'loading') {
    window.neoTechApp = new NeoTechApp();
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeoTechApp;
}