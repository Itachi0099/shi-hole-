/**
 * HTML templates for all pages in the SPA
 */

/**
 * Get Products page HTML
 */
function getProductsPageHTML() {
    return `
        <div class="products-page">
            <div id="matrix-rain"></div>
            
            <!-- Hero Section -->
            <section class="products-hero">
                <div class="container">
                    <h1 class="page-title gradient-text">AI-Powered Products</h1>
                    <p class="page-subtitle">Experience the future of technology through our interactive demos</p>
                </div>
            </section>
            
            <!-- 3D Product Cards -->
            <section class="products-showcase">
                <div class="container">
                    <div class="products-grid">
                        <div class="product-card-3d" data-product="neural-interface">
                            <div class="card-front">
                                <div class="product-icon">
                                    <i class="fas fa-brain"></i>
                                </div>
                                <h3>Neural Interface</h3>
                                <p>AI-powered brain-computer interface</p>
                            </div>
                            <div class="card-back">
                                <h3>Neural Interface</h3>
                                <ul class="feature-list">
                                    <li>Real-time EEG analysis</li>
                                    <li>Machine learning models</li>
                                    <li>Adaptive algorithms</li>
                                    <li>Medical grade safety</li>
                                </ul>
                                <button class="demo-btn">Try Demo</button>
                            </div>
                        </div>
                        
                        <div class="product-card-3d" data-product="quantum-processor">
                            <div class="card-front">
                                <div class="product-icon">
                                    <i class="fas fa-atom"></i>
                                </div>
                                <h3>Quantum Processor</h3>
                                <p>Next-gen quantum computing platform</p>
                            </div>
                            <div class="card-back">
                                <h3>Quantum Processor</h3>
                                <ul class="feature-list">
                                    <li>Superposition computing</li>
                                    <li>Quantum entanglement</li>
                                    <li>Error correction</li>
                                    <li>Scalable qubits</li>
                                </ul>
                                <button class="demo-btn">Try Demo</button>
                            </div>
                        </div>
                        
                        <div class="product-card-3d" data-product="holographic-display">
                            <div class="card-front">
                                <div class="product-icon">
                                    <i class="fas fa-cube"></i>
                                </div>
                                <h3>Holographic Display</h3>
                                <p>3D volumetric display technology</p>
                            </div>
                            <div class="card-back">
                                <h3>Holographic Display</h3>
                                <ul class="feature-list">
                                    <li>360° viewing angles</li>
                                    <li>No special glasses</li>
                                    <li>High resolution</li>
                                    <li>Interactive gestures</li>
                                </ul>
                                <button class="demo-btn">Try Demo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- AI Demos Section -->
            <section class="ai-demos">
                <div class="container">
                    <h2 class="section-title">Interactive AI Demos</h2>
                    
                    <div class="demos-grid">
                        <!-- Chat Bot Demo -->
                        <div class="demo-card glass-card">
                            <h3>AI Chatbot</h3>
                            <div id="ai-chat-demo" class="chat-container">
                                <!-- Messages will be added dynamically -->
                            </div>
                        </div>
                        
                        <!-- Code Generator Demo -->
                        <div class="demo-card glass-card">
                            <h3>Code Generator</h3>
                            <div id="code-generator-demo">
                                <div class="code-prompt">Enter your requirement...</div>
                                <pre class="generated-code"></pre>
                                <button class="generate-btn">Generate Code</button>
                            </div>
                        </div>
                        
                        <!-- Image Processor Demo -->
                        <div class="demo-card glass-card">
                            <h3>Image Processor</h3>
                            <div id="image-processor-demo">
                                <canvas id="demo-canvas"></canvas>
                                <div class="filter-controls">
                                    <button class="filter-btn">Edge Detection</button>
                                    <button class="filter-btn">Blur</button>
                                    <button class="filter-btn">Sharpen</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Voice Recognition Demo -->
                        <div class="demo-card glass-card">
                            <h3>Voice Recognition</h3>
                            <div id="voice-recognition-demo">
                                <button class="start-voice-btn">Start Listening</button>
                                <div class="voice-waveform"></div>
                                <div class="voice-transcript">Click the button to start...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Interactive Features -->
            <section class="interactive-features">
                <div class="container">
                    <!-- Feature Comparison -->
                    <div id="feature-comparison" class="comparison-widget">
                        <h3>Before vs After</h3>
                        <div class="comparison-container">
                            <div class="before-image"></div>
                            <div class="after-image"></div>
                            <input type="range" class="comparison-slider" min="0" max="100" value="50">
                        </div>
                    </div>
                    
                    <!-- Pricing Calculator -->
                    <div id="pricing-calculator" class="calculator-widget glass-card">
                        <h3>Pricing Calculator</h3>
                        <div class="calculator-controls">
                            <div class="control-group">
                                <label>Users</label>
                                <input type="range" min="1" max="1000" value="10" data-multiplier="5">
                                <span class="control-value">10</span>
                            </div>
                            <div class="control-group">
                                <label>Storage (GB)</label>
                                <input type="range" min="1" max="1000" value="100" data-multiplier="0.1">
                                <span class="control-value">100</span>
                            </div>
                            <div class="control-group">
                                <label>API Calls (1000s)</label>
                                <input type="range" min="1" max="100" value="10" data-multiplier="2">
                                <span class="control-value">10</span>
                            </div>
                        </div>
                        <div class="calculated-price">$150/month</div>
                    </div>
                    
                    <!-- Metrics Dashboard -->
                    <div id="metrics-dashboard" class="metrics-widget">
                        <h3>Performance Metrics</h3>
                        <div class="metrics-container">
                            <div class="progress-ring" data-percentage="85">
                                <svg>
                                    <circle class="progress-circle" r="40" cx="50" cy="50"></circle>
                                </svg>
                                <div class="progress-text">0%</div>
                            </div>
                            <div id="realtime-chart"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

/**
 * Get Portfolio page HTML
 */
function getPortfolioPageHTML() {
    return `
        <div class="portfolio-page">
            <!-- Hero Section -->
            <section class="portfolio-hero">
                <div class="container">
                    <h1 class="page-title gradient-text">Our Portfolio</h1>
                    <p class="page-subtitle">Innovative projects that shape the future</p>
                </div>
            </section>
            
            <!-- Filter Controls -->
            <section class="portfolio-filters">
                <div class="container">
                    <div class="filter-controls">
                        <button class="portfolio-filter-btn active" data-category="all">All Projects</button>
                        <button class="portfolio-filter-btn" data-category="ai">AI & Machine Learning</button>
                        <button class="portfolio-filter-btn" data-category="data">Data Science</button>
                        <button class="portfolio-filter-btn" data-category="iot">IoT & Hardware</button>
                        <button class="portfolio-filter-btn" data-category="security">Cybersecurity</button>
                        <button class="portfolio-filter-btn" data-category="ar-vr">AR/VR</button>
                        <button class="portfolio-filter-btn" data-category="robotics">Robotics</button>
                    </div>
                    
                    <div class="portfolio-search-controls">
                        <input type="text" id="portfolio-search" placeholder="Search projects..." class="search-input">
                        <select id="portfolio-sort" class="sort-select">
                            <option value="date-newest">Newest First</option>
                            <option value="date-oldest">Oldest First</option>
                            <option value="title-az">Title A-Z</option>
                            <option value="title-za">Title Z-A</option>
                        </select>
                    </div>
                </div>
            </section>
            
            <!-- Portfolio Gallery -->
            <section class="portfolio-gallery-section">
                <div class="container">
                    <div id="portfolio-gallery" class="portfolio-gallery">
                        <!-- Projects will be dynamically loaded -->
                    </div>
                </div>
            </section>
            
            <!-- Geometric Background Shapes -->
            <div class="portfolio-bg-shapes">
                <div class="geometric-shape shape-1"></div>
                <div class="geometric-shape shape-2"></div>
                <div class="geometric-shape shape-3"></div>
                <div class="geometric-shape shape-4"></div>
                <div class="geometric-shape shape-5"></div>
            </div>
        </div>
    `;
}

/**
 * Get Dashboard page HTML
 */
function getDashboardPageHTML() {
    return `
        <div class="dashboard-page">
            <!-- Dashboard Header -->
            <section class="dashboard-header">
                <div class="container">
                    <h1 class="page-title gradient-text">Real-time Dashboard</h1>
                    <p class="page-subtitle">Monitor your data and analytics in real-time</p>
                </div>
            </section>
            
            <!-- Dashboard Grid -->
            <section class="dashboard-grid-section">
                <div class="container">
                    <div class="dashboard-grid">
                        <!-- Analytics Chart Widget -->
                        <div class="dashboard-widget glass-card widget-large" id="analytics-chart-widget">
                            <div class="widget-header">
                                <h3>Analytics Overview</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <!-- Chart will be added dynamically -->
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- Revenue Widget -->
                        <div class="dashboard-widget glass-card" id="revenue-widget">
                            <div class="widget-header">
                                <h3>Revenue</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <div class="revenue-amount">$0</div>
                                <div class="revenue-progress-container">
                                    <div class="revenue-progress"></div>
                                </div>
                                <div class="growth-rate">+0%</div>
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- User Activity Widget -->
                        <div class="dashboard-widget glass-card" id="user-activity-widget">
                            <div class="widget-header">
                                <h3>User Activity</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <div class="activity-feed">
                                    <!-- Activity items will be added dynamically -->
                                </div>
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- Performance Metrics Widget -->
                        <div class="dashboard-widget glass-card" id="performance-metrics-widget">
                            <div class="widget-header">
                                <h3>System Performance</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <div class="metrics-grid">
                                    <!-- Metrics will be added dynamically -->
                                </div>
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- 3D Globe Widget -->
                        <div class="dashboard-widget glass-card widget-large" id="globe-widget">
                            <div class="widget-header">
                                <h3>Global Activity</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <!-- 3D Globe canvas will be added here -->
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- Weather Widget -->
                        <div class="dashboard-widget glass-card" id="weather-widget">
                            <div class="widget-header">
                                <h3>Weather</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <!-- Weather data will be added dynamically -->
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- Stock Ticker Widget -->
                        <div class="dashboard-widget glass-card" id="stock-ticker-widget">
                            <div class="widget-header">
                                <h3>Market Data</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <div class="stock-ticker">
                                    <!-- Stock data will be added dynamically -->
                                </div>
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- Server Status Widget -->
                        <div class="dashboard-widget glass-card" id="server-status-widget">
                            <div class="widget-header">
                                <h3>Server Status</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <div class="server-list">
                                    <!-- Server status will be added dynamically -->
                                </div>
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- AI Insights Widget -->
                        <div class="dashboard-widget glass-card" id="ai-insights-widget">
                            <div class="widget-header">
                                <h3>AI Insights</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <div class="ai-insight">Loading insights...</div>
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                        
                        <!-- Social Media Feed Widget -->
                        <div class="dashboard-widget glass-card" id="social-feed-widget">
                            <div class="widget-header">
                                <h3>Social Feed</h3>
                                <div class="widget-controls">
                                    <button class="widget-fullscreen">⛶</button>
                                </div>
                            </div>
                            <div class="widget-content">
                                <div class="social-posts">
                                    <!-- Social posts will be added dynamically -->
                                </div>
                            </div>
                            <div class="widget-resize-handle"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

/**
 * Get Contact page HTML
 */
function getContactPageHTML() {
    return `
        <div class="contact-page">
            <!-- Contact Hero -->
            <section class="contact-hero">
                <div class="container">
                    <h1 class="page-title gradient-text">Get In Touch</h1>
                    <p class="page-subtitle">Ready to transform your business? Let's start the conversation.</p>
                </div>
            </section>
            
            <!-- Contact Content -->
            <section class="contact-content-section">
                <div class="container">
                    <div class="contact-layout">
                        <!-- Contact Information -->
                        <div class="contact-info">
                            <div class="contact-info-item">
                                <div class="contact-icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Office</h4>
                                    <p>123 Innovation Drive<br>San Francisco, CA 94107</p>
                                </div>
                            </div>
                            
                            <div class="contact-info-item">
                                <div class="contact-icon">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Phone</h4>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            
                            <div class="contact-info-item">
                                <div class="contact-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Email</h4>
                                    <p>hello@neotech.com</p>
                                </div>
                            </div>
                            
                            <div class="contact-info-item">
                                <div class="contact-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Business Hours</h4>
                                    <p>Mon-Fri: 9:00 AM - 6:00 PM<br>Sat-Sun: Closed</p>
                                </div>
                            </div>
                            
                            <!-- Interactive Map -->
                            <div class="contact-map-container">
                                <h4>Find Us</h4>
                                <div id="contact-map" class="contact-map">
                                    <!-- Map will be rendered here -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Contact Form -->
                        <div class="contact-form-container glass-card">
                            <div class="form-progress">
                                <div class="progress-steps">
                                    <div class="progress-step active" data-step="1">
                                        <div class="step-number">1</div>
                                        <div class="step-label">Contact Info</div>
                                    </div>
                                    <div class="progress-step" data-step="2">
                                        <div class="step-number">2</div>
                                        <div class="step-label">Project Details</div>
                                    </div>
                                    <div class="progress-step" data-step="3">
                                        <div class="step-number">3</div>
                                        <div class="step-label">Review & Submit</div>
                                    </div>
                                </div>
                                <div class="progress-bar"></div>
                            </div>
                            
                            <form id="contact-form" class="multi-step-form">
                                <!-- Step 1: Contact Information -->
                                <div class="form-step active" data-step="1">
                                    <h3>Contact Information</h3>
                                    
                                    <div class="form-group">
                                        <label for="firstName">First Name</label>
                                        <input type="text" id="firstName" name="firstName" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="lastName">Last Name</label>
                                        <input type="text" id="lastName" name="lastName" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="email">Email Address</label>
                                        <input type="email" id="email" name="email" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="phone">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" class="form-control">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="company">Company</label>
                                        <input type="text" id="company" name="company" class="form-control">
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" class="form-next-btn">Next Step</button>
                                    </div>
                                </div>
                                
                                <!-- Step 2: Project Details -->
                                <div class="form-step" data-step="2">
                                    <h3>Project Details</h3>
                                    
                                    <div class="form-group">
                                        <label for="projectType">Project Type</label>
                                        <select id="projectType" name="projectType" class="form-control" required>
                                            <option value="">Select Project Type</option>
                                            <option value="ai-ml">AI & Machine Learning</option>
                                            <option value="web-development">Web Development</option>
                                            <option value="mobile-app">Mobile App</option>
                                            <option value="data-science">Data Science</option>
                                            <option value="consulting">Consulting</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="budget">Budget Range</label>
                                        <select id="budget" name="budget" class="form-control" required>
                                            <option value="">Select Budget Range</option>
                                            <option value="under-10k">Under $10,000</option>
                                            <option value="10k-50k">$10,000 - $50,000</option>
                                            <option value="50k-100k">$50,000 - $100,000</option>
                                            <option value="100k-500k">$100,000 - $500,000</option>
                                            <option value="500k-plus">$500,000+</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="timeline">Project Timeline</label>
                                        <select id="timeline" name="timeline" class="form-control" required>
                                            <option value="">Select Timeline</option>
                                            <option value="asap">ASAP</option>
                                            <option value="1-3-months">1-3 months</option>
                                            <option value="3-6-months">3-6 months</option>
                                            <option value="6-12-months">6-12 months</option>
                                            <option value="12-plus-months">12+ months</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="message">Project Description</label>
                                        <textarea id="message" name="message" class="form-control" rows="4" required placeholder="Tell us about your project requirements, goals, and any specific features you need..."></textarea>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" class="form-prev-btn">Previous</button>
                                        <button type="button" class="form-next-btn">Next Step</button>
                                    </div>
                                </div>
                                
                                <!-- Step 3: File Upload & Review -->
                                <div class="form-step" data-step="3">
                                    <h3>Additional Information</h3>
                                    
                                    <div class="form-group">
                                        <label>Upload Files (Optional)</label>
                                        <div class="file-upload-zone">
                                            <input type="file" id="file-upload" name="fileUpload" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" style="display: none;">
                                            <div class="upload-icon">
                                                <i class="fas fa-cloud-upload-alt"></i>
                                            </div>
                                            <div class="upload-text">
                                                <span>Drag and drop your file here</span>
                                                <span>or click to browse</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label>How did you hear about us?</label>
                                        <div class="checkbox-group">
                                            <label class="checkbox-label">
                                                <input type="checkbox" name="source" value="google">
                                                <span class="checkmark"></span>
                                                Google Search
                                            </label>
                                            <label class="checkbox-label">
                                                <input type="checkbox" name="source" value="social-media">
                                                <span class="checkmark"></span>
                                                Social Media
                                            </label>
                                            <label class="checkbox-label">
                                                <input type="checkbox" name="source" value="referral">
                                                <span class="checkmark"></span>
                                                Referral
                                            </label>
                                            <label class="checkbox-label">
                                                <input type="checkbox" name="source" value="conference">
                                                <span class="checkmark"></span>
                                                Conference/Event
                                            </label>
                                            <label class="checkbox-label">
                                                <input type="checkbox" name="source" value="other">
                                                <span class="checkmark"></span>
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="checkbox-label consent-checkbox">
                                            <input type="checkbox" name="consent" value="yes" required>
                                            <span class="checkmark"></span>
                                            I agree to the <a href="#" target="_blank">Privacy Policy</a> and <a href="#" target="_blank">Terms of Service</a>
                                        </label>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" class="form-prev-btn">Previous</button>
                                        <button type="submit" class="form-submit-btn">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Export functions for global use
window.getProductsPageHTML = getProductsPageHTML;
window.getPortfolioPageHTML = getPortfolioPageHTML;
window.getDashboardPageHTML = getDashboardPageHTML;
window.getContactPageHTML = getContactPageHTML;