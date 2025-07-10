// js/modules/offer-validator.js
class OfferValidator {
  /**
   * Valida un producto con métricas de ejemplo y devuelve un puntaje.
   * @param {Object} product { name, niche, platform }
   * @returns {{score:number, messages:string[]}}
   */
  validate(product) {
    const messages = [];
    let score = 0;

    // Ejemplo de métricas ficticias, en futuro se conectará a APIs externas
    const commission = this.predictCommission(product);
    const competition = this.estimateCompetition(product);
    const demand = this.estimateDemand(product);

    // Lógica simple de scoring
    if (commission > 15) {
      score += 40;
      messages.push('Alta comisión potencial.');
    } else if (commission > 8) {
      score += 25;
      messages.push('Comisión decente.');
    } else {
      score += 10;
      messages.push('Comisión baja.');
    }

    if (competition === 'low') {
      score += 30;
      messages.push('Baja competencia.');
    } else if (competition === 'medium') {
      score += 15;
      messages.push('Competencia moderada.');
    } else {
      messages.push('Alta competencia.');
    }

    if (demand > 5000) {
      score += 30;
      messages.push('Alta demanda.');
    } else if (demand > 1000) {
      score += 15;
      messages.push('Demanda aceptable.');
    } else {
      messages.push('Demanda baja.');
    }

    return {
      score: Math.min(score, 100),
      messages
    };
  }

  predictCommission(product) {
    if (product.platform === 'Amazon') return 12;
    if (product.platform === 'eBay') return 8;
    return 10;
  }

  estimateCompetition(product) {
    // Heurística simple
    if (product.niche === 'tech') return 'high';
    if (product.niche === 'beauty') return 'medium';
    return 'low';
  }

  estimateDemand(product) {
    // Demanda simulada
    const base = {
      tech: 7000,
      beauty: 4000,
      fitness: 3000,
      general: 1000
    };
    return base[product.niche] || 2000;
  }
}