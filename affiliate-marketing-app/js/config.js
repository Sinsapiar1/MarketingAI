// js/config.js
// Configuración de Firebase (reemplaza con tus credenciales)
// Esta información debe mantenerse fuera de control de versiones en producción.

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
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