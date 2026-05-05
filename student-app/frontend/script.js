// =====================
// API Configuration
// =====================

// Base URL for API calls - Change this if deploying to a different server
const API_BASE_URL = 'http://localhost:3000/api';
let editingId = null;
let allStudents = [];

// =====================
// DOM Elements
// =====================

const studentForm = document.getElementById('studentForm');
const studentsList = document.getElementById('studentsList');
const tableContainer = document.getElementById('tableContainer');
const emptyState = document.getElementById('emptyState');
const loadingIndicator = document.getElementById('loadingIndicator');
const messageContainer = document.getElementById('messageContainer');
const searchInput = document.getElementById('searchInput');
const refreshBtn = document.getElementById('refreshBtn');
const confirmModal = document.getElementById('confirmModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmMessage = document.getElementById('confirmMessage');

// Form fields
const studentIdField = document.getElementById('studentId');
const nameInput = document.getElementById('name');
const rollNoInput = document.getElementById('rollNo');
const batchInput = document.getElementById('batch');
const courseInput = document.getElementById('course');
const contactInput = document.getElementById('contact');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

// =====================
// State Management
// =====================

let students = [];
let deleteConfirmationData = null;
let isEditMode = false;

// =====================
// Event Listeners
// =====================

document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
  setupEventListeners();
});

function setupEventListeners() {
  studentForm.addEventListener('submit', handleFormSubmit);
  resetBtn.addEventListener('click', resetForm);
  searchInput.addEventListener('input', filterStudents);
  refreshBtn.addEventListener('click', loadStudents);
  confirmDeleteBtn.addEventListener('click', confirmDelete);
  cancelDeleteBtn.addEventListener('click', closeConfirmModal);
}

// =====================
// Form Handling
// =====================

async function handleFormSubmit(e) {
  e.preventDefault();

  const student = {
    name: nameInput.value.trim(),
    rollNo: rollNoInput.value.trim(),
    batch: batchInput.value.trim(),
    course: courseInput.value.trim(),
    contact: contactInput.value.trim()
  };

  // Validation
  if (!student.name || !student.rollNo || !student.batch || !student.course || !student.contact) {
    showMessage('All fields are required!', 'error');
    return;
  }

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    if (editingId) {
      await updateStudent(editingId, student);
      editingId = null;
    } else {
      await createStudent(student);
    }
    resetForm();
    loadStudents();
  } catch (error) {
    showMessage('Error: ' + error.message, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = editingId ? 'Update Student' : 'Add Student';
  }
}

function resetForm() {
  studentForm.reset();
  studentIdField.value = '';
  editingId = null;
  submitBtn.textContent = 'Add Student';
  nameInput.focus();
}

// =====================
// API Calls
// =====================

async function loadStudents() {
  try {
    showLoadingIndicator(true);
    const response = await fetch(`${API_BASE_URL}/students`);

    if (!response.ok) {
      throw new Error('Failed to load students');
    }

    allStudents = await response.json();
    displayStudents(allStudents);
  } catch (error) {
    console.error('Error loading students:', error);
    showMessage('Failed to load students. Check server connection.', 'error');
    displayStudents([]);
  } finally {
    showLoadingIndicator(false);
  }
}

async function createStudent(student) {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add student');
  }

  showMessage('✓ Student added successfully!', 'success');
}

async function updateStudent(id, student) {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update student');
  }

  showMessage('✓ Student updated successfully!', 'success');
}

async function deleteStudent(id) {
  if (!confirm('Are you sure you want to delete this student?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete student');
    }

    showMessage('✓ Student deleted successfully!', 'success');
    loadStudents();
  } catch (error) {
    showMessage('Error: ' + error.message, 'error');
  }
}

// =====================
// Display Functions
// =====================

function displayStudents(students) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  if (students.length === 0) {
    tbody.innerHTML = '<tr class="loading"><td colspan="7">No students found</td></tr>';
    return;
  }

  students.forEach(student => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${escapeHtml(student.name)}</td>
      <td>${escapeHtml(student.rollNo)}</td>
      <td>${escapeHtml(student.batch)}</td>
      <td>${escapeHtml(student.course)}</td>
      <td>${escapeHtml(student.contact)}</td>
      <td>
        <button class="edit-btn" onclick="editStudent(${JSON.stringify(student).replace(/"/g, '&quot;')})">✏️ Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${student.id})">🗑️ Delete</button>
      </td>
    `;
  });
}

// =====================
// Edit Functionality
// =====================

function editStudent(student) {
  nameInput.value = student.name;
  rollNoInput.value = student.rollNo;
  batchInput.value = student.batch;
  courseInput.value = student.course;
  contactInput.value = student.contact;
  document.getElementById('cancelBtn').style.display = 'inline-block';
  submitBtn.textContent = 'Update Student';
  editingId = student.id;

  // Scroll to form
  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// =====================
// Delete Functionality
// =====================

function confirmDeleteStudent(id, name) {
  deleteConfirmationData = id;
  confirmMessage.textContent = `Are you sure you want to delete "${name}"? This action cannot be undone.`;
  openConfirmModal();
}

function confirmDelete() {
  if (deleteConfirmationData) {
    deleteStudent(deleteConfirmationData);
    closeConfirmModal();
  }
}

function closeConfirmModal() {
  confirmModal.classList.remove('show');
  deleteConfirmationData = null;
}

function openConfirmModal() {
  confirmModal.classList.add('show');
}

// Close modal when clicking outside
confirmModal.addEventListener('click', (e) => {
  if (e.target === confirmModal) {
    closeConfirmModal();
  }
});

// =====================
// Search/Filter Functionality
// =====================

function filterStudents() {
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = allStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm) ||
    student.rollNo.toLowerCase().includes(searchTerm)
  );
  displayStudents(filtered);
}

// =====================
// Message Display
// =====================

function showMessage(message, type = 'info', duration = 4000) {
  const messageEl = document.createElement('div');
  messageEl.className = `message message-${type}`;
  messageEl.innerHTML = `
    <span>${escapeHtml(message)}</span>
    <span class="message-close" onclick="this.parentElement.remove()">✕</span>
  `;

  messageContainer.appendChild(messageEl);

  if (duration > 0) {
    setTimeout(() => {
      if (messageEl.parentElement) {
        messageEl.remove();
      }
    }, duration);
  }
}

// =====================
// Loading Indicator
// =====================

function showLoadingIndicator(show) {
  if (show) {
    loadingIndicator.style.display = 'flex';
    tableContainer.style.display = 'none';
    emptyState.style.display = 'none';
  } else {
    loadingIndicator.style.display = 'none';
  }
}

// =====================
// Utility Functions
// =====================

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// =====================
// Keyboard Shortcuts
// =====================

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'r' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    loadStudents();
  }

  if (e.key === 'Escape') {
    closeConfirmModal();
    resetForm();
  }
});
