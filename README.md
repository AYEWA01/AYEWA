const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('.nav-item');
const openButtons = document.querySelectorAll('[data-open]');

function setActiveView(targetId) {
  views.forEach((view) => {
    const isActive = view.id === targetId;
    view.classList.toggle('active', isActive);
  });

  navButtons.forEach((button) => {
    const isActive = button.dataset.target === targetId;
    button.classList.toggle('active', isActive);
  });
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveView(button.dataset.target));
});

openButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveView(button.dataset.open));
});

const mapStatus = document.getElementById('map-status');
const demoMapButton = document.getElementById('demo-map-button');
const mapWarningButton = document.getElementById('map-warning-button');
const worldLoading = document.getElementById('world-loading');
const enterWorldButton = document.getElementById('enter-world-button');
const chatFeed = document.getElementById('chat-feed');
const aiInput = document.getElementById('ai-input');
const askAiButton = document.getElementById('ask-ai-button');
const avatarName = document.getElementById('avatar-name');
const avatarNameInput = document.getElementById('avatar-name-input');
const avatarStyle = document.getElementById('avatar-style');
const generateAvatarButton = document.getElementById('generate-avatar-button');

function withLoading(target, text, callback) {
  const originalText = target.textContent.trim();
  target.disabled = true;
  target.textContent = text;

  window.setTimeout(() => {
    target.disabled = false;
    target.textContent = originalText;
    callback();
  }, 700);
}

if (demoMapButton) {
  demoMapButton.addEventListener('click', () => {
    const current = mapStatus.textContent;
    mapStatus.textContent = 'Demo route loaded';
    mapStatus.style.color = '#f9d68d';

    window.setTimeout(() => {
      mapStatus.textContent = current;
      mapStatus.style.color = '#6ce7b0';
    }, 1200);
  });
}

if (mapWarningButton) {
  mapWarningButton.addEventListener('click', () => {
    mapStatus.textContent = 'Google Maps not configured';
    mapStatus.style.color = '#f9d68d';
  });
}

if (enterWorldButton) {
  enterWorldButton.addEventListener('click', () => {
    worldLoading.hidden = false;
    enterWorldButton.disabled = true;

    window.setTimeout(() => {
      worldLoading.hidden = true;
      enterWorldButton.disabled = false;
      setActiveView('world');
    }, 900);
  });
}

function addChatMessage(role, text) {
  const message = document.createElement('div');
  message.className = `message ${role}`;

  const label = document.createElement('span');
  label.className = 'message-label';
  label.textContent = role === 'assistant' ? 'AI Guide' : 'You';

  const content = document.createElement('p');
  content.textContent = text;

  message.append(label, content);
  chatFeed.appendChild(message);
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

function generateAiReply(input) {
  const normalized = input.toLowerCase();

  if (normalized.includes('lagos') || normalized.includes('neighborhood') || normalized.includes('travel')) {
    return 'Lagos is best explored in layers: start with Victoria Island for business and nightlife, Yaba for creative energy, and Lekki for waterfront experiences. The AYEWA prototype focuses on safe, discoverable mobile-friendly exploration first.';
  }

  if (normalized.includes('virtual') || normalized.includes('world') || normalized.includes('multiplayer')) {
    return 'The virtual world is designed as a social layer for African urban life. It can later add avatars, events, digital land, and community gatherings without redefining the core interface.';
  }

  if (normalized.includes('food') || normalized.includes('culture')) {
    return 'African city culture in AYEWA blends music, food, markets, and local storytelling. The prototype highlights that atmosphere without relying on external live data sources.';
  }

  if (normalized.includes('avatar')) {
    return 'Your avatar is a digital identity that can evolve with your style, preferred city, and social activities. This prototype keeps the identity system simple and ready for future customization.';
  }

  return 'AYEWA.AI is an African virtual universe prototype for mobile-first exploration. The current version uses mock data and safe client-side placeholders while the real Maps, AI, and social services are prepared for later integration.';
}

if (askAiButton) {
  askAiButton.addEventListener('click', () => {
    const value = aiInput.value.trim();

    if (!value) {
      addChatMessage('assistant', 'Please enter a question so the AI guide can help you explore AYEWA.AI.');
      return;
    }

    addChatMessage('user', value);
    aiInput.value = '';

    window.setTimeout(() => {
      addChatMessage('assistant', generateAiReply(value));
    }, 500);
  });
}

if (aiInput) {
  aiInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      askAiButton.click();
    }
  });
}

if (generateAvatarButton) {
  generateAvatarButton.addEventListener('click', () => {
    const name = avatarNameInput.value.trim() || 'Ada';
    const style = avatarStyle.value;
    const labelMap = {
      traveler: 'Traveler',
      creator: 'Creator',
      explorer: 'Explorer',
      builder: 'Builder'
    };

    const tag = document.querySelector('.tag');
    if (tag) {
      tag.textContent = labelMap[style] || 'Traveler';
    }

    avatarName.textContent = name;
    avatarNameInput.value = name;
  });
}

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    mobileNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

setActiveView('home');
