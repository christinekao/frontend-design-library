export type PreviewVariant = {
  id: "study" | "onboarding" | "wellness";
  label: string;
  subject: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  counter: string;
  tabs: string[];
  ticket: { header: string; code: string; leftLabel: string; leftValue: string; rightLabel: string; rightValue: string; footer: string };
  days: string[];
  selected: number;
  summary: string;
  summaryMeta: string;
  activities: { time: string; label: string; kind: string; type: "card" | "inline"; color?: "coral" | "yellow" | "sky" | "sage" }[];
  pills: { label: string; color: "coral" | "yellow" | "sky" | "sage" }[];
};

export const PREVIEW_VARIANTS: PreviewVariant[] = [
  {
    id: "study", label: "學習計畫", subject: "PL-300 證照準備", eyebrow: "STUDY ROADMAP · 4 WEEKS",
    title: "30 天 Power BI 挑戰", subtitle: "從資料整理到模型與視覺化，拆成每天做得到的小任務。", counter: "距離模擬考 21 天",
    tabs: ["總覽", "每週計畫", "學習素材"],
    ticket: { header: "這週學習安排", code: "W02", leftLabel: "目前進度", leftValue: "第 2 週", rightLabel: "本週目標", rightValue: "資料模型", footer: "每日 45 分鐘 · 週末安排實作練習" },
    days: ["W1", "W2", "W3", "W4"], selected: 1, summary: "模型關聯＋DAX 基礎", summaryMeta: "Week 2 · 專注關聯、星型模型與度量值",
    activities: [
      { time: "09:00", label: "回顧昨天的關聯練習", kind: "複習", type: "card", color: "coral" },
      { time: "10:30", label: "建立星型模型", kind: "實作", type: "inline", color: "sage" },
      { time: "13:00", label: "練習 CALCULATE 與篩選脈絡", kind: "練習", type: "card", color: "yellow" },
      { time: "15:30", label: "完成 10 題模擬題", kind: "測驗", type: "card", color: "sky" }
    ],
    pills: [{ label: "練習", color: "yellow" }, { label: "影片", color: "sky" }, { label: "重點", color: "sage" }]
  },
  {
    id: "onboarding", label: "新人到職", subject: "新人成長旅程", eyebrow: "WELCOME JOURNEY · FIRST MONTH",
    title: "新人的第一個月", subtitle: "把繁複的到職事項整理成更親切的起步指南。", counter: "第 8 個工作天",
    tabs: ["開始", "成長路徑", "準備清單"],
    ticket: { header: "本週進度卡", code: "WK02", leftLabel: "目前階段", leftValue: "熟悉團隊", rightLabel: "下一目標", rightValue: "首次任務", footer: "聯絡導師 · 完成必要訓練 · 確認系統權限" },
    days: ["W1", "W2", "W3", "W4"], selected: 1, summary: "認識團隊＋完成首個任務", summaryMeta: "Week 2 · 和導師一起建立工作節奏",
    activities: [
      { time: "09:30", label: "與導師交流本週目標", kind: "會議", type: "card", color: "coral" },
      { time: "10:30", label: "確認工具與帳號權限", kind: "系統", type: "inline", color: "sage" },
      { time: "13:30", label: "完成第一個引導任務", kind: "任務", type: "card", color: "yellow" },
      { time: "16:00", label: "分享遇到的問題", kind: "回饋", type: "card", color: "sky" }
    ],
    pills: [{ label: "會議", color: "coral" }, { label: "任務", color: "yellow" }, { label: "完成", color: "sage" }]
  },
  {
    id: "wellness", label: "生活習慣", subject: "自我照顧計畫", eyebrow: "SMALL STEPS · DAILY RESET",
    title: "七日生活小練習", subtitle: "一天一個小目標，用溫柔的節奏養成日常。", counter: "已持續 3 天",
    tabs: ["今日", "我的進度", "準備事項"],
    ticket: { header: "今日習慣清單", code: "D03", leftLabel: "今日完成", leftValue: "2 / 4", rightLabel: "下個目標", rightValue: "伸展 10 分", footer: "完成一件小事就值得記錄" },
    days: ["MON", "TUE", "WED", "THU", "FRI"], selected: 2, summary: "休息一下，補充能量", summaryMeta: "Day 3 · 調整步調，照顧自己",
    activities: [
      { time: "08:30", label: "喝一杯水，開始今天", kind: "補水", type: "card", color: "sky" },
      { time: "12:00", label: "午間散步 10 分鐘", kind: "散步", type: "inline", color: "sage" },
      { time: "17:00", label: "伸展肩頸、放鬆身體", kind: "放鬆", type: "card", color: "yellow" },
      { time: "21:30", label: "寫下今天的一件好事", kind: "回顧", type: "card", color: "coral" }
    ],
    pills: [{ label: "補水", color: "sky" }, { label: "完成", color: "sage" }, { label: "休息", color: "yellow" }]
  }
];

export const PHASE_VIEWS: Record<PreviewVariant["id"], {summary: string; meta: string; activities: PreviewVariant["activities"]}[]> = {
  study: [
    {summary:"整理資料，建立學習基礎",meta:"Week 1 · Power Query 與資料準備",activities:[{time:"09:00",label:"匯入練習資料",kind:"資料",type:"card",color:"sky"},{time:"11:00",label:"處理資料型別與缺漏值",kind:"實作",type:"inline",color:"sage"},{time:"15:00",label:"完成 Power Query 小練習",kind:"練習",type:"card",color:"yellow"}]},
    {summary:"模型關聯＋DAX 基礎",meta:"Week 2 · 星型模型、度量值",activities:[{time:"09:00",label:"回顧昨天的關聯練習",kind:"複習",type:"card",color:"coral"},{time:"10:30",label:"建立星型模型",kind:"實作",type:"inline",color:"sage"},{time:"13:00",label:"練習 CALCULATE 與篩選脈絡",kind:"練習",type:"card",color:"yellow"},{time:"15:30",label:"完成 10 題模擬題",kind:"測驗",type:"card",color:"sky"}]},
    {summary:"打造清楚的視覺化報表",meta:"Week 3 · 圖表、互動與版面",activities:[{time:"09:00",label:"比較圖表類型",kind:"理解",type:"card",color:"sky"},{time:"11:30",label:"設計書籤與互動",kind:"實作",type:"inline",color:"sage"},{time:"15:00",label:"重構一頁報表",kind:"練習",type:"card",color:"yellow"}]},
    {summary:"模擬考與錯題複盤",meta:"Week 4 · 計時練習及補強",activities:[{time:"09:00",label:"完成一回模擬題",kind:"測驗",type:"card",color:"yellow"},{time:"13:00",label:"整理錯題原因",kind:"複盤",type:"inline",color:"sage"},{time:"16:00",label:"回顧薄弱章節",kind:"調整",type:"card",color:"coral"}]}
  ],
  onboarding: [
    {summary:"到職準備與工具設定",meta:"Week 1 · 建立工作環境",activities:[{time:"09:00",label:"完成第一天報到",kind:"報到",type:"card",color:"sky"},{time:"11:00",label:"設定主要工作帳號",kind:"系統",type:"inline",color:"sage"},{time:"15:00",label:"認識導師與團隊",kind:"交流",type:"card",color:"coral"}]},
    {summary:"認識團隊＋完成首個任務",meta:"Week 2 · 跟導師建立工作節奏",activities:[{time:"09:30",label:"與導師交流本週目標",kind:"會議",type:"card",color:"coral"},{time:"10:30",label:"確認工具與帳號權限",kind:"系統",type:"inline",color:"sage"},{time:"13:30",label:"完成第一個引導任務",kind:"任務",type:"card",color:"yellow"},{time:"16:00",label:"分享遇到的問題",kind:"回饋",type:"card",color:"sky"}]},
    {summary:"參與合作並交付成果",meta:"Week 3 · 與團隊共同完成小任務",activities:[{time:"10:00",label:"確認任務範圍",kind:"討論",type:"card",color:"coral"},{time:"13:00",label:"執行並記錄進度",kind:"實作",type:"inline",color:"sage"},{time:"16:30",label:"分享小成果",kind:"分享",type:"card",color:"yellow"}]},
    {summary:"整理學習與下一步",meta:"Week 4 · 回顧首月成長",activities:[{time:"09:30",label:"整理第一個月筆記",kind:"回顧",type:"card",color:"sky"},{time:"14:00",label:"與主管同步期待",kind:"會議",type:"inline",color:"coral"},{time:"16:00",label:"列出下月目標",kind:"規劃",type:"card",color:"sage"}]}
  ],
  wellness: [
    {summary:"開始照顧自己",meta:"Day 1 · 先從小改變開始",activities:[{time:"08:00",label:"喝一杯溫水",kind:"補水",type:"card",color:"sky"},{time:"12:00",label:"出門走一段路",kind:"散步",type:"inline",color:"sage"}]},
    {summary:"讓身體動一動",meta:"Day 2 · 安排短暫伸展",activities:[{time:"09:00",label:"五分鐘伸展",kind:"動一動",type:"card",color:"yellow"},{time:"18:00",label:"飯後散步",kind:"散步",type:"inline",color:"sage"}]},
    {summary:"休息一下，補充能量",meta:"Day 3 · 調整步調",activities:[{time:"08:30",label:"喝一杯水，開始今天",kind:"補水",type:"card",color:"sky"},{time:"12:00",label:"午間散步 10 分鐘",kind:"散步",type:"inline",color:"sage"},{time:"17:00",label:"伸展肩頸、放鬆身體",kind:"放鬆",type:"card",color:"yellow"},{time:"21:30",label:"寫下今天的一件好事",kind:"回顧",type:"card",color:"coral"}]},
    {summary:"安排專心與休息",meta:"Day 4 · 降低干擾",activities:[{time:"09:00",label:"訂下一個專心時段",kind:"規劃",type:"card",color:"yellow"},{time:"16:00",label:"離開螢幕走動一下",kind:"休息",type:"inline",color:"sage"}]},
    {summary:"完成一週小回顧",meta:"Day 5 · 記錄有用的方法",activities:[{time:"10:00",label:"回顧今天的感受",kind:"整理",type:"card",color:"sky"},{time:"20:00",label:"選一個想持續的習慣",kind:"回顧",type:"inline",color:"coral"}]}
  ]
};

export const STYLE001_COMPONENTS = [
  { id: "C01", name: "IllustratedHero", title: "主題插畫區", anatomy: "主題場景／標題／副標／可選倒數", states: "手機直式、桌面橫式；不依賴圖片亦可閱讀", flexible: "替換場景、人物、物件、標題", rule: "插畫是資訊導航的背景，不要遮蔽標題；使用扁平填色與統一描邊" },
  { id: "C02", name: "SectionNav", title: "章節導覽", anatomy: "標誌／水平標籤／選中狀態", states: "預設、選中、鍵盤焦點、溢位橫向捲動", flexible: "欄位名稱與數量", rule: "以淡彩膠囊區分選中狀態；點擊應切換內容或捲到對應章節" },
  { id: "C03", name: "InfoTicketCard", title: "資訊票券", anatomy: "頂部資訊條／主數字／中間虛線／補充說明", states: "一般、重要通知、窄螢幕", flexible: "航班可變成學習目標、任務進度、活動報到", rule: "保留左右對照、數字層級與票券輪廓；不一定要顯示機場" },
  { id: "C04", name: "DayStepper", title: "水平階段切換器", anatomy: "連續基線／空心節點／選中節點／下方標籤", states: "預設、選中、hover/focus、橫向溢位", flexible: "日期、週別、任務階段", rule: "必須保留可以感知的選中狀態與標籤，不只靠顏色" },
  { id: "C05", name: "SummaryCard", title: "階段摘要卡", anatomy: "左方插圖槽／標題群組／次要描述", states: "各種背景色、單行／多行標題", flexible: "每日行程、課程模組、每週任務", rule: "插畫區小而清楚，主標題仍是焦點" },
  { id: "C06", name: "ActivityTimeline", title: "直式內容時間軸", anatomy: "時間／節點與虛線／事件卡片", states: "有時間、無時間、活動長文字、手機版", flexible: "日程、學習任務、成長里程碑", rule: "靠左對齊，節點與內容一一對應，資訊密度可調" },
  { id: "C07", name: "ActivityPill", title: "單筆活動卡", anatomy: "粗描邊／白或淡彩背景／標題", states: "一般、重點、長標題、可點擊", flexible: "活動、任務、工作項目", rule: "單一事項一張卡；文字應優先保持可讀" },
  { id: "C08", name: "CategoryPill", title: "分類狀態膠囊", anatomy: "可選小圖示／分類文字／背景色", states: "不同類別、長文字、無圖示", flexible: "交通、學習形式、狀態、類別", rule: "同一語意使用固定色，並保留文字說明" },
  { id: "C09", name: "CountdownBadge", title: "輔助提示徽章", anatomy: "暖黃色膠囊／短標籤／數字", states: "倒數、完成數、當前階段", flexible: "倒數日、學習進度、習慣連續天數", rule: "只強調一個輕量數值，不應成為主要資訊容器" }
] as const;

export function makeStyle001Prompt(subject: string, context = "", variant?: PreviewVariant): string {
  const scenario = variant || PREVIEW_VARIANTS[0];
  const topic = subject.trim() || scenario.subject;
  const extra = context.trim() || `用「${scenario.label}」作為產品情境，設計一個全新資料內容的功能頁。`;
  return `# Design Archive / STYLE-001 — AI Frontend Generation Brief\n\n角色：你是產品設計師與資深前端工程師。這是「風格轉譯」任務，不是重製或臨摹參考原作。\n\n## 新主題（必須替換原內容）\n主題：${topic}\n產品與內容需求：${extra}\n依此主題自行擬定合理、有意義的新資訊架構、文案及示例資料。不要使用原圖的釜山、纜車、機場、日期、作者字樣或來源圖片，除非新主題確實需要。\n\n## 觀察到的風格規則（截圖依據，非官方原始碼）\n- 奶油白主背景、深灰而非純黑的粗描邊、低飽和粉彩（珊瑚粉／天空藍／鼠尾草綠／奶油黃／淡紫）。\n- 卡片與膠囊標籤大圓角、描邊約 2–3px 作為起始值；細節需依實際尺寸調整。\n- 手繪感扁平插畫、清楚的圖文比例、適度留白、資訊層級明確。\n- 手機優先、長頁面分節；章節導覽、水平進度節點、垂直點線時間軸。\n- 典型資訊卡有淡彩標頭，重要數值放大；分類標籤用色與文字一起區別。\n\n## 可轉譯元件（只挑選符合新主題需求的元件）\nC01 IllustratedHero｜主題插畫與標題\nC02 SectionNav｜章節標籤導覽\nC03 InfoTicketCard｜雙欄數據／票券型資訊卡\nC04 DayStepper｜日期／週別／階段切換\nC05 SummaryCard｜當日／當週摘要\nC06 ActivityTimeline｜時間點＋虛線＋事件\nC07 ActivityPill｜獨立事件卡\nC08 CategoryPill｜小型狀態／類型標籤\nC09 CountdownBadge｜倒數／進度徽章\n\n## 內容轉譯示例（不要直接照抄內容）\n旅遊航班卡 → 新主題的里程碑／雙欄摘要卡\n日期步進器 → 階段選擇器\n旅遊每日摘要 → 工作／學習／健康主題摘要\n交通標籤 → 任務類別／資源狀態\n行程時間軸 → 新主題的工作流或活動序列\n\n## 風格 Token（視覺推估，請集中管理，不應當成原站精確數值）\nbackground #FBF9F1; ink #363233; coral #E7A094; sky #A6CCDF; sage #B5D2A5; butter #F8D782; lilac #EDE0ED。\n\n## Do / Don't\nDO：確保新內容是真正重新設計、結構與視覺之間有功能關聯；同一套線條粗細與 icon 語言；小螢幕可用、可讀、鍵盤可操作。\nDON'T：不要複製原圖文案／插畫／標誌；不要套用霓虹漸層、玻璃擬態、強烈 3D 陰影；不要將所有資料硬塞進時間軸；不要憑截圖宣稱確定了字體、動畫或 RWD 行為。\n\n## 實作規格\n1. 先列出新內容與原型的元件 mapping，說明保留／捨棄的理由。\n2. 提供設計 token、元件拆分、responsive breakpoints 與 interaction states。\n3. 使用 React + TypeScript + CSS/Tailwind 產出可互動頁面；元件可重用，文字不寫死在排版裡。\n4. 實作至少一個真正可切換內容的互動（Tab 或 Stepper）、可見 focus、reduced-motion、語意標記。\n5. 先檢視整體與手機版，避免中文斷字與畫面溢出。\n6. 最終提交自我檢查：風格一致、內容已換、不是原作像素複製、無來源冒用、可操作。\n\n## 來源與信心\n參考：使用者提供的 Threads 截圖。圖片中可辨識字樣 madori452.github.io，尚未驗證為來源或公開可用頁面。所有色碼、間距及互動行為皆為設計分析或合理推論，非原網站原始碼。\n`;
}
