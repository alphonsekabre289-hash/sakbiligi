import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  setupPasswordToggle();
  setupLoginForm();
  setupDemoCardAnimation();
});

// 1. Password Visibility Toggle
function setupPasswordToggle() {
  const toggleBtn = document.getElementById('toggle-password');
  const passwordField = document.getElementById('password-field');
  const eyeIcon = document.getElementById('eye-icon');

  if (!toggleBtn || !passwordField) return;

  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';

    if (isPassword) {
      // Eye Slash icon
      eyeIcon.innerHTML = `
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" y1="2" x2="22" y2="22"></line>
      `;
    } else {
      // Normal Eye icon
      eyeIcon.innerHTML = `
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    }
  });
}

// 2. Login Form Submission & Validation
function setupLoginForm() {
  const form = document.getElementById('auth-form');
  const submitBtn = form?.querySelector('.btn-submit');
  const forgotLink = document.getElementById('link-forgot-pass');

  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Un lien de réinitialisation a été envoyé si le compte existe.');
    });
  }

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email-field').value.trim();
      const password = document.getElementById('password-field').value;

      if (!email || !password) {
        showToast('Veuillez remplir tous les champs.');
        return;
      }

      // Simulate loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Connexion en cours...</span>
      `;

      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });

        showToast(`🎉 Bon retour sur Sakbi, ${email.split('@')[0]} !`);

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          if (!localStorage.getItem('sakbi_store_name')) {
            localStorage.setItem('sakbi_store_name', 'LIVE');
          }
          const userName = email.split('@')[0] || 'Marchand';
          localStorage.setItem('sakbi_user_name', userName);
          localStorage.setItem('sakbi_user_email', email);
          const token = crypto.randomUUID ? crypto.randomUUID() : 'tok_' + Date.now();
          const session = {
            token: token,
            email: email,
            name: userName,
            expiresAt: Date.now() + (24 * 60 * 60 * 1000)
          };
          localStorage.setItem('sakbi_auth_session', JSON.stringify(session));
          // Redirect to dashboard
          window.location.href = './dashboard.html';
        }, 1500);
      }, 900);
    });
  }
}

// 3. Demo Card Micro-Interactivity
function setupDemoCardAnimation() {
  const visitesEl = document.getElementById('demo-visites');
  const commandesEl = document.getElementById('demo-commandes');

  // Slight natural variation every 8s
  setInterval(() => {
    if (visitesEl) {
      const cur = parseInt(visitesEl.textContent) || 121;
      visitesEl.textContent = cur + (Math.random() > 0.4 ? 1 : 0);
    }
  }, 8000);
}

// Toast Notification Helper
function showToast(message) {
  const shelf = document.getElementById('toast-shelf');
  if (!shelf) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<span>${message}</span>`;
  shelf.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
