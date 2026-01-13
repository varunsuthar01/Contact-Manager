const API = 'http://localhost:5000/api/contacts';

const form = document.getElementById('contactForm');
const table = document.getElementById('contactsTable');

const contactId = document.getElementById('contactId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

/* ---------------- LOAD CONTACTS ---------------- */
function loadContacts() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      table.innerHTML = '';

      if (data.length === 0) {
        table.innerHTML = `
          <tr>
            <td colspan="4" style="text-align:center; color:#777;">
              No contacts found
            </td>
          </tr>
        `;
        return;
      }

      data.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${contact.name}</td>
          <td>${contact.email}</td>
          <td>${contact.phone}</td>
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        `;

        row.querySelector('.edit-btn').onclick = () =>
          editContact(contact);

        row.querySelector('.delete-btn').onclick = () =>
          deleteContact(contact.id);

        table.appendChild(row);
      });
    })
    .catch(() => alert('Failed to load contacts'));
}

/* ---------------- ADD / UPDATE CONTACT ---------------- */
form.addEventListener('submit', e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    alert('All fields are required');
    return;
  }

  if (phone.length < 10) {
    alert('Phone number must be at least 10 digits');
    return;
  }

  const payload = { name, email, phone };

  const isEdit = contactId.value !== '';
  const url = isEdit ? `${API}/${contactId.value}` : API;
  const method = isEdit ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (!res.ok) return res.json().then(err => Promise.reject(err));
      return res.json();
    })
    .then(() => {
      resetForm();
      loadContacts();
    })
    .catch(err => {
      alert(err.error || 'Something went wrong');
    });
});

/* ---------------- EDIT CONTACT ---------------- */
function editContact(contact) {
  contactId.value = contact.id;
  nameInput.value = contact.name;
  emailInput.value = contact.email;
  phoneInput.value = contact.phone;

  form.scrollIntoView({ behavior: 'smooth' });
}

/* ---------------- DELETE CONTACT ---------------- */
function deleteContact(id) {
  if (!confirm('Are you sure you want to delete this contact?')) return;

  fetch(`${API}/${id}`, { method: 'DELETE' })
    .then(() => loadContacts())
    .catch(() => alert('Delete failed'));
}

/* ---------------- RESET FORM ---------------- */
function resetForm() {
  contactId.value = '';
  form.reset();
}

/* ---------------- INITIAL LOAD ---------------- */
loadContacts();
