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

function getContactPageHTML() {
    return `
        <div class="contact-page">
            <section class="contact-hero">
                <div class="container">
                    <h1 class="page-title gradient-text">Contact</h1>
                    <p class="page-subtitle">Get in touch with us</p>
                </div>
            </section>
            
            <section class="contact-content-section">
                <div class="container">
                    <div class="contact-layout">
                        <div class="contact-info">
                            <div class="contact-info-item">
                                <i class="fas fa-envelope contact-icon"></i>
                                <div><h4>Email</h4><p>hello@neotech.com</p></div>
                            </div>
                            <div class="contact-info-item">
                                <i class="fas fa-phone contact-icon"></i>
                                <div><h4>Phone</h4><p>+1 (555) 123-4567</p></div>
                            </div>
                        </div>
                        
                        <div class="contact-form-container glass-card">
                            <form id="contact-form">
                                <div class="form-step active">
                                    <h3>Contact Info</h3>
                                    <div class="form-group">
                                        <input type="text" name="name" placeholder="Name" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" name="email" placeholder="Email" class="form-control" required>
                                    </div>
                                    <div class="form-group">
                                        <textarea name="message" placeholder="Message" class="form-control" required></textarea>
                                    </div>
                                    <button type="submit" class="form-submit-btn">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

window.getProductsPageHTML = getProductsPageHTML;
window.getPortfolioPageHTML = getPortfolioPageHTML;
window.getDashboardPageHTML = getDashboardPageHTML;
window.getContactPageHTML = getContactPageHTML;
