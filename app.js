// Periodic Table of Google Cloud - Interactive Application Logic
(function () {
  let activeCategory = 'all';
  let activeState = 'all';
  let searchQuery = '';
  let activeCompoundId = null;
  let currentView = 'periodic'; // 'periodic' | 'poster' | 'lab' | 'quiz'
  let inspectedElement = GCP_ELEMENTS.find(e => e.symbol === 'Vx') || GCP_ELEMENTS[0];
  let showBondHighlights = true;
  let labElements = ['Cr', 'Ab', 'Ms', 'Lb', 'Ca'];
  let quizScore = 0;
  let quizTotal = 0;
  let currentQuizQuestion = null;

  const elementMap = new Map();
  GCP_ELEMENTS.forEach(el => elementMap.set(el.symbol, el));

  // DOM Elements
  const categoryLegendEl = document.getElementById('categoryLegend');
  const statePillsEl = document.getElementById('statePills');
  const periodicGridEl = document.getElementById('periodicGrid');
  const compoundsGridEl = document.getElementById('compoundsGrid');
  const compoundFlowBannerEl = document.getElementById('compoundFlowBanner');
  const posterGridEl = document.getElementById('posterGrid');
  const searchInputEl = document.getElementById('searchInput');
  const modalBackdropEl = document.getElementById('elementModalBackdrop');
  const modalContentEl = document.getElementById('elementModalContent');

  function init() {
    renderCategoryChips();
    renderStatePills();
    renderPeriodicTable();
    renderCompounds();
    renderPosterView();
    renderLabWorkbench();
    generateQuizQuestion();
    bindEvents();
  }

  function renderCategoryChips() {
    const totalCount = GCP_ELEMENTS.length;
    let html = `
      <button class="cat-chip ${activeCategory === 'all' ? 'active' : ''}" data-cat="all" style="--chip-color:#60a5fa; --chip-bg:rgba(96,165,250,0.18)">
        <span class="cat-dot" style="--chip-color:#60a5fa"></span>
        <span>All Elements</span>
        <span class="cat-count">(${totalCount})</span>
      </button>
    `;

    Object.values(CATEGORIES).forEach(cat => {
      const count = GCP_ELEMENTS.filter(e => e.category === cat.id).length;
      const isActive = activeCategory === cat.id ? 'active' : '';
      html += `
        <button class="cat-chip ${isActive}" data-cat="${cat.id}" style="--chip-color:${cat.color}; --chip-bg:${cat.bgGlow}" title="${cat.chemGroup}: ${cat.description}">
          <span class="cat-dot" style="--chip-color:${cat.color}"></span>
          <span>${cat.name}</span>
          <span class="cat-count">(${count})</span>
        </button>
      `;
    });

    categoryLegendEl.innerHTML = html;
  }

  function renderStatePills() {
    let html = `<button class="state-pill ${activeState === 'all' ? 'active' : ''}" data-state="all">All States</button>`;
    Object.values(STATES_OF_MATTER).forEach(st => {
      const isActive = activeState === st.id ? 'active' : '';
      html += `<button class="state-pill ${isActive}" data-state="${st.id}" title="${st.desc}">${st.label}</button>`;
    });
    statePillsEl.innerHTML = html;
  }

  function matchesFilter(el) {
    if (activeCompoundId) {
      const comp = CLOUD_COMPOUNDS.find(c => c.id === activeCompoundId);
      if (comp && !comp.elements.includes(el.symbol)) return false;
    }
    if (activeCategory !== 'all' && el.category !== activeCategory) return false;
    if (activeState !== 'all' && el.state !== activeState) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const hay = `${el.symbol} ${el.name} ${el.fourWords} ${el.summary} ${el.category} ${el.mass}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function buildCentralInspectorHTML(el) {
    const cat = CATEGORIES[el.category];
    const st = STATES_OF_MATTER[el.state];
    const bondsHTML = (el.bondsWith || []).map(sym => {
      const target = elementMap.get(sym);
      if (!target) return '';
      const tCat = CATEGORIES[target.category];
      return `<button class="bond-pill" data-bond-sym="${target.symbol}" style="border-left: 3px solid ${tCat.color}">${target.symbol} · ${target.name}</button>`;
    }).join('');

    return `
      <div class="inspector-big-tile" style="--inspect-color:${cat.color}; --inspect-glow:${cat.bgGlow}">
        <div class="big-top">
          <span>#${el.number}</span>
          <span>${el.mass}</span>
        </div>
        <div class="big-symbol">${el.symbol}</div>
        <div>
          <div class="big-name">${el.name}</div>
          <div class="big-cat">${cat.name}</div>
        </div>
      </div>
      <div class="inspector-details">
        <div class="inspector-tagline-row">
          <span class="four-word-badge" style="--inspect-color:${cat.color}">“${el.fourWords}”</span>
          <span class="inspector-state-badge">${st ? st.label : el.state}</span>
          <span class="inspector-state-badge" style="color:${cat.color}; border-color:${cat.color}">${cat.chemGroup}</span>
        </div>
        <p class="inspector-summary">${el.summary}</p>
        <div class="inspector-cli" title="Click element tile for full CLI & Terraform details">$ ${el.cli}</div>
      </div>
      <div class="inspector-bonds">
        <h4>Commonly Bonds With</h4>
        <div class="bond-chips">${bondsHTML || '<span style="font-size:0.7rem;color:var(--text-muted)">Universal integration</span>'}</div>
        <div style="margin-top:auto; padding-top:0.35rem; font-size:0.65rem; color:var(--text-muted)">
          Click any tile for deep-dive, Terraform & Lab synthesis
        </div>
      </div>
    `;
  }

  function renderPeriodicTable() {
    let html = `
      <!-- Central Spotlight in the Periodic Cavity (Cols 3-12, Rows 1-3) -->
      <div class="central-inspector" id="centralInspector">
        ${buildCentralInspectorHTML(inspectedElement)}
      </div>

      <!-- Lanthanide Placeholder in Row 6, Col 3 -->
      <div class="series-placeholder" data-series="aiml" style="grid-row:6; grid-column:3; --el-color:${CATEGORIES.aiml.color}; --el-glow:${CATEGORIES.aiml.bgGlow}">
        <span class="range">57–71</span>
        <span class="label">AI & ML</span>
        <span style="font-size:0.48rem; color:var(--text-secondary)">Lanthanides ↓</span>
      </div>

      <!-- Actinide Placeholder in Row 7, Col 3 -->
      <div class="series-placeholder" data-series="integration" style="grid-row:7; grid-column:3; --el-color:${CATEGORIES.integration.color}; --el-glow:${CATEGORIES.integration.bgGlow}">
        <span class="range">89–103</span>
        <span class="label">API & Integrate</span>
        <span style="font-size:0.48rem; color:var(--text-secondary)">Actinides ↓</span>
      </div>

      <!-- Spacer between main table (rows 1-7) and f-block (rows 9-10) -->
      <div class="Elements-spacer-row"></div>

      <!-- Row labels for Lanthanides & Actinides -->
      <div class="series-row-label" style="grid-row:9; grid-column:1 / 3; color:${CATEGORIES.aiml.color}">
        <span>★ AI & ML Series</span>
        <span style="font-size:0.55rem; color:var(--text-secondary)">57–71 (Lanthanides)</span>
      </div>
      <div class="series-row-label" style="grid-row:10; grid-column:1 / 3; color:${CATEGORIES.integration.color}">
        <span>✦ Integration & API</span>
        <span style="font-size:0.55rem; color:var(--text-secondary)">89–103 (Actinides)</span>
      </div>
    `;

    GCP_ELEMENTS.forEach(el => {
      const cat = CATEGORIES[el.category];
      const visualRow = el.row >= 8 ? el.row + 1 : el.row; // Shift rows 8,9 to 9,10 after spacer
      const isVisible = matchesFilter(el);
      const isLabSelected = labElements.includes(el.symbol);
      const stateBadge = el.state === 'serverless' ? '⚡' : el.state === 'managed' ? '💧' : el.state === 'hybrid' ? '🌐' : '🧱';

      html += `
        <div class="element-tile ${isVisible ? '' : 'dimmed'} ${isLabSelected ? 'selected-in-lab' : ''}"
             data-symbol="${el.symbol}"
             style="grid-row:${visualRow}; grid-column:${el.col}; --el-color:${cat.color}; --el-glow:${cat.bgGlow}">
          <div class="tile-top">
            <span>${el.number}</span>
            <span class="tile-mass">${el.mass}</span>
          </div>
          <div class="tile-symbol-row">
            <span class="tile-symbol">${el.symbol}</span>
            <span class="tile-state-dot" title="${STATES_OF_MATTER[el.state]?.label || ''}">${stateBadge}</span>
          </div>
          <div class="tile-name" title="${el.name}">${el.name}</div>
          <div class="tile-fourwords">${el.fourWords}</div>
        </div>
      `;
    });

    periodicGridEl.innerHTML = html;
  }

  function updateTileFilterStates() {
    const tiles = periodicGridEl.querySelectorAll('.element-tile');
    tiles.forEach(tile => {
      const sym = tile.getAttribute('data-symbol');
      const el = elementMap.get(sym);
      if (!el) return;
      if (matchesFilter(el)) {
        tile.classList.remove('dimmed');
      } else {
        tile.classList.add('dimmed');
      }
      if (labElements.includes(sym)) {
        tile.classList.add('selected-in-lab');
      } else {
        tile.classList.remove('selected-in-lab');
      }
    });
  }

  function updateCentralInspector(el) {
    inspectedElement = el;
    const inspector = document.getElementById('centralInspector');
    if (inspector) {
      inspector.innerHTML = buildCentralInspectorHTML(el);
    }

    // Highlight chemical bonds on hover if no filter is restricting
    const tiles = periodicGridEl.querySelectorAll('.element-tile');
    tiles.forEach(tile => {
      const sym = tile.getAttribute('data-symbol');
      if (showBondHighlights && el.bondsWith && el.bondsWith.includes(sym)) {
        tile.classList.add('bonded-highlight');
      } else {
        tile.classList.remove('bonded-highlight');
      }
    });
  }

  function renderCompounds() {
    let html = '';
    CLOUD_COMPOUNDS.forEach(comp => {
      const isActive = activeCompoundId === comp.id ? 'active' : '';
      html += `
        <div class="compound-card ${isActive}" data-compound="${comp.id}">
          <div class="compound-formula">⚗️ ${comp.formula}</div>
          <div class="compound-name">${comp.name}</div>
          <div class="compound-tagline">${comp.tagline}</div>
        </div>
      `;
    });
    compoundsGridEl.innerHTML = html;

    if (activeCompoundId) {
      const comp = CLOUD_COMPOUNDS.find(c => c.id === activeCompoundId);
      compoundFlowBannerEl.classList.add('visible');
      compoundFlowBannerEl.innerHTML = `
        <div>
          <strong style="color:#60a5fa">${comp.name} Reaction Pathway:</strong>
          <div style="margin-top:3px; font-family:'JetBrains Mono',monospace; font-size:0.76rem">${comp.flow}</div>
          <div style="margin-top:3px; color:var(--text-secondary); font-size:0.74rem">${comp.useCase}</div>
        </div>
        <div style="display:flex; gap:0.5rem">
          <button class="icon-btn" id="loadCompoundToLabBtn" data-comp-id="${comp.id}">🧪 Load in Cloud Lab</button>
          <button class="icon-btn" id="clearCompoundBtn">✕ Clear Highlight</button>
        </div>
      `;
    } else {
      compoundFlowBannerEl.classList.remove('visible');
      compoundFlowBannerEl.innerHTML = '';
    }
  }

  function renderPosterView() {
    let html = '';
    Object.values(CATEGORIES).forEach(cat => {
      const items = GCP_ELEMENTS.filter(el => el.category === cat.id && matchesFilter(el));
      if (items.length === 0) return;

      const rowsHtml = items.map(el => `
        <div class="poster-item" data-symbol="${el.symbol}">
          <div class="poster-mini-tile" style="--cat-color:${cat.color}">
            <small>${el.number}</small>
            ${el.symbol}
          </div>
          <div class="poster-item-info">
            <div class="name">${el.name}</div>
            <div class="four">“${el.fourWords}”</div>
          </div>
        </div>
      `).join('');

      html += `
        <div class="category-poster-card" style="--cat-color:${cat.color}">
          <div class="category-poster-header">
            <h3>${cat.name}</h3>
            <span>${cat.chemGroup} · ${items.length} products</span>
          </div>
          <div>${rowsHtml}</div>
        </div>
      `;
    });
    posterGridEl.innerHTML = html || `<p style="color:var(--text-secondary)">No products match your current filter.</p>`;
  }

  function renderLabWorkbench() {
    const labContainer = document.getElementById('labWorkbenchContent');
    if (!labContainer) return;

    const selectedObjs = labElements.map(s => elementMap.get(s)).filter(Boolean);
    const formulaStr = selectedObjs.length
      ? selectedObjs.map(e => e.symbol).join(' + ')
      : 'Empty Beaker';

    const slotsHtml = selectedObjs.map(el => {
      const cat = CATEGORIES[el.category];
      return `
        <div class="cat-chip active" style="--chip-color:${cat.color}; --chip-bg:${cat.bgGlow}; padding:0.45rem 0.8rem">
          <strong style="color:${cat.color}; font-size:0.95rem">${el.symbol}</strong>
          <span>${el.name}</span>
          <button class="remove-lab-el" data-sym="${el.symbol}" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;margin-left:4px;font-weight:800">✕</button>
        </div>
      `;
    }).join('');

    // Match against known compound or synthesize custom architecture
    let matchedCompound = CLOUD_COMPOUNDS.find(c =>
      c.elements.every(sym => labElements.includes(sym)) && labElements.length <= c.elements.length + 2
    );

    const cliLines = selectedObjs.map(el => `# [${el.symbol}] ${el.name} (${el.fourWords})\n${el.cli}`).join('\n\n');
    const tfLines = selectedObjs
      .filter(el => el.terraform && !el.terraform.startsWith('N/A'))
      .map(el => `resource "${el.terraform}" "${el.symbol.toLowerCase()}_main" {\n  # ${el.name}\n}`)
      .join('\n\n');

    labContainer.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem">
        <div>
          <h2 style="font-size:1.15rem; font-weight:800">🧪 Cloud Architecture Compound Synthesizer</h2>
          <p style="font-size:0.8rem; color:var(--text-secondary)">Combine GCP elements to synthesize architecture formulas, CLI provisioning scripts, and Terraform blocks.</p>
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap">
          <button class="icon-btn" id="clearLabBtn">🗑️ Empty Beaker</button>
        </div>
      </div>

      <div class="lab-slots">
        ${slotsHtml || '<span style="color:var(--text-muted); font-size:0.84rem">No elements in beaker. Click any element below or in the Periodic Table to add it!</span>'}
      </div>

      <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:1rem">
        <span style="font-size:0.75rem; color:var(--text-secondary); align-self:center; margin-right:0.3rem">Quick Add Elements:</span>
        ${['Cr', 'Gk', 'Ce', 'Bq', 'Sp', 'Ab', 'Sq', 'Cs', 'Ps', 'Df', 'Vx', 'Gm', 'Ag', 'Lb', 'Cd', 'Ca', 'Ap', 'Eb', 'Wf', 'Ia', 'Km'].map(sym => {
          const el = elementMap.get(sym);
          if (!el) return '';
          const cat = CATEGORIES[el.category];
          const inLab = labElements.includes(sym);
          return `<button class="state-pill ${inLab ? 'active' : ''}" data-lab-toggle="${sym}" style="border-left:3px solid ${cat.color}">${sym} · ${el.name}</button>`;
        }).join('')}
      </div>

      <div class="lab-output-box">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem">
          <div>
            <span style="font-size:0.72rem; text-transform:uppercase; color:var(--accent-yellow); font-weight:700">Synthesized Formula: ${formulaStr}</span>
            <h3 style="font-size:1rem; margin-top:2px">
              ${matchedCompound ? `✨ Discovered Known Compound: ${matchedCompound.name}` : `Custom ${selectedObjs.length}-Element Cloud Stack`}
            </h3>
            <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px">
              ${matchedCompound ? matchedCompound.useCase : 'Generated multi-service gcloud CLI & Terraform blueprint for your selected elements.'}
            </p>
          </div>
          <button class="icon-btn" id="copyLabScriptBtn">📋 Copy Provisioning Script</button>
        </div>
        <pre class="code-block" id="labCodeOutput">${cliLines || '# Add elements above to generate gcloud commands'}\n\n# --- Terraform Resources ---\n${tfLines}</pre>
      </div>
    `;
  }

  function generateQuizQuestion() {
    const quizBox = document.getElementById('quizViewContent');
    if (!quizBox) return;

    const correctEl = GCP_ELEMENTS[Math.floor(Math.random() * GCP_ELEMENTS.length)];
    const distractors = GCP_ELEMENTS
      .filter(e => e.symbol !== correctEl.symbol)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [correctEl, ...distractors].sort(() => Math.random() - 0.5);
    currentQuizQuestion = { correctEl, options, answered: false };

    const cat = CATEGORIES[correctEl.category];

    quizBox.innerHTML = `
      <div class="quiz-container">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem">
          <span class="version-pill">🎓 GCP Periodic Table Challenge</span>
          <span style="font-size:0.85rem; font-weight:700; color:var(--accent-yellow)">Score: ${quizScore} / ${quizTotal}</span>
        </div>
        <div style="width:92px; height:104px; margin:0 auto 1rem; border-radius:10px; border:2.5px solid ${cat.color}; background:var(--bg-card); display:flex; flex-direction:column; justify-content:space-between; padding:8px">
          <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-secondary)">
            <span>#${correctEl.number}</span>
            <span>${correctEl.mass}</span>
          </div>
          <div style="font-size:2rem; font-weight:900; color:${cat.color}">${correctEl.symbol}</div>
          <div style="font-size:0.6rem; color:var(--text-secondary); text-transform:uppercase">${cat.name}</div>
        </div>
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:0.4rem">Which Google Cloud product matches this 4-word clue?</h3>
        <p style="font-size:1.05rem; color:#60a5fa; font-weight:700; margin-bottom:0.4rem">“${correctEl.fourWords}”</p>
        <p style="font-size:0.8rem; color:var(--text-secondary)">${correctEl.summary}</p>
        <div class="quiz-options">
          ${options.map(opt => `
            <button class="quiz-option-btn" data-quiz-ans="${opt.symbol}">
              ${opt.name} (${opt.symbol})
            </button>
          `).join('')}
        </div>
        <div id="quizFeedback" style="margin-top:1rem; min-height:28px; font-size:0.85rem; font-weight:700"></div>
        <button class="icon-btn" id="nextQuizBtn" style="margin:0.75rem auto 0">Next Element →</button>
      </div>
    `;
  }

  function openElementModal(el) {
    const cat = CATEGORIES[el.category];
    const st = STATES_OF_MATTER[el.state];
    const inLab = labElements.includes(el.symbol);

    const bondsHTML = (el.bondsWith || []).map(sym => {
      const b = elementMap.get(sym);
      if (!b) return '';
      const bCat = CATEGORIES[b.category];
      return `<button class="bond-pill modal-bond-jump" data-sym="${b.symbol}" style="border-left:3px solid ${bCat.color}">${b.symbol} · ${b.name}</button>`;
    }).join('');

    modalContentEl.innerHTML = `
      <button class="modal-close" id="closeModalBtn">✕</button>
      <div style="display:flex; gap:1.25rem; align-items:flex-start; flex-wrap:wrap">
        <div class="inspector-big-tile" style="--inspect-color:${cat.color}; --inspect-glow:${cat.bgGlow}; flex-shrink:0">
          <div class="big-top">
            <span>#${el.number}</span>
            <span>${el.mass}</span>
          </div>
          <div class="big-symbol">${el.symbol}</div>
          <div>
            <div class="big-name">${el.name}</div>
            <div class="big-cat">${cat.name}</div>
          </div>
        </div>
        <div style="flex:1; min-width:240px">
          <div style="display:flex; gap:0.45rem; align-items:center; flex-wrap:wrap; margin-bottom:0.4rem">
            <span class="version-pill" style="background:${cat.bgGlow}; color:${cat.color}; border-color:${cat.color}">${cat.name} (${cat.chemGroup})</span>
            <span class="inspector-state-badge">${st ? st.label : el.state}</span>
          </div>
          <h2 style="font-size:1.35rem; font-weight:800; margin-bottom:0.25rem">${el.name}</h2>
          <div style="font-size:0.95rem; font-weight:700; color:${cat.color}; margin-bottom:0.6rem">“${el.fourWords}”</div>
          <p style="font-size:0.86rem; line-height:1.55; color:var(--text-secondary)">${el.summary}</p>
        </div>
      </div>

      <div style="margin-top:1.1rem; display:grid; gap:0.75rem">
        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--text-muted); margin-bottom:4px; font-weight:700; text-transform:uppercase">
            <span>gcloud CLI Quickstart</span>
            <button class="copy-snippet-btn" data-copy="${el.cli.replace(/"/g, '&quot;')}" style="background:none;border:none;color:#60a5fa;cursor:pointer;font-size:0.72rem;font-weight:700">Copy CLI</button>
          </div>
          <div class="inspector-cli" style="white-space:normal; word-break:break-all">$ ${el.cli}</div>
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap; align-items:center; justify-content:space-between; background:var(--bg-primary); padding:0.65rem 0.9rem; border-radius:8px; border:1px solid var(--border-subtle)">
          <div>
            <span style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase; font-weight:700">Terraform Resource</span>
            <div style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#34d399; font-weight:600">${el.terraform}</div>
          </div>
          <div>
            <span style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase; font-weight:700">Atomic Metric / SLA</span>
            <div style="font-size:0.82rem; font-weight:700">${el.mass}</div>
          </div>
        </div>

        <div>
          <span style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; display:block; margin-bottom:0.35rem">Chemical Affinities (Common Architectural Pairings)</span>
          <div class="bond-chips">${bondsHTML}</div>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem">
        <button class="icon-btn" id="modalToggleLabBtn" data-sym="${el.symbol}">
          ${inLab ? '✓ In Cloud Lab Beaker (Remove)' : '🧪 Add to Cloud Lab Synthesizer'}
        </button>
        <a href="${el.docs}" target="_blank" rel="noopener noreferrer" class="icon-btn" style="text-decoration:none; background:var(--accent-blue); color:#fff; border-color:var(--accent-blue)">
          Official Documentation ↗
        </a>
      </div>
    `;
    modalBackdropEl.classList.add('open');
  }

  function switchView(view) {
    currentView = view;
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });
    document.getElementById('periodicViewSection').classList.toggle('hidden', view !== 'periodic');
    document.getElementById('posterViewSection').classList.toggle('hidden', view !== 'poster');
    document.getElementById('labViewSection').classList.toggle('hidden', view !== 'lab');
    document.getElementById('quizViewSection').classList.toggle('hidden', view !== 'quiz');

    if (view === 'poster') renderPosterView();
    if (view === 'lab') renderLabWorkbench();
  }

  function bindEvents() {
    // Category chips
    categoryLegendEl.addEventListener('click', e => {
      const chip = e.target.closest('.cat-chip');
      if (!chip) return;
      const cat = chip.getAttribute('data-cat');
      activeCategory = (activeCategory === cat && cat !== 'all') ? 'all' : cat;
      activeCompoundId = null;
      renderCategoryChips();
      renderCompounds();
      updateTileFilterStates();
      if (currentView === 'poster') renderPosterView();
    });

    // State of matter pills
    statePillsEl.addEventListener('click', e => {
      const pill = e.target.closest('.state-pill');
      if (!pill) return;
      const st = pill.getAttribute('data-state');
      activeState = (activeState === st && st !== 'all') ? 'all' : st;
      renderStatePills();
      updateTileFilterStates();
      if (currentView === 'poster') renderPosterView();
    });

    // Search box
    searchInputEl.addEventListener('input', e => {
      searchQuery = e.target.value;
      activeCompoundId = null;
      renderCompounds();
      updateTileFilterStates();
      if (currentView === 'poster') renderPosterView();
    });

    // Keyboard shortcut '/' to focus search, 'Escape' to close modal or clear filters
    window.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== searchInputEl) {
        e.preventDefault();
        searchInputEl.focus();
      } else if (e.key === 'Escape') {
        if (modalBackdropEl.classList.contains('open')) {
          modalBackdropEl.classList.remove('open');
        } else {
          activeCategory = 'all';
          activeState = 'all';
          activeCompoundId = null;
          searchQuery = '';
          searchInputEl.value = '';
          renderCategoryChips();
          renderStatePills();
          renderCompounds();
          updateTileFilterStates();
          if (currentView === 'poster') renderPosterView();
        }
      }
    });

    // Periodic grid hover & click
    periodicGridEl.addEventListener('mouseover', e => {
      const tile = e.target.closest('.element-tile');
      if (!tile) return;
      const sym = tile.getAttribute('data-symbol');
      const el = elementMap.get(sym);
      if (el && el.symbol !== inspectedElement.symbol) {
        updateCentralInspector(el);
      }
    });

    periodicGridEl.addEventListener('click', e => {
      const tile = e.target.closest('.element-tile');
      if (tile) {
        const sym = tile.getAttribute('data-symbol');
        const el = elementMap.get(sym);
        if (el) openElementModal(el);
        return;
      }

      const placeholder = e.target.closest('.series-placeholder');
      if (placeholder) {
        const seriesCat = placeholder.getAttribute('data-series');
        activeCategory = activeCategory === seriesCat ? 'all' : seriesCat;
        renderCategoryChips();
        updateTileFilterStates();
        return;
      }

      const bondBtn = e.target.closest('.bond-pill');
      if (bondBtn) {
        const sym = bondBtn.getAttribute('data-bond-sym');
        const el = elementMap.get(sym);
        if (el) {
          updateCentralInspector(el);
          openElementModal(el);
        }
      }
    });

    // Compounds click
    compoundsGridEl.addEventListener('click', e => {
      const card = e.target.closest('.compound-card');
      if (!card) return;
      const compId = card.getAttribute('data-compound');
      activeCompoundId = activeCompoundId === compId ? null : compId;
      activeCategory = 'all';
      renderCategoryChips();
      renderCompounds();
      updateTileFilterStates();
    });

    compoundFlowBannerEl.addEventListener('click', e => {
      if (e.target.closest('#clearCompoundBtn')) {
        activeCompoundId = null;
        renderCompounds();
        updateTileFilterStates();
      } else if (e.target.closest('#loadCompoundToLabBtn')) {
        const compId = e.target.closest('#loadCompoundToLabBtn').getAttribute('data-comp-id');
        const comp = CLOUD_COMPOUNDS.find(c => c.id === compId);
        if (comp) {
          labElements = [...comp.elements];
          updateTileFilterStates();
          switchView('lab');
        }
      }
    });

    // Poster item click
    posterGridEl.addEventListener('click', e => {
      const item = e.target.closest('.poster-item');
      if (!item) return;
      const sym = item.getAttribute('data-symbol');
      const el = elementMap.get(sym);
      if (el) openElementModal(el);
    });

    // View switcher
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => switchView(btn.getAttribute('data-view')));
    });

    // Theme toggle
    document.getElementById('themeToggleBtn').addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      document.getElementById('themeToggleBtn').textContent = next === 'light' ? '🌙 Dark Lab' : '☀️ Poster Light';
    });

    // Bond highlight toggle
    document.getElementById('bondToggleBtn').addEventListener('click', e => {
      showBondHighlights = !showBondHighlights;
      e.currentTarget.classList.toggle('active', showBondHighlights);
      e.currentTarget.textContent = showBondHighlights ? '🔗 Bonds: ON' : '🔗 Bonds: OFF';
      updateCentralInspector(inspectedElement);
    });

    // Modal interactions
    modalBackdropEl.addEventListener('click', e => {
      if (e.target === modalBackdropEl || e.target.closest('#closeModalBtn')) {
        modalBackdropEl.classList.remove('open');
        return;
      }
      const bondJump = e.target.closest('.modal-bond-jump');
      if (bondJump) {
        const el = elementMap.get(bondJump.getAttribute('data-sym'));
        if (el) {
          updateCentralInspector(el);
          openElementModal(el);
        }
        return;
      }
      const copyBtn = e.target.closest('.copy-snippet-btn');
      if (copyBtn) {
        navigator.clipboard?.writeText(copyBtn.getAttribute('data-copy'));
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy CLI'; }, 1500);
        return;
      }
      const labBtn = e.target.closest('#modalToggleLabBtn');
      if (labBtn) {
        const sym = labBtn.getAttribute('data-sym');
        if (labElements.includes(sym)) {
          labElements = labElements.filter(s => s !== sym);
        } else {
          labElements.push(sym);
        }
        updateTileFilterStates();
        openElementModal(elementMap.get(sym));
      }
    });

    // Lab View events
    document.getElementById('labViewSection').addEventListener('click', e => {
      const rmBtn = e.target.closest('.remove-lab-el');
      if (rmBtn) {
        const sym = rmBtn.getAttribute('data-sym');
        labElements = labElements.filter(s => s !== sym);
        renderLabWorkbench();
        updateTileFilterStates();
        return;
      }
      const toggleBtn = e.target.closest('[data-lab-toggle]');
      if (toggleBtn) {
        const sym = toggleBtn.getAttribute('data-lab-toggle');
        if (labElements.includes(sym)) {
          labElements = labElements.filter(s => s !== sym);
        } else {
          labElements.push(sym);
        }
        renderLabWorkbench();
        updateTileFilterStates();
        return;
      }
      if (e.target.closest('#clearLabBtn')) {
        labElements = [];
        renderLabWorkbench();
        updateTileFilterStates();
        return;
      }
      if (e.target.closest('#copyLabScriptBtn')) {
        const code = document.getElementById('labCodeOutput')?.innerText || '';
        navigator.clipboard?.writeText(code);
        const btn = e.target.closest('#copyLabScriptBtn');
        btn.textContent = '✓ Copied to Clipboard!';
        setTimeout(() => { btn.textContent = '📋 Copy Provisioning Script'; }, 1600);
      }
    });

    // Quiz events
    document.getElementById('quizViewSection').addEventListener('click', e => {
      const ansBtn = e.target.closest('.quiz-option-btn');
      if (ansBtn && currentQuizQuestion && !currentQuizQuestion.answered) {
        currentQuizQuestion.answered = true;
        quizTotal++;
        const chosen = ansBtn.getAttribute('data-quiz-ans');
        const right = currentQuizQuestion.correctEl.symbol;
        const feedback = document.getElementById('quizFeedback');

        document.querySelectorAll('.quiz-option-btn').forEach(b => {
          if (b.getAttribute('data-quiz-ans') === right) b.classList.add('correct');
        });

        if (chosen === right) {
          quizScore++;
          feedback.style.color = '#34A853';
          feedback.textContent = `🎉 Correct! ${currentQuizQuestion.correctEl.name} (${right}) — "${currentQuizQuestion.correctEl.fourWords}"`;
        } else {
          ansBtn.classList.add('wrong');
          feedback.style.color = '#EA4335';
          feedback.textContent = `Not quite! The answer is ${currentQuizQuestion.correctEl.name} (${right}).`;
        }
        return;
      }
      if (e.target.closest('#nextQuizBtn')) {
        generateQuizQuestion();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
