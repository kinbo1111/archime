const ARCHETYPES = [
  {
    key: 'A',
    name: 'ビジョン・クリエイター系',
    en: 'Vision Creator Type',
    sub: '理想・美・表現を重視する「創造派」',
    desc: 'コンセプトやデザインで未来を描くタイプ。芸術性や独創性が高く、感性を建築に込める。',
    codes: ['VFCE', 'VFCP', 'VFIE', 'VFIP'],
    jobs: '意匠設計／インテリア／家具デザイン／企画開発',
    fields: 'アトリエ事務所／デザイン事務所／デベロッパー'
  },
  {
    key: 'B',
    name: 'テクニカル・エンジニア系',
    en: 'Technical Engineer Type',
    sub: '論理・構造・技術を重視する「実務派」',
    desc: 'ロジックや精度を大切にし、建築を科学的・技術的に組み立てるタイプ。',
    codes: ['VSCE', 'VSCP', 'VSIE', 'VSIP'],
    jobs: '構造設計／施工管理／BIM／設備設計',
    fields: 'ゼネコン／組織設計／研究機関'
  },
  {
    key: 'C',
    name: 'ヒューマン・デザイナー系',
    en: 'Human Designer Type',
    sub: '人・環境・暮らしを重視する「共感派」',
    desc: '暮らしや空間体験を通じて、人の心に寄り添う建築をデザインするタイプ。',
    codes: ['RFCE', 'RFCP', 'RFIE', 'RFIP'],
    jobs: '意匠設計／リフォーム／施工管理',
    fields: '設計事務所／工務店／ハウスメーカー'
  },
  {
    key: 'D',
    name: 'システム・ビルダー系',
    en: 'System Builder Type',
    sub: '構造・管理・効率を重視する「戦略派」',
    desc: '現場を俯瞰して仕組みを整えるタイプ。合理性と統率力を武器に建築を動かす。',
    codes: ['RSCE', 'RSCP', 'RSIE', 'RSIP'],
    jobs: '',
    fields: ''
  }
];

(function renderArchetypes() {
  const wrap = document.getElementById('arch-groups');
  if (!wrap || typeof TYPES === 'undefined') return;

  wrap.innerHTML = ARCHETYPES.map(g => {
    const cards = g.codes.map(code => {
      const t = TYPES[code];
      if (!t) return '';
      return `<a class="type-card" href="type.html?type=${code}">
        <div class="type-card-illust">${characterThumbHtml(code, '')}</div>
        <p class="type-card-name">${typeNameHtml(code)}</p>
        <p class="type-card-code">${code}</p>
        <p class="type-card-tagline">${esc(t.tagline)}</p>
      </a>`;
    }).join('');

    let meta = '';
    if (g.jobs || g.fields) {
      meta = `<dl class="arch-meta">
        ${g.jobs ? `<div><dt>向いている職種</dt><dd>${esc(g.jobs)}</dd></div>` : ''}
        ${g.fields ? `<div><dt>業種傾向</dt><dd>${esc(g.fields)}</dd></div>` : ''}
      </dl>`;
    }

    return `<section class="arch-group">
      <div class="arch-head">
        <div class="arch-headtext">
          <h2 class="arch-name">${esc(g.name)}<span class="arch-en">${esc(g.en)}</span></h2>
          <p class="arch-sub">― ${esc(g.sub)} ―</p>
        </div>
      </div>
      <p class="arch-desc">${esc(g.desc)}</p>
      <div class="types-grid arch-types">${cards}</div>
      ${meta}
    </section>`;
  }).join('');

  gaEvent('archetypes_view');
})();
