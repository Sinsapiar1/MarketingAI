// js/theme.js
class ThemeManager {
  constructor() {
    this.current = localStorage.getItem('theme') || 'light';
    document.body.classList.add(this.current);
  }

  toggle() {
    this.current = this.current === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', this.current);
  }
}

window.ThemeManager = new ThemeManager();