# Design Archive v2 · 開始使用

## 此次交付的三個主要成果

1. **完整可用的 STYLE-001 Master AI Prompt**：`styles/STYLE-001/MASTER_AI_PROMPT.md`，可直接貼給 Claude／Codex／Lovable，再替換其中的專案需求。
2. **可重用元件展示板**：`styles/STYLE-001/COMPONENT_BOARD.md` + `src/components/style001/Style001Board.tsx`。共九個由 HTML、SVG、CSS 繪製的元件，點開後可看結構、狀態與替換規則。
3. **改版 Design Archive Next.js 網站**：收藏 → 分析 → 元件 → 變體。變體包含全新內容的學習／到職／生活範例，以及可編輯的 AI Prompt 表單。

## 不安裝就能先看

直接開啟 `PREVIEW_STYLE-001.html`：離線可查看 9 個元件、3 個可切換的新內容示例與原始參考。正式多風格收藏網站需用下方指令啟動 Next.js。

## 網站使用方法

- 「風格收藏」→ STYLE-001 → 「01 原始參考＋分析」：看原圖、色票與來源信心。
- 「02 元件展示板」：看九個元件的實際畫面；點擊元件卡看詳細規格。
- 「03 AI 變體實驗室」：切換三個**新內容**範例，操作步進器與 Tabs，自訂主題、需求，複製／下載完整 AI Prompt。

## 啟動

```bash
cd frontend-design-library
npm install
npm run dev
```

## 尚未完成的事

- 不是原 Lovable 網站的自動更新版。該網站目前可預覽，但**仍是之前的 v1**；Lovable workspace 目前額度不足，無法代你套用變更。
- 尚未建立／推送至新 GitHub Private repository；需要先建立 repo。
- 網頁內自訂主題只會產生 Prompt，**不會即時呼叫 AI 或產出全新任意主題的實際畫面**。右側三個 preview 為事先設計的互動示例。
- 環境無 npm registry 存取，無法完成依賴安裝、正式 build 與瀏覽器整合測試。

其餘請見 `README.md`。
