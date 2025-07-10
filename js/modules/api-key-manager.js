// js/modules/api-key-manager.js
class APIKeyManager {
  constructor() {
    this.key = localStorage.getItem('apiKey') || null;
  }

  setAPIKey(key) {
    this.key = key;
    localStorage.setItem('apiKey', key);
  }

  getAPIKey() {
    return this.key;
  }

  clear() {
    this.key = null;
    localStorage.removeItem('apiKey');
  }
}