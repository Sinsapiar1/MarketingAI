// js/auth.js
class AuthManager {
    constructor() {
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.currentUser = null;
        this.userProfile = null;
        this.init();
    }

    init() {
        // Observer de estado de autenticación
        this.auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.currentUser = user;
                await this.loadUserProfile();
                this.redirectToDashboard();
            } else {
                this.currentUser = null;
                this.userProfile = null;
                if (!window.location.pathname.includes('auth.html')) {
                    window.location.href = '/auth.html';
                }
            }
        });
    }

    async register(email, password, plan = 'free') {
        try {
            const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
            
            // Crear perfil de usuario en Firestore
            await this.db.collection('users').doc(user.uid).set({
                email: user.email,
                plan: plan,
                role: 'user',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                limits: this.getPlanLimits(plan),
                usage: {
                    productsAnalyzed: 0,
                    contentGenerated: 0,
                    funnelsCreated: 0
                },
                settings: {
                    theme: 'light',
                    language: 'es',
                    notifications: true
                }
            });

            // Enviar email de verificación
            await user.sendEmailVerification();
            
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async login(email, password) {
        try {
            const { user } = await this.auth.signInWithEmailAndPassword(email, password);
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async loadUserProfile() {
        if (!this.currentUser) return;
        
        const doc = await this.db.collection('users').doc(this.currentUser.uid).get();
        if (doc.exists) {
            this.userProfile = doc.data();
            
            // Actualizar último acceso
            await doc.ref.update({
                lastAccess: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    }

    getPlanLimits(plan) {
        const limits = {
            free: {
                productsPerMonth: 10,
                contentPerMonth: 20,
                funnelsTotal: 2,
                apiCallsPerDay: 50
            },
            pro: {
                productsPerMonth: 100,
                contentPerMonth: 500,
                funnelsTotal: 20,
                apiCallsPerDay: 1000
            },
            agency: {
                productsPerMonth: 1000,
                contentPerMonth: 5000,
                funnelsTotal: 100,
                apiCallsPerDay: 10000
            },
            enterprise: {
                productsPerMonth: -1, // Ilimitado
                contentPerMonth: -1,
                funnelsTotal: -1,
                apiCallsPerDay: -1
            }
        };
        
        return limits[plan] || limits.free;
    }

    async checkLimit(feature) {
        if (!this.userProfile) return false;
        
        const usage = this.userProfile.usage[feature] || 0;
        const limit = this.userProfile.limits[`${feature}PerMonth`];
        
        if (limit === -1) return true; // Ilimitado
        
        return usage < limit;
    }

    async incrementUsage(feature) {
        if (!this.currentUser) return;
        
        await this.db.collection('users').doc(this.currentUser.uid).update({
            [`usage.${feature}`]: firebase.firestore.FieldValue.increment(1)
        });
    }

    redirectToDashboard() {
        if (window.location.pathname.includes('auth.html')) {
            window.location.href = '/dashboard.html';
        }
    }

    async logout() {
        await this.auth.signOut();
        window.location.href = '/auth.html';
    }
}