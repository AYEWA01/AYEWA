(() => {
  const worldLocations = [
    {
      key: "victoria-island",
      name: "Victoria Island",
      lat: 6.4288,
      lng: 3.4218,
      description: "City-edge innovation district with commerce, nightlife and a strong creative pulse.",
    },
    {
      key: "lekki",
      name: "Lekki",
      lat: 6.4393,
      lng: 3.4927,
      description: "A growing coastal zone shaped by lifestyle, culture and future urban planning.",
    },
    {
      key: "yaba",
      name: "Yaba",
      lat: 6.5099,
      lng: 3.3797,
      description: "Creative energy, digital talent and civic innovation in one of Lagos' most active hubs.",
    },
    {
      key: "ikoyi",
      name: "Ikoyi",
      lat: 6.4447,
      lng: 3.4316,
      description: "A high-visibility district linking business, residential life and modern urban amenities.",
    },
    {
      key: "marina",
      name: "Marina",
      lat: 6.45,
      lng: 3.395,
      description: "Waterfront civic and commercial edge, ideal for social gatherings and public events.",
    },
  ];

  window.worldLocations = worldLocations;

  const views = [...document.querySelectorAll(".view")];
  const navItems = [...document.querySelectorAll(".nav-item")];
  const toggleButton = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-nav");
  const mapStatus = document.getElementById("map-status");
  const worldStatusPill = document.getElementById("world-status-pill");
  const worldLocationName = document.getElementById("world-location-name");
  const worldLocationDescription = document.getElementById("world-location-description");
  const worldLoading = document.getElementById("world-loading");
  const worldError = document.getElementById("world-error");
  const enterWorldButton = document.getElementById("enter-world-button");
  const chatFeed = document.getElementById("chat-feed");
  const aiInput = document.getElementById("ai-input");
  const askAiButton = document.getElementById("ask-ai-button");

  const appState = {
    selectedKey: "victoria-island",
    worldMode: "aerial",
  };

  function getLocationByKey(key) {
    return (window.worldLocations || []).find((location) => location.key === key) || (window.worldLocations || [])[0] || null;
  }

  function showView(targetId) {
    views.forEach((view) => {
      view.classList.toggle("active", view.id === targetId);
    });

    navItems.forEach((button) => {
      button.classList.toggle("active", button.dataset.target === targetId);
    });

    if (window.innerWidth <= 480 && menu) {
      menu.classList.remove("open");
      menu.style.display = "none";
    }
  }

  navItems.forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.target));
  });

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.open));
  });

  toggleButton?.addEventListener("click", () => {
    if (!menu) return;
    const isOpen = menu.classList.toggle("open");
    menu.style.display = isOpen ? "flex" : "none";
  });

  if (window.innerWidth > 480 && menu) {
    menu.style.display = "flex";
  } else if (menu) {
    menu.style.display = "none";
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    Object.assign(toast.style, {
      position: "fixed",
      left: "50%",
      bottom: "20px",
      transform: "translateX(-50%)",
      background: "rgba(10,24,18,0.94)",
      color: "#eefaf4",
      border: "1px solid rgba(125,255,186,0.2)",
      borderRadius: "12px",
      padding: "10px 14px",
      zIndex: "9999",
      boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  }

  function updateLocationText(location) {
    if (!location) return;
    if (worldLocationName) {
      worldLocationName.textContent = location.name;
    }
    if (worldLocationDescription) {
      worldLocationDescription.textContent = `${location.description} • Lagos, Nigeria • Shared map and 3D coordinates.`;
    }
    if (worldStatusPill) {
      worldStatusPill.textContent = appState.worldMode === "aerial" ? "Aerial view" : "Ground view";
    }
  }

  function createMarkerIcon(active) {
    return L.divIcon({
      className: "map-marker-pin",
      html: `
        <span style="
          display:block;
          width:18px;
          height:18px;
          border-radius:50%;
          background:${active ? "#7dffba" : "#6fdcff"};
          border:2px solid rgba(5,19,16,0.9);
          box-shadow:0 0 0 5px rgba(125,255,186,0.12);
        "></span>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  }

  let map;

  function applyMapSelection(key, options = {}) {
    const location = getLocationByKey(key);
    if (!location) return;
    appState.selectedKey = location.key;
    updateLocationText(location);

    if (map) {
      window.worldLocations.forEach((item) => {
        if (!item.marker) return;
        const active = item.key === location.key;
        item.marker.setIcon(createMarkerIcon(active));
        item.marker.setZIndexOffset(active ? 900 : 0);
        item.marker.setOpacity(active ? 1 : 0.9);
      });

      if (options.fromMap) {
        map.flyTo([location.lat, location.lng], Math.max(map.getZoom(), 12), { duration: 1.15 });
      }
    }

    if (mapStatus) {
      mapStatus.textContent = `Map integration: ${location.name} is synced to the 3D world`;
    }

    if (!options.skipWorld && window.ayeewaVirtualWorld && typeof window.ayeewaVirtualWorld.focusLocation === "function") {
      window.ayeewaVirtualWorld.focusLocation(location.key, { syncMap: true });
    }
  }

  window.ayeewaMapSelection = function (key, options = {}) {
    applyMapSelection(key, options);
  };

  function initLeafletMap() {
    if (!window.L || !document.getElementById("map-surface")) return;

    map = L.map("map-surface", {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
      dragging: true,
    });

    map.setView([6.454, 3.4], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    window.worldLocations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createMarkerIcon(false),
      }).addTo(map);

      marker.bindPopup(`<strong>${location.name}</strong><br>${location.description}`);
      marker.on("click", () => {
        applyMapSelection(location.key, { fromMap: true, skipWorld: false });
      });

      location.marker = marker;
    });

    applyMapSelection(appState.selectedKey, { fromMap: false, skipWorld: true });

    if (mapStatus) {
      mapStatus.textContent = "Map integration: live OpenStreetMap layer";
    }
  }

  function addChatMessage(role, text) {
    if (!chatFeed) return;

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

    return "For a prototype-level experience, start with local character, neighborhood identity, and community energy. That gives the world a stronger sense of place before adding advanced AI or multiplayer features.";
  }

  askAiButton?.addEventListener("click", () => {
    const value = aiInput.value.trim();
    if (!value) {
      showToast("Please type a question for the guide.");
      return;
    }

    addChatMessage("user", value);
    aiInput.value = "";
    setTimeout(() => addChatMessage("assistant", mockGuideReply(value)), 350);
  });

  document.querySelectorAll("[data-guide-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      aiInput.value = button.dataset.guidePrompt;
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
    const tag = document.querySelector(".tag");
    if (tag) {
      tag.textContent = style.charAt(0).toUpperCase() + style.slice(1);
    }
    showToast(`Profile updated: ${name} • ${style}`);
  });

  enterWorldButton?.addEventListener("click", () => {
    showView("world");
    if (window.ayeewaVirtualWorld && typeof window.ayeewaVirtualWorld.focusLocation === "function") {
      window.ayeewaVirtualWorld.focusLocation(appState.selectedKey, { syncMap: false });
    }
    showToast("Virtual world ready for exploration.");
  });

  window.showWorldFocus = function (key, options = {}) {
    if (!key) return;
    const location = getLocationByKey(key);
    if (!location) return;
    appState.selectedKey = location.key;
    updateLocationText(location);
    if (window.L && map) {
      window.worldLocations.forEach((item) => {
        if (!item.marker) return;
        const active = item.key === location.key;
        item.marker.setIcon(createMarkerIcon(active));
        item.marker.setZIndexOffset(active ? 900 : 0);
        item.marker.setOpacity(active ? 1 : 0.9);
      });
    }
    if (!options.skipWorld && window.ayeewaVirtualWorld && typeof window.ayeewaVirtualWorld.focusLocation === "function") {
      window.ayeewaVirtualWorld.focusLocation(location.key, { syncMap: false });
    }
  };

  if (window.L) {
    initLeafletMap();
  }

  if (mapStatus) {
    mapStatus.textContent = "Map integration: live OpenStreetMap layer";
  }

  if (worldLocationName && worldLocationDescription) {
    worldLocationName.textContent = "Victoria Island";
    worldLocationDescription.textContent = "City-edge innovation district with commerce, nightlife and a strong creative pulse. • Lagos, Nigeria • Shared map and 3D coordinates.";
  }

  if (worldStatusPill) {
    worldStatusPill.textContent = "Aerial view";
  }

  if (!window.L) {
    if (worldError) {
      worldError.hidden = false;
      worldError.textContent = "Map resources are unavailable, but the 3D scene can still render in this browser.";
    }
  }

  if (!window.THREE) {
    if (worldError) {
      worldError.hidden = false;
      worldError.textContent = "3D resources are unavailable, but the map remains interactive.";
    }
  }

  console.info("AYEWA.AI ready with connected map and 3D virtual world state.");
})();
