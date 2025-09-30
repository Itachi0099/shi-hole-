function getProductsPageHTML() {
    return `
        <div class="products-page">
            <section class="products-hero">
                <div class="container">
                    <h1 class="page-title gradient-text">AI Products</h1>
                    <p class="page-subtitle">Interactive demos and features</p>
                </div>
            </section>
            
            <section class="products-showcase">
                <div class="container">
                    <div class="products-grid">
                        <div class="product-card-3d">
                            <div class="card-front">
                                <i class="fas fa-brain product-icon"></i>
                                <h3>Neural Interface</h3>
                                <p>AI brain-computer interface</p>
                            </div>
                            <div class="card-back">
                                <h3>Features</h3>
                                <p>Real-time analysis • ML models • Safety first</p>
                                <button class="demo-btn">Try Demo</button>
                            </div>
                        </div>
                        
                        <div class="product-card-3d">
                            <div class="card-front">
                                <i class="fas fa-atom product-icon"></i>
                                <h3>Quantum Processor</h3>
                                <p>Next-gen computing</p>
                            </div>
                            <div class="card-back">
                                <h3>Features</h3>
                                <p>Superposition • Entanglement • Scalable</p>
                                <button class="demo-btn">Try Demo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="ai-demos">
                <div class="container">
                    <h2>AI Demos</h2>
                    <div class="demos-grid">
                        <div class="demo-card glass-card">
                            <h3>AI Chat</h3>
                            <div id="ai-chat-demo" class="chat-container"></div>
                        </div>
                        <div class="demo-card glass-card">
                            <h3>Code Gen</h3>
                            <div id="code-generator-demo">
                                <pre class="generated-code"></pre>
                                <button class="generate-btn">Generate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

function getPortfolioPageHTML() {
    return `
        <div class="portfolio-page">
            <section class="portfolio-hero">
                <div class="container">
                    <h1 class="page-title gradient-text">Portfolio</h1>
                    <p class="page-subtitle">Our innovative projects</p>
                </div>
            </section>
            
            <section class="portfolio-filters">
                <div class="container">
                    <div class="filter-controls">
                        <button class="portfolio-filter-btn active" data-category="all">All</button>
                        <button class="portfolio-filter-btn" data-category="ai">AI</button>
                        <button class="portfolio-filter-btn" data-category="data">Data</button>
                        <button class="portfolio-filter-btn" data-category="security">Security</button>
                    </div>
                    <input type="text" id="portfolio-search" placeholder="Search..." class="search-input">
                </div>
            </section>
            
            <section class="portfolio-gallery-section">
                <div class="container">
                    <div id="portfolio-gallery" class="portfolio-gallery"></div>
                </div>
            </section>
        </div>
    `;
}

function getDashboardPageHTML() {
    return `
        <div class="dashboard-page">
            <section class="dashboard-header">
                <div class="container">
                    <h1 class="page-title gradient-text">Dashboard</h1>
                    <p class="page-subtitle">Real-time analytics</p>
                </div>
            </section>
            
            <section class="dashboard-grid-section">
                <div class="container">
                    <div class="dashboard-grid">
                        <div class="dashboard-widget glass-card" id="analytics-chart-widget">
                            <h3>Analytics</h3>
                            <div class="widget-content"></div>
                        </div>
                        <div class="dashboard-widget glass-card" id="revenue-widget">
                            <h3>Revenue</h3>
                            <div class="revenue-amount">$0</div>
                            <div class="revenue-progress"></div>
                        </div>
                        <div class="dashboard-widget glass-card" id="user-activity-widget">
                            <h3>Activity</h3>
                            <div class="activity-feed"></div>
                        </div>
                        <div class="dashboard-widget glass-card" id="globe-widget">
                            <h3>Global</h3>
                            <div class="widget-content"></div>
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