# STYLE-001 — Component Board v2

**目的**：把抽象的參考風格轉換成可繪製、可組裝、可替換內容的 UI 元件。網站內 `src/components/style001/Style001Board.tsx` 與 `src/app/style001.css` 已提供實際可互動的 HTML／SVG／CSS 畫面。

**預設 Demo**：PL-300 Power BI 學習計畫。這是全新產品主題，原釜山行程內容不應出現在產出的變體裡。

| ID | 元件 | 結構／Anatomy | 元件 Props 建議 | 互動與邊界狀態 | 內容替換範例 |
|---|---|---|---|---|---|
| C01 | IllustratedHero | 插畫場景、eyebrow、主標、副標、可選小徽章 | `title`, `subtitle`, `scene`, `badge` | RWD、中文多行、插畫失效回退 | 學習計畫封面 |
| C02 | SectionNav | 橫列 tabs、selected pill、底部分隔線 | `items`, `activeId`, `onSelect` | selected, hover, focus, overflow | 總覽、每週計畫、學習素材 |
| C03 | InfoTicketCard | 有色 header、雙欄 value、虛線／箭頭、註解 | `header`, `left`, `right`, `note`, `accent` | 長數值、文字換行、通知態 | 本週目標 vs 目前進度 |
| C04 | DayStepper | 一條水平線、節點、標籤、selected | `steps`, `activeIndex`, `onChange` | hover, focus, selected, disabled、窄螢幕 | Week 1–4 |
| C05 | SummaryCard | 小插畫／icon、階段名、標題、說明 | `eyebrow`, `title`, `description`, `theme`, `icon` | 標題超過兩行、色彩變化 | Week 2：DAX 與資料模型 |
| C06 | ActivityTimeline | 左時間、圓點與虛線、右活動 | `events: Array<{id,time,kind,title}>` | 無時間、長描述、多狀態 | 每日讀書／練習活動 |
| C07 | ActivityPill | 單行或換行的有框圓角事項 | `title`, `onClick?`, `status?` | focus、可點擊／不可點擊、長文字 | 完成十題測驗 |
| C08 | CategoryPill | 膠囊背景、文字，可選 icon | `kind`, `label`, `icon?` | 4 類、長字、沒有 icon | 影片／練習／重點 |
| C09 | CountdownBadge | 短標籤、數字、色塊、粗框 | `label`, `value`, `tone` | 不同長度、完成狀態 | 距離模擬考 21 天 |

## 組合方式

`IllustratedHero → SectionNav → InfoTicketCard → DayStepper → SummaryCard → ActivityTimeline`，在 timeline item 內搭配 `ActivityPill` 與 `CategoryPill`，狀態摘要使用 `CountdownBadge`。

**不是固定模板：** 此順序是目前示例的組合方式。跨主題轉譯時要以資訊語意為優先，而非強迫所有新產品都出現相同九個元件。

## 設計規格與信心

- **直接可觀察（高）**：低飽和粉彩、深灰描邊、主要卡片大圓角、章節 tabs、日期 stepper、時間軸、票券資訊卡。
- **視覺估算（中）**：卡片約 18–28px 圓角、框線約 2–3px、7 種 HEX 色碼。這些不是原始 CSS。
- **合理推論（中）**：tabs／steps 很可能可點擊並切換或定位到內容；網站應具備清楚的狀態。
- **不可證實（未知）**：實際 font-family、animation 時序、sticky scroll、圖片載入策略、完整桌面版布局、原始程式架構。

## Do / Don't

- Do：保持清楚圖文層級；使用相同描邊粗細與統一圓角；新主題配合新圖示；設計可用的 focus、overflow、reduced-motion。
- Don't：不要把原始纜車與釜山路線直接搬到學習產品；不要把示意尺寸當原作精準參數；不要只換旅遊標題但保留旅遊資料。

## 前端檔案對照

- 完整範例資料：`src/data/style001-variants.ts`
- 元件板與即時可操作範例：`src/components/style001/Style001Board.tsx`
- Style isolation 與排版：`src/app/style001.css`
- 收藏庫整合：`src/app/page.tsx`
- AI Master Prompt：`styles/STYLE-001/MASTER_AI_PROMPT.md`
