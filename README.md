const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const waitlistForm = document.getElementById('waitlist-form');
const formStatus = document.getElementById('form-status');

if (waitlistForm && formStatus) {
  waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email-input');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.style.color = '#f7d58d';
      return;
    }

    formStatus.textContent = `You are on the list, ${email}. We will reach out soon.`;
    formStatus.style.color = '#70efb8';
    waitlistForm.reset();
  });
}

const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
