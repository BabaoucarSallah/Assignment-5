export class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.fields = {
      fullName: { required: true },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      password: {
        required: true,
        minLength: 8,
        validate: (value) => {
          return /[0-9]/.test(value) && /[!@#$%^&*]/.test(value);
        },
      },
      confirmPassword: {
        required: true,
        validate: (value, formData) => value === formData.password,
      },
      dateOfBirth: {
        required: true,
        validate: (value) => {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dob.getDate())
          ) {
            return age - 1 >= 18;
          }
          return age >= 18;
        },
      },
      telephone: { required: true },
      country: { required: true },
      terms: { required: true },
    };

    this.init();
  }

  init() {
    this.form.addEventListener('change', (e) => {
      const target = e.target;
      if (target.name === 'terms') {
        this.validateField(target);
        this.toggleSubmitButton();
      }
    });

    // Final validation on submit
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.clearValidation(); // optional if you're validating on input
      if (this.validateForm()) {
        this.handleSubmit();
      }
    });
  }

  clearValidation() {
    // Remove all validation styling
    const inputs = this.form.querySelectorAll('.form-input');
    inputs.forEach((input) => {
      input.classList.remove('valid', 'invalid');
    });

    // Clear all error messages
    const errorMessages = this.form.querySelectorAll('.error-message');
    errorMessages.forEach((msg) => {
      msg.textContent = '';
    });
  }

  validateField(field) {
    const fieldName = field.name;
    const fieldConfig = this.fields[fieldName];
    const value = field.type === 'checkbox' ? field.checked : field.value;
    const errorElement = field
      .closest('.form-group')
      .querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    // Clear previous states
    field.classList.remove('invalid', 'valid');
    errorElement.textContent = '';

    // Check required field
    if (fieldConfig.required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Check pattern if exists
    if (isValid && fieldConfig.pattern && !fieldConfig.pattern.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    // Check min length if exists
    if (
      isValid &&
      fieldConfig.minLength &&
      value.length < fieldConfig.minLength
    ) {
      isValid = false;
      errorMessage = `Must be at least ${fieldConfig.minLength} characters`;
    }

    // Custom validation if exists
    if (isValid && fieldConfig.validate) {
      const formData = this.getFormData();
      const customValid = fieldConfig.validate(value, formData);

      if (!customValid) {
        isValid = false;
        if (fieldName === 'password') {
          errorMessage =
            'Password must contain at least one number and one special character';
        } else if (fieldName === 'confirmPassword') {
          errorMessage = 'Passwords do not match';
        } else if (fieldName === 'dateOfBirth') {
          errorMessage = 'You must be at least 18 years old';
        }
      }
    }

    // Update UI
    if (!isValid) {
      field.classList.add('invalid');
      errorElement.textContent = errorMessage;
    } else if (value) {
      field.classList.add('valid');
    }

    return isValid;
  }

  /**
   * Validate all form fields
   * @returns {boolean} - Whether the form is valid
   */
  validateForm() {
    let isFormValid = true;
    const formData = this.getFormData();

    Object.keys(this.fields).forEach((fieldName) => {
      const field = this.form.elements[fieldName];
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  /**
   * Get form data as an object
   * @returns {Object} - Form data
   */
  getFormData() {
    const formData = {};
    Object.keys(this.fields).forEach((fieldName) => {
      const field = this.form.elements[fieldName];
      formData[fieldName] =
        field.type === 'checkbox' ? field.checked : field.value;
    });
    return formData;
  }

  /**
   * Enable/disable submit button based on form validity
   */
  toggleSubmitButton() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    const isFormValid = this.validateForm();
    submitButton.disabled = !isFormValid;
  }

  /**
   * Handle form submission
   */
  handleSubmit() {
    const formData = this.getFormData();

    // Mask passwords for display
    const displayData = {
      ...formData,
      password: '••••••••',
      confirmPassword: '••••••••',
    };

    // Hide form and show success message
    this.form.classList.add('hidden');
    const successMessage = document.getElementById('successMessage');
    const summaryDetails = successMessage.querySelector('.summary-details');

    // Create summary HTML
    let summaryHTML = '';
    for (const [key, value] of Object.entries(displayData)) {
      if (key === 'terms') continue;
      const label = this.form.querySelector(`label[for="${key}"]`).textContent;
      summaryHTML += `<p><strong>${label}:</strong> ${value}</p>`;
    }

    summaryDetails.innerHTML = summaryHTML;
    successMessage.classList.remove('hidden');

    this.clearForm();
    localStorage.removeItem('registrationFormData');
  }

  clearForm() {
    this.form.reset();
    this.clearValidation();
  }

  clearValidation() {
    // Remove all validation styling
    const inputs = this.form.querySelectorAll('.form-input');
    inputs.forEach((input) => {
      input.classList.remove('valid', 'invalid');
    });

    // Clear all error messages
    const errorMessages = this.form.querySelectorAll('.error-message');
    errorMessages.forEach((msg) => {
      msg.textContent = '';
    });
  }
}
