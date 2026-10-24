# Design Archive v2 — Reference → Extraction → Variation

私人、多風格 UI/UX 設計靈感收藏庫。可從既有作品學**抽象的視覺與元件語言**，以新內容重新建立**可操作、可編輯**的前端，而不僅是蒐集截圖或重畫原作。

## v2 主要功能

1. **Reference**：保存使用者提供的 STYLE-001 原始參考截圖、來源狀態及分析。標註來源網址是「截圖中可見、尚未驗證」，不當成正式原作網址。
2. **Extraction**：明確拆開 observed／inferred／unknown；提供九個由 HTML、SVG、CSS 自行繪製的可重用元件，包括 Hero、Tabs、Ticket、Stepper、Summary、Timeline、Activity、Category Pill、Countdown。
3. **Variation**：三個新內容場景（PL-300 學習計畫、新人到職、生活小練習）可切換，包含可操作 Tabs／Stepper。提供自訂主題和需求，輸出**完整 AI 生成 Prompt**，支援複製／下載。
4. **Design Archive**：保留多風格收藏、搜尋、標籤、預覽、顏色和元件索引、本機新增／編輯／刪除、圖片上傳與 JSON 匯入／匯出。

**重要限制：** 三個 Variation Preview 是實際前端程式與預先設計的新示例內容，並非在網頁內即時呼叫 AI。自訂文字會更新 Prompt，實際由 Claude / Codex / Lovable 等生成新頁面時，須將 Prompt 送至相應工具。

## 文件與檔案

| 路徑 | 用途 |
|---|---|
| `styles/STYLE-001/MASTER_AI_PROMPT.md` | 可直接貼給 AI 的完整生成規範、來源信心與驗收清單 |
| `styles/STYLE-001/COMPONENT_BOARD.md` | 九大元件、結構、props、狀態、可替換資料 |
| `styles/STYLE-001/CONTENT_TRANSFORMATION.md` | 旅遊 UI 語意轉譯成學習／到職／生活場景 |
| `styles/STYLE-001/reference.md` | 截圖與最初風格分析 |
| `src/data/style001-variants.ts` | 三種**原創新內容**及動態 Prompt 生成邏輯 |
| `src/components/style001/Style001Board.tsx` | 元件視覺展示板、可操作的新內容 Preview |
| `src/app/style001.css` | 僅供 STYLE-001 元件使用的隔離樣式 |
| `src/app/page.tsx` | 收藏首頁、詳細檢視、元件板、Variation Studio |
| `public/styles/style-001/` | 公開部署版不包含他人原作的截圖 |
| `index.json` | 可供自動化工具使用的收藏索引 |
| `PREVIEW_STYLE-001.html` | 可離線開啟的 UI 展示板與三組互動變體 |
| `prompts/LOVABLE_V2_UPDATE.md` | Lovable v1 → v2 的修改指令（額度恢復後使用） |

## 零安裝離線預覽

直接在瀏覽器打開 `PREVIEW_STYLE-001.html`：可查看九個繪製元件、三個全新內容的示例以及原始參考圖。這個檔案獨立於 Next.js，不需要執行 npm，亦不會連線到 AI API。

## 本機啟動

需要 Node.js 20+（建議 22）。

```bash
npm install
npm run dev
# http://localhost:3000
```

檢查：`npm run typecheck`、`npm run build`。

**測試狀態**：本環境無法存取 npm registry，因此無法安裝相依套件與完成正式 Next.js build。已執行 TSX/TS 語法解析和資料完整性檢查；不能將此解讀成完整的瀏覽器端測試。

## GitHub 儲存與同步

這份程式碼**尚未推送至新 GitHub Repository**。請新建私人 Repo `frontend-design-library`，於解壓後的專案根目錄執行：

```bash
git init
git add .
git commit -m "feat: design archive v2 with components and variations"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/frontend-design-library.git
git push -u origin main
```

本機新增的收藏儲存在該瀏覽器的 `localStorage`，**不會自動同步到 GitHub**。要保留資料請匯出 JSON。來源圖未取得公開展示授權前，維持 Private。

## 線上網站與本 ZIP 的關係

另有 Lovable 線上專案：<https://lovable.dev/projects/367011d2-fbad-47f2-98b2-6a9fc81250f4>。它是**獨立技術版本**；本 ZIP 的更新不會自動套用到 Lovable。現在 Lovable workspace 額度不足，無法在目前回合直接將 v2 更新到其線上版本。

## 來源與分析完整性

STYLE-001 來自使用者貼在對話中的 Threads 截圖，圖像著作權仍屬原作者。`https://madori452.github.io` 這個字樣是在截圖中辨識到，尚未開啟核實是否真為來源網站。畫面色票、尺寸與互動描述是觀察／推論，不是原網站程式碼。
