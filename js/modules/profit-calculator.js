// js/modules/profit-calculator.js
class ProfitCalculator {
  /**
   * Calcula el beneficio esperado basado en parámetros básicos.
   * @param {{traffic:number, ctr:number, convRate:number, commission:number}} params
   *  - traffic: visitas mensuales
   *  - ctr: porcentaje de clics (% de 0-100)
   *  - convRate: porcentaje de conversión (% de 0-100)
   *  - commission: comisión promedio por venta (USD)
   */
  calculate(params) {
    const clicks = params.traffic * (params.ctr / 100);
    const sales = clicks * (params.convRate / 100);
    const profit = sales * params.commission;
    return {
      clicks: Math.round(clicks),
      sales: Math.round(sales),
      profit: Math.round(profit * 100) / 100
    };
  }
}