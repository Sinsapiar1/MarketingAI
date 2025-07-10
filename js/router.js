// js/router.js
// Router hash simple para navegaciones dentro del dashboard
class HashRouter {
  constructor() {
    window.addEventListener('hashchange', this.handleChange.bind(this));
    this.handleChange();
  }

  handleChange() {
    const hash = window.location.hash.replace('#', '') || 'stats';
    document.querySelectorAll('.section').forEach((sec) => {
      sec.classList.toggle('active', sec.id === hash);
    });
    document.querySelectorAll('.sidebar-nav a').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + hash);
    });
  }
}

window.DashboardRouter = HashRouter;