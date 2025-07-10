// js/modules/content-generator.js
class ContentGenerator {
    constructor() {
        this.apiManager = new APIKeyManager();
        this.contentTypes = {
            hook: {
                name: 'Hook Viral',
                templates: [
                    'Hook tipo pregunta provocativa',
                    'Hook con estadística impactante',
                    'Hook de transformación personal',
                    'Hook de controversia calculada'
                ]
            },
            copy: {
                name: 'Copy de Ventas',
                frameworks: ['AIDA', 'PAS', 'FAB', 'PASTOR']
            },
            video: {
                name: 'Script de Video',
                platforms: ['TikTok', 'YouTube Shorts', 'Instagram Reels']
            },
            email: {
                name: 'Secuencia de Email',
                sequences: ['Bienvenida', 'Nurturing', 'Lanzamiento', 'Reengagement']
            }
        };
    }

    async generateContent(type, options) {
        const apiSettings = this.apiManager.getAPIKey();
        if (!apiSettings) throw new Error('API Key no configurada');

        const prompt = this.buildContentPrompt(type, options);
        const response = await this.callAI(apiSettings, prompt);
        
        return {
            content: response,
            variations: await this.generateVariations(response, type),
            metrics: this.predictMetrics(type, response)
        };
    }

    buildContentPrompt(type, options) {
        const { product, audience, platform, tone, goal } = options;
        
        return `Genera contenido viral tipo ${type} para:
                Producto: ${product}
                Audiencia: ${audience}
                Plataforma: ${platform}
                Tono: ${tone}
                Objetivo: ${goal}
                
                Incluye:
                - Hook inicial irresistible
                - Puntos de dolor específicos
                - Beneficios claros
                - Call to action persuasivo
                - Elementos virales probados`;
    }

    async generateVariations(originalContent, type) {
        // Generar 3 variaciones automáticas
        const variations = [];
        const styles = ['más agresivo', 'más empático', 'más humorístico'];
        
        for (const style of styles) {
            const prompt = `Reescribe este contenido con un tono ${style}: ${originalContent}`;
            variations.push(await this.callAI(this.apiManager.getAPIKey(), prompt));
        }
        
        return variations;
    }

    predictMetrics(type, content) {
        // Análisis predictivo básico
        const factors = {
            hookStrength: this.analyzeHook(content),
            emotionalImpact: this.analyzeEmotion(content),
            clarity: this.analyzeClarity(content),
            urgency: this.analyzeUrgency(content)
        };
        
        const score = Object.values(factors).reduce((a, b) => a + b, 0) / 4;
        
        return {
            viralPotential: Math.round(score * 100),
            estimatedReach: Math.round(score * 10000),
            conversionPotential: Math.round(score * 5),
            factors
        };
    }

    analyzeHook(content) {
        // Análisis simple del hook
        const firstLine = content.split('\n')[0];
        const hasQuestion = firstLine.includes('?');
        const hasNumber = /\d/.test(firstLine);
        const isShort = firstLine.length < 60;
        
        return (hasQuestion ? 0.3 : 0) + (hasNumber ? 0.3 : 0) + (isShort ? 0.4 : 0);
    }

    analyzeEmotion(content) {
        // Heurística sencilla: contar emoticones o signos de exclamación
        const exclamations = (content.match(/!/g) || []).length;
        return Math.min(exclamations / 5, 1);
    }

    analyzeClarity(content) {
        const sentences = content.split(/[\.!?]/).filter(Boolean);
        const avgLength = content.length / sentences.length;
        return avgLength < 120 ? 1 : 0.5;
    }

    analyzeUrgency(content) {
        const keywords = ['hoy', 'ahora', 'última oportunidad', 'tiempo limitado'];
        const found = keywords.some((k) => content.toLowerCase().includes(k));
        return found ? 1 : 0.2;
    }

    async callAI(apiKey, prompt) {
        // Placeholder: En producción se llama al backend o servicio AI
        console.log('Enviando prompt a AI:', prompt);
        return Promise.resolve(`Contenido generado para prompt: ${prompt.substring(0, 60)}...`);
    }
}