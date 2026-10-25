// ==========================================
// AYEWA.AI — Application Foundation
// ==========================================

// 1. Automatically update the copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 2. Early-access waitlist demonstration
const waitlistForm = document.getElementById("waitlist-form");
const emailInput = document.getElementById("email-input");
const formStatus = document.getElementById("form-status");

if (waitlistForm && emailInput && formStatus) {
  waitlistForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!emailInput.checkValidity() || !email) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.style.color = "#f7d58d";
      emailInput.focus();
      return;
    }

    formStatus.textContent =
      "Thanks for your interest! The AYEWA.AI waitlist demonstration worked. Email registration is not connected yet.";

    formStatus.style.color = "#70efb8";
    waitlistForm.reset();
  });
}

// 3. Smooth navigation for links on the landing page
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (event) {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// 4. AYEWA.AI application foundation
const ayewaApp = {
  name: "AYEWA.AI",

  startingCity: "Lagos",

  screens: [
    "Home",
    "Explore",
    "Map",
    "Virtual World",
    "AI Guide",
    "My Avatar",
    "African Cities"
  ],

  status: "Prototype",

  showStatus: function () {
    console.log(this.name + " initialized. Status: " + this.status);
  }
};

ayewaApp.showStatus();
