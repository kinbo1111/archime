(function renderTypePage() {
  const q = new URLSearchParams(location.search);
  const code = (q.get('type') || q.get('t') || '').toUpperCase();
  const t = TYPES[code];

  if (!t) {
    location.replace('index.html');
    return;
  }

  applyTheme(t.color);

  document.title = t.name + '（' + code + '）｜ARCHIme 建築タイプ診断';
  const setMetaEl = (id, val) => { const el = $(id); if (el) el.setAttribute('content', val); };
  setMetaEl('meta-og-title', t.name + '（' + code + '）');
  setMetaEl('meta-og-desc', t.tagline);

  $('r-code').textContent = code.split('').join(' ');
  $('r-name').innerHTML = typeNameHtml(code);
  $('r-tagline').textContent = t.tagline;
  loadCharacterIllust(code, t.name);

  $('r-pills').innerHTML = AXES.map(a => {
    const left = code.includes(a.codeA);
    const label = left ? a.nameA : a.nameB;
    const letter = left ? a.codeA : a.codeB;
    const ui = AXIS_UI[a.key];
    return `<span class="legend-item" style="--leg:${ui.color}"><span class="leg-letter">${letter}</span><span class="leg-name">${label}</span></span>`;
  }).join('');

  $('r-desc').textContent = t.desc;
  $('r-anec').innerHTML = t.anecdotes.map(s => `<div class="li">${s}</div>`).join('');
  $('r-str').innerHTML = t.strengths.map(s => `<div class="item">${s}</div>`).join('');
  $('r-wek').innerHTML = t.weaknesses.map(s => `<div class="item">${s}</div>`).join('');
  $('r-role').innerHTML = t.role.map(s => `<div class="li">${s}</div>`).join('');
  $('r-workscene').textContent = t.workscene || '';
  $('r-worknotes').innerHTML = (t.workNotes || []).map(s => `<div class="li">${s}</div>`).join('');
  $('r-good').innerHTML = compatHtml(t.good);
  $('r-bad').innerHTML = compatHtml(t.bad);
  $('r-career').innerHTML = t.career.map(s => `<span>${s}</span>`).join('');

  $('type-nav-grid').innerHTML = Object.values(TYPES).map(x =>
    `<a class="type-chip${x.code === code ? ' you' : ''}" href="type.html?type=${x.code}">
      ${characterThumbHtml(x.code, 'char-thumb-md')}
      <span class="type-chip-name">${typeNameHtml(x.code)}</span>
    </a>`
  ).join('');

  gaEvent('type_page_view', { type: code });
})();
