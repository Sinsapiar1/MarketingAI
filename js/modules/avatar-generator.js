// js/modules/avatar-generator.js
class AvatarGenerator {
  constructor() {
    this.traits = {
      age: ['18-24', '25-34', '35-44', '45-54', '55+'],
      gender: ['Hombre', 'Mujer', 'No binario'],
      interests: ['Tech', 'Fitness', 'Moda', 'Viajes', 'Finanzas'],
      painPoints: ['Falta de tiempo', 'Alto costo', 'Complejidad', 'Falta de información'],
      goals: ['Aumentar ingresos', 'Ahorrar dinero', 'Ser saludable', 'Aprender algo nuevo']
    };
  }

  /**
   * Genera un avatar psicográfico aleatorio o basado en preferencias.
   * @param {Partial<{age:string, gender:string}>} prefs
   */
  generate(prefs = {}) {
    const avatar = {};
    for (const [key, values] of Object.entries(this.traits)) {
      avatar[key] = prefs[key] || this.random(values);
    }
    return avatar;
  }

  random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}