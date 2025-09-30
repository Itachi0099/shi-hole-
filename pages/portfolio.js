/**
 * Portfolio Gallery - Interactive 3D Showcase with Filterable Projects
 */

class PortfolioPage {
    constructor() {
        this.projects = [];
        this.currentCategory = 'all';
        this.isAnimating = false;
        this.init();
    }
    
    init() {
        this.loadProjects();
        this.setupFilters();
        this.setupSearchField();
        this.setupLightbox();
        this.setupSortOptions();
        this.setupCubeTransition();
    }
    
    loadProjects() {
        // Sample portfolio projects data
        this.projects = [
            {
                id: 'project-1',
                title: 'Neural Interface',
                description: 'AI-powered brain-computer interface with real-time data visualization',
                category: 'ai',
                tags: ['machine learning', 'neuroscience', 'interface design'],
                image: 'https://images.unsplash.com/photo-1581089778245-3ce67677f718?w=800&h=600&fit=crop',
                date: '2024-07-15',
                client: 'NeuroTech Labs',
                featured: true
            },
            {
                id: 'project-2',
                title: 'Quantum Analytics',
                description: 'Quantum computing platform for big data processing and predictive analytics',
                category: 'data',
                tags: ['quantum', 'big data', 'analytics'],
                image: 'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=800&h=600&fit=crop',
                date: '2024-06-22',
                client: 'QuantumCorp',
                featured: true
            },
            {
                id: 'project-3',
                title: 'Digital Twin System',
                description: 'Virtual replicas of physical systems with real-time synchronization',
                category: 'iot',
                tags: ['digital twin', 'iot', 'simulation'],
                image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop',
                date: '2024-05-18',
                client: 'IndustrialX',
                featured: false
            },
            {
                id: 'project-4',
                title: 'Cryptographic Vault',
                description: 'Military-grade encryption system for sensitive data protection',
                category: 'security',
                tags: ['encryption', 'blockchain', 'security'],
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
                date: '2024-04-30',
                client: 'SecureData Inc.',
                featured: false
            },
            {
                id: 'project-5',
                title: 'Augmented Reality OS',
                description: 'Next-gen operating system for AR glasses and spatial computing',
                category: 'ar-vr',
                tags: ['augmented reality', 'spatial computing', 'UI/UX'],
                image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&h=600&fit=crop',
                date: '2024-03-10',
                client: 'FutureVision',
                featured: true
            },
            {
                id: 'project-6',
                title: 'Swarm Intelligence',
                description: 'Autonomous drone swarm with collective decision-making algorithms',
                category: 'robotics',
                tags: ['drones', 'swarm', 'autonomous'],
                image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&h=600&fit=crop',
                date: '2024-02-05',
                client: 'AeroTech Defense',
                featured: false
            },
        ];
        
        this.renderProjects();
    }
    
    renderProjects() {
        const gallery = document.getElementById('portfolio-gallery');
        if (!gallery) return;
        
        gallery.innerHTML = '';
        
        const filteredProjects = this.filterProjects();
        
        if (filteredProjects.length === 0) {
            gallery.innerHTML = '<div class="no-projects">No projects found matching your criteria</div>';
            return;
        }
        
        filteredProjects.forEach((project, index) => {
            const projectEl = document.createElement('div');
            projectEl.className = `portfolio-item ${project.featured ? 'featured' : ''} category-${project.category}`;
            projectEl.setAttribute('data-id', project.id);
            
            const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
            
            projectEl.innerHTML = `
                <div class="project-card">
                    <div class="project-front">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.title}" loading="lazy">
                        </div>
                        <div class="project-info">
                            <h3>${project.title}</h3>
                            <div class="project-category">${this.getCategoryName(project.category)}</div>
                        </div>
                    </div>
                    <div class="project-back">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-meta">
                            <div>Client: ${project.client}</div>
                            <div>Date: ${this.formatDate(project.date)}</div>
                        </div>
                        <div class="project-tags">
                            ${tagsHtml}
                        </div>
                        <div class="project-actions">
                            <button class="view-project-btn" data-project="${project.id}">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            
            gallery.appendChild(projectEl);
            
            // Staggered entrance animation
            setTimeout(() => {
                projectEl.classList.add('animate-in');
                
                // Set up 3D rotation effect
                this.setup3DCardEffect(projectEl);
            }, index * 100);
        });
        
        // Set up Isotope after rendering all items
        this.setupIsotope();
    }
    
    getCategoryName(category) {
        const categoryMap = {
            'ai': 'Artificial Intelligence',
            'data': 'Data Science',
            'iot': 'Internet of Things',
            'security': 'Cybersecurity',
            'ar-vr': 'AR/VR',
            'robotics': 'Robotics',
            'all': 'All Projects'
        };
        
        return categoryMap[category] || category;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short'
        });
    }
    
    filterProjects() {
        // Filter projects based on current category and search query
        const searchQuery = (document.getElementById('portfolio-search')?.value || '').toLowerCase();
        
        return this.projects.filter(project => {
            // Filter by category
            const categoryMatch = this.currentCategory === 'all' || project.category === this.currentCategory;
            
            // Filter by search query
            const searchMatch = !searchQuery || 
                               project.title.toLowerCase().includes(searchQuery) || 
                               project.description.toLowerCase().includes(searchQuery) ||
                               project.tags.some(tag => tag.toLowerCase().includes(searchQuery));
            
            return categoryMatch && searchMatch;
        });
    }
    
    setupFilters() {
        const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (this.isAnimating) return;
                
                const category = button.getAttribute('data-category');
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                this.currentCategory = category;
                
                this.animateFilterTransition();
            });
        });
    }
    
    animateFilterTransition() {
        if (!document.getElementById('portfolio-gallery')) return;
        
        this.isAnimating = true;
        
        // Animate out
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
        });
        
        // Re-render after transition
        setTimeout(() => {
            this.renderProjects();
            this.isAnimating = false;
        }, 500);
    }
    
    setupSearchField() {
        const searchInput = document.getElementById('portfolio-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', () => {
            if (this.searchTimeout) clearTimeout(this.searchTimeout);
            
            this.searchTimeout = setTimeout(() => {
                this.renderProjects();
            }, 300);
        });
    }
    
    setupSortOptions() {
        const sortSelect = document.getElementById('portfolio-sort');
        if (!sortSelect) return;
        
        sortSelect.addEventListener('change', () => {
            const sortBy = sortSelect.value;
            
            this.projects.sort((a, b) => {
                switch (sortBy) {
                    case 'date-newest':
                        return new Date(b.date) - new Date(a.date);
                    case 'date-oldest':
                        return new Date(a.date) - new Date(b.date);
                    case 'title-az':
                        return a.title.localeCompare(b.title);
                    case 'title-za':
                        return b.title.localeCompare(a.title);
                    default:
                        return 0;
                }
            });
            
            this.animateFilterTransition();
        });
    }
    
    setupIsotope() {
        if (typeof Isotope !== 'undefined') {
            const iso = new Isotope('#portfolio-gallery', {
                itemSelector: '.portfolio-item',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: '.portfolio-item',
                    gutter: 20
                },
                transitionDuration: '0.5s'
            });
        } else {
            console.warn('Isotope library not loaded. Falling back to CSS grid layout.');
        }
    }
    
    setup3DCardEffect(card) {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate rotation values based on mouse position
            const rotateY = (mouseX - cardCenterX) / 15;
            const rotateX = (cardCenterY - mouseY) / 15;
            
            // Apply 3D rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Apply lighting effect with pseudo-element
            const intensity = ((mouseX - cardRect.left) / cardRect.width) * 100;
            card.style.setProperty('--gradient-position', `${intensity}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
        
        // Flip card on click
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    }
    
    setupLightbox() {
        document.addEventListener('click', e => {
            if (e.target.matches('.view-project-btn')) {
                const projectId = e.target.getAttribute('data-project');
                this.openProjectLightbox(projectId);
            }
        });
    }
    
    openProjectLightbox(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        // Create lightbox element
        let lightbox = document.getElementById('project-lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'project-lightbox';
            document.body.appendChild(lightbox);
        }
        
        const relatedProjects = this.projects
            .filter(p => p.id !== projectId && p.category === project.category)
            .slice(0, 3);
        
        const relatedProjectsHTML = relatedProjects.map(p => `
            <div class="related-project" data-project="${p.id}">
                <div class="related-image">
                    <img src="${p.image}" alt="${p.title}">
                </div>
                <div class="related-title">${p.title}</div>
            </div>
        `).join('');
        
        const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        lightbox.innerHTML = `
            <div class="lightbox-background"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                
                <div class="lightbox-container">
                    <div class="project-details">
                        <div class="project-header">
                            <h2>${project.title}</h2>
                            <span class="project-category">${this.getCategoryName(project.category)}</span>
                        </div>
                        
                        <div class="project-gallery">
                            <div class="main-image">
                                <img src="${project.image}" alt="${project.title}">
                            </div>
                        </div>
                        
                        <div class="project-info-grid">
                            <div class="project-description">
                                <h3>Overview</h3>
                                <p>${project.description}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel tincidunt interdum, nisl nunc ultricies libero, vel aliquet nisl nisl sit amet nisl.</p>
                            </div>
                            
                            <div class="project-details-sidebar">
                                <div class="project-detail-item">
                                    <h4>Client</h4>
                                    <p>${project.client}</p>
                                </div>
                                <div class="project-detail-item">
                                    <h4>Completed</h4>
                                    <p>${this.formatDate(project.date)}</p>
                                </div>
                                <div class="project-detail-item">
                                    <h4>Technologies</h4>
                                    <div class="project-tags">
                                        ${tagsHtml}
                                    </div>
                                </div>
                                <div class="project-detail-item">
                                    <a href="#" class="project-link">Visit Project <i class="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="related-projects">
                            <h3>Related Projects</h3>
                            <div class="related-projects-grid">
                                ${relatedProjectsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add animation classes
        setTimeout(() => {
            lightbox.classList.add('show');
        }, 10);
        
        // Set up event listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox(lightbox);
        });
        
        lightbox.querySelector('.lightbox-background').addEventListener('click', () => {
            this.closeLightbox(lightbox);
        });
        
        // Set up related project clicks
        lightbox.querySelectorAll('.related-project').forEach(el => {
            el.addEventListener('click', () => {
                const relatedId = el.getAttribute('data-project');
                lightbox.classList.remove('show');
                setTimeout(() => {
                    this.openProjectLightbox(relatedId);
                }, 300);
            });
        });
    }
    
    closeLightbox(lightbox) {
        lightbox.classList.remove('show');
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    }
    
    setupCubeTransition() {
        window.addEventListener('beforeunload', () => {
            const cube = document.createElement('div');
            cube.className = 'page-transition-cube';
            cube.innerHTML = `
                <div class="cube-face front"></div>
                <div class="cube-face back"></div>
                <div class="cube-face left"></div>
                <div class="cube-face right"></div>
                <div class="cube-face top"></div>
                <div class="cube-face bottom"></div>
            `;
            document.body.appendChild(cube);
            
            // Apply animation
            cube.style.transform = 'scale(20) rotateX(45deg) rotateY(45deg)';
            cube.style.opacity = '1';
        });
    }
}

// Export for use in router
window.PortfolioPage = PortfolioPage;