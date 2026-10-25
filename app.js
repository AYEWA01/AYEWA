const navButtons = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const openButtons = document.querySelectorAll('[data-open]');
const mapStatus = document.getElementById('map-status');
const worldLoading = document.getElementById('world-loading');
const aiInput = document.getElementById('ai-input');
const chatFeed = document.getElementById('chat-feed');
const avatarNameInput = document.getElementById('avatar-name-input');
const avatarStyle = document.getElementById('avatar-style');
const avatarName = document.getElementById('avatar-name');
const avatarBody = document.querySelector('.avatar-body');
const avatarTag = document.querySelector('.tag');
const navToggle = document.querySelector('.nav-toggle');

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
  button.addEventListener('click', () => {
    const target = button.dataset.open;
    if (target) {
      setActiveView(target);
    }
  });
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navButtons.forEach((button) => {
      button.style.display = button.style.display === 'none' ? '' : 'none';
    });
  });
}

document.getElementById('demo-map-button')?.addEventListener('click', () => {
  if (mapStatus) {
    mapStatus.textContent = 'Demo map loaded';
    mapStatus.style.color = '#6ce7b0';
  }
});

document.getElementById('map-warning-button')?.addEventListener('click', () => {
  if (mapStatus) {
    mapStatus.textContent = 'Secure API layer required';
    mapStatus.style.color = '#f9d68d';
  }
});

document.getElementById('enter-world-button')?.addEventListener('click', () => {
  if (worldLoading) {
    worldLoading.hidden = false;
  }

  window.setTimeout(() => {
    if (worldLoading) {
      worldLoading.hidden = true;
    }
    if (mapStatus) {
      mapStatus.textContent = 'Virtual Lagos is ready';
      mapStatus.style.color = '#6ce7b0';
    }
    setActiveView('world');
  }, 1200);
});

function appendMessage(role, text) {
  if (!chatFeed) return;

  const message = document.createElement('div');
  message.className = `message ${role}`;

  const label = document.createElement('span');
  label.className = 'message-label';
  label.textContent = role === 'assistant' ? 'AI Guide' : 'You';

  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  message.appendChild(label);
  message.appendChild(paragraph);
  chatFeed.appendChild(message);
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

function getGuideResponse(prompt) {
  const lower = prompt.toLowerCase();

  if (lower.includes('lagos') || lower.includes('city')) {
    return 'Lagos blends culture, commerce, and creativity. Virtual Lagos can spotlight nightlife, startup energy, and coastal lifestyle in a digital-first city experience.';
  }

  if (lower.includes('culture') || lower.includes('music')) {
    return 'African culture thrives through community, art, and storytelling. AYEWA.AI can turn that into immersive experiences, local creators, and digital identity.';
  }

  if (lower.includes('travel') || lower.includes('explore')) {
    return 'Start with Victoria Island, Yaba, and Lekki. Each zone has a different story: business, creativity, and leisure.';
  }

  return 'AYEWA.AI is imagining a future African virtual world rooted in community, creativity, and belonging. Ask about Lagos, cultural districts, or digital life.';
}

document.getElementById('ask-ai-button')?.addEventListener('click', () => {
  const prompt = aiInput?.value.trim();
  if (!prompt) return;

  appendMessage('user', prompt);
  aiInput.value = '';

  window.setTimeout(() => {
    appendMessage('assistant', getGuideResponse(prompt));
  }, 350);
});

aiInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('ask-ai-button')?.click();
  }
});

document.getElementById('generate-avatar-button')?.addEventListener('click', () => {
  const name = avatarNameInput?.value.trim() || 'Ada';
  const style = avatarStyle?.value || 'traveler';

  avatarName.textContent = name;

  const styleMap = {
    traveler: ['#6ce7b0', '#f9d68d'],
    creator: ['#9bd5ff', '#7ee0c9'],
    explorer: ['#d7a2ff', '#7bc8ff'],
    builder: ['#f7b955', '#6ce7b0']
  };

  const [primary, secondary] = styleMap[style] || styleMap.traveler;
  avatarBody.style.background = `linear-gradient(180deg, ${primary}, ${secondary})`;

  if (avatarTag) {
    const styleLabels = {
      traveler: 'Traveler',
      creator: 'Creator',
      explorer: 'Explorer',
      builder: 'Builder'
    };
    avatarTag.textContent = styleLabels[style] || 'Traveler';
  }
});

avatarNameInput?.addEventListener('input', () => {
  const name = avatarNameInput.value.trim();
  if (name) {
    avatarName.textContent = name;
  }
});

