const AXES = [
  { key: 'worldview', codeA: 'V', codeB: 'R', nameA: '構想型', nameB: '現実型', color: 'var(--axis-v)' },
  { key: 'value',     codeA: 'F', codeB: 'S', nameA: '造形志向', nameB: '機能志向', color: 'var(--axis-f)' },
  { key: 'workstyle', codeA: 'C', codeB: 'I', nameA: '組織型', nameB: '個人型', color: 'var(--axis-c)' },
  { key: 'process',   codeA: 'E', codeB: 'P', nameA: '探索型', nameB: '計画型', color: 'var(--axis-e)' }
];

const AXIS_UI = {
  worldview: { sym: '○', label: '世界観', color: 'var(--axis-v)' },
  value:     { sym: '△', label: '価値志向', color: 'var(--axis-f)' },
  workstyle: { sym: '×', label: '働き方', color: 'var(--axis-c)' },
  process:   { sym: '●', label: 'プロセス', color: 'var(--axis-e)' }
};

const OPT_LABELS = ['Aに共感', 'ややA', 'ややB', 'Bに共感'];
const OPT_HINTS  = ['強く', 'やや', 'やや', '強く'];

const QUESTIONS = [
  { axis: 'value', stem: '設計初期に最も重要視するスタディ手法は？',
    A: 'スケッチ、粘土模型、3Dレンダリングによる造形の検討',
    B: 'ダイアグラム、プログラム分析、パラメトリックな数値解析' },
  { axis: 'worldview',
    A: 'まだ見ぬ未来のライフスタイルや、社会へのメッセージを提案することにワクワクする。',
    B: '目の前の敷地課題を解決し、具体的で質の高い空間を実現することにやりがいを感じる。' },
  { axis: 'worldview',
    A: '理想の建築像をまず自由に描きたい',
    B: '条件や制約から最適な形を見つけたい' },
  { axis: 'value',
    A: '空間の雰囲気や素材の表情に敏感だ',
    B: '動線や用途の合理性を意識して設計する' },
  { axis: 'process',
    A: '面白い案が見つかるなら、直前でも設計変更を厭わない。プロセスは「発見」のためにある。',
    B: 'クオリティとリスクを管理するため、決定事項は覆さない。プロセスは「完遂」のためにある。' },
  { axis: 'process',
    A: '手を動かしながら試行錯誤して考える',
    B: '計画を立ててから進める方が安心する' },
  { axis: 'workstyle',
    A: 'チーム全体の合意形成を重視したい',
    B: '最終判断は自分の価値観で決めたい' },
  { axis: 'workstyle',
    A: 'チームで話しながら考える方が力を発揮できる',
    B: '一人で黙々と集中する方が力を発揮できる' },
  { axis: 'worldview',
    A: '「いつか実現したい未来」に惹かれる',
    B: '「今できる現実的な解」に価値を感じる' },
  { axis: 'workstyle',
    A: '他者の意見を取り入れながら調整するのが得意',
    B: '自分の世界観や美学を大切にしている' },
  { axis: 'process',
    A: 'とにかく手を動かし、模型やドローイングを大量に作ることで、偶然性の中から答えを探る。',
    B: '全体の要件を整理し、スケジュールとタスクを明確にしてから、着実に解像度を上げていく。' },
  { axis: 'value',
    A: '理屈では説明できない、感覚や情緒に訴えかける「現象的な美しさ」を信じている。',
    B: '無駄が削ぎ落とされ、すべての要素に理由がある「論理的な美しさ」を信じている。' },
  { axis: 'workstyle',
    A: 'スタッフや異分野の専門家とブレインストーミングを行い、議論の中で予期せぬアイデアが出るのを好む。',
    B: 'まずは一人で集中してスケッチやスタディを行い、自分の中の確固たるコアアイデアを固めるのを好む。' },
  { axis: 'process',
    A: '締切直前まで粘って最後に仕上げることが多い',
    B: '段階的に進めて余裕を持って仕上げたい' },
  { axis: 'worldview',
    A: 'コンセプトづくりが一番楽しい',
    B: '実際に形にしていく過程が好き' },
  { axis: 'value',
    A: '美しい形に心が動く',
    B: '意図に適った機能性に納得感を感じる' },
  { axis: 'process',
    A: '全体のスケジュールやタスクに縛られすぎず、柔軟に進めていく方が安心できる。',
    B: '設計を始める前に、全体のスケジュールとタスクをきっちり決めて、その通りに進まないと不安になる。' },
  { axis: 'worldview',
    A: 'まず「あるべき姿」や「強いコンセプト」を言語化・図式化し、そこから具体的な形を導き出す。',
    B: '敷地の形状、周辺環境、法規といった「与条件」を整理し、パズルを解くように形を導き出す。' },
  { axis: 'workstyle', stem: '設計上の難問に直面した際、どのように解決策を探るか？',
    A: 'チームメンバーを集め、ブレインストーミングや議論を行う',
    B: '一人で静かな場所に籠り、スケッチや思索に没頭する' },
  { axis: 'value', stem: '魅力的だと感じる建築には、どんな特徴が多いですか？',
    A: '大胆なフォルムや、視覚的に印象に残る空間構成が多い',
    B: '使いやすさ・機能性・構造美がバランスよく成立していることが多い' }
];

const TYPES = {
  VFCE: { code:"VFCE", name:"ビジョンイルカ", color:"#4fc3f7",
    tagline:"感性とチームワークで未来を描く構想家。",
    desc:"柔らかな感性と直感を武器に、未来像を描くタイプ。人の感情に敏感で、会議の空気すら読んで適切な言葉を添える。抽象概念をつかむのが得意で、アイデアの種を見つける天才。周囲への気遣いで疲れやすい一面も。課題の初日から世界観づくりに没頭し、図面より物語や空気感の整理が先に進む。スタジオでもチームの雰囲気を自然に整え、迷った時に核心を突く発言ができる一方、論理整理や納まりが後回しになりがちで提出直前に慌てることもある。将来は企画・意匠・都市系など世界観を扱う領域で強みが活きるが、学生のうちに論理力を少し鍛えるとさらに伸びる。",
    strengths:["コンセプトづくりが得意", "共感力が高く、チームをまとめる", "未来志向で企画が得意", "抽象的な価値を言語化する能力"],
    weaknesses:["細部の詰めやルーティン作業が苦手", "論理的説明がやや弱い", "気遣いしすぎて疲労しやすい", "急な現場調整で混乱することも"],
    anecdotes:["気づけば世界観のメモばかりが増えていく", "模型は雰囲気重視で光の入れ方に異常なこだわり", "教員に「コンセプトは良いが裏付ける根拠が浅い」と言われがち", "机に観葉植物置きがち", "アイデアは早いのに手が遅い", "チームの空気を読んで潤滑油になる"],
    role:["テーマ設定・企画・ストーリー構成を担当すると実力を発揮", "プレゼンの導入部分を作らせると強い", "模型のディテールより世界観仕上げが得意", "図面作成や工程管理を任せると課題が遅れる"],
    workscene:"コワーキングスペースで、メンバーの話を整理しながら大きな方向性を示す姿が象徴的。「つまり、私たちがつくりたい未来はこれだよね？」とホワイトボードに描いた瞬間、場の空気が変わる。模型は雰囲気重視で作るタイプ。",
    workNotes:["模型に観葉植物を置く", "スケッチが優しい線ばかりになる", "プレゼンのモチベ上げでカフェに行きがち", "人間関係で疲れると、海を見ると回復する"],
    career:["企画開発／都市計画／公共系意匠", "大規模プロジェクトの初期構想担当", "デベロッパーの企画職・戦略部門", "官民連携プロジェクトのコーディネーター"],
    good:["VFIE（タコ）：世界観 × 表現力の爆発ペア　　\n→イルカの柔らかい世界観にタコの鋭い表現力が重なり、学生時代はスタジオの空気を一気に変えるほどの没入感ある作品を生み出し、実務でも企画段階で他社を圧倒するほど魅せる力に振り切った最強クリエイティブコンビとなる。", "VFCP（クジラ）：感性を構成で支える安定バランス\n→イルカの直感的なアイデアをクジラが構成力で軸に変え、学生時代はふわりとした世界観が伝わる図面へと整い、実務では方向性と論理が美しく噛み合うことで企画から実施設計まで安定して進む落ち着きある理想の補完関係になる。"],
    bad:["CSCP（ワニ）：感性と論理がかみ合わない平行線\n→雰囲気で進めたいイルカを現実最優先のワニが容赦なく切り返すため学生時代は締切前まで方向性が定まらず迷走し続け、実務でも施工性と世界観が強く対立して毎回PMが火消しに追われる緊張度MAXの地獄ペア。\n解決策：イルカはまず理想や完成イメージを一度しっかり共有し、その後にワニが現実的な条件や制約を整理する順番にすると、価値観の衝突を最小限に抑えられる。"] },
  VFCP: { code:"VFCP", name:"マエストロクジラ", color:"#5c6bc0",
    tagline:"美と秩序で大海原を導くリーダー設計者。",
    desc:"堂々として落ち着きがあり、周囲からの信頼感が圧倒的。美学が安定しており、ブレない軸でチームを引っ張る指揮者。部分より全体最適を見るタイプで、秩序・構成・バランスに強い。課題を読んだ段階で全体の構成や時間配分が見えているタイプで、チーム内では自然と司令塔役になる。案の整理・レイアウト・優先順位の判断がうまく、講評会でも「破綻がない」と評価されやすいが、慎重さゆえに大胆な挑戦が減りがち。学生時代はあえて攻めた案に挑むことで、安定感にプラスして表現力も磨かれる。",
    strengths:["統率力が高い", "理路整然とした判断ができる", "大規模案件で力を発揮", "美意識と理性の両立"],
    weaknesses:["若手の自由案にやや厳しめ", "細部の遊びを理解しづらい", "正しさを重視しすぎて窮屈になることも"],
    anecdotes:["課題の要求条件をすみからすみまで読む", "レイアウトが無駄なくうつくしい", "1年生の頃から講評会で安定感を褒められる", "図面チェックの指摘が鋭い", "仕上がりに品格がある", "友達から「なんか大人っぽい」と言われがち"],
    role:["チームの全体構成を握らせると安定", "プレゼンの最終調整", "レイアウト・構図の最終決定", "行きすぎた案は止めてくれる安全装置"],
    workscene:"会議では静かに座っているのに、最後の3分で完璧にまとめて全員が納得。図面チェックは鋭いが愛がある。若手としてはプレッシャーだが、同時に安心感も抜群。",
    workNotes:["指摘コメントが論文並みに長い", "机の上がきっちり整理されている", "素材選びが上品", "若手に「安心感ある」と言われがち"],
    career:["プロジェクトマネジメント／官公庁設計／設計監理", "公共建築のリーダー", "組織設計で主任・主査ポジション向き"],
    good:["VSCE（サメ）：構成 × 論理の無敗コンビ\n→クジラの緻密な構成力にサメの鋭い論理が加わり、学生時代は図面・資料・講評会の質が群を抜いてプロ級となり、実務でも整合性と精度が異常に高いためクライアントから絶大な信頼を獲得する理詰めの最強プロフェッショナルペアになる。", "CFCE（ペンギン）：構成と共感が調和する柔らか設計\n→クジラが構成面を固め、ペンギンが共感性を添えることで学生時代は優しく読みやすい空間が生まれ、実務では生活者視点と合理性の両立により公共・地域系で抜群に強いほっとする完成度の高い組み合わせ。"],
    bad:["VFIP（フィッシュ）：構成と丁寧のペース不一致\n→クジラが早めに全体像を固めたい一方、フィッシュは細部へのこだわりが強すぎて進行が遅れ、学生時代はペースが合わず調整が難しく、実務でも完成度は高いものの、工程が読みづらく「慎重すぎる」やや不安定なペアになる。\n解決策： 初期はクジラに自由に発想させる時間を確保し、中盤以降はフィッシュが構成を固定するなど、フェーズごとに主導権を切り替えることで混乱を防げる。"] },
  VFIE: { code:"VFIE", name:"アーティストタコ", color:"#ec407a",
    tagline:"自由な発想で空間を紡ぐ夢想家。",
    desc:"超・感性型。アイデアは波のように押し寄せ、気分によって生産性が劇的に上下する。誰よりも独創的だが、説明は苦手。「感じてほしい」が口癖。感性の爆発力が強く、スケッチ・模型・CGなどすべてがアート寄りになるタイプ。没入すると誰も話しかけられないほど集中し、講評会でも「心を掴まれた」と言われやすいが、説明が感覚的になりすぎて論理の部分が弱くなることもある。学生のうちに言語化の練習を少し積むだけで、表現×説得力のバランスが大きく向上する。",
    strengths:["独創性が高い", "素材・色彩への感度", "アート×建築の融合に強い", "気づいたら周りが見えなくなる集中力"],
    weaknesses:["納期が天敵", "論理説明が苦しい", "ムードに左右されやすい"],
    anecdotes:["模型・素材に異常にこだわる", "教室の隅でヘッドホンして作業", "スケッチが得意", "図面化がめちゃ遅い", "Pinterestが教科書", "気分乗ってる時は最強、乗らないと沈黙", "机が汚いのに作品は綺麗"],
    role:["コンセプトビジュアル担当", "模型の表現要素・素材選び", "空間の雰囲気作り", "スケジュール管理させたら詰む"],
    workscene:"アトリエの隅でヘッドホンしながら模型をずっと触っている。机の上は謎の素材で溢れ、スケッチブックが積み重なる。",
    workNotes:["資料より Pinterest が命", "こだわりすぎて時間を忘れる", "雰囲気を語りがち"],
    career:["アトリエ系意匠／展示デザイン／アンビルド", "アトリエ事務所として独立", "ブランディング空間"],
    good:["VSIE（イカ）：表現 × 技術の圧倒的イノベーション\n→タコの圧倒的な表現力にイカの技術革新が加わり、学生時代は唯一無二の攻めた作品を怒涛のスピードで生み出し、実務でも企画や先端的な提案において他の追随を許さない革新型クリエイティブペアとなる。", "VFCE（イルカ）：物語をアートに昇華させる感性共鳴\n→イルカの世界観をタコが表現で深化させ、学生時代は強烈な印象を残す作品になり、実務でもビジュアル面でクライアントを引き込みやすいが、方向性の揺れに注意が必要な華やかさ満点の共感ペア。"],
    bad:["CSCE（システムシロクマ）：感性とロジックの断絶\n→タコが感覚で語るたびにシロクマが論理を求めて議論が噛み合わず学生時代はスタートから迷子になり、実務ではアート性と構造化思考の溝が深すぎて毎回別言語会議になる危険な相性。\n解決策：タコは「なぜこの形が美しいのか」を簡単な言葉で補足し、シロクマはそれを論理的に整える役に徹することで、否定ではなく昇華の関係になれる。"] },
  VFIP: { code:"VFIP", name:"ソロタリーフィッシュ", color:"#80deea",
    tagline:"美を極める孤高のデザイン職人。",
    desc:"美意識の高さは16タイプ随一。孤独を苦にせず、自分の世界で完璧な美を追求するタイプ。チーム作業は苦手だが、ひとりでやらせると圧倒的なクオリティを出す。静かに確実に作業を進め、美しさと精度にとことんこだわる。線一本・余白1mmにまで意識が行き届いており、講評会でも「丁寧で綺麗」と評価される。ただし細部から作り込みすぎて進行が遅れがちで、全体の大胆さが不足することもある。将来的には繊細さを活かせる職種に向くが、学生時代に荒く作る経験も少し積むと設計の幅が広がる。",
    strengths:["審美眼×精密性", "集中力が驚異的", "細かい納まりや寸法に強い"],
    weaknesses:["協働が苦手", "柔軟な方向転換が苦手", "コミュニケーションが少なめ"],
    anecdotes:["黙って黙々と作業", "図面の線幅に異常なこだわり", "無印・モノトーンの服が好き", "講評会ではコメント少なめ", "作品は綺麗でミニマル", "こだわりすぎて提出日に徹夜常習", "でも妥協は絶対しない"],
    role:["どんな作業も任せれば高品質", "細かい図面・仕上げ担当で精度が高い", "模型の最後の仕上げも強い", "意見を言わなすぎて誤解されがち"],
    workscene:"静かで薄暗い作業スペースで、深夜に黙々と線の太さを調整している。誰にも邪魔されたくないタイプ。",
    workNotes:["線幅設定に命をかける", "黒い服を好む", "余白の扱いが上手い"],
    career:["アトリエ設計／家具デザイン", "ミニマル建築", "プロダクト開発／研究職"],
    good:["CSIP（シャチ）：精度と論理が静かに積み上がる安定型\n→お互いのペースが似ているため学生時代は地味だが確実な完成度を生み、実務でも細部の美意識と論理整合が高い水準で揃い続ける静かな職人ペアになる。", "VFCP（クジラ）：美しさ × 構成力の静かな最適解\n→フィッシュの丁寧で緻密な作業にクジラの構成力が合わさり、学生時代は静かに最高クラスの完成度を叩き出し、実務でも精度と整理が綺麗に整った堅実で美しい成果物をつくる黄金コンビとなる。"],
    bad:["CFIE（ラッコ）：試作の嵐に飲まれる繊細ワーカー\n→ラッコが手を動かしながら案を変えるたびにフィッシュの精度重視の作業が崩され、学生時代は終盤まで完成形が見えず不安だけが増え、実務でも試作過多と慎重さの溝で整合が取れない危険な組み合わせ。\n解決策：ラッコの試作や実験は範囲と期限を決めて行い、フィッシュは最終形の完成度だけに集中する役割分担にすると、互いの強みが生きる。"] },
  VSCE: { code:"VSCE", name:"ロジックサメ", color:"#546e7a",
    tagline:"理論とスピードで構造を制す実務派。",
    desc:"16タイプの中で最も合理性に優れるタイプ。数字・構造・整合性が大好物で、感情より事実で判断する。判断が早く、曖昧さを嫌い「結論は？」と先に聞きがち。状況を瞬時に整理し、最短解を見つける戦略的実務家。課題が出た瞬間から要件や整合性を読み解き、論理的に最短で正解へ近づく道を探す傾向あり。図面の矛盾に敏感で、提出前日に他人のミスすら見つけて直したくなるほど精度にこだわる一方、感覚的・抽象的な議論には少し苦手意識がある。講評会では鋭い質問にも落ち着いて答えられ、教授からの信頼が厚いが、学生時代は遊び心や世界観の強さを少し混ぜると設計がぐっと豊かになる。",
    strengths:["論理力／情報処理能力が高い", "構造・設備的視点が強い", "判断がクリアでブレない", "問題解決力が高い"],
    weaknesses:["感情コミュニケーションが苦手", "直感型の人との衝突が発生しやすい", "柔らかい表現が難しい", "曖昧な案件が苦手"],
    anecdotes:["課題の要求条件を最初に箇条書きで整理", "「結論から言うと…」が口癖", "図面の整合性が取れないと寝れない", "スタジオで常に冷静。感情的にならない", "ダメな案はハッキリ言うので誤解されることも", "気づいたらみんなのモデルの寸法を確認している", "教員の言いそうなことを予想して言い当てる"],
    role:["要求条件の分析", "論理的な図面構成", "整合性チェック（最強）", "プレゼン資料の使いやすいレイアウト設計", "モデリングの細部チェック"],
    workscene:"図面チェックで矛盾を秒で見つける。会議ではメモを最小限にし、必要なことだけを抽出。設計調整の中で噛み合わない時は、冷静に「論点はここです」と場を整える。",
    workNotes:["整合性が取れないと眠れない", "打合せで要点を箇条書きにしがち", "データ資料に興奮する"],
    career:["構造設計／設備設計／BIMエンジニア", "研究開発／建築コンサル", "合理性重視のゼネコン設計部"],
    good:["VFCP（クジラ）：論理 × 構成の精度無双コンビ\n→ サメの鋭い論理とクジラの強固な構成が噛み合い、学生時代は図面の整合が恐ろしいほど綺麗に揃い、実務でも説明力と資料精度が抜群でとりあえずこの2人に任せれば安心と言われる完成度最強タッグとなる。", "RSCE（シロクマ）：精査と構造化のダブルロジック\n→サメの論理的洞察にシロクマの情報整理力が加わり、学生時代は講評会でどの先生からもわかりやすいと褒められ、実務では要件定義〜図面化まで迷いが少ない冷静沈着で頼もしすぎる分析コンビになる。。"],
    bad:["VFIE（タコ）：整合主義と衝動性の大衝突\n→タコの突然のひらめき変更にサメが「論理的根拠は？」とすぐ反論し、学生時代は作業が全く前に進まず、実務でもデザインの突発性と合理性が常に衝突して議論の迷子状態が続く危険な相性。\n解決策：サメは最初から結論を出そうとせず質問ベースで整理し、タコは感性案を1つに絞って持ってくるだけで、議論が前向きに進みやすくなる。"] },
  VSCP: { code:"VSCP", name:"マネージャーアザラシ", color:"#42a5f5",
    tagline:"冷静沈着にプロジェクトを導く調整型リーダー。",
    desc:"落ち着き・安定・調整力の三拍子。熱すぎず冷たすぎずの絶妙なバランス感覚で、チームの中間管理職として圧倒的な信頼を誇る。混乱している現場にスッと入り、沈静化させる能力がある。グループ課題になると誰より早くタスク表やスケジュールを作り、全員の進捗や役割が気になってしまう縁の下の安定役。自分の案よりチームの調整を優先してしまい、講評会で少し自分の作品が薄く見えることもあるが、完成まで持っていける実行力が強み。学生時代は、マネジメント能力ばかり発揮しすぎず、自分の案に集中する時間を意図的につくると成長が早い。",
    strengths:["調整力と安定感がトップクラス", "現場と設計の橋渡しがうまい", "冷静な判断力", "リスク管理に強い"],
    weaknesses:["プレッシャーを抱え込みやすい", "強いリーダーや強い個性に押されやすい", "発想力はやや控えめ"],
    anecdotes:["グループLINEを管理しがち", "課題スケジュールを真っ先に作る", "自然に仲裁役になる", "大声で言い争うタイプが苦手", "やるべきタスクを淡々と片付けていく", "講評会の準備は早めに始めるタイプ", "資料を清潔感のある感じに仕上げる"],
    role:["プロジェクトマネジメント", "スケジュール・タスク分担の管理", "メンバー間の調整（非常に強い）", "現実路線の案をまとめる", "進行役が得意"],
    workscene:"図面・現場・役所とのやり取りを淡々とこなしながら、プロジェクト全体を少しずつ前へ動かすタイプ。揉めた現場へ行くと不思議と場が落ち着く調整のプロ。",
    workNotes:["チェックリストを作りすぎる", "関係者からの相談がなぜか集まる", "図面の付箋量が多い"],
    career:["プロジェクトマネジメント／施工管理／設計監理", "ゼネコンの所長候補", "官公庁の建築系ポジション"],
    good:["CFCE（ペンギン）：調整 × 共感の優しい現場最強ペア\n→ アザラシの調整力とペンギンの人への理解が噛み合い、学生時代はチームの雰囲気が驚くほど円滑に進み、実務ではクライアントとの会話や現場調整を最も穏やかに進める柔らかいけど最強の運営コンビ。", "VFCP（クジラ）：管理 × 構成が生む実務力MAX\n→ アザラシが進行管理を担い、クジラが構成の核を固めるため学生時代は安定して作品がまとまり、実務ではマネジメントと設計の両輪が回るプロジェクト管理力に特化した最強級コンビとなる。"],
    bad:["VFIE（タコ）：破壊衝動と管理の崩壊\n→タコの衝動的な案変更にアザラシの管理が追いつかず学生時代は提出直前まで混乱し、実務でも進行管理が破綻しやすく毎回火消しが必要な緊張感MAXのペアになる。\n解決策：プロジェクト開始時に「ここまでは変更OK」「ここからは固定」とタイミングを明確に決めておくことで、管理と創造の衝突を防げる。"] },
  VSIE: { code:"VSIE", name:"イノベーションイカ", color:"#29b6f6",
    tagline:"技術と遊び心で新しい建築を生む。",
    desc:"技術好き × 好奇心 × 柔軟性のハイブリッドタイプ。デジタル・最新技術・研究にワクワクする。ルールの中に遊びを見つけて改善提案を出すクリエイティブエンジニア。新しい技術やソフトに強く、気づけばGrasshopperやBIMで遊んでしまうタイプ。連続的な試行やCGの質感調整が得意で、未来的な作品をつくれる反面、技術が先行しすぎて空間の使われ方や心地よさの説明が曖昧になることもある。講評会では技術系の先生から好かれやすく、学生時代に人の視点を学ぶと作品の完成度が一気に跳ね上がる。",
    strengths:["技術探究心が強い", "改善・改良が得意", "新技術導入の原動力", "柔軟な発想で問題解決"],
    weaknesses:["飽きっぽい", "コツコツ積み上げが苦手", "慎重さが足りない時も"],
    anecdotes:["BIMやVRなど新しいツールに誰より詳しい", "レンダリングの設定を研究している", "気づいたらGrasshopper開いている", "技術の実験が楽しすぎて時間を忘れる", "素材サンプルや建材カタログが好き", "今までと違う攻めた案を出したくなる", "講評会で「新しい視点で面白い」と褒められがち"],
    role:["デジタル技術導入担当", "表現の革新（新しい模型や新表現）", "改良・改善のアイデア出し", "モデリングスピードが速い"],
    workscene:"BIMやデジタルの新機能を試しながら「これ、もっと良くできる！」と生き生きする。建材メーカーのショールームで興奮しがち。",
    workNotes:["新しいツールをすぐ試す", "パラメトリック設計が好き", "周りから変人と言われがち"],
    career:["設備設計／BIM開発／研究職", "ソフトメーカー／建材メーカー"],
    good:["VFIE（タコ）：技術 × 表現で唯一無二の前衛建築を生む\n→ イカの技術力とタコの表現力が融合し、学生時代は毎回スタジオがざわつく攻めた作品が生まれ、実務でも新技術を扱う魅力的な提案でクライアントを惹きつける革新型の最強ペアとなる。", "VSCE（サメ）：実験を論理で固める高性能ペア\n→ イカの試作と速度にサメの論理が加わり、学生時代は実験的アイデアが課題として成立し、実務でも革新的アイデアを確実な形に変える技術と合理の高相性ペアになる。"],
    bad:["CSCP（ワニ）：挑戦心と現実主義の完全衝突\n→イカが攻めた実験をしようとするたび、ワニが現実性ゼロと即座に切るため学生時代は議論が進まず、実務でも革新と施工性の衝突で会議が常に炎上する危険コンビになる。\n解決策：イカは実験的な案と実装前提の案を最初から分けて提示し、ワニは本命案だけを評価対象にすることで、議論が現実的に進む。"] },
  VSIP: { code:"VSIP", name:"マスターカメ", color:"#66bb6a",
    tagline:"慎重かつ緻密に積み上げる堅実派。",
    desc:"ゆっくり・確実・丁寧がモットー。派手さはないが、積み上げによって高品質を実現する安定型。慎重で、リスク回避能力が高い。情報整理から入り、ゆっくり丁寧に案を積み上げる。作業スピードは遅めだが、間違いが少なく、最終段階で堅実な完成度にたどり着くタイプ。周囲が焦っていても落ち着いて作業できる強みがあるが、即日課題や短期制作ではスピード不足が目立つことも。学生時代はスピード優先の荒い制作を一度経験すると、得意な丁寧さにもさらに深みが出る。",
    strengths:["正確性と安定性", "リスク管理能力が高い", "継続力の塊", "堅実な納まり検討"],
    weaknesses:["決断が遅い", "変化への対応が苦手", "スピード勝負に弱い"],
    anecdotes:["課題初日から地味に作業進めている", "納まりがきれい", "仕上がりに妙な安定感がある", "椅子や手すりなど細かい部分が異常に丁寧", "夜な夜な細かい修正をしていて気づいたら朝", "グループ課題では裏仕事を1人で進める", "驚くほど控えめだけどめちゃ優秀"],
    role:["詳細図面担当", "納まり・精度担当", "模型の仕上げ・細部調整", "設計案が暴走しないよう守りの要になる"],
    workscene:"朝一で作業計画を立て、ひとつずつ着実にこなすタイプ。現場でも確実な判断が出せるため信頼度は高い。",
    workNotes:["図面のチェックが異常に細かい", "慎重派ゆえに机が整っている", "朝型が多い"],
    career:["構造設計／施工管理／研究職", "地味だが高難度の精度仕事に向く"],
    good:["CSIP（シャチ）：慎重 × 思索の堅実最強ペア\n→ カメの丁寧な積み上げとシャチの深い分析が組み合わさり、学生時代は堅実で破綻のない完成度を出し、実務でも安定した品質と正確な判断で信頼度の高い静かに強い職人コンビとなる。", "CFCP（フグ）：誠実と丁寧の堅実ライン\n→カメの慎重さにフグの丁寧さが加わり、学生時代はミスが少なく安心して任せられる作業ができ、実務でも地道に完成度を上げ続ける信頼重視の補完ペア。"],
    bad:["VFCE（イルカ）：慎重と感性の永遠の平行線\n→ カメの慎重な検討に対しイルカが感覚で方向転換するため学生時代は作業が常に振り回され続け、実務でも世界観と堅実性が噛み合わずプロジェクトが迷走しがちな危険な組み合わせ。\n解決策：カメが方向性を一度決めきり、イルカは途中で口を出すのではなく検証役に回ることで、迷走せずに精度を高められる。"] },
  RFCE: { code:"RFCE", name:"コンテクストペンギン", color:"#26a69a",
    tagline:"環境と人をつなぐ温かなデザイナー。",
    desc:"温厚で聞き上手。相手の気持ちや背景を自然に読み取り、空間づくりに反映できる共感型デザイナー。環境・文脈・地域性を重視し、住民との対話からアイデアを膨らませる。静かだが芯のあるタイプ。敷地・地域・人の気持ちを想像するのが自然と得意で、課題の初期段階からここにいる人はどう感じる？と人の視点で考え始める。図面にも居心地の良い溜まりややわらかい動線が生まれやすく、講評会でも「温かい建築」「使いやすそう」と評価されることが多い。ただし刺激的なコンセプトや尖った形状には踏み込みにくく、世界観の強さでは他タイプに劣ることも。将来的には公共・地域系の設計に強くなるが、学生のうちに先に形で考えてみる経験をすると幅が広がる。",
    strengths:["共感力が非常に高い", "公共性・環境性に強い", "調和・バランス感覚が優れている", "対話の中で価値を見つける能力"],
    weaknesses:["強い個性に押されがち", "意見を率直に言いにくい", "スピード勝負が苦手"],
    anecdotes:["ワークショップや街歩きが好き", "課題の敷地分析がめちゃ丁寧", "「人がどう使うか」をずっと考えている", "コンセプトのキーワードがあたたかい", "模型に小さな住民フィギュア置きがち", "講評会で「温かい空間ですね」と褒められる", "スタジオの空気がピリつくと静かに仲裁"],
    role:["敷地分析・ヒアリング担当", "空間の雰囲気や使い方の調整", "プレゼンの読みやすさを上げる役", "メンバーの意見をまとめる調和役"],
    workscene:"地域ワークショップで住民の声を丁寧に拾いながら、空間の心地よさをスケッチに落とし込む。資料にはやさしい丸みのある線が多い。",
    workNotes:["椅子の座り心地にうるさい", "模型に住民の人型を置きがち", "自分も住みたくなる空間をつくる"],
    career:["公共建築／都市計画／意匠設計", "リフォーム／地域系プロジェクト", "住民参加型プロジェクト"],
    good:["VFCP（クジラ）：共感 × 構成の優しさと論理の黄金比\n→ ペンギンの人への寄り添いにクジラの構成力が加わり、学生時代は使う人の視点と整った図面が自然に共存し、実務でも公共・地域系案件で「説明しなくても伝わる」優しさと合理性が高次元で揃う最強の設計コンビになる。", "CSCE（シロクマ）：感性と論理が静かに嚙み合う情報設計\nペンギンが空間の人の気持ちを拾い、シロクマがそれをロジックで整えることで学生時代は柔らかい雰囲気の中に強い説得力が宿り、実務でも利用者視点と確固たる要件整理が両立する高品質なペアとなる。"],
    bad:["VSCE（サメ）：共感と合理の真っ向からの衝突\n→ペンギンが「人の気持ち」を語るほどサメが「要件にない」と切り返し、学生時代は議論の温度差で前に進まず、実務でも利用者視点と論理主義が噛み合わず毎回調整が必要なストレスフルなペア。\n解決策：ペンギンは利用者視点や感情を文章ではなく図やフローで示し、サメはそれを要件にどう効くかで評価すると噛み合いやすい。"] },
  RFCP: { code:"RFCP", name:"プランフグ", color:"#ffa726",
    tagline:"安定と丁寧さで空間を整える堅実設計者。",
    desc:"真面目で丁寧、人に安心感を与えるタイプ。派手さはないが、図面・資料・工程など基本をしっかり押さえる。責任感が強く、納期を守るタイプ。サポート役として優秀で、チームにひとりいると安定する。丁寧で読みやすい図面が特徴で、頼まれた作業を確実にこなす堅実な努力家。線のムラがなく、提出物をきっちりまとめる安定感があるため、グループ課題では自然と「最後に整えてくれる人」として信頼される。一方、自分から大胆な案を出すことは少なく、保守的にまとまりすぎてしまうことも。学生時代は荒いスケッチや大胆な模型で遊ぶ日をつくると、強みの丁寧さがさらに際立つ。",
    strengths:["丁寧さと正確性", "堅実な図面作成", "スケジュールを守る", "聞き役が得意"],
    weaknesses:["アイデア創出はやや苦手", "強い主張ができない", "急な方針転換に弱い"],
    anecdotes:["図面がとにかく丁寧", "講評会で「基本がしっかりしてる」と褒められる", "作業スペースがいつもきれい", "付箋・マーカーなど道具が整っている", "模型は地味だけど精度が安定して高い", "無茶ぶりされても真面目にやる", "徹夜するときは静かに淡々と作業"],
    role:["トレース・図面整理", "資料のフォーマット作成", "スケジュール表の管理", "実現性の検討（地味に超大事）"],
    workscene:"机には整理された図面と付箋。上司の指示を正確に整理し、丁寧に仕上げていく。作業スピードは速くないが、品質は安心の安定型。",
    workNotes:["トレース作業が好き", "納まり図を丁寧に描きがち", "デスクの整頓が習慣"],
    career:["意匠設計／設計監理", "ハウスメーカー・工務店で安定活躍", "公共系案件でも信頼されるタイプ"],
    good:["VFIP（フィッシュ）：丁寧 × 美意識の精密アートライン\n→ フグの緻密で丁寧な作業にフィッシュの繊細な美意識が加わり、学生時代は細部が驚くほど綺麗な完成度の高い作品が出来上がり、実務でも図面の精度や資料の美しさが群を抜く静かな実力派ペアとなる。", "VSIP（カメ）：誠実作業 × 慎重検討の堅実タッグ\n→ フグの丁寧な作業にカメの慎重な検討が重なり、学生時代はミスの少ない安心感ある成果物が生まれ、実務でも地道に精度と信頼を積み上げ続ける堅実さ満点の補完コンビとなる。"],
    bad:["VSIE（イカ）：丁寧の限界とスピードの暴走\n→ 慎重に作業したいフグと高速で試作したいイカが噛み合わず、学生時代は方向転換の速さにフグが疲れ、実務でもイカの実験量に丁寧さが追いつかないスピード差コンビ。\n解決策：イカの新案は数を絞り、フグが一つずつ丁寧に整理する流れにすると、雑さと丁寧さのズレを抑えられる。"] },
  RFIE: { code:"RFIE", name:"フィールドラッコ", color:"#ef5350",
    tagline:"手を動かしながら考える柔軟な現場派。",
    desc:"座って考えるより触って理解する実践型。好奇心旺盛で行動が早く、現場に出るとスイッチが入るタイプ。図面より現物で理解する傾向が強い。人懐っこく、現場の職人さんから可愛がられる。手を動かしながら考える実践型で、図面よりも模型・スタディの量で勝負する傾向。材料を切りながら「これ実際どう建つ？」と自然に構法を考え始め、模型の説得力が高い。ただし理論の整理やコンセプト言語化が後回しになりがちで、講評会で説明が追いつかないこともある。将来的には現場・工務店系や実験系の領域で強みが発揮されるが、学生のうちに座学的な整理を一度やってみると作品の説得力が倍増する。",
    strengths:["現場対応能力が高い", "柔軟性と行動力", "観察力／試行錯誤タイプ", "本質を体感して理解する"],
    weaknesses:["机上作業が長く続かない", "論理的資料が苦手", "調整業務の資料化が遅れがち"],
    anecdotes:["まず模型を作って理解しようとする", "職人さん体質で細部に強い", "現場見学が大好き", "図面より形を先に決めるタイプ", "教員に「模型はいいね、図面もう少し」と言われがち", "自分でも気づかないうちに作業量が多い", "無意識で工具を使うのが上手い"],
    role:["模型制作", "実現性の検証（現場感覚で強い）", "素材・構法の検討", "製作系のタスク全般"],
    workscene:"現場で詳細を確認しながら「ここはどう納まる？」と職人と議論。サンプルを触りまくって理解し、帰社するとスケッチで一気にまとめる。",
    workNotes:["サンプルを触る時間が長い", "現場のほうが集中できる", "模型の作り方が大胆"],
    career:["施工管理／現場監理／設計補助", "リノベ会社・工務店で大活躍", "住宅系の細かな対応に強い"],
    good:["VSIE（イカ）：実験 × 技術の現場系イノベーター\n→ ラッコの手を動かし続ける実験力にイカの技術的な試行が合わさり、学生時代は模型・試験・実験の量が圧倒的で説得力のある動きのある作品が生まれ、実務でも現場検証や新技術導入に非常に強い実践型ペア。", "CFCE（ペンギン）：現場感 × 生活感のあたたかい作品\n→ ラッコが実際に手を動かしながら空間を作り、ペンギンが人の視点を添えることで学生時代はリアルさと優しさを兼ね備えた作品が生まれ、実務でも居心地と現場感の両立が実現する温度の高いチーム。"],
    bad:["CSIP（シャチ）：手の速さと考察の深さのすれ違い\n→ ラッコが手を動かして案を進めるほど、シャチはもう少し深く考えたい気持ちになり、学生時代は完成リズムが揃わず、実務でも検証量と慎重思考が噛み合わない微妙な相性。\n解決策：ラッコの即行動を小さな単位に分け、シャチが最後に全体を分析・判断する形にすると噛み合いやすい。"] },
  RFIP: { code:"RFIP", name:"クラフトカワウソ", color:"#ff8a65",
    tagline:"職人技と誠実さで形を磨く努力家。",
    desc:"コツコツ型で努力家。手仕事や細部に愛が深く、ものづくりそのものが好き。派手な主張はしないが、丁寧さと継続力で確実に成長するタイプ。控えめだが信頼度は非常に高い。模型や細部の作業が得意で、カッターや紙の扱いが驚くほど丁寧なクラフト職人型。細かいパーツの精度が高く、仕上げの美しさで教授から褒められやすい一方、細部に没頭しすぎて全体の進行が遅くなることがある。図面もゆっくりだが綺麗で、安定感がある。ただし全体構成や大胆な方向転換が苦手なため、学生時代は全体像を粗く一度固めてから細部に入る癖をつけると一気に強くなる。",
    strengths:["職人気質で細部のこだわりが強い", "継続力と誠実さ", "仕上げの品質に強いこだわり", "人の信頼を得やすい"],
    weaknesses:["スピードが遅い", "マルチタスクが苦手", "自己主張が控えめ"],
    anecdotes:["手を動かす作業が好き", "素材研究が好き", "仕上げの美しさにこだわりが強い", "作業速度は遅いが確実に仕上がる", "じっくり考えるので話しかけるとちょっと驚く", "教員に「細部が綺麗」と褒められる", "静かに長時間作業できるタイプ"],
    role:["模型仕上げ", "細部の作り込み", "図面の調整", "マテリアルや仕上げ選定"],
    workscene:"木材サンプルを並べながらじっくり検討。図面も丁寧に描き、現場に行けば職人と一緒に納まりを確認。時間はかかるが、仕上げの精度は非常に高い。",
    workNotes:["手の汚れを気にしない", "素材にこだわりすぎる", "仕上げチェックが厳しい"],
    career:["意匠設計／家具制作／プロダクト開発", "工務店／木工所／建材メーカー"],
    good:["VFIP（フィッシュ）：細部職人 × 美意識の手仕事最強\n→ ラッコの強すぎる手先の器用さにフィッシュの美意識が合わさり、学生時代は模型・図面の細部が驚異の完成度に達し、実務でも精密なプロダクトや仕上げを要する案件で最強クラスの職人ペアになる。", "CFCP（フグ）：手仕事 × 丁寧の安心精度\n→ラッコの手作業力をフグの丁寧な積み上げが支え、学生時代は破綻のない精密な資料が生まれ、実務でも緻密な調整や図面の正確さが求められる工程で絶対的な信頼感を発揮する。"],
    bad:["VSIE（イカ）：緻密作業が高速変更に崩壊する\n→イカが高速で形を変えるたびラッコの丁寧な手作業が追いつかず学生時代は完成形が安定せず、実務でも試作スピードとクラフト精度が完全に噛み合わない危険なペア。\n解決策：イカが変更を加える前に一声かけ、カワウソが「ここから先は触らない範囲」を宣言するだけで、手仕事とスピードの衝突を防げる。"] },
  RSCE: { code:"RSCE", name:"ラショナルシロクマ", color:"#1565c0",
    tagline:"ロジカルに世界を整理する知恵者。",
    desc:"最も理論的に美しさを構築するタイプ。情報を俯瞰して整理し、論理的な構造から美を導く戦略家。図解・フロー・概念マップなどを駆使して複雑な内容を的確に咀嚼し、機能的かつ洗練されたアウトプットをつくる。無駄を削ぎ落とした設計には、静かな知性と意志がにじみ出ており、「地味なのに洗練されている」「なんか綺麗」と言われやすい。抽象的な世界観には乗り切れないが、論理に裏付けされた美しさをつくる才能は圧倒的。スタジオでは静かに作業しているのに、提出日に完成度で殴ってくるタイプ。本質を見抜く冷静な視点と、課題を改善に転じる査読力が光る。学生時代に感性だけで設計する日を試すことで、理論と感性の融合が進み、大きな飛躍を遂げるタイプ。",
    strengths:["分析が得意", "デザインの根拠を構造化して説明できる", "判断にブレがない", "効率化・システムづくりが得意"],
    weaknesses:["デザイン議論でどこまでが美しく合理的か迷いがち", "直感的すぎる作品には疑問を持つ", "細かすぎて厳しいと誤解されることも", "根拠のない感情だけの話題が苦手"],
    anecdotes:["「人がどう使うか」をずっと考えている", "口数は少ないが、核心を突いた指摘が鋭い", "A1の構図に美しさと整理が両立している", "パースに余白が多いのに説得力がある", "色数が極端に少ない（白・黒・1アクセント色）", "現地調査シートが異常に読みやすい", "学生なのに実務的な図面を描きがち"],
    role:["デザインの方向性を定義する", "機能図・動線計画・構成案の作成", "図面・資料のビジュアルバランス調整", "分析・比較表の作成", "最終成果物の美しさの最適化担当"],
    workscene:"既存建物の問題を冷静に洗い出し、「どう置き換えれば機能的で、美しいか？」を淡々と組み立てていく。会議では静かだが、必要な時にだけ論理的なコメントを落とす重みのある存在。",
    workNotes:["美しい＝整理されているが完全に一致している", "無意識に常に「最適解」を探している", "職場で「一番冷静」と言われがち"],
    career:["リノベーション系意匠／構造設計／都市・公共の機能改善型デザイン", "大手ゼネコンのリニューアル部門／用途変更・既存建築の分析・動線改善", "設計の技術統括・品質管理"],
    good:["VSCE（サメ）：論理 × 体系化の計算し尽くされた最強ロジック\n→ 設計の論点を言語化するサメと、論理から美しさをつくるシロクマは、\n機能性と美しさが高い次元で両立した作品を生む最強コンビ。", "VFCP（クジラ）：ロジックに構成力が乗る堅実ライン\nシロクマの徹底した分析にクジラの構成力が加わり、学生時代は読みやすい資料が完成し、実務でも整った書類・安定した進行・破綻しない設計でクライアントの信頼を集める堅実補完コンビとなる。"],
    bad:["VFIE（タコ）：ロジックと衝動の言語断絶\n→タコの感性重視の案変更にシロクマの理詰め思考が全く追いつかず、学生時代は議論が平行線を辿り、実務でもアート性と論理性が衝突して毎回長時間の通訳会議になる危険な組み合わせ。\n解決策：タコの案を確定案ではなく仮説として扱い、シロクマが論理で磨き上げる役割に回ると、対立せずに完成度が上がる。"] },
  RSCP: { code:"RSCP", name:"ビルダーワニ", color:"#558b2f",
    tagline:"統率と実行力で現場を制するリーダー。",
    desc:"現場力と管理力を併せ持つ、頼れるリーダー。危険予知・判断スピード・統率力が高く、施工現場で圧倒的な信頼を得るタイプ。豪快に見えて細かい部分もよく見ている。現実的な視点で設計を進めるタイプで、「これ実際に建つ？」を最初に考える堅実派。作業中は集中力が高く、構造や納まりの理解が早いため、講評会でも「現実的」「説得力がある」と言われやすい。一方、表現の華やかさや遊び心は控えめで、実務っぽさが学生のうちから出すぎることもある。学生時代は、意図的に大胆な形や世界観に挑戦してみると設計の伸びしろが一気に広がる。",
    strengths:["リーダーシップが強い", "現場の統率力が高い", "調整能力も兼備", "短期間で状況を判断できる"],
    weaknesses:["感覚型の案が苦手", "衝突が起きると強めに出がち", "忙しいと詰めの甘さが出る"],
    anecdotes:["施工見学・現場系の授業が異常に好き", "講評会の質疑に強い（冷静に答えられる）", "図面の現実感が強い", "作業の段取りがうまい", "チームで揉め事が起きると自然にリーダー役", "口数は多くないが決断が早い", "提出前日の「あとこれだけやろう」をまとめる天才"],
    role:["現実性の整理", "タスク・作業工程管理", "講評会での説明役（実務的）", "図面の詰めるべき点の判断"],
    workscene:"現場で職人・設計者・監督をまとめあげる空気を変える存在。判断が早く、ヘルメット姿がよく似合う。構造にも強く、力学や施工性を踏まえた提案は実現性が高い。現場と設計の橋渡しができ目立たずとも、信頼され、現場に安心感をもたらす存在。",
    workNotes:["指示が短くて的確", "現場での歩くスピードが早い", "安全靴が妙に似合う"],
    career:["構造設計／施工管理／プロジェクトマネジメント", "ゼネコンの現場所長", "官公庁の工事発注部門"],
    good:["VSCP（アザラシ）：現場 × 調整のプロジェクト最強運営\n→ ワニの現実的な判断とアザラシの調整力が組み合わさり、学生時代はチームの進行が圧倒的にスムーズで、実務でも現場・書類・調整が破綻なく進む管理力と実務力が頂点に達する最強運営ペア。", "CSCE（シロクマ）：現実判断 × 論理整理の実務特化\n→ワニが現実的な方針を示し、シロクマがそれを要件に落とし込むことで、学生時代は読みやすい資料が生まれ、実務でも現場と設計の橋渡しが完璧に機能する強力な実務補完コンビ。"],
    bad:["VFCE（イルカ）：現実と世界観の完全衝突\n→ イルカが感性で語るたびにワニが現実面で切り返すため学生時代は何度も議論が振り出しに戻り、実務でも施工性と世界観が噛み合わず永遠にまとまらない会議が続く危険な相性。\n解決策：イルカは理想案を、ワニは実現案をそれぞれ並べて出し、どちらが適切かを比較する形にすると感情的な衝突を避けられる。"] },
  RSIE: { code:"RSIE", name:"テックガニ", color:"#0288d1",
    tagline:"技術と発想を両立させる研究肌の開拓者。",
    desc:"好奇心と技術力のハイブリッド。数字も図面も好きだが、同時に新しいものにも目がない。研究的な深堀りと遊び心が同居するタイプで、建材やデジタル技術の可能性にワクワクする。研究室の機材や解析ツールと相性がよく、環境・構造・実験系のアプローチに強い理系寄りタイプ。グラフ・シミュレーション・性能比較など数字が語る資料で講評会の説得力を引き上げられる一方、作品としての華やかさや感覚的な世界観は後回しになりがち。学生のうちに表現の練習を少し取り入れるだけで、研究力とデザイン力の両輪が揃った強い設計者になれる。",
    strengths:["研究力の高さ", "技術開発の素質", "改善・改良が得意", "深い思考と遊び心"],
    weaknesses:["飽きっぽい", "ルーティンが苦手", "情報収集に偏りが出る"],
    anecdotes:["環境工学や解析ソフトに強い", "データを見るとテンション上がる", "気づいたら新素材の論文を読んでいる", "提出資料に性能比較や数値グラフを入れがち", "研究室の教授から気に入られやすい", "実験系授業で本気を出すタイプ", "一人で深掘りして作品レベルが突然上がる", "データ取りになると急に元気", "新しい建材カタログを読むのが好き", "PCのショートカットを多用"],
    role:["技術検証", "環境シミュレーション", "デジタルデザイン", "論理補強のための比較資料づくり"],
    workscene:"試験機の前でデータを取ったり、新素材サンプルを並べて楽しそうに分析する姿が目に浮かぶ。BIMやデジタルツールを誰よりも早く使いこなす。",
    career:["研究開発／BIMエンジニア／技術職", "大学研究室／建材メーカー／システムエンジニア", "構造・設備の高度解析"],
    good:["VSIE（イカ）：技術 × 技術の先端開拓最強タッグ\n→ カニの技術探究心とイカの革新力が噛み合い、学生時代は試作・検証・実験のレベルが異常に高く、実務でも新技術導入やBIM開発などで唯一無二の成果を出す先端型の最強ペアとなる。", "CSCE（シロクマ）：技術思考 × ロジックの情報強者\n→カニの技術解像度にシロクマの論理構築が重なり、学生時代は思想と実装が綺麗につながった作品が生まれ、実務でも技術の裏付けと整った資料が揃う堅固な実力ペアとなる。"],
    bad:["VFIE（タコ）精密技術 × 爆発感性の大事故ライン\n→タコが衝動で方向転換するたびカニの技術的検討が全てリセットされ、学生時代は混乱続きで、実務でも技術整合が崩れやすく手戻り地獄が発生する危険な相性。\n解決策：タコは変更の理由を必ず言葉で説明し、カニは技術的に難しい点を図で示すことで、感覚と技術の断絶を埋められる。"] },
  RSIP: { code:"RSIP", name:"アナライズシャチ", color:"#7b1fa2",
    tagline:"理論で美を構築する静かな分析家。",
    desc:"静かで控えめだが、内面は極めて理論的。建築の美を感覚でなく構造や仕組みの美として捉える。感情表現は少ないが、深い思考力と持続力を持つ静かなる職人。誰より静かに深く考える思索型で、図面も説明も一貫して論理的。表現が控えめでも図面の精度と合理性が高く、講評会では「よく考えている」と評価されやすい。自分のペースでじっくり案を詰められる一方、チーム作業では目立たず、改善案を裏でこっそり直す影の功労者になりがち。学生時代は、あえてプレゼンや初期構想に前に出る経験をすると、思考の深さがより活かされる。",
    strengths:["深い理論構築力", "静かな集中力", "長期的な継続作業が得意", "論理的な美学の探求"],
    weaknesses:["口数が少ないため誤解されやすい", "スピード感には弱い", "打合せで主張しにくい"],
    anecdotes:["作業中ほぼ無言", "気づくと図面の細部が異常に整っている", "ノートがきれいすぎる", "質疑でやたら論理的に答えるので教授に褒められる", "大人数議論が苦手", "作業スピードはゆっくりだが精度は最強", "「あの人いつの間にこんな仕上げたの…？」と言われる"],
    role:["図面の精度担当", "整合チェック", "論理的な設計説明", "細部の美しさの追求"],
    workscene:"デスクで静かに構造計算や整合チェックを続ける姿が象徴的。現場でも、数値に基づいた的確な指摘をするため信頼度は高い。",
    workNotes:["図面を静かに修正し続ける", "余白・配置・整合を異常に気にする", "資料のフォルダ整理が得意"],
    career:["構造設計／設備設計", "研究機関／技術検証業務", "設計の品質管理ポジション"],
    good:["VSIP（カメ）：深い思索 × 丁寧積み上げの無敵安定\n→ シャチの深い分析にカメの緻密な積み上げが組み合わさり、学生時代は破綻のない作品を確実に作り上げ、実務でも品質・整合・丁寧な判断が揃う静かに最強の堅実コンビとなる。", "CFCP（フグ）：分析 × 丁寧の高精度ライン\n→シャチの分析力にフグの丁寧さが加わり、学生時代は資料や模型が安定し、実務でも間違いのない図面と判断が自然と積み上がる堅牢な補完関係。"],
    bad:["CFIE（ラッコ）：考えたい × まず動きたい の速度差\n→シャチの深く考える時間がラッコのまず手を動かす行動力と噛み合わず、学生時代は作業の方向性が揃いにくく、実務でも検証と思考のリズムが合わない組み合わせ。\n解決策：ラッコの案数を2つまでに制限し、シャチが最後に分析・判断を行う流れにすることで、議論が無限ループに陥らずに済む。"] },
};

let answers = new Array(QUESTIONS.length).fill(null);
let lastResult = null;
let lastScores = null;

const MILESTONES = {
  5:  '5問完了。いい調子です',
  10: '半分を超えました。あと10問',
  15: 'あと5問で結果が出ます',
  20: 'すべて回答済みです'
};

const STORAGE_KEY = 'archime_session';

const $ = id => document.getElementById(id);

function normalizeAnswers(arr) {
  const a = new Array(QUESTIONS.length).fill(null);
  if (!Array.isArray(arr)) return a;
  for (let i = 0; i < QUESTIONS.length; i++) {
    const v = arr[i];
    a[i] = typeof v === 'number' && v >= 0 && v <= 3 ? v : null;
  }
  return a;
}

function saveProgress(view) {
  try {
    const payload = { view, answers };
    if (view === 'result' && !answers.includes(null)) {
      payload.resultCode = calcTypeCode(calcAxisScores());
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (_) {}
}

function loadProgress() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function clearProgress() {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
}

function restoreQuizUI() {
  answers.forEach((val, i) => {
    if (val === null) return;
    const card = $('qc-' + i);
    if (!card) return;
    card.classList.add('answered');
    card.querySelectorAll('.q-opt').forEach(b => {
      b.classList.toggle('sel', +b.dataset.v === val);
    });
  });
  updateProgress();
}

function scrollToQuizPosition() {
  const firstUnanswered = answers.findIndex(a => a === null);
  const target = firstUnanswered >= 0 ? firstUnanswered : answers.length - 1;
  const card = $('qc-' + target);
  if (card) {
    setTimeout(() => card.scrollIntoView({ behavior: 'auto', block: 'center' }), 80);
  }
}

function gaEvent(name, params) {
  if (typeof gtag === 'function') gtag('event', name, params || {});
}

const HERO_CHAR_LAYOUT = [
  { top: 2, left: 0, size: 96, rotate: -18, delay: 0, dur: 4.2 },
  { top: 0, left: 76, size: 88, rotate: 14, delay: 0.5, dur: 3.8 },
  { top: 14, left: 84, size: 80, rotate: -8, delay: 1.1, dur: 4.5 },
  { top: 24, left: -4, size: 84, rotate: 12, delay: 0.3, dur: 3.6 },
  { top: 48, left: 0, size: 76, rotate: -22, delay: 0.8, dur: 4.0 },
  { top: 54, left: 78, size: 80, rotate: 16, delay: 1.4, dur: 3.9 },
  { top: 68, left: 68, size: 72, rotate: -12, delay: 0.2, dur: 4.3 },
  { top: 74, left: 4, size: 68, rotate: 20, delay: 1.0, dur: 3.7 },
  { top: 6, left: 38, size: 64, rotate: 6, delay: 0.6, dur: 4.1 },
  { top: 10, left: 54, size: 60, rotate: -14, delay: 1.2, dur: 3.5 },
  { top: 34, left: 86, size: 58, rotate: 10, delay: 0.4, dur: 4.4 },
  { top: 40, left: -6, size: 60, rotate: -6, delay: 1.3, dur: 3.8 },
  { top: 60, left: 44, size: 56, rotate: 8, delay: 0.7, dur: 4.0 },
  { top: 82, left: 34, size: 52, rotate: -16, delay: 1.5, dur: 3.6 },
  { top: 18, left: 16, size: 58, rotate: 18, delay: 0.9, dur: 4.2 },
  { top: 28, left: 64, size: 54, rotate: -10, delay: 1.6, dur: 3.9 }
];

function buildHeroChars() {
  const el = $('hero-chars');
  if (!el) return;
  const codes = Object.keys(TYPES);
  el.innerHTML = codes.map((code, i) => {
    const p = HERO_CHAR_LAYOUT[i] || HERO_CHAR_LAYOUT[0];
    const t = TYPES[code];
    return `<div class="hero-char" style="top:${p.top}%;left:${p.left}%;width:${p.size}px;height:${p.size}px;--rot:${p.rotate}deg;--delay:${p.delay}s;--dur:${p.dur}s">
      <img src="${characterPath(code)}" alt="" loading="eager" onerror="this.style.display='none'">
    </div>`;
  }).join('');
}

function buildIntroTypes() {
  const el = $('intro-types');
  if (!el) return;
  el.innerHTML = Object.values(TYPES).map(t =>
    `<a class="type-card" href="type.html?type=${t.code}">
      <div class="type-card-illust">${characterThumbHtml(t.code, '')}</div>
      <p class="type-card-name">${typeNameHtml(t.code)}</p>
      <p class="type-card-code">${t.code}</p>
      <p class="type-card-tagline">${esc(t.tagline)}</p>
    </a>`
  ).join('');
}

function resultUrl(code) {
  const u = new URL(location.href);
  u.search = '';
  if (code) u.searchParams.set('r', code);
  return u.href;
}

function setMeta(attr, val, useProperty) {
  const sel = useProperty ? `meta[property="${attr}"]` : `meta[name="${attr}"]`;
  let el = document.querySelector(sel);
  if (!el) {
    el = document.createElement('meta');
    if (useProperty) el.setAttribute('property', attr);
    else el.setAttribute('name', attr);
    document.head.appendChild(el);
  }
  el.setAttribute('content', val);
}

function updatePageMeta(t, code) {
  document.title = t.name + '｜ARCHIme 建築タイプ診断';
  setMeta('description', t.tagline);
  setMeta('og:title', t.name + '（' + code + '）', true);
  setMeta('og:description', t.tagline, true);
  setMeta('og:url', resultUrl(code), true);
}

function resetPageMeta() {
  document.title = 'ARCHIme｜建築タイプ診断';
  setMeta('description', '20問・約5分。4つの設計軸から、あなたの建築家タイプ（全16種）を診断します。');
  setMeta('og:title', 'ARCHIme｜建築タイプ診断', true);
  setMeta('og:description', 'あなたはどんな建築家タイプ？ 無料・登録不要で診断できます。', true);
}

function characterPath(code) {
  return 'assets/characters/' + code + '.png';
}

const NAME_PARTS = {
  VFCE: ['ビジョン', 'イルカ'], VFCP: ['マエストロ', 'クジラ'], VFIE: ['アーティスト', 'タコ'], VFIP: ['ソロタリー', 'フィッシュ'],
  VSCE: ['ロジック', 'サメ'], VSCP: ['マネージャー', 'アザラシ'], VSIE: ['イノベーション', 'イカ'], VSIP: ['マスター', 'カメ'],
  RFCE: ['コンテクスト', 'ペンギン'], RFCP: ['プラン', 'フグ'], RFIE: ['フィールド', 'ラッコ'], RFIP: ['クラフト', 'カワウソ'],
  RSCE: ['ラショナル', 'シロクマ'], RSCP: ['ビルダー', 'ワニ'], RSIE: ['テック', 'ガニ'], RSIP: ['アナライズ', 'シャチ']
};

function typeNameHtml(code) {
  const p = NAME_PARTS[code];
  const t = TYPES[code];
  if (!p) return esc(t ? t.name : code);
  return esc(p[0]) + '<wbr>' + esc(p[1]);
}

function characterThumbHtml(code, className) {
  const t = TYPES[code];
  if (!t) return '';
  const cls = 'char-thumb' + (className ? ' ' + className : '');
  return `<span class="${cls}">
    <img src="${characterPath(code)}" alt="${esc(t.name)}" loading="lazy" onerror="this.parentElement.classList.add('no-img')">
  </span>`;
}

function compatHtml(items) {
  return items.map(g => {
    const text = String(g).trim();
    const nl = text.indexOf('\n');
    const head = (nl >= 0 ? text.slice(0, nl) : text).trim();
    const body = (nl >= 0 ? text.slice(nl + 1) : '').trim();
    const m = head.match(/^([A-Z]{4})/);
    const thumb = m ? characterThumbHtml(m[1], 'char-thumb-sm') : '';
    const bodyHtml = body
      ? `<p class="compat-body">${esc(body).replace(/\n/g, '<br>')}</p>`
      : '';
    return `<div class="compat-item"><div class="compat-head-row">${thumb}<b class="compat-head">${esc(head)}</b></div>${bodyHtml}</div>`;
  }).join('');
}

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  $('view-' + name).classList.add('active');
  document.body.classList.toggle('result-mode', name === 'result');
  document.body.classList.toggle('view-intro', name === 'intro');
  window.scrollTo({ top: 0, behavior: 'instant' in document.body.style ? 'instant' : 'auto' });
}

function scoreAnswer(idx) { return idx + 1; }

function calcAxisScores() {
  const s = { worldview: 0, value: 0, workstyle: 0, process: 0 };
  QUESTIONS.forEach((q, i) => {
    if (answers[i] !== null) s[q.axis] += scoreAnswer(answers[i]);
  });
  return s;
}

function calcTypeCode(scores) {
  return AXES.map(a => scores[a.key] <= 12 ? a.codeA : a.codeB).join('');
}

function calcResult() {
  const scores = calcAxisScores();
  const code = calcTypeCode(scores);
  return { type: TYPES[code] || TYPES.VFCE, scores, code };
}

function startQuiz() {
  clearProgress();
  answers = new Array(QUESTIONS.length).fill(null);
  buildQuiz();
  showView('quiz');
  highlightCurrent();
  saveProgress('quiz');
  gaEvent('quiz_start');
}

function buildQuiz() {
  const list = $('q-list');
  list.innerHTML = QUESTIONS.map((q, i) => {
    const ui = AXIS_UI[q.axis];
    const opts = [0,1,2,3].map(v =>
      `<button class="q-opt" data-q="${i}" data-v="${v}" onclick="pick(${i},${v})">${OPT_LABELS[v]}<small>${OPT_HINTS[v]}</small></button>`
    ).join('');
    return `<article class="q-card" id="qc-${i}" data-idx="${i}" style="--ac:${ui.color}">
      <div class="q-head">
        <span class="q-num">質問 ${i + 1}</span>
      </div>
      ${q.stem ? `<p class="q-stem">${q.stem}</p>` : ''}
      <div class="q-ab">
        <div class="q-line a"><span class="q-tag">A</span><span>${esc(q.A)}</span></div>
        <div class="q-line b"><span class="q-tag">B</span><span>${esc(q.B)}</span></div>
      </div>
      <p class="q-scale">Aに近い ←——→ Bに近い</p>
      <div class="q-opts">${opts}</div>
      <p class="q-done-badge">回答済み</p>
      <p class="q-edit-hint">別の選択肢をタップすると回答を変更できます</p>
    </article>`;
  }).join('');
  updateProgress();
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function pick(qi, val) {
  answers[qi] = val;
  const card = $('qc-' + qi);
  card.classList.add('answered');
  card.querySelectorAll('.q-opt').forEach(b => {
    b.classList.toggle('sel', +b.dataset.v === val);
  });
  updateProgress();
  const firstUnanswered = answers.findIndex(a => a === null);
  if (firstUnanswered >= 0 && firstUnanswered !== qi) {
    setTimeout(() => {
      $('qc-' + firstUnanswered).scrollIntoView({ behavior: 'smooth', block: 'center' });
      highlightCurrent();
    }, 280);
  } else {
    highlightCurrent();
    if (firstUnanswered < 0) $('quiz-fab').classList.add('show');
  }
  saveProgress('quiz');
}

function highlightCurrent() {
  const first = answers.findIndex(a => a === null);
  document.querySelectorAll('.q-card').forEach((c, i) => {
    c.classList.toggle('current', i === first);
    c.classList.toggle('dim', first >= 0 && i > first + 2);
  });
}

function updateProgress() {
  const done = answers.filter(a => a !== null).length;
  const pct = Math.round(done / QUESTIONS.length * 100);
  $('prog-text').innerHTML = `回答済み <em>${done}</em> / ${QUESTIONS.length}問`;
  $('prog-pct').textContent = pct + '%';
  $('prog-fill').style.width = pct + '%';
  if (done === QUESTIONS.length) $('quiz-fab').classList.add('show');
  else $('quiz-fab').classList.remove('show');
  const ms = $('quiz-milestone');
  const msg = MILESTONES[done];
  if (msg) { ms.textContent = msg; ms.classList.add('show'); }
  else { ms.textContent = ''; ms.classList.remove('show'); }
}

function finishQuiz() {
  if (answers.some(a => a === null)) return;
  const { type: t } = calcResult();
  $('load-tease').innerHTML = characterThumbHtml(t.code, 'load-tease-thumb') + '<span>' + esc(t.name) + ' …かもしれません</span>';
  showView('loading');
  gaEvent('quiz_complete');
  setTimeout(showResult, 1100);
}

function applyTheme(hex) {
  const r = document.documentElement.style;
  r.setProperty('--type', hex);
  r.setProperty('--type-soft', mixHex(hex, '#ffffff', 0.88));
  r.setProperty('--type-deep', shade(hex, -22));
}

function mixHex(hex, base, amount) {
  const n = hex.replace('#',''), b = base.replace('#','');
  const f = (i, j) => Math.round(parseInt(n.substr(i,2),16) * (1-amount) + parseInt(b.substr(j,2),16) * amount);
  return '#' + [f(0,0),f(2,2),f(4,4)].map(c => c.toString(16).padStart(2,'0')).join('');
}

function shade(hex, pct) {
  const n = hex.replace('#','');
  const r = parseInt(n.substr(0,2),16), g = parseInt(n.substr(2,2),16), b = parseInt(n.substr(4,2),16);
  const f = (c) => Math.min(255, Math.max(0, Math.round(c + (pct/100)*255)));
  return '#' + [f(r),f(g),f(b)].map(c => c.toString(16).padStart(2,'0')).join('');
}

function demoScores(code) {
  const s = {};
  AXES.forEach(a => { s[a.key] = code.includes(a.codeA) ? 10 : 14; });
  return s;
}

const AXIS_SYM = { worldview: '○', value: '△', workstyle: '×', process: '●' };

function loadCharacterIllust(code, name) {
  const illust = $('r-illust');
  const wrap = illust.parentElement;
  const path = 'assets/characters/' + code + '.png';

  const show = () => {
    illust.removeAttribute('hidden');
    wrap.classList.add('has-illust');
  };
  const hide = () => {
    illust.setAttribute('hidden', '');
    wrap.classList.remove('has-illust');
  };

  illust.alt = name;
  hide();
  illust.onload = show;
  illust.onerror = hide;

  if (illust.dataset.code === code && illust.complete && illust.naturalWidth > 0) {
    show();
    return;
  }

  illust.dataset.code = code;
  illust.removeAttribute('src');
  illust.src = path;

  if (illust.complete && illust.naturalWidth > 0) show();
}

function renderAxisChart(scores) {
  return AXES.map(a => {
    const sc = scores[a.key];
    const leftPct = Math.round((20 - sc) / 15 * 100);
    const rightPct = 100 - leftPct;
    const isLeft = sc <= 12;
    const dominant = isLeft ? a.nameA : a.nameB;
    const dominantPct = isLeft ? leftPct : rightPct;
    const dotPos = ((sc - 5) / 15) * 100;
    const ui = AXIS_UI[a.key];
    return `<div class="axis-chart-row" style="--ax:${ui.color}">
      <div class="axis-chart-head">
        <span class="axis-chart-sym">${AXIS_SYM[a.key]}</span>
        <span class="axis-chart-label">${ui.label}</span>
        <span class="axis-chart-verdict">${dominant}寄り <strong>${dominantPct}%</strong></span>
      </div>
      <div class="axis-spectrum">
        <div class="spec-track">
          <div class="spec-zone spec-left"></div>
          <div class="spec-zone spec-right"></div>
          <span class="spec-threshold" aria-hidden="true"></span>
          <span class="spec-dot" style="left:${dotPos}%"></span>
        </div>
        <div class="spec-pcts">
          <span class="spec-side${isLeft ? ' on' : ''}"><b>${a.codeA}</b> ${a.nameA} <em>${leftPct}%</em></span>
          <span class="spec-side${isLeft ? '' : ' on'}"><b>${a.codeB}</b> ${a.nameB} <em>${rightPct}%</em></span>
        </div>
      </div>
    </div>`;
  }).join('');
}

function showResult(forcedCode) {
  let t, scores, code;
  if (forcedCode && TYPES[forcedCode]) {
    code = forcedCode;
    t = TYPES[code];
    scores = demoScores(code);
  } else {
    ({ type: t, scores, code } = calcResult());
  }
  lastResult = t; lastScores = scores;
  applyTheme(t.color);

  $('r-code').textContent = code.split('').join(' ');
  $('r-name').innerHTML = typeNameHtml(code);
  $('r-tagline').textContent = t.tagline;
  loadCharacterIllust(code, t.name);

  $('r-pills').innerHTML = AXES.map(a => {
    const left = code.includes(a.codeA);
    const label = left ? a.nameA : a.nameB;
    const letter = left ? a.codeA : a.codeB;
    const ui = AXIS_UI[a.key];
    return `<span class="legend-item" style="--leg:${ui.color}"><span class="leg-sym">${AXIS_SYM[a.key]}</span><span class="leg-letter">${letter}</span><span class="leg-name">${label}</span></span>`;
  }).join('');
  $('r-desc').textContent = t.desc;
  $('r-bars').innerHTML = renderAxisChart(scores);

  $('r-str').innerHTML = t.strengths.map(s => `<div class="item">${s}</div>`).join('');
  $('r-wek').innerHTML = t.weaknesses.map(s => `<div class="item">${s}</div>`).join('');
  $('r-anec').innerHTML = t.anecdotes.map(s => `<div class="li">${s}</div>`).join('');
  $('r-career').innerHTML = t.career.map(s => `<span>${s}</span>`).join('');
  $('r-role').innerHTML = t.role.map(s => `<div class="li">${s}</div>`).join('');
  if ($('r-workscene')) $('r-workscene').textContent = t.workscene || '';
  if ($('r-worknotes')) $('r-worknotes').innerHTML = (t.workNotes || []).map(s => `<div class="li">${s}</div>`).join('');
  $('r-good').innerHTML = compatHtml(t.good);
  $('r-bad').innerHTML = compatHtml(t.bad);

  const sheet = document.querySelector('.board-sheet');
  if (sheet) {
    sheet.classList.remove('board-reveal');
    void sheet.offsetWidth;
    sheet.classList.add('board-reveal');
  }

  updatePageMeta(t, code);
  history.replaceState(null, '', resultUrl(code));
  setupShare(t, code);
  gaEvent('result_view', { type_code: code });
  showView('result');
  if (!forcedCode) saveProgress('result');
}

function shareText(t) {
  return `【ARCHIme 建築タイプ診断】\n私は ${t.name}（${t.code}）でした！\n${t.tagline}\nあなたも診断してみて →\n#ARCHIme #建築タイプ診断`;
}

function toggleSharePanel() {
  const panel = $('sh-panel');
  const willOpen = panel.hidden;
  panel.hidden = !willOpen;
  if (!willOpen) return;
  setTimeout(() => {
    document.addEventListener('click', function closePanel(e) {
      if (!e.target.closest('.share-expand-wrap')) {
        $('sh-panel').hidden = true;
        document.removeEventListener('click', closePanel);
      }
    });
  }, 0);
}

function setupShare(t, code) {
  const url = resultUrl(code);
  $('sh-x').onclick = () => {
    gaEvent('share', { method: 'x' });
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText(t)) + '&url=' + encodeURIComponent(url), '_blank', 'noopener');
    $('sh-panel').hidden = true;
  };
  $('sh-insta').onclick = async () => {
    gaEvent('share', { method: 'instagram' });
    if (navigator.share) {
      try {
        await navigator.share({ title: 'ARCHIme 建築タイプ診断', text: shareText(t), url });
      } catch (e) { if (e.name !== 'AbortError') setStatus('シェアをキャンセルしました'); }
    } else {
      try {
        await navigator.clipboard.writeText(shareText(t) + '\n' + url);
        setStatus('テキストをコピーしました。インスタの投稿に貼り付けてください。');
      } catch { setStatus('コピーできませんでした。URLをコピーしてインスタでシェアしてください。'); }
    }
    $('sh-panel').hidden = true;
  };
  $('sh-copy').onclick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('結果付きリンクをコピーしました');
      gaEvent('share', { method: 'copy' });
    } catch { setStatus('コピーに失敗しました'); }
  };
  $('sh-img').onclick = () => {
    setStatus('画像を生成中…');
    try { saveShareImage(t); setStatus('画像を保存しました'); gaEvent('share', { method: 'image' }); }
    catch { setStatus('画像の生成に失敗しました'); }
  };
}

function setStatus(msg) { $('sh-status').textContent = msg; }

function drawSeaBg(ctx, W, H) {
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#dff3fc');
  g.addColorStop(0.5, '#b8e4f7');
  g.addColorStop(1, '#eef9ff');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function saveShareImage(t) {
  const img = new Image();
  img.onload = () => renderShareImage(t, img);
  img.onerror = () => renderShareImage(t, null);
  img.src = characterPath(t.code);
}

function renderShareImage(t, charImg) {
  const cv = $('sr-canvas'), ctx = cv.getContext('2d'), W = 1080, H = 1350;
  const hex = t.color.replace('#', '');
  const tr = parseInt(hex.substr(0, 2), 16);
  const tg = parseInt(hex.substr(2, 2), 16);
  const tb = parseInt(hex.substr(4, 2), 16);

  drawSeaBg(ctx, W, H);

  const bx = 70, by = 90, bw = W - 140, bh = 980;
  ctx.fillStyle = 'rgba(255, 252, 245, .92)';
  ctx.strokeStyle = 'rgba(43, 43, 43, .15)';
  ctx.lineWidth = 2;
  roundRect(ctx, bx, by, bw, bh, 4);
  ctx.fill();
  ctx.stroke();
  ctx.shadowColor = 'rgba(0,0,0,.08)';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 6;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#888';
  ctx.font = '700 20px sans-serif';
  ctx.fillText('TYPE RESULT', bx + 40, by + 50);

  ctx.strokeStyle = `rgb(${tr},${tg},${tb})`;
  ctx.lineWidth = 3;
  ctx.strokeRect(bx + 40, by + 70, 200, 44);
  ctx.fillStyle = `rgb(${tr},${tg},${tb})`;
  ctx.font = '700 22px monospace';
  ctx.fillText(t.code.split('').join(' '), bx + 52, by + 100);

  ctx.fillStyle = '#2b2b2b';
  ctx.font = '700 56px "Noto Serif JP", serif';
  ctx.fillText(t.name, bx + 40, by + 180);
  ctx.strokeStyle = '#2b2b2b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(bx + 40, by + 200);
  ctx.lineTo(bx + 520, by + 200);
  ctx.stroke();

  ctx.fillStyle = '#555';
  ctx.font = '400 28px "Noto Sans JP", sans-serif';
  wrapText(ctx, t.tagline, bx + 40, by + 250, 480, 40);

  const cx = bx + bw - 280, cy = by + 120, cs = 360;
  ctx.save();
  ctx.translate(cx + cs / 2, cy + cs / 2);
  ctx.rotate(0.05);
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = 'rgba(0,0,0,.12)';
  ctx.lineWidth = 2;
  ctx.fillRect(-cs / 2, -cs / 2, cs, cs);
  ctx.strokeRect(-cs / 2, -cs / 2, cs, cs);
  if (charImg && charImg.naturalWidth > 0) {
    const pad = 28;
    const box = cs - pad * 2;
    const scale = Math.min(box / charImg.naturalWidth, box / charImg.naturalHeight);
    const dw = charImg.naturalWidth * scale;
    const dh = charImg.naturalHeight * scale;
    ctx.drawImage(charImg, -dw / 2, (cs / 2 - pad) - dh, dw, dh);
  }
  ctx.restore();

  const code = t.code;
  const symMap = { worldview: '○', value: '△', workstyle: '×', process: '●' };
  let lx = bx + 40, ly = by + 380;
  ctx.font = '500 20px "Noto Sans JP", sans-serif';
  AXES.forEach(a => {
    const left = code.includes(a.codeA);
    const lbl = `${symMap[a.key]} ${left ? a.codeA : a.codeB} ${left ? a.nameA : a.nameB}`;
    const tw = ctx.measureText(lbl).width + 28;
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#d9d4cb';
    ctx.lineWidth = 1;
    roundRect(ctx, lx, ly, tw, 36, 3);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = `rgb(${tr},${tg},${tb})`;
    ctx.fillRect(lx, ly, 4, 36);
    ctx.fillStyle = '#555';
    ctx.textAlign = 'left';
    ctx.fillText(lbl, lx + 14, ly + 24);
    lx += tw + 10;
    if (lx + tw > bx + 520) { lx = bx + 40; ly += 46; }
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = '#888';
  ctx.font = '400 24px "Noto Sans JP", sans-serif';
  ctx.fillText('ARCHIme 建築タイプ診断', W / 2, by + bh + 70);

  const a = document.createElement('a');
  a.download = 'archime_' + t.code + '.png';
  a.href = cv.toDataURL('image/png');
  a.click();
}

function wrapText(ctx, text, cx, y, maxW, lh) {
  const chars = text.split('');
  let line = '';
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, cx, y);
      line = ch; y += lh;
    } else line = test;
  }
  if (line) ctx.fillText(line, cx, y);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function restart() {
  clearProgress();
  answers = new Array(QUESTIONS.length).fill(null);
  $('quiz-fab').classList.remove('show');
  history.replaceState(null, '', location.pathname);
  resetPageMeta();
  showView('intro');
}

function restoreQuizSession() {
  answers = normalizeAnswers(loadProgress().answers);
  buildQuiz();
  restoreQuizUI();
  showView('quiz');
  highlightCurrent();
  scrollToQuizPosition();
}

function restoreResultSession() {
  answers = normalizeAnswers(loadProgress().answers);
  showResult();
}

buildHeroChars();
buildIntroTypes();

(function boot() {
  if (!$('view-intro')) return;
  const saved = loadProgress();
  const q = new URLSearchParams(location.search);
  const urlCode = q.get('r') || q.get('preview');

  if (saved?.view === 'quiz' && saved.answers?.some(a => a !== null)) {
    restoreQuizSession();
    return;
  }

  if (saved?.view === 'result' && saved.answers && !saved.answers.includes(null)) {
    restoreResultSession();
    return;
  }

  if (urlCode && TYPES[urlCode]) showResult(urlCode);
})();
