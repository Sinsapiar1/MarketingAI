// js/api/firebase.js
// Funciones helper para acceso a Firebase

const FirebaseAPI = {
  auth() {
    return firebase.auth();
  },
  db() {
    return firebase.firestore();
  },
  async getCurrentUserProfile() {
    const user = firebase.auth().currentUser;
    if (!user) return null;
    const doc = await firebase.firestore().collection('users').doc(user.uid).get();
    return doc.exists ? doc.data() : null;
  }
};

// Exportar globalmente (para scripts no-module)
window.FirebaseAPI = FirebaseAPI;