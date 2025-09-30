class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.init();
    }
    
    init() {
        window.addEventListener('popstate', () => this.navigateToPath(location.pathname, false));
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-route]');
            if (link) {
                e.preventDefault();
                this.navigateTo(link.getAttribute('data-route'));
            }
        });
        this.navigateToPath(location.pathname, false);
    }
    
    register(path, handler, options = {}) {
        this.routes.set(path, { handler, ...options });
        return this;
    }
    
    navigateTo(path) {
        if (this.currentRoute === path) return;
        this.navigateToPath(path, true);
    }
    
    async navigateToPath(path, pushState) {
        const route = this.routes.get(path) || this.routes.get('/');
        if (!route) return;
        
        if (pushState) history.pushState({ path }, route.title || 'NeoTech', path);
        document.title = route.title || 'NeoTech';
        
        const main = document.querySelector('main');
        if (main) {
            main.style.opacity = '0';
            setTimeout(async () => {
                await route.handler();
                main.style.opacity = '1';
            }, 200);
        }
        
        this.currentRoute = path;
    }
}

window.router = new Router();
