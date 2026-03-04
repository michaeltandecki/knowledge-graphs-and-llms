(function () {
    const svgNS = 'http://www.w3.org/2000/svg';
    const miniGraph = {
      sections: [
        {
          id: 'intro',
          nodes: [
            { id: 'intro-1', x: 24, y: 58 },
            { id: 'intro-2', x: 42, y: 40 }
          ],
          edges: [['intro-1', 'intro-2']],
          connectorFromPrevious: null
        },
        {
          id: 'section-1',
          nodes: [
            { id: 's1-1', x: 76, y: 52 },
            { id: 's1-2', x: 96, y: 34 }
          ],
          edges: [['s1-1', 's1-2']],
          connectorFromPrevious: ['intro-2', 's1-1']
        },
        {
          id: 'section-2',
          nodes: [
            { id: 's2-1', x: 130, y: 64 },
            { id: 's2-2', x: 148, y: 44 }
          ],
          edges: [['s2-1', 's2-2']],
          connectorFromPrevious: ['s1-2', 's2-1']
        },
        {
          id: 'section-3',
          nodes: [
            { id: 's3-1', x: 184, y: 50 },
            { id: 's3-2', x: 202, y: 31 }
          ],
          edges: [['s3-1', 's3-2']],
          connectorFromPrevious: ['s2-2', 's3-1']
        },
        {
          id: 'section-4',
          nodes: [
            { id: 's4-1', x: 236, y: 61 },
            { id: 's4-2', x: 256, y: 42 }
          ],
          edges: [['s4-1', 's4-2']],
          connectorFromPrevious: ['s3-2', 's4-1']
        }
      ]
    };
  
    function buildProgressModel() {
      const nodes = [];
      const edges = [];
      const growthBySection = [];
  
      miniGraph.sections.forEach((section) => {
        const sequence = [];
        section.nodes.forEach((node, nodeIndex) => {
          nodes.push({ ...node, sectionId: section.id });
          sequence.push({ type: 'node', id: node.id });
          if (nodeIndex > 0) {
            const edgeId = `${section.nodes[nodeIndex - 1].id}__${node.id}`;
            edges.push({ id: edgeId, from: section.nodes[nodeIndex - 1].id, to: node.id, sectionId: section.id });
            sequence.push({ type: 'edge', id: edgeId });
          }
        });
  
        if (section.connectorFromPrevious) {
          const connectorId = `${section.connectorFromPrevious[0]}__${section.connectorFromPrevious[1]}`;
          edges.push({ id: connectorId, from: section.connectorFromPrevious[0], to: section.connectorFromPrevious[1], sectionId: section.id, connector: true });
          sequence.unshift({ type: 'edge', id: connectorId });
        }
  
        growthBySection.push(sequence);
      });
  
      return { nodes, edges, growthBySection };
    }
  
    function createMiniGraphState(model) {
      const container = document.getElementById('kg-progress');
      if (!container) return null;
  
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 280 90');
      svg.classList.add('kg-progress-map');
  
      const edgesGroup = document.createElementNS(svgNS, 'g');
      const nodesGroup = document.createElementNS(svgNS, 'g');
  
      const nodeById = new Map(model.nodes.map((node) => [node.id, node]));
      const nodeEls = new Map();
      const edgeEls = new Map();
  
      model.edges.forEach((edge, index) => {
        const fromNode = nodeById.get(edge.from);
        const toNode = nodeById.get(edge.to);
        if (!fromNode || !toNode) return;
  
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', String(fromNode.x));
        line.setAttribute('y1', String(fromNode.y));
        line.setAttribute('x2', String(toNode.x));
        line.setAttribute('y2', String(toNode.y));
        line.classList.add('kg-edge');
        line.dataset.edgeId = edge.id;
        line.dataset.sectionId = edge.sectionId;
        line.dataset.edgeIndex = String(index);
        edgesGroup.appendChild(line);
        edgeEls.set(edge.id, line);
      });
  
      model.nodes.forEach((node, index) => {
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', String(node.x));
        circle.setAttribute('cy', String(node.y));
        circle.setAttribute('r', '5.1');
        circle.classList.add('kg-node');
        circle.dataset.nodeId = node.id;
        circle.dataset.sectionId = node.sectionId;
        circle.dataset.nodeIndex = String(index);
        nodesGroup.appendChild(circle);
        nodeEls.set(node.id, circle);
      });
  
      svg.appendChild(edgesGroup);
      svg.appendChild(nodesGroup);
      container.appendChild(svg);
  
      return { nodeEls, edgeEls };
    }
  
    function getGrowthTarget(model, reveal) {
      const horizontalSlides = reveal.getHorizontalSlides ? reveal.getHorizontalSlides() : [];
      if (!horizontalSlides.length) return 1;

      const indices = reveal.getIndices ? reveal.getIndices() : { h: 0, v: 0 };
      const horizontalIndex = Math.max(0, Math.min(horizontalSlides.length - 1, indices.h || 0));
      const currentHorizontal = horizontalSlides[horizontalIndex];
      if (!currentHorizontal) return 1;

      const verticalSlides = Array.from(currentHorizontal.querySelectorAll(':scope > section'));
      const sectionSlideCount = Math.max(1, verticalSlides.length || 1);
      const verticalIndex = Math.max(0, Math.min(sectionSlideCount - 1, indices.v || 0));
  
      let shownItems = 0;
      for (let idx = 0; idx < horizontalIndex; idx += 1) {
        shownItems += model.growthBySection[idx]?.length || 0;
      }
  
      const currentSectionSequence = model.growthBySection[horizontalIndex] || [];
      const progressiveItems = Math.ceil(((verticalIndex + 1) / sectionSlideCount) * currentSectionSequence.length);
  
      return Math.min(
        model.nodes.length + model.edges.length,
        Math.max(1, shownItems + progressiveItems)
      );
    }
  
    function updateMiniGraph(reveal, model, state) {
      if (!state) return;
      const targetCount = getGrowthTarget(model, reveal);
      const sequence = [];
  
      model.growthBySection.forEach((sectionItems) => {
        sectionItems.forEach((item) => sequence.push(item));
      });
  
      const visibleNodeIds = new Set();
      const visibleEdgeIds = new Set();
  
      sequence.slice(0, targetCount).forEach((item) => {
        if (item.type === 'node') visibleNodeIds.add(item.id);
        if (item.type === 'edge') visibleEdgeIds.add(item.id);
      });
  
      state.nodeEls.forEach((nodeEl, nodeId) => {
        nodeEl.classList.toggle('is-visible', visibleNodeIds.has(nodeId));
        nodeEl.classList.remove('is-current');
      });
  
      state.edgeEls.forEach((edgeEl, edgeId) => {
        edgeEl.classList.toggle('is-visible', visibleEdgeIds.has(edgeId));
      });
  
      const latestNode = [...sequence.slice(0, targetCount)].reverse().find((item) => item.type === 'node');
      if (latestNode) {
        state.nodeEls.get(latestNode.id)?.classList.add('is-current');
      }
    }
  
    window.initializeMiniGraphProgress = function initializeMiniGraphProgress(reveal) {
      const model = buildProgressModel();
      const state = createMiniGraphState(model);
      if (!state) return;

      const update = () => {
        try {
          updateMiniGraph(reveal, model, state);
        } catch (error) {
          console.warn('Mini graph progress update skipped:', error);
        }
      };
      reveal.on('ready', update);
      reveal.on('slidechanged', update);
      update();
    };
  })();
  
