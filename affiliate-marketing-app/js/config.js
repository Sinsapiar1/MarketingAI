// js/config.js
// Configuración de Firebase (reemplaza con tus credenciales)
// Esta información debe mantenerse fuera de control de versiones en producción.

const firebaseConfig = {
  apiKey: "AIzaSyAqVGZGdwrvvZoC1trRr8h8TNXrwyugHww",
  authDomain: "marketingafiliados-c6eec.firebaseapp.com",
  projectId: "marketingafiliados-c6eec",
  storageBucket: "marketingafiliados-c6eec.firebasestorage.app",
  messagingSenderId: "208888972841",
  appId: "1:208888972841:web:e68d63fffebc2fe578fe38",
  measurementId: "G-YVQLB05W65"
};

// Inicializar Firebase sólo una vez
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  if ('measurementId' in firebaseConfig) {
    try {
      firebase.analytics();
    } catch (err) {
      console.warn('Analytics no inicializado', err);
    }
  }
}

// Registrar Service Worker para soporte offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.error);
  });
}
