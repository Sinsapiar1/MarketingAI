// js/app.js - Core Application Manager
class AffiliateApp {
    constructor() {
        this.modules = new Map();
        this.state = {
            user: null,
            settings: {},
            theme: 'light',
            language: 'en',
            apiKey: null
        };
        this.init();
    }

    async init() {
        // Inicializar Firebase
        await this.initFirebase();
        
        // Cargar configuración del usuario
        this.loadUserSettings();
        
        // Inicializar módulos
        this.registerModules();
        
        // Configurar router
        this.setupRouter();
        
        // Aplicar tema e idioma
        this.applyTheme();
        this.applyLanguage();
    }

    registerModules() {
        // Registrar todos los módulos
        this.modules.set('productDetector', new ProductDetector());
        this.modules.set('contentGenerator', new ContentGenerator());
        this.modules.set('offerValidator', new OfferValidator());
        this.modules.set('avatarGenerator', new AvatarGenerator());
        this.modules.set('funnelArchitect', new FunnelArchitect());
        this.modules.set('profitCalculator', new ProfitCalculator());
    }

    loadUserSettings() {
        const stored = localStorage.getItem('userSettings');
        if (stored) {
            const settings = JSON.parse(stored);
            this.state.apiKey = settings.apiKey;
            this.state.theme = settings.theme || 'light';
            this.state.language = settings.language || 'en';
        }
    }

    saveUserSettings() {
        const settings = {
            apiKey: this.state.apiKey,
            theme: this.state.theme,
            language: this.state.language,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }

    async initFirebase() {
        // Firebase ya está inicializado en config.js, pero aseguramos auth ref
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        // Listener de usuario
        this.auth.onAuthStateChanged((user) => {
            this.state.user = user;
        });
    }

    setupRouter() {
        if (typeof HashRouter !== 'undefined') {
            new HashRouter();
        }
    }

    applyTheme() {
        document.body.classList.toggle('dark', this.state.theme === 'dark');
    }

    applyLanguage() {
        // Placeholder para i18n futuramente
    }
}

// Inicializar la app
const app = new AffiliateApp();