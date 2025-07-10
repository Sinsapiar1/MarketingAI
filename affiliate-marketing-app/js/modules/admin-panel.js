// js/modules/admin-panel.js
class AdminPanel {
  constructor() {
    this.db = firebase.firestore();
    this.usersTableBody = document.querySelector('#usersTable tbody');
    this.init();
  }

  async init() {
    await this.renderUsers();
  }

  async renderUsers() {
    const snapshot = await this.db.collection('users').orderBy('createdAt', 'desc').limit(50).get();
    this.usersTableBody.innerHTML = '';
    snapshot.forEach((doc) => {
      const data = doc.data();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${data.email}</td>
        <td>${data.plan}</td>
        <td>${data.role}</td>
        <td>${data.createdAt ? data.createdAt.toDate().toLocaleDateString() : ''}</td>
        <td><button data-id="${doc.id}" class="btn tiny">Promover a Admin</button></td>
      `;
      this.usersTableBody.appendChild(tr);
    });

    // Delegación de evento para promover usuario
    this.usersTableBody.addEventListener('click', async (e) => {
      if (e.target.matches('button[data-id]')) {
        const uid = e.target.getAttribute('data-id');
        await this.db.collection('users').doc(uid).update({ role: 'admin' });
        alert('Rol actualizado');
        this.renderUsers();
      }
    });
  }
}

// Inicializar cuando exista tabla
if (document.querySelector('#usersTable')) {
  window.adminPanel = new AdminPanel();
}