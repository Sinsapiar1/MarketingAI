// js/modules/funnel-architect.js
class FunnelArchitect {
  constructor() {
    this.steps = [];
  }

  /**
   * Agrega un paso al funnel
   * @param {{type:string, title:string}} step
   */
  addStep(step) {
    this.steps.push({ ...step, id: Date.now() });
  }

  /**
   * Elimina un paso
   */
  removeStep(id) {
    this.steps = this.steps.filter((s) => s.id !== id);
  }

  /**
   * Reordena pasos (drag & drop)
   */
  moveStep(oldIndex, newIndex) {
    const step = this.steps.splice(oldIndex, 1)[0];
    this.steps.splice(newIndex, 0, step);
  }

  serialize() {
    return JSON.stringify(this.steps);
  }
}