/**
 * Simple SPA Router for NeoTech Multi-Page Experience
 * Handles client-side routing with smooth transitions
 */
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.isTransitioning = false;
        this.transitionDuration = 500;
        
        this.init();
    }
    
    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.navigateToPath(location.pathname, false);
        });
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[data-route]') || e.target.closest('a[data-route]')) {
                e.preventDefault();
                const link = e.target.matches('a[data-route]') ? e.target : e.target.closest('a[data-route]');
                this.navigateTo(link.getAttribute('data-route'));
            }
        });
        
        // Initialize current route
        this.navigateToPath(location.pathname, false);
    }
    
    /**
     * Register a route with its handler
     */
    register(path, handler, options = {}) {
        this.routes.set(path, {
            handler,
            title: options.title || 'NeoTech',
            description: options.description || '',
            transition: options.transition || 'fade'
        });
        return this;
    }
    
    /**
     * Navigate to a route
     */
    navigateTo(path, pushState = true) {
        if (this.isTransitioning || this.currentRoute === path) return;
        
        this.navigateToPath(path, pushState);
    }
    
    /**
     * Navigate to path with transition
     */
    async navigateToPath(path, pushState = true) {
        const route = this.routes.get(path);
        if (!route) {
            console.warn(`Route ${path} not found, falling back to home`);
            path = '/';
            route = this.routes.get('/');
        }
        
        if (!route) return;
        
        this.isTransitioning = true;
        
        // Update URL
        if (pushState) {
            history.pushState({ path }, route.title, path);
        }
        
        // Update document title
        document.title = route.title;
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = route.description;
        }
        
        // Execute transition out
        await this.transitionOut();
        
        // Execute route handler
        await route.handler();
        
        // Execute transition in
        await this.transitionIn(route.transition);
        
        this.currentRoute = path;
        this.isTransitioning = false;
        
        // Trigger route change event
        window.dispatchEvent(new CustomEvent('routechange', {
            detail: { path, route }
        }));
    }
    
    /**
     * Transition out animation
     */
    async transitionOut() {
        const main = document.querySelector('main');
        if (!main) return;
        
        main.style.transition = `opacity ${this.transitionDuration}ms ease, transform ${this.transitionDuration}ms ease`;
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px) scale(0.98)';
        
        return new Promise(resolve => {
            setTimeout(resolve, this.transitionDuration);
        });
    }
    
    /**
     * Transition in animation
     */
    async transitionIn(transitionType = 'fade') {
        const main = document.querySelector('main');
        if (!main) return;
        
        // Reset styles
        main.style.opacity = '0';
        
        switch (transitionType) {
            case 'slide-left':
                main.style.transform = 'translateX(100px)';
                break;
            case 'slide-right':
                main.style.transform = 'translateX(-100px)';
                break;
            case 'slide-up':
                main.style.transform = 'translateY(50px)';
                break;
            case 'scale':
                main.style.transform = 'scale(0.9)';
                break;
            default:
                main.style.transform = 'translateY(20px)';
        }
        
        // Trigger reflow
        main.offsetHeight;
        
        // Animate in
        requestAnimationFrame(() => {
            main.style.opacity = '1';
            main.style.transform = 'translateX(0) translateY(0) scale(1)';
        });
        
        return new Promise(resolve => {
            setTimeout(resolve, this.transitionDuration);
        });
    }
    
    /**
     * Get current route
     */
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    /**
     * Check if currently on a specific route
     */
    isCurrentRoute(path) {
        return this.currentRoute === path;
    }
}

// Export router instance
window.router = new Router();