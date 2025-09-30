class ProductsPage {
    constructor() {
        this.setupCards();
        this.setupDemos();
        this.initGSAPAnimations();
    }
    
    initGSAPAnimations() {
        // Animate page entry
        const tl = gsap.timeline();
        
        // Page header animation
        tl.from('.page-header h1', {
            opacity: 0,
            y: -50,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
        
        // Product cards with stagger
        tl.from('.product-card-3d', {
            opacity: 0,
            y: 100,
            rotationX: 45,
            scale: 0.8,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5");
        
        // Demo sections
        tl.from('.demo-section', {
            opacity: 0,
            x: -50,
            duration: 0.8,
            stagger: 0.1
        }, "-=0.8");
        
        // Add scroll-triggered animations
        this.setupScrollAnimations();
    }
    
    setupScrollAnimations() {
        // Feature highlights
        gsap.from('.feature-highlight', {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%'
            },
            opacity: 0,
            scale: 0.8,
            rotation: 10,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)"
        });
        
        // Demo cards animation
        gsap.from('.demo-card', {
            scrollTrigger: {
                trigger: '.demos-section',
                start: 'top 85%'
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.2
        });
    }
    
    setupCards() {
        document.querySelectorAll('.product-card-3d').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateCardFlip(card, true));
            card.addEventListener('mouseleave', () => this.animateCardFlip(card, false));
        });
    }
    
    animateCardFlip(card, isHover) {
        const front = card.querySelector('.card-front');
        const back = card.querySelector('.card-back');
        
        if (isHover) {
            gsap.to(front, {
                rotationY: -180,
                duration: 0.6,
                ease: "power2.inOut"
            });
            gsap.to(back, {
                rotationY: 0,
                duration: 0.6,
                ease: "power2.inOut"
            });
            gsap.to(card, {
                scale: 1.05,
                z: 50,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(front, {
                rotationY: 0,
                duration: 0.6,
                ease: "power2.inOut"
            });
            gsap.to(back, {
                rotationY: 180,
                duration: 0.6,
                ease: "power2.inOut"
            });
            gsap.to(card, {
                scale: 1,
                z: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    }
    
    setupDemos() {
        this.initChatBot();
        this.initCodeGen();
        this.initImageProcessor();
        this.initVoiceRec();
    }
    
    initChatBot() {
        const container = document.getElementById('ai-chat-demo');
        if (container) {
            container.innerHTML = '<div class="message">AI Chat Demo Active</div>';
        }
    }
    
    initCodeGen() {
        const container = document.getElementById('code-generator-demo');
        if (container) {
            container.innerHTML = '<div class="demo">Code Generator Ready</div>';
        }
    }
    
    initImageProcessor() {
        const container = document.getElementById('image-processor-demo');
        if (container) {
            container.innerHTML = '<div class="demo">Image Processor Active</div>';
        }
    }
    
    initVoiceRec() {
        const container = document.getElementById('voice-recognition-demo');
        if (container) {
            container.innerHTML = '<div class="demo">Voice Recognition Ready</div>';
        }
    }
    
    setupInteractiveFeatures() {
        // Feature comparison slider
        this.setupFeatureComparison();
        
        // Interactive pricing calculator
        this.setupPricingCalculator();
        
        // Performance metrics dashboard
        this.setupMetricsDashboard();
    }
    
    setupFeatureComparison() {
        const comparison = document.getElementById('feature-comparison');
        if (!comparison) return;
        
        const slider = comparison.querySelector('.comparison-slider');
        const beforeImage = comparison.querySelector('.before-image');
        const afterImage = comparison.querySelector('.after-image');
        
        if (slider && beforeImage && afterImage) {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                beforeImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
                afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
            });
        }
    }
    
    setupPricingCalculator() {
        const calculator = document.getElementById('pricing-calculator');
        if (!calculator) return;
        
        const sliders = calculator.querySelectorAll('input[type="range"]');
        const priceDisplay = calculator.querySelector('.calculated-price');
        
        const calculatePrice = () => {
            let totalPrice = 0;
            
            sliders.forEach(slider => {
                const value = parseInt(slider.value);
                const multiplier = parseFloat(slider.dataset.multiplier || 1);
                totalPrice += value * multiplier;
            });
            
            // Animate price change
            if (priceDisplay) {
                priceDisplay.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    priceDisplay.textContent = `$${totalPrice.toLocaleString()}/month`;
                    priceDisplay.style.transform = 'scale(1)';
                }, 150);
            }
        };
        
        sliders.forEach(slider => {
            slider.addEventListener('input', calculatePrice);
        });
        
        // Initial calculation
        calculatePrice();
    }
    
    setupMetricsDashboard() {
        const dashboard = document.getElementById('metrics-dashboard');
        if (!dashboard) return;
        
        // Create animated charts
        this.createProgressRings();
        this.createRealtimeChart();
    }
    
    createProgressRings() {
        const rings = document.querySelectorAll('.progress-ring');
        
        rings.forEach(ring => {
            const circle = ring.querySelector('.progress-circle');
            const text = ring.querySelector('.progress-text');
            const percentage = parseInt(ring.dataset.percentage || 0);
            
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            
            // Animate the ring
            setTimeout(() => {
                const offset = circumference - (percentage / 100) * circumference;
                circle.style.strokeDashoffset = offset;
                
                // Animate number counting
                this.animateCounter(text, 0, percentage, 2000);
            }, 500);
        });
    }
    
    createRealtimeChart() {
        const chartContainer = document.getElementById('realtime-chart');
        if (!chartContainer) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 200;
        chartContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const dataPoints = Array.from({ length: 50 }, () => Math.random() * 100);
        
        const drawChart = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < 10; i++) {
                const y = (canvas.height / 10) * i;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Draw data line
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            dataPoints.forEach((point, index) => {
                const x = (canvas.width / dataPoints.length) * index;
                const y = canvas.height - (point / 100) * canvas.height;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Add glow effect
            ctx.shadowColor = '#667eea';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
        };
        
        // Update chart data
        const updateChart = () => {
            dataPoints.push(Math.random() * 100);
            dataPoints.shift();
            drawChart();
        };
        
        // Initial draw
        drawChart();
        
        // Update every second
        setInterval(updateChart, 1000);
    }
    
    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 16);
    }
    
    startBackgroundAnimations() {
        // Floating particles
        this.createFloatingParticles();
        
        // Geometric shapes animation
        this.animateGeometricShapes();
        
        // Matrix rain effect
        this.createMatrixRain();
    }
    
    createFloatingParticles() {
        const container = document.body;
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                animation: float-particle ${Math.random() * 20 + 10}s infinite linear;
            `;
            
            container.appendChild(particle);
        }
        
        // Add CSS animation if not exists
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes float-particle {
                    from {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    to {
                        transform: translateY(-10vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    animateGeometricShapes() {
        const shapes = document.querySelectorAll('.geometric-shape');
        
        shapes.forEach((shape, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = Math.random() * 5 + 3;
            
            shape.style.animation = `
                geometric-float ${randomDuration}s ease-in-out infinite ${randomDelay}s,
                geometric-rotate ${randomDuration * 2}s linear infinite ${randomDelay}s
            `;
        });
    }
    
    createMatrixRain() {
        const matrixContainer = document.getElementById('matrix-rain');
        if (!matrixContainer) return;
        
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);
        
        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#667eea';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        matrixContainer.appendChild(canvas);
        setInterval(drawMatrix, 50);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// Export for use in router
window.ProductsPage = ProductsPage;