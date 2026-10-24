# STYLE-001 — Pastel Cartoon Travel Planner

> 前端設計靈感庫 / 獨立收藏 / 2026-10-24
>
> 狀態：整體風格候選。使用者提供截圖，**尚未指明最喜歡的個別元素**；不得當作所有專案的預設設計規範。

## 來源

- 類型：手機版互動旅遊行程網站（Threads 貼文擷取畫面）
- 主題：釜山 5 天 4 夜
- 截圖中可辨識網址：`https://madori452.github.io`（僅從截圖辨識，未驗證網站是否仍可用）
- 注意：截圖中 Threads 的黑色背景、互動／分享列與 App 導覽**不是**收藏網站的設計。

## 標籤

`Pastel` `Playful` `Cartoon Outline` `Illustrated UI` `Travel Planner` `Timeline` `Mobile-first` `Soft Color` `Rounded Cards`

## 視覺語言

| 項目 | 觀察到的特徵 |
|---|---|
| 背景 | 暖奶油白、近乎紙張質感，整頁一致 |
| 配色 | 柔和低飽和色：珊瑚粉、天空藍、鼠尾草綠、奶油黃、淺紫 |
| 描邊 | 深灰／近黑色較粗描邊，幾乎所有插畫／卡片都一致 |
| 形狀 | 大圓角卡片、膠囊標籤、圓形時間軸節點 |
| 插畫 | 扁平 2D，手繪感纜車、旅行箱、海浪、太陽、地標等 |
| 文字 | 簡潔排版，標題、時間、描述有清楚字級差；偏圓潤但繁中字型須核實 |
| 資訊密度 | 資訊多，但透過顏色、留白、卡片分組保持閱讀性 |

## 元件收藏

| Component | 描述 | 適合場景 | 參考圖 |
|---|---|---|---|
| `IllustratedHero` | 海景＋纜車插畫、旅遊標題、日期、倒數膠囊 | 專案首頁、旅遊首頁 | [hero_mobile](reference_images/hero_mobile.jpg) |
| `SectionNav` | 頂部航班／行程／準備標籤，選中項為粉色膠囊 | 單頁多章節瀏覽 | [hero_alternate](reference_images/hero_alternate.jpg) |
| `FlightTicketCard` | 色塊卡片頂部與粗框，左右時間／機場資訊 | 交通、預約、票券摘要 | [flight_cards](reference_images/flight_cards.jpg) |
| `DayStepper` | 橫向線條＋圓點＋日期，選取時圖示和日期色塊移動 | 多日行程、進度導覽 | [day_selector](reference_images/day_selector.jpg) |
| `DaySummaryCard` | 淺色卡片、插畫縮圖、Day N、小標題與住宿描述 | 每日摘要、活動分類 | [day_4_timeline](reference_images/day_4_timeline.jpg) |
| `ActivityTimeline` | 左側時刻＋垂直虛線圓點、右側活動卡片 | 行程、流程、活動排程 | [day_3_timeline](reference_images/day_3_timeline.jpg) |
| `TransportPill` | 交通圖示＋帶顏色的小膠囊，例如地鐵／計程車／飛機 | 活動屬性、類別 | [day_5_timeline](reference_images/day_5_timeline.jpg) |

## 近似色彩 Token（視覺推估，非原始網站 CSS）

```css
:root {
  --style-001-bg: #FBF9F1;
  --style-001-ink: #363233;
  --style-001-pink: #E7A094;
  --style-001-blue: #A6CCDF;
  --style-001-green: #B5D2A5;
  --style-001-yellow: #F8D782;
  --style-001-lilac: #EDE0ED;
  --style-001-border: 3px solid var(--style-001-ink);
  --style-001-card-radius: 24px;
}
```

## 可實作的 React Component 分解

```
TravelPlannerPage
├── TopNavigation
├── IllustratedHero
├── CountdownBadge
├── FlightSection
│   └── FlightTicketCard
├── DailyItinerarySection
│   ├── DayStepper
│   ├── DaySummaryCard
│   └── ActivityTimeline
│       ├── ActivityCard
│       └── TransportPill
└── PreparationSection
```

## UX 觀察／實作注意

- 行程切換應維持一致頁面結構，避免日期變換造成跳動。
- 行動版如果實作捲動定位／高亮導覽，避免在每個 scroll event 中對每個元素反覆做昂貴計算。優先考慮 `IntersectionObserver`、節流與減少重繪。
- Google Maps 分享網址可能很長；應妥善包裝連結、檢查手機深層連結的開啟行為。
- 圓潤中文字型需確保真的涵蓋**繁體中文**字元，並確認授權、fallback 與效能。
- 上述後三點來自截圖中的作者實作心得，並非本站程式碼已被驗證。

## 參考圖索引

- [主視覺](reference_images/hero_mobile.jpg)
- [航班卡片](reference_images/flight_cards.jpg)
- [每日日期切換](reference_images/day_selector.jpg)
- [第 3 天時間軸](reference_images/day_3_timeline.jpg)
- [第 4 天時間軸](reference_images/day_4_timeline.jpg)
- [第 5 天時間軸](reference_images/day_5_timeline.jpg)
- [滾動後的畫面](reference_images/day_5_scrolled.jpg)
- [作者心得截圖](reference_images/author_implementation_notes.jpg)

## 如何使用這筆收藏

- 做旅遊規劃 App、生活規劃、活動 Timeline 時，可以選取其中的特定 Pattern。
- 其他專案也可以只借用粉彩卡片、膠囊標籤或插畫元素。
- **不要整套強制套用到所有產品**；先依目標使用者與產品情境選擇。
- 這組為視覺參考，不等於授權直接複製原網站的原始圖稿或程式。
