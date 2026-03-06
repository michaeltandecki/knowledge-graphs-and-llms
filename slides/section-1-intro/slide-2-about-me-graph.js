(function () {
  let cy = null;
  let overlay = null;
  let loaderState = "idle";

  const OVERLAY_ID = "about-me-kg-overlay";

  const elements = {
    nodes: [
      { data: { id: "p_michael", label: "Michael Tandecki", type: "Person", name: "Michael Tandecki" } },
      { data: { id: "deg_phd_physics", label: "PhD in Physics", type: "Education", degree: "PhD", field: "Physics" } },
      { data: { id: "org_cern", label: "CERN", type: "Organization", name: "CERN" } },
      { data: { id: "loc_geneva", label: "Geneva", type: "Location", name: "Geneva" } },
      { data: { id: "org_triumf", label: "TRIUMF", type: "Organization", name: "TRIUMF" } },
      { data: { id: "loc_vancouver", label: "Vancouver", type: "Location", name: "Vancouver" } },
      { data: { id: "org_bisnode", label: "Bisnode", type: "Organization", name: "Bisnode" } },
      { data: { id: "role_ds_bisnode", label: "Data Scientist", type: "Role", title: "Data Scientist" } },
      { data: { id: "org_napoleon_games", label: "Napoleon Games", type: "Organization", name: "Napoleon Games" } },
      { data: { id: "role_ds_napoleon", label: "Data Scientist", type: "Role", title: "Data Scientist" } },
      { data: { id: "org_raito", label: "Raito", type: "Organization", name: "Raito" } },
      { data: { id: "role_backend_raito", label: "Backend Engineer", type: "Role", title: "Backend Engineer" } },
      { data: { id: "org_collibra", label: "Collibra", type: "Organization", name: "Collibra" } },
      { data: { id: "role_ai_expert", label: "AI Expert", type: "Role", title: "AI Expert" } },
      { data: { id: "role_po", label: "Product Owner", type: "Role", title: "Product Owner" } },
      { data: { id: "role_senior_manager", label: "Senior Manager", type: "Role", title: "Senior Manager" } },
      { data: { id: "role_data_scientist", label: "Staff Data Scientist", type: "Role", title: "Collibra" } },
      { data: { id: "org_ae", label: "AE", type: "Organization", name: "AE" } },
      { data: { id: "role_freelancer_ae", label: "Freelancer", type: "Role", title: "Freelancer (AE)" } },
      { data: { id: "role_freelancer_collibra", label: "Freelancer", type: "Role", title: "Freelancer (Collibra)" } },
      { data: { id: "org_imec", label: "imec", type: "Organization", name: "imec" } },
      { data: { id: "org_insurance", label: "Insurance Company", type: "Organization", name: "Insurance Company" } },
      { data: { id: "role_project_insurance", label: "Project (Freelance)", type: "Role", title: "Freelance Project" } },
      { data: { id: "skill_ml", label: "Machine Learning", type: "Skill", name: "Machine Learning" } },
      { data: { id: "skill_spark", label: "Apache Spark", type: "Skill", name: "Apache Spark" } },
      { data: { id: "skill_nlp", label: "NLP", type: "Skill", name: "Natural Language Processing" } },
      { data: { id: "skill_kg", label: "Knowledge Graphs", type: "Skill", name: "Knowledge Graphs" } },
      { data: { id: "skill_neo4j", label: "Neo4j", type: "Skill", name: "Neo4j" } },
      { data: { id: "event_acq_raito_2025", label: "Acquisition (2025)", type: "Event", year: 2025 } }
    ],
    edges: [
      { data: { id: "e_has_degree", source: "p_michael", target: "deg_phd_physics", label: "HAS_EDUCATION" } },
      { data: { id: "e_worked_at_cern", source: "p_michael", target: "org_cern", label: "HAS_WORKED_AT" } },
      { data: { id: "e_cern_loc", source: "org_cern", target: "loc_geneva", label: "LOCATED_IN" } },
      { data: { id: "e_worked_at_triumf", source: "p_michael", target: "org_triumf", label: "HAS_WORKED_AT" } },
      { data: { id: "e_triumf_loc", source: "org_triumf", target: "loc_vancouver", label: "LOCATED_IN" } },
      { data: { id: "e_role_bisnode", source: "p_michael", target: "role_ds_bisnode", label: "HELD_ROLE" } },
      { data: { id: "e_role_bisnode_at", source: "role_ds_bisnode", target: "org_bisnode", label: "AT_ORG" } },
      { data: { id: "e_role_napoleon", source: "p_michael", target: "role_ds_napoleon", label: "HELD_ROLE" } },
      { data: { id: "e_role_napoleon_at", source: "role_ds_napoleon", target: "org_napoleon_games", label: "AT_ORG" } },
      { data: { id: "e_skill_ml_person", source: "p_michael", target: "skill_ml", label: "WORKED_WITH" } },
      { data: { id: "e_skill_spark_person", source: "p_michael", target: "skill_spark", label: "WORKED_WITH" } },
      { data: { id: "e_role_backend", source: "p_michael", target: "role_backend_raito", label: "HELD_ROLE" } },
      { data: { id: "e_role_backend_at", source: "role_backend_raito", target: "org_raito", label: "AT_ORG" } },
      { data: { id: "e_raito_neo4j", source: "role_backend_raito", target: "skill_neo4j", label: "WORKED_WITH" } },
      { data: { id: "e_raito_acq_event", source: "org_raito", target: "event_acq_raito_2025", label: "SUBJECT_OF" } },
      { data: { id: "e_collibra_acq_event", source: "org_collibra", target: "event_acq_raito_2025", label: "ACQUIRER_IN" } },
      { data: { id: "e_role_ai_expert", source: "p_michael", target: "role_ai_expert", label: "HELD_ROLE" } },
      { data: { id: "e_role_ai_expert_at", source: "role_ai_expert", target: "org_collibra", label: "AT_ORG" } },
      { data: { id: "e_role_po", source: "p_michael", target: "role_po", label: "HELD_ROLE" } },
      { data: { id: "e_role_po_at", source: "role_po", target: "org_collibra", label: "AT_ORG" } },
      { data: { id: "e_role_sm", source: "p_michael", target: "role_senior_manager", label: "HELD_ROLE" } },
      { data: { id: "e_role_sm_at", source: "role_senior_manager", target: "org_collibra", label: "AT_ORG" } },
      { data: { id: "e_collibra_nlp", source: "org_collibra", target: "skill_nlp", label: "EXPOSURE_TO" } },
      { data: { id: "e_collibra_kg", source: "org_collibra", target: "skill_kg", label: "EXPOSURE_TO" } },
      { data: { id: "e_freelance_ae", source: "p_michael", target: "role_freelancer_ae", label: "STARTED_FREELANCING" } },
      { data: { id: "e_freelance_ae_at", source: "role_freelancer_ae", target: "org_ae", label: "AT_ORG" } },
      { data: { id: "e_ae_worked_at_imec", source: "org_ae", target: "org_imec", label: "WORKED_WITH_CLIENT" } },
      { data: { id: "e_freelance_collibra", source: "p_michael", target: "role_freelancer_collibra", label: "CURRENTLY_WORKING_AS" } },
      { data: { id: "e_freelance_collibra_at", source: "role_freelancer_collibra", target: "org_collibra", label: "AT_ORG" } },
      { data: { id: "e_project_insurance_role", source: "p_michael", target: "role_project_insurance", label: "DOING_PROJECT" } },
      { data: { id: "e_project_insurance_at", source: "role_project_insurance", target: "org_insurance", label: "FOR_ORG" } }
    ]
  };

  function buildStyles() {
    return [
      {
        selector: "node",
        style: {
          label: "data(label)",
          color: "#e7edf4",
          "font-size": 12,
          "font-weight": 500,
          "text-wrap": "wrap",
          "text-max-width": 100,
          "text-valign": "center",
          "text-halign": "center",
          width: 78,
          height: 78,
          shape: "ellipse",
          "background-color": "#5f7388",
          "border-width": 2.5,
          "border-color": "#9aa8b6",
          "overlay-opacity": 0
        }
      },
      {
        selector: 'node[type = "Person"]',
        style: { "background-color": "#b287b8", "border-color": "#d9b7dd", width: 142, height: 142, "font-size": 16, "text-max-width": 120 }
      },
      {
        selector: 'node[type = "Organization"]',
        style: { "background-color": "#e6c96d", "border-color": "#f3df9f", color: "#15222e", width: 102, height: 102, "text-max-width": 92 }
      },
      {
        selector: 'node[type = "Role"]',
        style: { "background-color": "#ea6d6d", "border-color": "#f3a1a1", width: 114, height: 114, "text-max-width": 96 }
      },
      {
        selector: 'node[type = "Skill"]',
        style: { "background-color": "#4caecc", "border-color": "#86cfe4", width: 104, height: 104, "text-max-width": 92 }
      },
      {
        selector: 'node[type = "Location"]',
        style: { "background-color": "#9baec0", "border-color": "#c3ced8", color: "#0f1c29", width: 96, height: 96, "text-max-width": 84 }
      },
      {
        selector: 'node[type = "Education"]',
        style: { "background-color": "#8ca2e0", "border-color": "#bbc8ee", color: "#0f1c29", width: 106, height: 106, "text-max-width": 92 }
      },
      {
        selector: 'node[type = "Event"]',
        style: { "background-color": "#78c6a6", "border-color": "#a5dcc6", color: "#10221b", width: 104, height: 104, "text-max-width": 94 }
      },
      {
        selector: "edge",
        style: {
          width: 2.2,
          "line-color": "#4f6071",
          "target-arrow-color": "#4f6071",
          "target-arrow-shape": "vee",
          "arrow-scale": 1.3,
          "curve-style": "bezier",
          label: "data(label)",
          color: "#8ea0b4",
          "font-size": 9,
          "text-background-color": "#02060b",
          "text-background-opacity": 0.75,
          "text-background-padding": 3,
          "text-rotation": "autorotate"
        }
      },
      {
        selector: ".is-dimmed",
        style: { opacity: 0.12 }
      },
      {
        selector: ".is-focused",
        style: {
          opacity: 1,
          "border-width": 3,
          "line-color": "#85a5cb",
          "target-arrow-color": "#85a5cb"
        }
      }
    ];
  }

  function showRenderError(message) {
    const target = ensureOverlay();
    if (!target) return;
    target.innerHTML = '<div class="about-me-kg-error"></div>';
    const node = target.querySelector(".about-me-kg-error");
    if (!node) return;
    node.textContent = message;
  }

  function ensureOverlay() {
    if (overlay && overlay.isConnected) return overlay;

    overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = OVERLAY_ID;
      overlay.className = "about-me-kg-overlay";
      document.body.appendChild(overlay);
    }

    if (!overlay.dataset.bound) {
      ["pointerdown", "mousedown", "touchstart", "wheel"].forEach(function bindStopPropagation(eventName) {
        overlay.addEventListener(eventName, function stopRevealDrag(event) {
          event.stopPropagation();
        }, { passive: false });
      });
      overlay.dataset.bound = "1";
    }

    return overlay;
  }

  function hideOverlay() {
    const target = ensureOverlay();
    target.classList.remove("is-active");
  }

  function showOverlay() {
    const target = ensureOverlay();
    target.classList.add("is-active");
  }

  function buildPresetPositions(graphElements, viewportWidth, viewportHeight) {
    const centerId = "p_michael";
    const adjacency = new Map();

    graphElements.nodes.forEach(function addNode(node) {
      adjacency.set(node.data.id, new Set());
    });
    graphElements.edges.forEach(function addEdge(edge) {
      const source = edge.data.source;
      const target = edge.data.target;
      if (!adjacency.has(source)) adjacency.set(source, new Set());
      if (!adjacency.has(target)) adjacency.set(target, new Set());
      adjacency.get(source).add(target);
      adjacency.get(target).add(source);
    });

    const distance = new Map([[centerId, 0]]);
    const queue = [centerId];
    while (queue.length) {
      const current = queue.shift();
      const currentDistance = distance.get(current) || 0;
      (adjacency.get(current) || []).forEach(function visit(next) {
        if (distance.has(next)) return;
        distance.set(next, currentDistance + 1);
        queue.push(next);
      });
    }

    const rings = new Map();
    graphElements.nodes.forEach(function assignRing(node) {
      const id = node.data.id;
      const ring = id === centerId ? 0 : Math.min(distance.get(id) || 3, 3);
      if (!rings.has(ring)) rings.set(ring, []);
      rings.get(ring).push(node);
    });

    [1, 2, 3].forEach(function sortRing(ring) {
      const nodes = rings.get(ring) || [];
      nodes.sort(function compare(a, b) {
        const typeCmp = String(a.data.type).localeCompare(String(b.data.type));
        if (typeCmp !== 0) return typeCmp;
        return String(a.data.label).localeCompare(String(b.data.label));
      });
    });

    const width = Math.max(960, viewportWidth);
    const height = Math.max(460, viewportHeight);
    const centerX = Math.round(width / 2);
    const centerY = Math.round(height / 2);
    const maxRadiusX = Math.max(200, Math.round((width / 2) - 130));
    const maxRadiusY = Math.max(160, Math.round((height / 2) - 120));
    const radiusByRing = {
      1: { x: Math.round(maxRadiusX * 0.48), y: Math.round(maxRadiusY * 0.48) },
      2: { x: Math.round(maxRadiusX * 0.74), y: Math.round(maxRadiusY * 0.72) },
      3: { x: Math.round(maxRadiusX * 0.92), y: Math.round(maxRadiusY * 0.90) }
    };

    const positions = {};
    positions[centerId] = { x: centerX, y: centerY };

    [1, 2, 3].forEach(function placeRing(ring) {
      const nodes = rings.get(ring) || [];
      const count = Math.max(1, nodes.length);
      nodes.forEach(function placeNode(node, index) {
        const angle = (-Math.PI / 2) + ((2 * Math.PI * index) / count);
        const radius = radiusByRing[ring];
        positions[node.data.id] = {
          x: Math.round(centerX + (Math.cos(angle) * radius.x)),
          y: Math.round(centerY + (Math.sin(angle) * radius.y))
        };
      });
    });

    return positions;
  }

  function relayoutInOverlay() {
    if (!cy || cy.destroyed()) return;
    const target = ensureOverlay();
    const positions = buildPresetPositions(elements, target.clientWidth, target.clientHeight);

    cy.layout({
      name: "preset",
      fit: false,
      animate: false,
      positions: positions
    }).run();

    cy.resize();
    cy.zoom(1);
    cy.pan({ x: 0, y: 0 });
  }

  function createGraph() {
    const target = ensureOverlay();
    if (!target) return;
    if (typeof window.cytoscape !== "function") return;

    if (cy && !cy.destroyed()) {
      cy.destroy();
      cy = null;
    }

    cy = window.cytoscape({
      container: target,
      elements: elements,
      style: buildStyles(),
      minZoom: 0.2,
      maxZoom: 2.6,
      wheelSensitivity: 0.2,
      pixelRatio: "auto",
      layout: {
        name: "preset",
        fit: false,
        animate: false,
        positions: buildPresetPositions(elements, target.clientWidth, target.clientHeight)
      }
    });

    cy.on("tap", "node", function onNodeTap(evt) {
      const node = evt.target;
      const neighborhood = node.closedNeighborhood();
      cy.elements().addClass("is-dimmed");
      neighborhood.removeClass("is-dimmed").addClass("is-focused");
    });

    cy.on("tap", function onCanvasTap(evt) {
      if (evt.target === cy) cy.elements().removeClass("is-dimmed is-focused");
    });

    cy.userPanningEnabled(true);
    cy.userZoomingEnabled(true);
    cy.panningEnabled(true);

    relayoutInOverlay();
    [100, 280, 800].forEach(function delayedRelayout(delay) {
      window.setTimeout(function retry() {
        relayoutInOverlay();
      }, delay);
    });
  }

  function loadCytoscapeWithFallback(onReady) {
    if (typeof window.cytoscape === "function") {
      onReady();
      return;
    }
    if (loaderState === "loading") return;
    loaderState = "loading";

    const sources = [
      "https://cdn.jsdelivr.net/npm/cytoscape@3.29.2/dist/cytoscape.min.js",
      "https://unpkg.com/cytoscape@3.29.2/dist/cytoscape.min.js"
    ];

    const trySource = function trySource(index) {
      if (typeof window.cytoscape === "function") {
        loaderState = "ready";
        onReady();
        return;
      }
      if (index >= sources.length) {
        loaderState = "failed";
        showRenderError("Cytoscape failed to load from CDNs.");
        return;
      }
      const script = document.createElement("script");
      script.src = sources[index];
      script.async = true;
      script.onload = function onLoad() { trySource(index + 1); };
      script.onerror = function onError() { trySource(index + 1); };
      document.head.appendChild(script);
    };

    trySource(0);
  }

  function isAboutMeSlideActive(reveal) {
    const currentSlide = reveal && typeof reveal.getCurrentSlide === "function" ? reveal.getCurrentSlide() : null;
    if (!currentSlide) return false;
    return Boolean(currentSlide.querySelector("#about-me-kg"));
  }

  window.initializeAboutMeKnowledgeGraph = function initializeAboutMeKnowledgeGraph(reveal) {
    const syncGraphVisibility = function syncGraphVisibility() {
      if (!isAboutMeSlideActive(reveal)) {
        hideOverlay();
        return;
      }

      showOverlay();
      loadCytoscapeWithFallback(function render() {
        if (!cy || cy.destroyed()) createGraph();
        else relayoutInOverlay();
      });
    };

    if (reveal && typeof reveal.on === "function") {
      reveal.on("ready", syncGraphVisibility);
      reveal.on("slidechanged", syncGraphVisibility);
      reveal.on("slidetransitionend", syncGraphVisibility);
      reveal.on("resize", syncGraphVisibility);
    }

    window.addEventListener("resize", function onWindowResize() {
      if (!isAboutMeSlideActive(reveal)) return;
      relayoutInOverlay();
    });

    window.setTimeout(syncGraphVisibility, 0);
    window.setTimeout(syncGraphVisibility, 250);
    window.setTimeout(syncGraphVisibility, 800);
  };
})();
