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
  VFCE: { code:'VFCE', name:'ビジョンイルカ', emoji:'🐬', color:'#4fc3f7',
    tagline:'感性とチームワークで、未来の建築を描く構想家。',
    desc:'直感と共感力でアイデアの核を見つけるタイプ。批評会では「世界観が伝わる」と評価されやすく、チームの潤滑油にもなれる。一方、図面の詰めや数値根拠の整理は後回しになりがち。企画・都市・空間演出など、物語を扱う分野で力を発揮しやすい。',
    strengths:['コンセプトを言葉にするのが得意','チームの空気を読んでまとめる','未来志向の企画力','感性を活かしたプレゼン'],
    weaknesses:['細部のルーティン作業が苦手','論理説明が弱くなりがち','気遣いすぎて疲れやすい','直前の調整で慌てることも'],
    anecdotes:['スケッチブックに世界観メモが増え続ける','模型の雰囲気作りに異常なこだわり','「コンセプトはいい、根拠は？」と言われがち','窓際に観葉植物を置きがち'],
    career:['企画開発・都市計画','公共建築の初期構想','デベロッパー企画職','空間演出・ブランディング'],
    role:['テーマ設定・ストーリー構成','プレゼン冒頭の演出','模型の世界観仕上げ','工程管理は苦手になりやすい'],
    good:['VFIE（タコ）— 感性×表現の爆発コンビ','VFCP（クジラ）— 構成で感性を支える安定ペア'],
    bad:['RSCP（ワニ）— 世界観と現実主義が平行線'] },
  VFCP: { code:'VFCP', name:'マエストロクジラ', emoji:'🐋', color:'#5c6bc0',
    tagline:'美と秩序で、チームを大海原へ導くリーダー。',
    desc:'落ち着きと統率力で信頼を集めるタイプ。課題を読んだ時点で全体構成が見え、批評会でも「破綻しない」と評価されやすい。レイアウト・優先順位の判断が鋭い。ただし大胆な挑戦を避けがちで、自由な発想にはやや厳しい面も。',
    strengths:['全体構成の統率力','安定した美意識','大規模案件での実力','優先順位の判断'],
    weaknesses:['突飛な案への理解が遅い','正しさ重視で窮屈になりがち','細部の遊びを削りがち'],
    anecdotes:['要求条件を最初に全部読み込む','レイアウトの無駄を嫌う','1年から批評会で安定感を褒められる','図面チェックが鋭い'],
    career:['プロジェクトマネージャー','官庁建設・設計監修','公共建築リーダー','組織の主任・主査'],
    role:['チーム全体の構成整理','プレゼン最終調整','レイアウト・構図の決定','暴走する案を止める安全弁'],
    good:['VSCE（サメ）— 論理×構成の無音コンビ','RFCE（ペンギン）— 共感と構成の温かい設計'],
    bad:['VFIP（フィッシュ）— ペースの違いが摩擦に'] },
  VFIE: { code:'VFIE', name:'アーティストタコ', emoji:'🐙', color:'#ec407a',
    tagline:'自由な発想で、空間をアートのように紡ぐ夢想家。',
    desc:'独創性と表現力が突出するタイプ。スケッチも模型もアート寄りで、批評会では「心に残る」と言われやすい。没入すると周囲が見えなくなる集中力がある。説明が感覚的になりすぎるのが課題で、言語化の練習で一気に伸びる。',
    strengths:['圧倒的な独創性','素材・色彩への感度','アート×建築の融合','没入型の集中力'],
    weaknesses:['論理説明が苦手','ムードに左右されやすい','スケジュール管理が苦手'],
    anecdotes:['教室の隅でひそひそ模型作業','素材サンプルが机を占領','Pinterestが参考書','気分で生産性が激変'],
    career:['アトリエ系演出','展示・インスタレーション','ブランディング空間','独立アトリエ'],
    role:['コンセプトビジュアル','素材・表現の選定','空間の雰囲気作り','進行管理は任せない方がよい'],
    good:['VSIE（イカ）— 表現×技術の革新ペア','VFCE（イルカ）— 物語と感性の共鳴'],
    bad:['RSCE（シロクマ）— 感性と論理の温度差'] },
  VFIP: { code:'VFIP', name:'ソロタリーフィッシュ', emoji:'🐠', color:'#80deea',
    tagline:'美を極める、孤高のデザイン職人。',
    desc:'美意識と精巧さが際立つタイプ。ひとりで黙々と作業すると圧倒的なクオリティを出す。線一本・余白1mmにも意識が届く。批評会では「丁寧で美しい」と評価されやすいが、細部に没頭して進行が遅れがち。',
    strengths:['審美眼と精巧性','驚異的な集中力','寸法・仕上げの精度','高い完成度'],
    weaknesses:['協調が苦手','方向転換に弱い','発言が少なく誤解されがち'],
    anecdotes:['図面の線の太さにこだわる','批評会では寡黙','余白とモノトーンが好き','最終日の徹夜が習慣化'],
    career:['アトリエ設計','家具・プロダクト','研究職・専門職'],
    role:['細部図面・仕上げ','模型の最終仕上げ','高品質な作業全般','意見を聞かないと誤解される'],
    good:['RSIP（シャチ）— 精度と論理の積み上げ','VFCP（クジラ）— 美と構成の静かな最適解'],
    bad:['RFIE（ラッコ）— 試作ペースの不一致'] },
  VSCE: { code:'VSCE', name:'ロジックサメ', emoji:'🦈', color:'#546e7a',
    tagline:'理論とスピードで、構造を制す実務派。',
    desc:'合理性と情報処理能力に優れたタイプ。「結論は？」と先に考え、図面の矛盾を瞬時に見つける。批評会では鋭い質問で場を整理できる。感性的な議論にはやや距離を感じるが、遊び心を少し混ぜると設計が一気に豊かになる。',
    strengths:['論理力・分析力','構造的な視点','ブレない判断','問題解決力'],
    weaknesses:['感情コミュニケーションが苦手','直感型との衝突','感性的な美の議論が難しい'],
    anecdotes:['要求条件を箇条書きで整理','図面の整合性が合わないと眠れない','「結論から言うと…」が口癖','他人のミスを最終日に発見'],
    career:['構造・設備設計','BIMエンジニア','建築コンサル','ゼネコン設計部'],
    role:['要求条件の分析','論理的な図面構成','整合性チェック','プレゼン資料の構造化'],
    good:['VFCP（クジラ）— 論理×構成の精度コンビ','RSCE（シロクマ）— 精緻と構造化'],
    bad:['VFIE（タコ）— 整合主義と行動性の衝突'] },
  VSCP: { code:'VSCP', name:'マネージャーアザラシ', emoji:'🦭', color:'#42a5f5',
    tagline:'冷静沈着に、プロジェクトを導く調整型リーダー。',
    desc:'落ち着きと調整力でチームを安定させるタイプ。混乱した現場に入ると空気が整う。スケジュール表やタスク分担を自然に作り、全員の進捗が気になって仕方ない。自分の案より調整を優先しがち。',
    strengths:['抜群の調整力','現場と設計の橋渡し','冷静な判断力','リスク管理'],
    weaknesses:['プレッシャーを抱え込みがち','強い個性に押されがち','発想力はやや控えめ'],
    anecdotes:['グループLINEを管理しがち','課題スケジュールを真っ先に作る','自然と仲裁役になる','資料の清書が上手'],
    career:['プロジェクトマネージャー','施工管理・設計監修','ゼネコン現場主任','官庁建築系'],
    role:['進行・タスク管理','メンバー間の調整','現実路線の案のまとめ','批評会準備の段取り'],
    good:['RFCE（ペンギン）— 調整×共感の現場最強','VFCP（クジラ）— 管理×構成の実務MAX'],
    bad:['VFIE（タコ）— 管理と破壊的行動の衝突'] },
  VSIE: { code:'VSIE', name:'イノベーションイカ', emoji:'🦑', color:'#29b6f6',
    tagline:'技術と遊び心で、新しい建築を生み出す。',
    desc:'デジタル技術への好奇心が旺盛なタイプ。GrasshopperやBIMをいち早く使いこなし、未来的な作品を作る。試行錯誤とCG表現が得意だが、使われ方の説明が後手になりがち。人の視点を学ぶと完成度が跳ね上がる。',
    strengths:['技術探究心','改善・改良の提案','新ツール導入','柔軟な問題解決'],
    weaknesses:['飽きっぽい','積み上げが苦手','時間が足りなくなりがち'],
    anecdotes:['BIMの新機能を誰より早く試す','レンダリング設定を研究','気づくとパラメトリック設計中','建材ショールームが好き'],
    career:['BIM開発・研究職','設備設計','ソフト・建材メーカー','デジタルファブリケーション'],
    role:['デジタル技術導入','新しい模型・表現','改良アイデアの種','モデリングスピード担当'],
    good:['VFIE（タコ）— 技術×表現の唯一無二','VSCE（サメ）— 実験を論理で固める'],
    bad:['RSCP（ワニ）— 挑戦心と現実主義の衝突'] },
  VSIP: { code:'VSIP', name:'マスターカメ', emoji:'🐢', color:'#66bb6a',
    tagline:'慎重かつ緻密に、確実に積み上げる堅実派。',
    desc:'丁寧さと正確性で信頼を得るタイプ。一つひとつ確実に積み上げ、最終段階で高い完成度に到達する。周りが焦っても動じないが、短期課題ではスピード不足が目立つことも。',
    strengths:['正確性と安定性','リスク回避','継続力','寸法検討の充実'],
    weaknesses:['決断が遅い','変化への対応が苦手','スピード負荷に弱い'],
    anecdotes:['初日から作業計画を立てる','仕上げに妙な安定感','細部修正が丁寧すぎる','グループで裏方を一人で進める'],
    career:['構造設計・施工管理','研究職','精度重視の設計職'],
    role:['詳細図面・寸法担当','模型の仕上げ','精度チェック','暴走を防ぐ見守り役'],
    good:['RSIP（シャチ）— 深い探索×丁寧の最強ペア','RFCP（フグ）— 誠実と丁寧のライン'],
    bad:['VFCE（イルカ）— 慎重さと感性の温度差'] },
  RFCE: { code:'RFCE', name:'コンテクストペンギン', emoji:'🐧', color:'#26a69a',
    tagline:'環境と人をつなぐ、温かなデザイナー。',
    desc:'共感力と文脈読解に優れたタイプ。敷地・地域・人の気持ちを自然に設計に反映する。批評会では「温かい」「使いやすい」と評価されやすい。刺激的なコンセプトへの踏み込みは控えめになりがち。',
    strengths:['高い共感力','公共性・環境性','調和感覚','対話から価値を見つける力'],
    weaknesses:['強い個性に押されがち','意見を言いにくい','スピード負荷が苦手'],
    anecdotes:['ワークショップや街歩きが好き','敷地分析が丁寧','「ぬくもり」がキーワードに','模型に小さな人形を置く'],
    career:['公共建築・都市計画','リフォーム・地域プロジェクト','住民参加型設計'],
    role:['敷地分析・ヒアリング','使い方・雰囲気の調整','プレゼンの読みやすさ向上','意見の調和役'],
    good:['VFCP（クジラ）— 共感×構成','RSCE（シロクマ）— 感性と論理の支え合い'],
    bad:['VSCE（サメ）— 共感と合理の衝突'] },
  RFCP: { code:'RFCP', name:'プランフグ', emoji:'🐡', color:'#ffa726',
    tagline:'安定と丁寧さで、空間を整える堅実設計者。',
    desc:'真面目で丁寧、約束を守るタイプ。派手なひらめきは少ないが、図面・資料・工程の基本を確実に押さえる。チームに一人いると全体が安定する。自分から大きな案を出すことは少ない。',
    strengths:['丁寧さと正確性','読みやすい図面','スケジュール遵守','聴き役として優秀'],
    weaknesses:['アイデア創出が苦手','主張が弱い','急な方針転換に弱い'],
    anecdotes:['図面がいつもきれい','「基本がきっちり」と褒められる','作業スペースが整理されている','徹夜は淡々と作業'],
    career:['演出設計・設計監修','ハウスメーカー・工務店','公共系の実務設計'],
    role:['図面整理・フォーマット','スケジュール表管理','実現性の検討','プレース作成'],
    good:['VFIP（フィッシュ）— 丁寧×美意識','VSIP（カメ）— 誠実×慎重の充実'],
    bad:['VSIE（イカ）— 丁寧さとスピードの摩擦'] },
  RFIE: { code:'RFIE', name:'フィールドラッコ', emoji:'🦦', color:'#ef5350',
    tagline:'手を動かしながら考える、柔軟な現場派。',
    desc:'「触れて理解する」実践型。現場や模型の前でスイッチが入り、職人さんにも好かれやすい。図面より模型の説得力が高く、理論的な資料づくりは後手になりがち。',
    strengths:['現場対応力','柔軟性と行動力','観察力','素材で本質を掴む'],
    weaknesses:['机上作業が続かない','論理資料が苦手','資料化が遅れがち'],
    anecdotes:['まず模型を作って理解する','現場見学が大好き','「模型はいい、図面を」と言われがち','工具の扱いが上手'],
    career:['施工管理・現場監督','リノベ・工務店','住宅の細部対応'],
    role:['模型制作','実現性の検証','素材・構法の検討','製作系タスク全般'],
    good:['VSIE（イカ）— 実験×技術の現場系','RFCE（ペンギン）— 現場感×生活感'],
    bad:['RSIP（シャチ）— 速度と深さのすれ違い'] },
  RFIP: { code:'RFIP', name:'クラフトカワウソ', emoji:'🪚', color:'#ff8a65',
    tagline:'職人技と誠実さで、形を磨く努力家。',
    desc:'コツコツ努力で成長するタイプ。模型や細部作業に強く、仕上げの美しさで感動を与える。細部に没頭して全体の進行が遅れがちだが、信頼度は非常に高い。',
    strengths:['職人気質のこだわり','継続力と誠実さ','仕上げ品質','信頼を得やすい'],
    weaknesses:['スピードが遅い','マルチタスクが苦手','自己主張が苦手'],
    anecdotes:['手を使う作業が好き','素材研究に時間をかける','「細部が綺麗」と褒められる','静かに長時間作業できる'],
    career:['演出設計・家具制作','工務店・木工所','プロダクト開発'],
    role:['模型仕上げ','細部の作り込み','図面調整','マテリアル選定'],
    good:['VFIP（フィッシュ）— 細部職人コンビ','RFCP（フグ）— 細仕事×丁寧'],
    bad:['VSIE（イカ）— 高速変更で作業が崩れる'] },
  RSCE: { code:'RSCE', name:'ラショナルシロクマ', emoji:'🐻‍❄️', color:'#1565c0',
    tagline:'ロジカルに世界を整理する、知恵者。',
    desc:'理論的に美しさを構築するタイプ。複雑な内容を図解で明確にし、「地味なのに洗練されている」と言われやすい。感性だけの議論には乗り切れないが、根拠ある美の追求は圧倒的。',
    strengths:['分析と構造化','根拠ある説明','ブレない判断','効率化・システム化'],
    weaknesses:['直感だけの作品に疑問','細かすぎて厳しいと誤解','感性だけの話題が苦手'],
    anecdotes:['構図に美しさと整理が両立','色数を極端に絞る','調査シートが異常に読みやすい','静かだが核心を突く発言'],
    career:['リノベ・用途変更設計','構造・機能改善','品質管理・技術統括'],
    role:['機能図・動線計画','分析・比較表作成','資料のビジュアル調整','最終成果の最適化'],
    good:['VSCE（サメ）— 論理×体系化','VFCP（クジラ）— ロジックに構成力'],
    bad:['VFIE（タコ）— ロジックと行動の言語差'] },
  RSCP: { code:'RSCP', name:'ビルダーワニ', emoji:'🐊', color:'#558b2f',
    tagline:'統率と実行力で、現場を制するリーダー。',
    desc:'現場力と管理力を兼ね備えた頼れるタイプ。「実際に建てる」を最初に考え、施工性の高い提案をする。批評会では「現実的」「説得力がある」と評価されやすい。表現の遊び心は苦手。',
    strengths:['リーダーシップ','現場統率力','調整能力','迅速な判断'],
    weaknesses:['表現型の案が苦手','衝突時に強めに出がち','詰めの粘りで疲弊'],
    anecdotes:['施工見学が異常に好き','図面の現実感が強い','自然とリーダー役','最終日の段取りが上手'],
    career:['施工管理・PM','ゼネコン現場主任','構造設計','官庁工事部門'],
    role:['現実性の整理','工程・タスク管理','批評会の実務的説明','納まり判断'],
    good:['VSCP（アザラシ）— 現場×調整の最強運営','RSCE（シロクマ）— 現実×論理'],
    bad:['VFCE（イルカ）— 世界観と現実の衝突'] },
  RSIE: { code:'RSIE', name:'テックガニ', emoji:'🦀', color:'#0288d1',
    tagline:'技術と発想を両立させる、研究肌の開拓者。',
    desc:'好奇心と技術力を併せ持つ理系寄りタイプ。環境・構造・実験系に強く、数値やグラフで説得力を高める。世界観の表現は後手になりがちだが、研究力とデザイン力の両輪で強くなる。',
    strengths:['研究力','技術開発の素質','改善・改良','深い思考と遊び心'],
    weaknesses:['飽きっぎ','ルーティンが苦手','感覚的な表現が後手'],
    anecdotes:['環境解析ソフトに強い','新素材の論文を読んでいる','性能比較グラフを資料に入れる','研究室の機器がお気に入り'],
    career:['研究開発・BIM','大学研究室','建材メーカー','構造・設備の高度解析'],
    role:['技術検証','環境シミュレーション','比較資料づくり','論理補強'],
    good:['VSIE（イカ）— 技術×技術の最先端','RSCE（シロクマ）— 技術×ロジック'],
    bad:['VFIE（タコ）— 精巧技術×突発感性'] },
  RSIP: { code:'RSIP', name:'アナライズシャチ', emoji:'🐳', color:'#7b1fa2',
    tagline:'理論で美を構築する、静かな分析家。',
    desc:'静かに深く考える探索型。図面の精度と合理性が高く、批評会では「よく考えている」と評価されやすい。自分のペースで詰めるため、チームでは目立たないが信頼は厚い。',
    strengths:['深い理論構築','静かな集中力','長期継続','論理的美学'],
    weaknesses:['口数が少なく誤解されがち','スピード勝負に弱い','最初から主張しにくい'],
    anecdotes:['作業中ほぼ無言','図面の細部が異常に整う','大人数の議論が苦手','「いつの間に仕上げた？」と言われる'],
    career:['構造・設備設計','研究・技術検証','品質管理'],
    role:['図面精度・整合チェック','論理的な設計説明','細部の美しさ追求'],
    good:['VSIP（カメ）— 深い探索×丁寧','RFCP（フグ）— 分析×丁寧'],
    bad:['RFIE（ラッコ）— 考え込み×即行動の速度差'] }
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

const $ = id => document.getElementById(id);

function gaEvent(name, params) {
  if (typeof gtag === 'function') gtag('event', name, params || {});
}

function buildIntroTypes() {
  const el = $('intro-types');
  if (!el) return;
  el.innerHTML = Object.values(TYPES).map(t =>
    `<span><em>${t.emoji}</em>${t.code}</span>`
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
  setMeta('og:title', t.emoji + ' ' + t.name + '（' + code + '）', true);
  setMeta('og:description', t.tagline, true);
  setMeta('og:url', resultUrl(code), true);
}

function resetPageMeta() {
  document.title = 'ARCHIme｜建築タイプ診断';
  setMeta('description', '20問・約5分。4つの設計軸から、あなたの建築家タイプ（全16種）を診断します。');
  setMeta('og:title', 'ARCHIme｜建築タイプ診断', true);
  setMeta('og:description', 'あなたはどんな建築家タイプ？ 無料・登録不要で診断できます。', true);
}

function compatHtml(items) {
  return items.map(g => {
    const p = g.split('—');
    const head = p[0].trim();
    const m = head.match(/^([A-Z]{4})/);
    const emoji = m && TYPES[m[1]] ? TYPES[m[1]].emoji : '';
    return `<div class="compat-item">${emoji ? `<span class="compat-emoji">${emoji}</span>` : ''}<div><b>${head}</b>${p[1] ? ' ' + p[1].trim() : ''}</div></div>`;
  }).join('');
}

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  $('view-' + name).classList.add('active');
  document.body.classList.toggle('result-mode', name === 'result');
  window.scrollTo({ top: 0, behavior: 'instant' in document.body.style ? 'instant' : 'auto' });
}

function openBoardSheet() {
  const o = $('board-overlay');
  o.classList.add('is-visible');
  requestAnimationFrame(() => o.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
  gaEvent('board_sheet_open');
}

function closeBoardSheet(e) {
  if (e && e.target !== $('board-overlay')) return;
  const o = $('board-overlay');
  o.classList.remove('is-open');
  setTimeout(() => {
    o.classList.remove('is-visible');
    document.body.style.overflow = '';
  }, 350);
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
  answers = new Array(QUESTIONS.length).fill(null);
  buildQuiz();
  showView('quiz');
  highlightCurrent();
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
        <span class="q-axis">${ui.sym} ${ui.label}</span>
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
  $('load-tease').textContent = t.emoji + ' ' + t.name + ' …かもしれません';
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
  $('r-name').textContent = t.name;
  $('r-tagline').textContent = t.tagline;
  $('r-emoji').textContent = t.emoji;

  const illust = $('r-illust');
  illust.alt = t.name;
  illust.hidden = true;
  illust.onload = () => { illust.hidden = false; };
  illust.onerror = () => { illust.hidden = true; };
  illust.src = 'assets/characters/' + code + '.png';

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
  $('r-good').innerHTML = compatHtml(t.good);
  $('r-bad').innerHTML = compatHtml(t.bad);

  $('r-all-types').innerHTML = Object.values(TYPES).map(x =>
    `<div class="type-chip${x.code === code ? ' you' : ''}"><em>${x.emoji}</em>${x.name}</div>`
  ).join('');

  closeBoardSheet();
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
}

function shareText(t) {
  return `【ARCHIme 建築タイプ診断】\n私は ${t.emoji} ${t.name}（${t.code}）でした！\n${t.tagline}\nあなたも診断してみて →\n#ARCHIme #建築タイプ診断`;
}

function setupShare(t, code) {
  const url = resultUrl(code);
  $('sh-x').onclick = () => {
    gaEvent('share', { method: 'x' });
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText(t)) + '&url=' + encodeURIComponent(url), '_blank', 'noopener');
  };
  $('sh-line').onclick = () => {
    gaEvent('share', { method: 'line' });
    window.open('https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(shareText(t)), '_blank', 'noopener');
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

function drawGridPaper(ctx, W, H) {
  ctx.fillStyle = '#f0ebe0';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(168, 72, 50, .08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 24) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 24) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function saveShareImage(t) {
  const cv = $('sr-canvas'), ctx = cv.getContext('2d'), W = 1080, H = 1350;
  const hex = t.color.replace('#', '');
  const tr = parseInt(hex.substr(0, 2), 16);
  const tg = parseInt(hex.substr(2, 2), 16);
  const tb = parseInt(hex.substr(4, 2), 16);

  drawGridPaper(ctx, W, H);

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
  ctx.font = '240px serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#2b2b2b';
  ctx.fillText(t.emoji, 0, 80);
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
  closeBoardSheet();
  answers = new Array(QUESTIONS.length).fill(null);
  $('quiz-fab').classList.remove('show');
  history.replaceState(null, '', location.pathname);
  resetPageMeta();
  showView('intro');
}

buildIntroTypes();

(function boot() {
  const q = new URLSearchParams(location.search);
  const code = q.get('r') || q.get('preview');
  if (code && TYPES[code]) showResult(code);
})();
