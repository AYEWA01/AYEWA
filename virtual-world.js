(() => {
  const WORLD_STATUS_TEXT = {
    aerial: "Aerial view",
    ground: "Ground view",
    synced: "Location synced",
  };

  function getLocationByKey(key) {
    const locations = Array.isArray(window.worldLocations) ? window.worldLocations : [];
    return locations.find((location) => location.key === key) || locations[0] || null;
  }

  function updateStatusPill(label) {
    const statusPill = document.getElementById("world-status-pill");
    if (statusPill && label) {
      statusPill.textContent = label;
    }
  }

  function ensureWorldReady() {
    const canvas = document.getElementById("world-canvas");
    if (!canvas || !window.THREE) {
      return false;
    }

    if (!window.scene || !window.camera || !window.renderer) {
      return false;
    }

    return true;
  }

  function addRoadGeometry() {
    if (!window.scene || window.scene.userData.ayeewaGeoOverlay) return;

    const geoGroup = new THREE.Group();
    geoGroup.name = "ayeewa-geo-overlay";
    scene.add(geoGroup);
    window.scene.userData.ayeewaGeoOverlay = geoGroup;

    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0x263f36,
      roughness: 0.95,
      metalness: 0.08,
      emissive: 0x0b1714,
      emissiveIntensity: 0.2,
    });

    const ringRoads = [16, 21, 28];
    ringRoads.forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(radius - 0.8, radius + 0.7, 64),
        new THREE.MeshStandardMaterial({
          color: index === 0 ? 0x3a4d45 : 0x304a40,
          side: THREE.DoubleSide,
          roughness: 1,
        })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -0.49;
      geoGroup.add(ring);
    });

    const roadLines = [
      [-18, -12], [2, 18], [-10, 14], [-25, 4], [18, 8],
    ];
    roadLines.forEach(([x, z], index) => {
      const road = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 0.12, 22 + ((index % 2) * 5)),
        roadMaterial
      );
      road.position.set(x, -0.42, z);
      road.rotation.y = index % 2 === 0 ? 0 : Math.PI / 2.2;
      geoGroup.add(road);
    });

    const terrain = new THREE.Mesh(
      new THREE.CircleGeometry(48, 64),
      new THREE.MeshStandardMaterial({
        color: 0x102820,
        roughness: 0.98,
        metalness: 0.03,
      })
    );
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -0.7;
    geoGroup.add(terrain);

    const geoLabel = document.getElementById("world-location-description");
    if (geoLabel) {
      geoLabel.textContent = `${geoLabel.textContent} • Experimental geographic overlay: roads and terrain are a stylized prototype, not authoritative Lagos GIS data.`;
    }
  }

  function buildVirtualFeatureMarker({ lat, lng, height = 8, color = 0x7dffba, label = "Virtual space" }) {
    if (!window.scene || !window.worldPositionFromLatLng) return null;

    const point = window.worldPositionFromLatLng(lat, lng);
    const virtualGroup = new THREE.Group();
    virtualGroup.name = label;

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, height, 2.8),
      new THREE.MeshStandardMaterial({
        color,
        emissive: 0x0b1714,
        emissiveIntensity: 0.5,
        roughness: 0.7,
        metalness: 0.2,
      })
    );
    base.position.set(point.x, height / 2, point.z);
    virtualGroup.add(base);

    const roof = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 1.3, 1.1, 8),
      new THREE.MeshStandardMaterial({
        color: 0x9ef7d0,
        emissive: 0x7dffba,
        emissiveIntensity: 0.6,
      })
    );
    roof.position.set(point.x, height + 0.55, point.z);
    virtualGroup.add(roof);

    window.scene.add(virtualGroup);
    return virtualGroup;
  }

  function ensureVirtualBuildings() {
    if (!window.scene || window.scene.userData.ayeewaVirtualBuildings) return;

    const customBuildings = [
      { lat: 6.4288, lng: 3.4218, height: 8, color: 0x7dffba, label: "Virtual property" },
      { lat: 6.4393, lng: 3.4927, height: 10, color: 0x6fdcff, label: "Community hub" },
      { lat: 6.5099, lng: 3.3797, height: 7, color: 0xb39dff, label: "Creator space" },
    ];

    const group = new THREE.Group();
    group.name = "ayeewa-virtual-buildings";
    window.scene.add(group);
    window.scene.userData.ayeewaVirtualBuildings = group;

    customBuildings.forEach((feature) => {
      const point = buildVirtualFeatureMarker(feature);
      if (point) {
        group.add(point);
      }
    });
  }

  function installTouchControls() {
    const canvas = document.getElementById("world-canvas");
    if (!canvas || canvas.dataset.ayeewaTouchInstalled === "true") return;
    canvas.dataset.ayeewaTouchInstalled = "true";

    const touchState = { x: 0, y: 0, active: false };

    const handlePointer = (clientX, clientY) => {
      if (!window.scene || !window.camera || !window.worldOrbit) return;
      const dx = clientX - touchState.x;
      const dy = clientY - touchState.y;
      touchState.x = clientX;
      touchState.y = clientY;

      if (window.worldMode === "aerial") {
        window.worldOrbit.yaw -= dx * 0.0055;
        window.worldOrbit.pitch = Math.min(Math.max(window.worldOrbit.pitch + dy * 0.0045, 0.2), 1.35);
      }
    };

    canvas.addEventListener("touchstart", (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        touchState.active = true;
        touchState.x = touch.clientX;
        touchState.y = touch.clientY;
      }
    }, { passive: true });

    canvas.addEventListener("touchmove", (event) => {
      if (!touchState.active || event.touches.length === 0) return;
      event.preventDefault();
      const touch = event.touches[0];
      handlePointer(touch.clientX, touch.clientY);
    }, { passive: false });

    canvas.addEventListener("touchend", () => {
      touchState.active = false;
    }, { passive: true });

    canvas.addEventListener("touchcancel", () => {
      touchState.active = false;
    }, { passive: true });
  }

  function updateLocationDescription(key) {
    const location = getLocationByKey(key);
    if (!location) return;

    const description = document.getElementById("world-location-description");
    if (description) {
      description.textContent = `${location.description} • Experimental geographic overlay for Lagos, Nigeria. This is a prototype scene, not an authoritative GIS dataset.`;
    }
  }

  function patchWorldSelection() {
    if (window.__ayeewaVirtualWorldPatched) return;
    window.__ayeewaVirtualWorldPatched = true;

    const originalUpdateSelectedLocation = window.updateSelectedLocation;
    if (typeof originalUpdateSelectedLocation === "function") {
      window.updateSelectedLocation = function patchedUpdateSelectedLocation(key, fromMap = false) {
        const result = originalUpdateSelectedLocation.call(this, key, fromMap);
        if (key) {
          updateLocationDescription(key);
          updateStatusPill(WORLD_STATUS_TEXT.synced);
          const location = getLocationByKey(key);
          if (location) {
            const mapStatus = document.getElementById("map-status");
            if (mapStatus) {
              mapStatus.textContent = `Map integration: ${location.name} selected • shared Lagos coordinates`;
            }
          }
        }
        return result;
      };
    }

    const originalShowWorldFocus = window.showWorldFocus;
    if (typeof originalShowWorldFocus === "function") {
      window.showWorldFocus = function patchedShowWorldFocus(key) {
        const result = originalShowWorldFocus.call(this, key);
        if (key) {
          updateLocationDescription(key);
          updateStatusPill(WORLD_STATUS_TEXT.synced);
        }
        return result;
      };
    }
  }

  function initialise() {
    if (!ensureWorldReady()) {
      setTimeout(initialise, 200);
      return;
    }

    patchWorldSelection();
    addRoadGeometry();
    ensureVirtualBuildings();
    installTouchControls();
    updateStatusPill(WORLD_STATUS_TEXT.aerial);

    const selectedKey = window.worldLocationName && window.worldLocationName.textContent
      ? window.worldLocationName.textContent.toLowerCase().replace(/\s+/g, "-")
      : "victoria-island";
    updateLocationDescription(selectedKey);
  }

  if (document.readyState === "complete") {
    initialise();
  } else {
    window.addEventListener("load", initialise, { once: true });
  }

  window.AYEWA_VIRTUAL_WORLD = {
    initialise,
    buildVirtualFeatureMarker,
    addCustomBuilding: buildVirtualFeatureMarker,
    getLocationByKey,
  };
})();
`,