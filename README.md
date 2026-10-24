# Design Archive · GitHub Pages Edition

一個收藏多種前端視覺語言，並藉由 Component Board 與 Variation Studio 使用新內容重新設計的 React / Next.js 靜態網站。介面使用繁體中文。

## 網站入口

正式部署後：`https://christinekao.github.io/frontend-design-library/`（僅在 GitHub `christinekao/frontend-design-library` Repository 建立並完成 Pages 部署後成立）。

## 在 GitHub Pages 部署

1. 於 GitHub 建立 `frontend-design-library` Repository。若使用 GitHub Free，請選 **Public** 才可免費啟用 GitHub Pages；GitHub Pages 網站一律對外公開。
2. 把此目錄所有檔案**連同隱藏的 `.github/` 資料夾**放到 Repository 的 `main` branch。不要只上傳 ZIP 檔本身。
3. 前往 Repository **Settings → Pages → Build and deployment → Source → GitHub Actions**。
4. 前往 **Actions** 查看 `Deploy Design Archive to GitHub Pages` workflow；首次若未自動觸發，可在 Actions 中按 Run workflow。
5. 成功後至 **Settings → Pages** 查看部署的網站 URL。

`.github/workflows/deploy-pages.yml` 會在每次 push 至 main 時，自動安裝相依套件、執行 Next.js 靜態匯出 (`out/`)、發布到 GitHub Pages。

## 在電腦上傳到 GitHub（Git CLI）

```bash
cd frontend-design-library
npm install
npm run build
git init
git add .
git commit -m "Deploy Design Archive on GitHub Pages"
git branch -M main
git remote add origin https://github.com/christinekao/frontend-design-library.git
git push -u origin main
```

在 Repository 名稱不是 `frontend-design-library` 時，部署 workflow 會根據 `GITHUB_REPOSITORY` 自動設定 `basePath`。若使用 `<username>.github.io` 作為 Repo 名稱，會部署至根路徑。

## 現有功能

- 多風格 Archive、搜尋／篩選、新增及編輯本機收藏
- STYLE-001 的抽象視覺規則、色票、觀察 vs 推論分析
- 九個可互動元件示意圖及三種替換內容的 Variation Studio
- 自訂主題並複製／下載 AI Prompt（**沒有即時呼叫 AI API**）
- 本機參考截圖上傳、JSON 匯入／匯出

## 重要限制：公開網站與私人參考圖

這個供 GitHub Pages 發布的版本刻意**不包含第三方原始截圖**。STYLE-001 會展示我們重新設計的元件示意；原始圖可在網站詳情頁自行加入、儲存在當前瀏覽器的 localStorage。

**沒有帳號、資料庫、伺服器寫入或跨裝置同步功能。** `localStorage` 在不同網域（包含 Lovable 網域、`localhost` 和 GitHub Pages）之間互不共用。要搬移收藏，先在舊站匯出 JSON，再在新站匯入。請注意瀏覽器容量有限，加入原始圖時可能遇到空間不足。

`sourceUrl` 為截圖中辨識到但尚未驗證的網址，不代表原站授權或背書。Design Archive 的描圖 UI 為新創內容，而非重製原作。

## 技術

Next.js 15（App Router）+ React 19 + TypeScript + CSS + Lucide。GitHub Pages 採靜態匯出 `output: export`；不支援 Server Actions / API routes / SSR，未來若要 GitHub 雲端同步需另行設計登入與資料層，不能直接在瀏覽器暴露私人 GitHub token。

## 其他文件

- `styles/STYLE-001/MASTER_AI_PROMPT.md`
- `styles/STYLE-001/COMPONENT_BOARD.md`
- `styles/STYLE-001/CONTENT_TRANSFORMATION.md`
- `docs/DESIGN_ARCHIVE_V2.md`
