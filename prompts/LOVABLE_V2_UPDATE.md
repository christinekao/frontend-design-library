# Lovable — Design Archive v2 Update Request

> 貼給目前已建立的 Design Archive Lovable 專案使用，**不是建立新專案**。目前 Lovable 工作區額度不足，請先恢復可用額度。此文件是手動遷移指令，不代表線上網站已更新。

請修改現有的 Design Archive 網站（不要另建專案，不要公開發佈）。使用繁體中文。此網站的核心不是記錄一種可愛風格，而是收藏多種設計參考，萃取可重用元件，再把抽象視覺規則轉譯到**新內容**。

## 介面架構

- 收藏首頁：保留搜尋、分類、卡片、localStorage 收藏與 JSON 匯入／匯出；每筆 STYLE 都獨立，不預設全站使用 STYLE-001。
- STYLE-001 詳情新增三個層級的頁籤：`01 原始參考＋分析`、`02 元件展示板`、`03 AI 變體實驗室`。
- 原始參考：原始截圖為主，保留使用者提供的九張參考（不以示意圖代替），並將畫面可見／推論／無法確認分開。色彩為視覺推估；截圖可見網址 `madori452.github.io`，未驗證。
- 元件展示板：使用 React／HTML／SVG／CSS **實際畫出 9 個元件**，不是純文字列表。元件：IllustratedHero、SectionNav、InfoTicketCard、DayStepper、SummaryCard、ActivityTimeline、ActivityPill、CategoryPill、CountdownBadge。點擊元件可查看 anatomy、props、狀態、可替換資料和 Do／Don't。元件預設內容應使用新的 PL-300 學習情境而非釜山旅遊。
- 變體工作室：至少有三個**預先實作且能點擊切換**的內容場景：PL-300 學習計畫、新人到職、生活習慣。提供可操作 Tabs 與階段 Stepper，階段切換需更改對應內容，不只是換標題。
- 自訂需求輸入：主題、使用者情境、所需資訊；按鈕「複製完整 AI 生成 Prompt」與「下載 Markdown」。不能在沒有模型後端時假稱即時 AI 圖像或網站生成。
- AI 設計 Prompt：讀取 `styles/STYLE-001/MASTER_AI_PROMPT.md`、`COMPONENT_BOARD.md`、`CONTENT_TRANSFORMATION.md` 中的規則，產生新產品內容。禁止照搬原始釜山文字、插畫、機場和日期。

## 設計原則

整個 Archive Shell 保留中性且易檢索的 Editorial 風格。只有元件板和變體展示以 STYLE-001 的奶油白／深灰粗框／低飽和粉彩呈現。要充分使用留白、版面層級、手機與桌面自適應，讓元件 Demo 和文件區有清楚的區別。

## 正確性與限制

- 這些 screenshots 並不代表使用者已明確喜歡全部元件。
- 色票為視覺推估，沒有原始 CSS。靜態截圖無法證明實際動畫或 sticky behavior。
- 原作者圖像不要拿來作為 AI 新畫面的素材直接拷貝。
- 保留 localStorage 的 local-only 提示，不要宣稱已與 GitHub 同步。
- 不要連結外部資料庫、不要要求機密 Token、不要公開部署。
- 驗收：九元件實際顯示、3 個變體切換內容、Prompt 含用戶輸入與完整風格規則、原始截圖區不再空白、來源 URL 有信心標示、手機版無溢出。
