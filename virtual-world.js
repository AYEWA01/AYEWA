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

  function showWorldLoading(show) {
    const loading = document.getElementById("world-loading");
    if (loading) loading.hidden = !show;
  }

  function showWorldError(message) {
    showWorldLoading(false);
    const error = document.getElementById("world-error");
    if (error) {
      error.hidden = false;
      error.textContent = message;
    }
  }

  function updateStatusPill(label) {
    const statusPill = document.getElementById("world-status-pill");
    if (statusPill && label) {
      statusPill.textContent = label;
    }
  }

  function createRoadNetwork(viewer) {
    const roadPositions = [
      [3.38, 6.43, 3.54, 6.51],
      [3.39, 6.41, 3.47, 6.44],
      [3.46, 6.49, 3.33, 6.43],
      [3.42, 6.44, 3.50, 6.52],
    ];

    roadPositions.forEach((coords) => {
      const [lng1, lat1, lng2, lat2] = coords;
      viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([lng1, lat1, lng2, lat2]),
          width: 5,
          material: new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString("#2d584d")),
          clampToGround: true,
        },
      });
    });
  }

  function addCustomVirtualBuildings(viewer) {
    const customBuildings = [
      { key: "victoria-island", lat: 6.4288, lng: 3.4218, height: 45, color: "#7dffba" },
      { key: "lekki", lat: 6.4393, lng: 3.4927, height: 60, color: "#6fdcff" },
      { key: "yaba", lat: 6.5099, lng: 3.3797, height: 52, color: "#b39dff" },
    ];

    customBuildings.forEach((building) => {
      viewer.entities.add({
        id: `${building.key}-virtual-building`,
        position: Cesium.Cartesian3.fromDegrees(building.lng, building.lat, 10),
        box: {
          dimensions: new Cesium.Cartesian3(30, 30, building.height),
          material: Cesium.Color.fromCssColorString(building.color).withAlpha(0.7),
          outline: true,
          outlineColor: Cesium.Color.BLACK.withAlpha(0.5),
        },
        properties: { key: building.key, type: "virtual" },
      });
    });
  }

  function applyLocationToWorldSelection(key) {
    const location = getLocationByKey(key);
    if (!location) return;

    const nameEl = document.getElementById("world-location-name");
    if (nameEl) nameEl.textContent = location.name;
    const descEl = document.getElementById("world-location-description");
    if (descEl) {
      descEl.textContent = `${location.description} • Lagos, Nigeria • Shared geographic coordinates.`;
    }
    updateStatusPill(WORLD_STATUS_TEXT.synced);
  }

  function updateLocationDescription(key) {
    const location = getLocationByKey(key);
    if (!location) return;
    const descEl = document.getElementById("world-location-description");
    if (descEl) {
      descEl.textContent = `${location.description} • Stylized Lagos geographic overlay • not an authoritative GIS dataset.`;
    }
  }

  function initialize() {
    const host = document.getElementById("world-canvas");
    if (!host || typeof Cesium === "undefined") {
      showWorldError("3D environment unavailable in this browser. The map is still usable.");
      return;
    }

    showWorldLoading(true);

    try {
      const viewer = new Cesium.Viewer(host, {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        sceneModePicker: true,
        imageryProvider: new Cesium.OpenStreetMapImageryProvider({
          url: "https://a.tile.openstreetmap.org/",
        }),
        terrainProvider: Cesium.createWorldTerrain(),
      });

      viewer.scene.globe.enableLighting = true;
      viewer.scene.globe.depthTestAgainstTerrain = true;
      viewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#07130f");
      viewer.cesiumWidget.creditContainer.style.display = "none";

      const initialLocation = getLocationByKey("victoria-island");
      if (initialLocation) {
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(initialLocation.lng, initialLocation.lat, 18000),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-80),
            roll: 0,
          },
        });
      }

      createRoadNetwork(viewer);

      window.worldLocations.forEach((location) => {
        viewer.entities.add({
          id: location.key,
          name: location.name,
          position: Cesium.Cartesian3.fromDegrees(location.lng, location.lat, 120),
          point: {
            pixelSize: 14,
            color: Cesium.Color.fromCssColorString("#6fdcff"),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
          },
          label: {
            text: location.name,
            font: "14px sans-serif",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 1,
            pixelOffset: new Cesium.Cartesian2(12, -15),
          },
          properties: {
            key: location.key,
            type: "geo-location",
          },
        });
      });

      addCustomVirtualBuildings(viewer);

      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction((click) => {
        const picked = viewer.scene.pick(click.position);
        const entity = picked && picked.id ? picked.id : null;
        let key = entity && entity.properties && entity.properties.key ? entity.properties.key.getValue() : null;

        if (!key && entity && entity.id) {
          key = entity.id;
        }

        if (!key) return;

        window.ayeewaMapSelection?.(key, { syncWorld: false });
        applyLocationToWorldSelection(key);
      }, Cesium.ScreenSpaceEventHandler.MouseEventType.LEFT_CLICK);

      window.viewer = viewer;
      window.ayeewaVirtualWorld = {
        initialize,
        setWorldMode(mode) {
          const location = getLocationByKey(window.worldLocationKey || "victoria-island");
          if (!location) return;

          const target = Cesium.Cartesian3.fromDegrees(
            location.lng,
            location.lat,
            mode === "ground" ? 250 : 18000
          );

          viewer.camera.flyTo({
            destination: target,
            orientation: {
              heading: Cesium.Math.toRadians(mode === "ground" ? 20 : 0),
              pitch: Cesium.Math.toRadians(mode === "ground" ? -25 : -80),
              roll: 0,
            },
            duration: 1.6,
          });

          updateStatusPill(mode === "ground" ? WORLD_STATUS_TEXT.ground : WORLD_STATUS_TEXT.aerial);
        },
        focusLocation(key, options = {}) {
          const location = getLocationByKey(key);
          if (!location) return;

          const selectedKey = location.key;
          const targetAlt = window.worldMode === "ground" ? 260 : 18000;
          window.worldLocationKey = selectedKey;

          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(location.lng, location.lat, targetAlt),
            orientation: {
              heading: Cesium.Math.toRadians(window.worldMode === "ground" ? 30 : 0),
              pitch: Cesium.Math.toRadians(window.worldMode === "ground" ? -25 : -80),
              roll: 0,
            },
            duration: 1.4,
          });

          applyLocationToWorldSelection(selectedKey);
          updateLocationDescription(selectedKey);

          if (options.syncMap !== false && window.ayeewaMapSelection) {
            window.ayeewaMapSelection(selectedKey, { syncWorld: false });
          }
        },
      };

      showWorldLoading(false);
      updateStatusPill(WORLD_STATUS_TEXT.aerial);

      const selectedKey = window.worldLocationKey || "victoria-island";
      applyLocationToWorldSelection(selectedKey);
      if (window.ayeewaMapSelection) {
        window.ayeewaMapSelection(selectedKey, { syncWorld: false });
      }
    } catch (error) {
      console.error("Could not initialise Cesium world:", error);
      showWorldError("3D environment failed to initialise. The map remains available.");
    }
  }

  window.ayeewaVirtualWorld = {
    initialize,
    setWorldMode(mode) {
      const state = window.ayeewaVirtualWorld || {};
      if (typeof state.setWorldModeInternal === "function") {
        state.setWorldModeInternal(mode);
      }
    },
    focusLocation(key, options = {}) {
      if (window.ayeewaVirtualWorld && typeof window.ayeewaVirtualWorld.focusLocationInternal === "function") {
        window.ayeewaVirtualWorld.focusLocationInternal(key, options);
      }
    },
  };

  if (document.readyState === "complete") {
    initialize();
  } else {
    window.addEventListener("load", initialize, { once: true });
  }
})();
