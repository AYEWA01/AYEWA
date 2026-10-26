const views = [...document.querySelectorAll(".view")];
const navItems = [...document.querySelectorAll(".nav-item")];
const toggleButton = document.querySelector(".nav-toggle");
const mapStatus = document.getElementById("map-status");
const menu = document.querySelector(".mobile-nav");

let map = null;
let loadingWorldTimer = null;

function showView(targetId) {
  views.forEach((view) => {
    view.classList.toggle("active", view.id === targetId);
  });

  navItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.target === targetId);
  });

  if (window.innerWidth <= 480) {
    menu?.classList.remove("open");
  }

  if (targetId === "map") {
    setTimeout(() => {
      if (map) {
        map.invalidateSize();
      } else {
        initializeMap();
      }
    }, 150);
  }
}

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    showView(button.dataset.target);
  });
});

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    showView(button.dataset.open);
  });
});

toggleButton?.addEventListener("click", () => {
  menu?.classList.toggle("open");
  if (menu?.classList.contains("open")) {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
});

if (window.innerWidth > 480) {
  menu.style.display = "flex";
} else {
  menu.style.display = "none";
}

function initializeMap() {
  const mapElement = document.getElementById("map-canvas");
  if (!mapElement) return;
  if (map) return;

  if (typeof window.L === "undefined") {
    mapStatus.textContent = "Map integration: Leaflet failed to load";
    console.error("Leaflet is unavailable.");
    return;
  }

  try {
    map = window.L.map("map-canvas", {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
      dragging: true,
      tap: true,
    });

    map.setView([6.5244, 3.3792], 11);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
      crossOrigin: true,
    }).addTo(map);

    const locations = [
      {
        name: "Victoria Island",
        coords: [6.4281, 3.4219],
        description: "Creative hubs, nightlife, and waterfront lifestyle.",
      },
      {
        name: "Yaba",
        coords: [6.5100, 3.3697],
        description: "Startup energy, digital learning, and creator communities.",
      },
      {
        name: "Lekki",
        coords: [6.4392, 3.4761],
        description: "Beachfront culture, social districts, and future city experiences.",
      },
      {
        name: "Ikeja",
        coords: [6.6018, 3.3515],
        description: "Civic and commercial activity in central Lagos.",
      },
    ];

    locations.forEach((item) => {
      const marker = window.L.marker(item.coords).addTo(map);
      marker.bindPopup(`<strong>${item.name}</strong><br>${item.description}`);
    });

    map.whenReady(() => {
      if (mapStatus) {
        mapStatus.textContent = "Map integration: live OpenStreetMap layer active";
      }
      setTimeout(() => map.invalidateSize(), 200);
    });
  } catch (error) {
    mapStatus.textContent = "Map integration: failed to load — please refresh or check browser support";
    console.error("Map initialization failed:", error);
  }
}

const demoMapButton = document.getElementById("demo-map-button");
const mapWarningButton = document.getElementById("map-warning-button");

demoMapButton?.addEventListener("click", () => {
  initializeMap();
  if (map) {
    mapStatus.textContent = "Map integration: live OpenStreetMap layer active";
    showToast("Lagos map loaded using OpenStreetMap.");
  } else {
    mapStatus.textContent = "Map integration: failed to load — please refresh or check browser support";
    showToast("Map failed to load. Please check the browser console and network access.");
  }
});

mapWarningButton?.addEventListener("click", () => {
  mapStatus.textContent = "Map integration: OpenStreetMap demo layer is active";
  showToast("OpenStreetMap is being used in this prototype, so no Google key is required.");
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(10,24,18,0.92)";
  toast.style.color = "#eefaf4";
  toast.style.border = "1px solid rgba(125,255,186,0.2)";
  toast.style.borderRadius = "12px";
  toast.style.padding = "10px 14px";
  toast.style.zIndex = "50";
  toast.style.boxShadow = "0 12px 24px rgba(0,0,0,0.25)";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1800);
}

const worldLoading = document.getElementById("world-loading");
const enterWorldButton = document.getElementById("enter-world-button");

function resetWorldButton() {
  if (!enterWorldButton) return;
  enterWorldButton.disabled = false;
  enterWorldButton.textContent = "Enter world";
}

enterWorldButton?.addEventListener("click", () => {
  if (worldLoading) {
    worldLoading.hidden = false;
  }

  enterWorldButton.disabled = true;
  enterWorldButton.textContent = "Loading...";

  if (loadingWorldTimer) {
    clearTimeout(loadingWorldTimer);
  }

  loadingWorldTimer = setTimeout(() => {
    if (worldLoading) {
      worldLoading.hidden = true;
    }
    resetWorldButton();
    showToast("Virtual world preview ready. 3D engine and multiplayer services are future integrations.");
  }, 1400);
});

const chatFeed = document.getElementById("chat-feed");
const aiInput = document.getElementById("ai-input");
const askAiButton = document.getElementById("ask-ai-button");

function addChatMessage(role, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;
  wrapper.innerHTML = `
    <span class="message-label">${role === "assistant" ? "AI Guide" : "You"}</span>
    <p>${text}</p>
  `;
  chatFeed.appendChild(wrapper);
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

function mockGuideReply(question) {
  const lower = question.toLowerCase();

  if (lower.includes("weekend")) {
    return "This weekend, explore Victoria Island for art, nightlife, and waterfront gatherings. Yaba is also strong for creators and digital culture.";
  }

  if (lower.includes("community") || lower.includes("creative")) {
    return "For creative communities, Yaba and Lekki are promising starting points. Look for co-working spaces, maker events, and independent art communities.";
  }

  if (lower.includes("creator") || lower.includes("audience")) {
    return "Build a clear identity, share your work consistently, and connect with local communities first. Strong storytelling and authentic social proof help most creators grow.";
  }

  if (lower.includes("future world") || lower.includes("virtual world")) {
    return "A strong future virtual world should feel rooted in local culture, easy to navigate, and useful on mobile devices. Real people, events, and local places are the foundation.";
  }

  if (lower.includes("lagos")) {
    return "Lagos is ideal for a pilot city because it blends commerce, creativity, nightlife, and strong digital energy. The prototype focuses on accessible zones like Victoria Island, Yaba, and Lekki.";
  }

  return "For a prototype level experience, start with the local culture, neighborhood identity, and community energy. That gives the world a stronger sense of place before adding advanced AI or 3D systems.";
}

askAiButton?.addEventListener("click", () => {
  const value = aiInput.value.trim();
  if (!value) {
    showToast("Please type a question for the guide.");
    return;
  }

  addChatMessage("user", value);
  aiInput.value = "";

  const reply = mockGuideReply(value);
  setTimeout(() => addChatMessage("assistant", reply), 350);
});

document.querySelectorAll("[data-guide-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.dataset.guidePrompt;
    aiInput.value = prompt;
    askAiButton.click();
  });
});

const avatarName = document.getElementById("avatar-name");
const avatarInput = document.getElementById("avatar-name-input");
const avatarStyle = document.getElementById("avatar-style");
const avatarButton = document.getElementById("generate-avatar-button");

avatarButton?.addEventListener("click", () => {
  const name = avatarInput.value.trim() || "Ada";
  const style = avatarStyle.value;

  avatarName.textContent = name;
  showToast(`Profile updated: ${name} • ${style}`);

  const tag = document.querySelector(".tag");
  if (tag) {
    tag.textContent = style.charAt(0).toUpperCase() + style.slice(1);
  }
});

window.addEventListener("resize", () => {
  if (map) {
    setTimeout(() => map.invalidateSize(), 120);
  }
});

if (mapStatus) {
  mapStatus.textContent = "Map integration: ready to load";
}

setTimeout(() => {
  initializeMap();
}, 150);
