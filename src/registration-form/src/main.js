import { FormValidator } from './form-validator.js';

// Initialize form validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator('registrationForm');

  // Optional: Load saved form data from localStorage
  const savedData = localStorage.getItem('registrationFormData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    const form = document.getElementById('registrationForm');

    Object.keys(formData).forEach((key) => {
      const field = form.elements[key];
      if (field) {
        if (field.type === 'checkbox') {
          field.checked = formData[key];
        } else {
          field.value = formData[key];
        }

        // Trigger validation for each field
        const event = new Event('input');
        field.dispatchEvent(event);
      }
    });
  }

  // Optional: Save form data to localStorage on input
  const form = document.getElementById('registrationForm');
  form.addEventListener('input', (e) => {
    const formData = {};
    Object.keys(form.elements).forEach((key) => {
      const field = form.elements[key];
      if (field.name) {
        formData[field.name] =
          field.type === 'checkbox' ? field.checked : field.value;
      }
    });
    localStorage.setItem('registrationFormData', JSON.stringify(formData));
  });
});
