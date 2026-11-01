/**
 * SDSPM College Management System - main.js
 * Form validations, confirmation modals, and responsive interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Auto-hide alert messages after 5 seconds
  const alerts = document.querySelectorAll('.alert-dismissible');
  alerts.forEach(alert => {
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
      if (bsAlert) bsAlert.close();
    }, 5000);
  });

  // Client-side form validation feedback
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Confirm delete prompts
  const deleteLinks = document.querySelectorAll('.confirm-delete');
  deleteLinks.forEach(link => {
    link.addEventListener('click', e => {
      if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
        e.preventDefault();
      }
    });
  });
});
