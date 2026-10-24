import { makeStyle001Prompt } from "./style001-variants";

export type PaletteColor = { name: string; hex: string };
export type UiComponent = { name: string; summary: string; useCase: string };
export type StyleEntry = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  sourceVerified: boolean;
  tags: string[];
  palette: PaletteColor[];
  components: UiComponent[];
  features: string[];
  applications: string[];
  images: string[];
  notes: string;
  favoriteElements: string[];
  createdAt: string;
  origin: "curated" | "local";
};

export const exampleStyle: StyleEntry = {
  id: "STYLE-001",
  title: "Pastel Cartoon Travel Planner",
  subtitle: "一套帶有手繪插畫語彙的互動旅遊行程介面",
  category: "Playful",
  description: "以淡彩卡片、深色圓角描邊和清晰時間軸，把密集的旅遊資訊整理成容易瀏覽的互動畫面。",
  sourceName: "使用者提供的 Threads 參考截圖 · 釜山 5 天 4 夜",
  sourceUrl: "https://madori452.github.io",
  sourceVerified: false,
  tags: ["Pastel", "Playful", "Illustrated", "Timeline", "Travel", "Mobile-first"],
  palette: [
    { name: "Cream", hex: "#FBF9F1" },
    { name: "Outline", hex: "#363233" },
    { name: "Coral", hex: "#E7A094" },
    { name: "Sky", hex: "#A6CCDF" },
    { name: "Sage", hex: "#B5D2A5" },
    { name: "Butter", hex: "#F8D782" },
    { name: "Lilac", hex: "#EDE0ED" }
  ],
  components: [
    { name: "IllustratedHero", summary: "主題插畫、標題和倒數膠囊", useCase: "旅遊首頁／活動封面" },
    { name: "SectionNav", summary: "頁面章節的膠囊式導覽", useCase: "長頁面定位" },
    { name: "FlightTicketCard", summary: "行程票券資訊卡，頂部有柔和色條", useCase: "交通／預訂摘要" },
    { name: "DayStepper", summary: "日期線段和節點，具當前日狀態", useCase: "多日期導覽／進度" },
    { name: "DaySummaryCard", summary: "當日插圖、標題與住宿摘要", useCase: "行程分組" },
    { name: "ActivityTimeline", summary: "時間、虛線、節點與行程卡片", useCase: "行程／流程／活動排程" },
    { name: "ActivityPill", summary: "單筆活動的有框圓角標題卡", useCase: "任務／活動項目" },
    { name: "CategoryPill", summary: "圖示搭配粉彩膠囊分類標籤", useCase: "交通／狀態／資源分類" },
    { name: "CountdownBadge", summary: "短文字＋輕量數字的暖色徽章", useCase: "進度提示／倒數" }
  ],
  features: ["暖奶油白底色", "低飽和粉彩區分資訊", "深灰粗描邊", "大圓角卡片", "扁平手繪插畫", "水平日期切換", "垂直虛線時間軸"],
  applications: ["Travel Planner", "Event Schedule", "Habit Tracker", "Personal Dashboard"],
  // Reference captures are private user material: add them locally in the browser.
  // Do not commit third-party screenshots to a public GitHub Pages repository.
  images: [],
  notes: "來源為使用者提供的 Threads 畫面。截圖上可見 madori452.github.io 字樣，但未驗證網站是否可存取、是否屬於原作者、亦未確認內容授權。原作者保留著作權。Threads 的黑色介面與分享操作不是收藏風格。截圖中另有關於繁中字型、過長 Google Maps 網址、手機捲動效能的實作筆記。",
  favoriteElements: [],
  createdAt: "2026-10-24",
  origin: "curated"
};

export const curatedStyles: StyleEntry[] = [exampleStyle];

export function getStylePrompt(style: StyleEntry): string {
  if (style.id === "STYLE-001") return makeStyle001Prompt("請先依我的專案需求決定全新主題", "依照正在開發的實際產品需求，轉譯這套設計語言；不要沿用旅遊原文案。");
  const colors = style.palette.map(c => `${c.name}: ${c.hex}`).join(", ");
  const components = style.components.map(c => `${c.name} (${c.summary})`).join("、");
  return `你是資深 Frontend Engineer 與 UI Designer。請參考我的 Design Archive 收藏 ${style.id}「${style.title}」，替目前專案設計合適的 UI。\n\n這是參考風格，不要求逐像素複製其他作者的作品，也不代表我已確認喜歡其中所有細節。\n\n特徵：${style.features.join("、") || style.description}\n建議色彩（若來自截圖則為推估）：${colors || "未提供"}\n可借用的 UI Pattern：${components || "未提供"}\n適合情境：${style.applications.join("、") || "請依需求判斷"}\n來源：${style.sourceName}（${style.sourceUrl || "未提供"}）\n\n請依專案目的挑選元件，重視資訊層級、響應式設計、可及性和效能。先提出頁面區塊與重用元件，再實作。不要擅自把整個專案都改為這種風格。`;
}
