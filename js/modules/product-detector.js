// js/modules/product-detector.js
class ProductDetector {
  constructor() {
    this.apiEndpoint = 'https://api.allorigins.win/raw?url='; // Proxy to bypass CORS for demo
  }

  /**
   * Analiza una URL de producto (Amazon, eBay, etc.) y extrae nombre y nicho (demo).
   * @param {string} url
   * @returns {Promise<{name:string, niche:string, platform:string}>}
   */
  async detect(url) {
    try {
      const html = await fetch(this.apiEndpoint + encodeURIComponent(url)).then(r => r.text());
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      const name = titleMatch ? titleMatch[1].replace(/\|.*$/, '').trim() : 'Producto sin título';
      const platform = this.identifyPlatform(url);
      const niche = this.guessNiche(name);
      return { name, niche, platform };
    } catch (err) {
      console.error('Error detectando producto', err);
      return null;
    }
  }

  identifyPlatform(url) {
    if (url.includes('amazon')) return 'Amazon';
    if (url.includes('ebay')) return 'eBay';
    if (url.includes('aliexpress')) return 'AliExpress';
    return 'Desconocida';
  }

  guessNiche(name) {
    const niches = {
      tech: [/smartphone|laptop|tablet|pc|monitor/i],
      beauty: [/skin|cream|makeup|cosmetic/i],
      fitness: [/protein|gym|yoga|fitness|workout/i]
    };
    for (const [niche, patterns] of Object.entries(niches)) {
      if (patterns.some((p) => p.test(name))) return niche;
    }
    return 'general';
  }
}