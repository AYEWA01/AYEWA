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

const worldLocations = [
  {
    key: "victoria-island",
    name: "Victoria Island",
    lat: 6.4288,
    lng: 3.4218,
    description: "City-edge innovation district with commerce, nightlife and a strong creative pulse.",
    baseLabel: "A1",
  },
  {
    key: "lekki",
    name: "Lekki",
    lat: 6.4393,
    lng: 3.4927,
    description: "A growing coastal zone shaped by lifestyle, culture and future urban planning.",
    baseLabel: "B2",
  },
  {
    key: "yaba",
    name: "Yaba",
    lat: 6.5099,
    lng: 3.3797,
    description: "Creative energy, digital talent and civic innovation in one of Lagos' most active hubs.",
    baseLabel: "C3",
  },
  {
    key: "ikoyi",
    name: "Ikoyi",
    lat: 6.4447,
    lng: 3.4316,
    description: "A high-visibility district linking business, residential life and modern urban amenities.",
    baseLabel: "D4",
  },
  {
    key: "marina",
    name: "Marina",
    lat: 6.4500,
    lng: 3.3950,
    description: "Waterfront civic and commercial edge, ideal for social gatherings and public events.",
    baseLabel: "E5",
  },
];

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

const demoMapButton = document.getElementById("demo-map-button");
const mapWarningButton = document.getElementById("map-warning-button");

demoMapButton?.addEventListener("click", () => {
  if (mapStatus) {
    mapStatus.textContent = "Map integration: demo layer active";
  }
  showToast("Demo map loaded. Maps API integration is still pending.");
});

mapWarningButton?.addEventListener("click", () => {
  if (mapStatus) {
    mapStatus.textContent = "Map integration: not connected";
  }
  showToast("Google Maps is intentionally not configured in this prototype.");
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

  return "For a prototype level experience, start with the local culture, neighborhood identity, and community energy. That gives the world a stronger sense of place before adding advanced AI or commerce features.";
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

let map;
let selectedMapMarker = null;
let scene;
let camera;
let renderer;
let worldMode = "aerial";
let worldOrbit = { yaw: 0.8, pitch: 0.8, distance: 42 };
let worldMarkers = new Map();
let selectedWorldMarker = null;
let worldPointerState = { dragging: false, x: 0, y: 0 };
const groundMovement = { w: false, a: false, s: false, d: false };

function createMarkerIcon(active) {
  return L.divIcon({
    className: "map-marker-pin",
    html: `
      <span style="
        display:block;
        width:16px;
        height:16px;
        border-radius:50%;
        background:${active ? "#7dffba" : "#6fdcff"};
        border:2px solid rgba(5, 19, 16, 0.9);
        box-shadow:0 0 0 4px rgba(125,255,186,0.14);
      "></span>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function getLocationByKey(key) {
  return worldLocations.find((location) => location.key === key) || worldLocations[0];
}

function updateSelectedLocation(key, fromMap = false) {
  const location = getLocationByKey(key);
  if (!location) return;

  if (worldLocationName) {
    worldLocationName.textContent = location.name;
  }

  if (worldLocationDescription) {
    worldLocationDescription.textContent = location.description;
  }

  if (map) {
    worldLocations.forEach((item) => {
      const marker = item.marker;
      if (!marker) return;
      const isSelected = item.key === location.key;
      marker.setIcon(createMarkerIcon(isSelected));
      marker.setZIndexOffset(isSelected ? 900 : 0);
      marker.setOpacity(isSelected ? 1 : 0.9);
    });

    if (fromMap) {
      map.flyTo([location.lat, location.lng], Math.max(map.getZoom(), 12), { duration: 1.2 });
    }
  }

  if (selectedWorldMarker && selectedWorldMarker.userData && selectedWorldMarker.userData.key) {
    const target = selectedWorldMarker;
    target.scale.set(1, 1, 1);
    target.material.emissive.setHex(0x0a1816);
  }

  const nextMarker = worldMarkers.get(location.key);
  if (nextMarker) {
    nextMarker.scale.set(1.25, 1.25, 1.25);
    nextMarker.material.emissive.setHex(0x7dffba);
    selectedWorldMarker = nextMarker;
  }
}

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

  worldLocations.forEach((location) => {
    const marker = L.marker([location.lat, location.lng], {
      icon: createMarkerIcon(false),
    }).addTo(map);

    marker.bindPopup(`<strong>${location.name}</strong><br>${location.description}`);
    marker.on("click", () => {
      updateSelectedLocation(location.key, false);
      if (window.showWorldFocus) {
        window.showWorldFocus(location.key);
      }
    });

    location.marker = marker;
  });

  updateSelectedLocation("victoria-island", false);

  if (mapStatus) {
    mapStatus.textContent = "Map integration: live OpenStreetMap layer";
  }
}

function worldPositionFromLatLng(lat, lng) {
  const baseLat = 6.44;
  const baseLng = 3.38;
  const scale = 1000;
  return {
    x: (lng - baseLng) * scale * 6.4,
    z: (baseLat - lat) * scale * 6.4,
  };
}

function setWorldMode(mode) {
  worldMode = mode;
  const modeButtons = document.querySelectorAll(".world-mode-btn");
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.worldMode === mode);
  });

  if (!worldStatusPill) return;
  worldStatusPill.textContent = mode === "aerial" ? "Aerial view" : "Ground view";
}

document.querySelectorAll(".world-mode-btn").forEach((button) => {
  button.addEventListener("click", () => {
    setWorldMode(button.dataset.worldMode);
  });
});

function showWorldError(message) {
  if (worldLoading) {
    worldLoading.hidden = true;
  }
  if (worldError) {
    worldError.hidden = false;
    worldError.textContent = message;
  }
}

function initThreeWorld() {
  const canvas = document.getElementById("world-canvas");
  if (!canvas || !window.THREE) {
    showWorldError("3D scene unavailable. The map still works, but the scene could not initialise.");
    return;
  }

  if (worldLoading) {
    worldLoading.hidden = false;
  }

  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvas.clientWidth || canvas.parentElement.clientWidth || 700, canvas.clientHeight || 420, false);
    renderer.setClearColor(0x07130f, 1);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x07130f, 18, 120);

    camera = new THREE.PerspectiveCamera(45, (canvas.clientWidth || 700) / (canvas.clientHeight || 420), 0.1, 500);

    const ambient = new THREE.HemisphereLight(0x8ae7c8, 0x06150f, 1.1);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xd7f8ff, 1.2);
    sun.position.set(15, 28, 12);
    scene.add(sun);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(140, 140),
      new THREE.MeshStandardMaterial({
        color: 0x0f251d,
        roughness: 0.96,
        metalness: 0.08,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);

    const road = new THREE.Mesh(
      new THREE.RingGeometry(15, 18, 56),
      new THREE.MeshStandardMaterial({ color: 0x1b302a, side: THREE.DoubleSide })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.y = -0.48;
    scene.add(road);

    const roadCore = new THREE.Mesh(
      new THREE.RingGeometry(10, 11.2, 56),
      new THREE.MeshStandardMaterial({ color: 0x2d3b35, side: THREE.DoubleSide })
    );
    roadCore.rotation.x = -Math.PI / 2;
    roadCore.position.y = -0.47;
    scene.add(roadCore);

    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a332b,
      roughness: 0.8,
      metalness: 0.1,
    });

    const buildingCluster = new THREE.Group();
    for (let index = 0; index < 18; index += 1) {
      const size = 1.5 + Math.random() * 3.4;
      const x = (Math.random() - 0.5) * 36;
      const z = (Math.random() - 0.5) * 34;
      const y = size / 2;
      const building = new THREE.Mesh(new THREE.BoxGeometry(size, size * 2, size), buildingMaterial);
      building.position.set(x, y, z);
      buildingCluster.add(building);
    }
    scene.add(buildingCluster);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    worldLocations.forEach((location) => {
      const point = worldPositionFromLatLng(location.lat, location.lng);
      const marker = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 1.1, 2.2, 12),
        new THREE.MeshStandardMaterial({
          color: 0x6fdcff,
          emissive: 0x0a1816,
          emissiveIntensity: 0.8,
          metalness: 0.2,
          roughness: 0.5,
        })
      );

      marker.position.set(point.x, 1.1, point.z);
      marker.userData = { key: location.key };

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.9, 0.1, 12, 26),
        new THREE.MeshBasicMaterial({ color: 0x7dffba, transparent: true, opacity: 0.75 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(point.x, 0.2, point.z);
      ring.userData = { key: location.key };

      worldGroup.add(marker, ring);
      worldMarkers.set(location.key, marker);
    });

    selectedWorldMarker = worldMarkers.get("victoria-island") || null;
    if (selectedWorldMarker) {
      selectedWorldMarker.scale.set(1.25, 1.25, 1.25);
      selectedWorldMarker.material.emissive.setHex(0x7dffba);
    }

    setWorldMode("aerial");
    syncWorldCamera();

    canvas.addEventListener("pointerdown", (event) => {
      worldPointerState.dragging = true;
      worldPointerState.x = event.clientX;
      worldPointerState.y = event.clientY;
    });

    window.addEventListener("pointermove", (event) => {
      if (!worldPointerState.dragging || !scene || !camera) return;

      const dx = event.clientX - worldPointerState.x;
      const dy = event.clientY - worldPointerState.y;
      worldPointerState.x = event.clientX;
      worldPointerState.y = event.clientY;

      if (worldMode === "aerial") {
        worldOrbit.yaw -= dx * 0.006;
        worldOrbit.pitch = Math.min(Math.max(worldOrbit.pitch + dy * 0.005, 0.3), 1.3);
      }
    });

    window.addEventListener("pointerup", () => {
      worldPointerState.dragging = false;
    });

    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      if (worldMode === "aerial") {
        worldOrbit.distance = Math.min(Math.max(worldOrbit.distance + event.deltaY * 0.02, 18), 100);
      }
    }, { passive: false });

    window.addEventListener("keydown", (event) => {
      if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        groundMovement[event.code.replace("Key", "").toLowerCase()] = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        const key = event.code.replace("Key", "").toLowerCase();
        if (key in groundMovement) {
          groundMovement[key] = false;
        }
      }
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pickObjects = [];
    worldMarkers.forEach((marker) => {
      pickObjects.push(marker);
    });

    canvas.addEventListener("click", (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickObjects, false);
      if (hits.length > 0) {
        const hit = hits[0].object;
        const key = hit.userData.key || hit.parent?.userData?.key;
        if (key) {
          updateSelectedLocation(key, false);
          if (map) {
            const point = getLocationByKey(key);
            map.flyTo([point.lat, point.lng], 12, { duration: 1.1 });
          }
        }
      }
    });

    function animate() {
      requestAnimationFrame(animate);

      if (worldMode === "aerial") {
        const target = new THREE.Vector3(0, 0, 0);
        const x = Math.sin(worldOrbit.yaw) * worldOrbit.distance;
        const z = Math.cos(worldOrbit.yaw) * worldOrbit.distance;
        const y = 18 + Math.sin(worldOrbit.pitch) * worldOrbit.distance * 0.55;
        camera.position.set(x, y, z);
        camera.lookAt(target);
      } else {
        const currentLocation = getLocationByKey(worldLocationName ? worldLocationName.textContent : "victoria-island");
        const point = worldPositionFromLatLng(currentLocation.lat, currentLocation.lng);
        const moveSpeed = 0.26;

        if (groundMovement.w || groundMovement.arrowup) {
          camera.position.z -= moveSpeed;
        }
        if (groundMovement.s || groundMovement.arrowdown) {
          camera.position.z += moveSpeed;
        }
        if (groundMovement.a || groundMovement.arrowleft) {
          camera.position.x -= moveSpeed;
        }
        if (groundMovement.d || groundMovement.arrowright) {
          camera.position.x += moveSpeed;
        }

        camera.position.x += (point.x + 10 - camera.position.x) * 0.04;
        camera.position.z += (point.z + 10 - camera.position.z) * 0.04;
        camera.position.y = 3.2;
        camera.lookAt(point.x, 1.5, point.z);
      }

      renderer.render(scene, camera);
    }

    animate();

    if (worldLoading) {
      worldLoading.hidden = true;
    }
    if (worldError) {
      worldError.hidden = true;
    }
  } catch (error) {
    console.error("Could not initialise the 3D world:", error);
    showWorldError("3D scene unavailable. WebGL could not be configured for this browser.");
  }
}

function syncWorldCamera() {
  if (!camera || !worldMode) return;
  if (worldMode === "aerial") {
    const x = Math.sin(worldOrbit.yaw) * worldOrbit.distance;
    const z = Math.cos(worldOrbit.yaw) * worldOrbit.distance;
    camera.position.set(x, 18 + Math.sin(worldOrbit.pitch) * worldOrbit.distance * 0.55, z);
    camera.lookAt(0, 0, 0);
  }
}

window.showWorldFocus = function (key) {
  if (!key) return;
  updateSelectedLocation(key, false);
  const location = getLocationByKey(key);
  if (!location || !scene || !camera) return;
  const point = worldPositionFromLatLng(location.lat, location.lng);
  camera.position.x = point.x + 10;
  camera.position.z = point.z + 10;
  camera.position.y = 7;
  camera.lookAt(point.x, 1.5, point.z);
};

enterWorldButton?.addEventListener("click", () => {
  const targetKey = worldLocationName?.textContent ? worldLocationName.textContent.toLowerCase().replace(/\s+/g, "-") : "victoria-island";
  updateSelectedLocation(targetKey, false);
  setWorldMode("aerial");
  showView("world");
  showToast("Virtual world ready for exploration.");
});

window.addEventListener("resize", () => {
  if (!renderer || !camera) return;
  const canvas = document.getElementById("world-canvas");
  if (!canvas) return;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 700;
  const height = canvas.clientHeight || 420;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
});

if (typeof window.L !== "undefined") {
  initLeafletMap();
}

if (document.readyState === "complete") {
  initThreeWorld();
} else {
  window.addEventListener("load", () => {
    initThreeWorld();
  });
}

if (window.L && window.THREE) {
  initThreeWorld();
}

if (mapStatus) {
  mapStatus.textContent = "Map integration: live OpenStreetMap layer";
}

if (worldLocationName && worldLocationDescription) {
  worldLocationName.textContent = "Victoria Island";
  worldLocationDescription.textContent = "City-edge innovation district with commerce, nightlife and a strong creative pulse.";
}

if (worldStatusPill) {
  worldStatusPill.textContent = "Aerial view";
}

if (document.getElementById("map-surface") && window.L) {
  initLeafletMap();
}

console.info("AYEWA.AI prototype loaded with 2D map + 3D world integration.");

if (typeof window !== "undefined" && window.THREE && !window.L) {
  showWorldError("Map resources are unavailable, but the 3D scene can still render in this browser.");
}

if (typeof window !== "undefined" && window.L && !window.THREE) {
  showWorldError("3D resources are unavailable, but the map remains interactive.");
}

if (!window.L || !window.THREE) {
  if (worldStatusPill) {
    worldStatusPill.textContent = "Scene unavailable";
  }
}
