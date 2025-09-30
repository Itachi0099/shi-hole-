/**
 * Products Page - AI Demos and Interactive Features
 */

class ProductsPage {
    constructor() {
        this.currentDemo = null;
        this.isAnimating = false;
        this.init();
    }
    
    init() {
        this.setupProductCards();
        this.setupAIDemo();
        this.setupInteractiveFeatures();
        this.startBackgroundAnimations();
    }
    
    setupProductCards() {
        const cards = document.querySelectorAll('.product-card-3d');
        
        cards.forEach((card, index) => {
            // 3D flip effect
            card.addEventListener('mouseenter', () => this.flipCard(card, true));
            card.addEventListener('mouseleave', () => this.flipCard(card, false));
            
            // Parallax mouse tracking
            card.addEventListener('mousemove', (e) => this.trackMouse(card, e));
            
            // Staggered entrance animation
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 200);
        });
    }
    
    flipCard(card, isHover) {
        const front = card.querySelector('.card-front');
        const back = card.querySelector('.card-back');
        
        if (isHover) {
            front.style.transform = 'rotateY(-180deg)';
            back.style.transform = 'rotateY(0deg)';
            card.style.transform = 'translateZ(50px) scale(1.05)';
        } else {
            front.style.transform = 'rotateY(0deg)';
            back.style.transform = 'rotateY(180deg)';
            card.style.transform = 'translateZ(0px) scale(1)';
        }
    }
    
    trackMouse(card, e) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        
        card.style.transform += ` rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
    }
    
    setupAIDemo() {
        this.createChatBot();
        this.createCodeGenerator();
        this.createImageProcessor();
        this.createVoiceRecognition();
    }
    
    createChatBot() {
        const chatContainer = document.getElementById('ai-chat-demo');
        if (!chatContainer) return;
        
        const messages = [
            { type: 'bot', text: 'Hello! I\'m NeoTech AI. How can I help you today?' },
            { type: 'user', text: 'Can you explain quantum computing?' },
            { type: 'bot', text: 'Quantum computing harnesses quantum mechanics to process information exponentially faster than classical computers...' },
            { type: 'user', text: 'That\'s amazing! What are the applications?' },
            { type: 'bot', text: 'Great question! Quantum computing has applications in cryptography, drug discovery, financial modeling, and AI optimization...' }
        ];
        
        let messageIndex = 0;
        
        const addMessage = () => {
            if (messageIndex >= messages.length) return;
            
            const message = messages[messageIndex];
            const messageEl = document.createElement('div');
            messageEl.className = `chat-message ${message.type}-message`;
            messageEl.innerHTML = `
                <div class="message-bubble">
                    <div class="typing-animation" style="display: ${message.type === 'bot' ? 'block' : 'none'}">
                        <span></span><span></span><span></span>
                    </div>
                    <p style="display: none">${message.text}</p>
                </div>
            `;
            
            chatContainer.appendChild(messageEl);
            
            // Animate typing
            setTimeout(() => {
                const typing = messageEl.querySelector('.typing-animation');
                const text = messageEl.querySelector('p');
                if (typing) typing.style.display = 'none';
                text.style.display = 'block';
                
                // Typewriter effect
                this.typeWriter(text, message.text, 50);
            }, message.type === 'bot' ? 1000 : 100);
            
            messageIndex++;
            setTimeout(addMessage, 3000);
        };
        
        // Start chat simulation
        setTimeout(addMessage, 1000);
    }
    
    typeWriter(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
    
    createCodeGenerator() {
        const codeDemo = document.getElementById('code-generator-demo');
        if (!codeDemo) return;
        
        const codeExamples = [
            {
                prompt: 'Create a React component for user authentication',
                code: `import React, { useState } from 'react';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Authentication logic here
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthForm;`
            },
            {
                prompt: 'Generate Python ML model training script',
                code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load and prepare data
data = pd.read_csv('dataset.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f'Model accuracy: {accuracy:.2f}')

# Save model
import joblib
joblib.dump(model, 'trained_model.pkl')`
            }
        ];
        
        let currentExample = 0;
        
        const generateCode = () => {
            const example = codeExamples[currentExample];
            const promptEl = codeDemo.querySelector('.code-prompt');
            const codeEl = codeDemo.querySelector('.generated-code');
            const button = codeDemo.querySelector('.generate-btn');
            
            button.textContent = 'Generating...';
            button.disabled = true;
            
            // Clear previous code
            codeEl.textContent = '';
            promptEl.textContent = example.prompt;
            
            // Simulate AI thinking
            setTimeout(() => {
                this.typeWriter(codeEl, example.code, 20);
                button.textContent = 'Generate Another';
                button.disabled = false;
                
                currentExample = (currentExample + 1) % codeExamples.length;
            }, 2000);
        };
        
        const generateBtn = codeDemo.querySelector('.generate-btn');
        generateBtn.addEventListener('click', generateCode);
        
        // Auto-generate first example
        setTimeout(generateCode, 1000);
    }
    
    createImageProcessor() {
        const imageDemo = document.getElementById('image-processor-demo');
        if (!imageDemo) return;
        
        const canvas = imageDemo.querySelector('#demo-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;
        
        // Draw example image
        ctx.fillStyle = '#667eea';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some "AI processing" effects
        const addFilter = (filterName) => {
            const processingOverlay = document.createElement('div');
            processingOverlay.className = 'processing-overlay';
            processingOverlay.innerHTML = `
                <div class="processing-spinner"></div>
                <p>Applying ${filterName}...</p>
            `;
            
            imageDemo.appendChild(processingOverlay);
            
            setTimeout(() => {
                // Simulate filter application
                switch (filterName) {
                    case 'Edge Detection':
                        ctx.filter = 'contrast(200%) brightness(150%)';
                        break;
                    case 'Blur':
                        ctx.filter = 'blur(5px)';
                        break;
                    case 'Sharpen':
                        ctx.filter = 'contrast(150%) brightness(110%)';
                        break;
                    default:
                        ctx.filter = 'none';
                }
                
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                processingOverlay.remove();
            }, 2000);
        };
        
        const filterButtons = imageDemo.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                addFilter(btn.textContent);
            });
        });
    }
    
    createVoiceRecognition() {
        const voiceDemo = document.getElementById('voice-recognition-demo');
        if (!voiceDemo) return;
        
        const startBtn = voiceDemo.querySelector('.start-voice-btn');
        const transcript = voiceDemo.querySelector('.voice-transcript');
        const waveform = voiceDemo.querySelector('.voice-waveform');
        
        let isListening = false;
        
        const simulateVoiceRecognition = () => {
            if (isListening) {
                stopListening();
                return;
            }
            
            isListening = true;
            startBtn.textContent = 'Stop Listening';
            startBtn.classList.add('listening');
            
            // Animate waveform
            this.animateWaveform(waveform);
            
            // Simulate speech recognition
            const phrases = [
                'Hello, can you help me with my project?',
                'I need to integrate AI into my application.',
                'What are the best practices for machine learning?',
                'How do I optimize my neural network performance?'
            ];
            
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            
            setTimeout(() => {
                transcript.textContent = randomPhrase;
                stopListening();
            }, 3000);
        };
        
        const stopListening = () => {
            isListening = false;
            startBtn.textContent = 'Start Listening';
            startBtn.classList.remove('listening');
            waveform.innerHTML = '';
        };
        
        startBtn.addEventListener('click', simulateVoiceRecognition);
    }
    
    animateWaveform(container) {
        container.innerHTML = '';
        
        const createBar = () => {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';
            bar.style.height = Math.random() * 50 + 10 + 'px';
            bar.style.animationDelay = Math.random() * 0.5 + 's';
            return bar;
        };
        
        // Create animated bars
        for (let i = 0; i < 20; i++) {
            container.appendChild(createBar());
        }
        
        // Update bars periodically
        const updateInterval = setInterval(() => {
            if (!container.querySelector('.waveform-bar')) {
                clearInterval(updateInterval);
                return;
            }
            
            const bars = container.querySelectorAll('.waveform-bar');
            bars.forEach(bar => {
                bar.style.height = Math.random() * 50 + 10 + 'px';
            });
        }, 150);
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