"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Archive, ArrowLeft, ArrowRight, BookImage, Check, ClipboardCopy, Download, ExternalLink, Layers3, Palette, Plus, Search, Trash2, Upload, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { curatedStyles, getStylePrompt, type StyleEntry } from "@/data/styles";
import { Style001ComponentBoard, Style001VariationStudio } from "@/components/style001/Style001Board";
import { Style001Cover } from "@/components/style001/Style001Cover";

const STORE = "design-archive-local-v1";
const REFERENCE_STORE = "design-archive-reference-images-v1";
const filters = ["全部", "Playful", "Pastel", "Timeline", "Mobile-first", "Minimal", "Editorial", "Dashboard"];
const blank = { title: "", description: "", sourceUrl: "", tags: "", notes: "", images: [] as string[] };
type FormValues = typeof blank;

const validate = (item: unknown): item is StyleEntry => {
  if (!item || typeof item !== "object") return false;
  const x = item as Partial<StyleEntry>;
  return !!(typeof x.id === "string" && /^STYLE-\d{3,}$/.test(x.id) &&
    typeof x.title === "string" && typeof x.description === "string" &&
    Array.isArray(x.tags) && Array.isArray(x.images) && Array.isArray(x.palette) && Array.isArray(x.components));
};
function saveFile(filename: string, text: string) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}

export default function Home() {
  const [added, setAdded] = useState<StyleEntry[]>([]);
  const [referencePhotos, setReferencePhotos] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("全部");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "components" | "variation" | "palettes">("overview");
  const [detailMode, setDetailMode] = useState<"reference" | "components" | "variation">("reference");
  const [requestedComponent, setRequestedComponent] = useState<string | null>(null);
  const [form, setForm] = useState<FormValues>(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");
  const [photo, setPhoto] = useState(0);
  const importRef = useRef<HTMLInputElement>(null);
  const referenceImageInput = useRef<HTMLInputElement>(null);
  const all = useMemo(() => [...curatedStyles, ...added], [added]);
  const detail = all.find(x => x.id === selected);
  const detailImages = detail?.id === "STYLE-001" ? referencePhotos : (detail?.images ?? []);
  const visible = all.filter(x => (filter === "全部" || x.tags.includes(filter) || x.category === filter) &&
    `${x.title} ${x.id} ${x.description} ${x.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => { try {
    const raw = localStorage.getItem(STORE);
    if (raw) { const obj: unknown = JSON.parse(raw); if (Array.isArray(obj)) setAdded(obj.filter(validate).map(x=>({...x, origin: "local" as const}))); }
    const privateRefs = localStorage.getItem(REFERENCE_STORE);
    if (privateRefs) { const obj: unknown = JSON.parse(privateRefs); if (Array.isArray(obj)) setReferencePhotos(obj.filter(x => typeof x === "string" && /^data:image\/(jpeg|png|webp);base64,/.test(x)).slice(0, 10)); }
  } catch { /* No browser backup found */ } setReady(true); }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(STORE, JSON.stringify(added)); } catch { setNotice("儲存空間不足，請立即匯出備份"); } } }, [added, ready]);
  useEffect(() => { if (ready) { try { localStorage.setItem(REFERENCE_STORE, JSON.stringify(referencePhotos)); } catch { setNotice("參考圖儲存空間不足，請先匯出 JSON 備份"); } } }, [referencePhotos, ready]);
  useEffect(() => { if (!notice) return; const t = window.setTimeout(()=>setNotice(""), 3300); return ()=>clearTimeout(t); }, [notice]);

  function openStyle(id: string) { setSelected(id); setDetailMode("reference"); setRequestedComponent(null); setPhoto(0); window.scrollTo({top: 0, behavior: "smooth"}); }
  function goBack() { setSelected(null); window.scrollTo({top:0,behavior:"smooth"}); }
  async function copy(content: string) { try { await navigator.clipboard.writeText(content); setNotice("已複製到剪貼簿"); } catch { setNotice("無法複製，請確認瀏覽器權限"); } }
  function openNew(s?: StyleEntry) { setEditing(s?.id || null); setForm(s ? {title:s.title,description:s.description,sourceUrl:s.sourceUrl,tags:s.tags.join(", "), notes:s.notes, images:s.images} : {...blank, images:[]}); setShowForm(true); }
  function storeEntry() {
    if (!form.title.trim()) { setNotice("請輸入收藏名稱"); return; }
    if (form.sourceUrl && !/^https?:\/\//i.test(form.sourceUrl)) { setNotice("來源網址需以 https:// 開頭"); return; }
    const highest = Math.max(1, ...all.map(x=>parseInt(x.id.split("-")[1],10)||0));
    const id = editing || `STYLE-${String(highest+1).padStart(3,"0")}`;
    const original = all.find(x=>x.id===editing);
    const entry: StyleEntry = {
      id, title:form.title.trim(),subtitle: original?.subtitle || "自行新增的設計參考", category:original?.category||"Other",
      description:form.description,sourceName:original?.sourceName||"個人收藏",sourceUrl:form.sourceUrl,sourceVerified:false,
      tags:form.tags.split(/[,，]/).map(x=>x.trim()).filter(Boolean), palette:original?.palette||[],components:original?.components||[],
      features:original?.features||[],applications:original?.applications||[],images:form.images,notes:form.notes,
      favoriteElements:original?.favoriteElements||[],createdAt:original?.createdAt||new Date().toISOString().slice(0,10),origin:"local"
    };
    setAdded(current => editing ? current.map(x=>x.id===editing?entry:x) : [...current,entry]);
    setShowForm(false);setFilter("全部");setSearch("");openStyle(id);
    setNotice("已儲存至目前瀏覽器（不會同步 GitHub）");
  }
  function deleteEntry(s: StyleEntry) {
    if (s.origin !== "local") return;
    if (confirm(`確定刪除 ${s.id} 嗎？`)) { setAdded(x=>x.filter(y=>y.id!==s.id));goBack();setNotice("已刪除本機收藏"); }
  }
  async function importFile(file?: File) {
    if (!file) return;
    try {
      if (file.size > 10*1024*1024) throw Error("檔案過大");
      const json: unknown = JSON.parse(await file.text());
      const obj = json as { items?: unknown; referenceImages?: unknown };
      if (!Array.isArray(obj?.items)) throw Error("備份格式不正確");
      const localItems = obj.items.filter(validate).filter(x=>x.id!=="STYLE-001").map(x=>({...x, origin:"local" as const}));
      setAdded(current=>[...current.filter(x=>!localItems.some(y=>y.id===x.id)),...localItems]);
      if (Array.isArray(obj.referenceImages)) setReferencePhotos(obj.referenceImages.filter((x:unknown):x is string=>typeof x === "string" && /^data:image\/(jpeg|png|webp);base64,/.test(x)).slice(0,10));
      setNotice(`已匯入 ${localItems.length} 筆本機收藏`);
    } catch { setNotice("無法匯入：請檢查 JSON 備份格式"); }
    if (importRef.current) importRef.current.value="";
  }
  function exportBackup() { saveFile("design-archive-backup.json",JSON.stringify({version:2,exportedAt:new Date().toISOString(),items:added,referenceImages:referencePhotos},null,2));setNotice("已下載本機備份"); }
  async function uploadImages(files: FileList | null, toReference = false) {
    if (!files?.length) return;
    const uploads: string[] = [];
    for (const file of Array.from(files).slice(0, 5)) {
      if (!file.type.startsWith("image/") || file.size > 12 * 1024 * 1024) { setNotice("僅支援 12MB 以下的圖片"); continue; }
      const url = URL.createObjectURL(file);
      try {
        const img = new window.Image(); img.src = url; await img.decode();
        const scale = Math.min(1, 1000 / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d"); if (ctx) { ctx.drawImage(img, 0, 0, canvas.width, canvas.height); uploads.push(canvas.toDataURL("image/jpeg", 0.68)); }
      } catch { setNotice("圖片讀取失敗"); } finally { URL.revokeObjectURL(url); }
    }
    if (toReference) { setReferencePhotos(previous => [...previous, ...uploads].slice(0, 10)); setNotice("原始參考圖僅儲存在此瀏覽器；請定期匯出備份"); }
    else setForm(previous => ({...previous, images:[...previous.images, ...uploads].slice(0, 10)}));
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <button className="brand" onClick={goBack} aria-label="回到收藏首頁"><span className="brand-logo">D<span>.</span></span><span>DESIGN<br/>ARCHIVE</span></button>
      <div className="sidebar-group"><span className="sidebar-label">YOUR LIBRARY</span>
        <button className={`side-link ${tab==="overview"?"current":""}`} onClick={()=>{setTab("overview");goBack();}}><Archive size={18}/> 風格收藏 <span className="side-count">{all.length}</span></button>
        <button className={`side-link ${tab==="components"?"current":""}`} onClick={()=>{setTab("components");goBack();}}><Layers3 size={18}/> 元件索引</button>
        <button className={`side-link ${tab==="variation"?"current":""}`} onClick={()=>{setTab("variation");goBack();}}><Sparkles size={18}/> AI 變體工作室</button>
        <button className={`side-link ${tab==="palettes"?"current":""}`} onClick={()=>{setTab("palettes");goBack();}}><Palette size={18}/> 配色資料</button>
        <Link className="side-link" href="/prompts/"><BookImage size={18}/> AI 繪圖 Prompt</Link>
      </div>
      
    </aside>
    <main className="main-content">
      <div className="topbar"><div className="mobile-brand">D<span>.</span> <small>DESIGN ARCHIVE</small></div><span className="topbar-status"><span className="status-dot"/> LOCAL-ONLY DATA</span><div className="topbar-actions"><button onClick={()=>importRef.current?.click()} title="匯入 JSON 備份"><Upload size={16}/> <span>匯入</span></button><button onClick={exportBackup} title="下載本機收藏備份"><Download size={16}/> <span>匯出</span></button></div><input ref={importRef} hidden type="file" accept=".json,application/json" onChange={e=>void importFile(e.target.files?.[0])}/></div>
      <nav className="mobile-tabs" aria-label="收藏分類">
        <button className={tab==="overview"?"active":""} onClick={()=>{setTab("overview");goBack();}}>風格收藏</button>
        <button className={tab==="components"?"active":""} onClick={()=>{setTab("components");goBack();}}>元件索引</button>
        <button className={tab==="variation"?"active":""} onClick={()=>{setTab("variation");goBack();}}>AI 變體</button>
        <button className={tab==="palettes"?"active":""} onClick={()=>{setTab("palettes");goBack();}}>配色資料</button>
        <Link className="mobile-prompt-link" href="/prompts/">繪圖 Prompt</Link>
      </nav>
      {detail ? <section className="detail-view">
        <button className="back-link" onClick={goBack}><ArrowLeft size={17}/> 返回所有收藏</button>
        <div className="detail-heading"><div><span className="eyebrow">{detail.id} / DESIGN REFERENCE</span><h1>{detail.title}</h1><p>{detail.subtitle}</p></div><div className="detail-buttons"><button className="secondary-btn" onClick={()=>copy(getStylePrompt(detail))}><ClipboardCopy size={16}/> 複製 AI Prompt</button>{detail.origin==="local"&&<><button className="icon-button" onClick={()=>openNew(detail)} aria-label="編輯收藏">編輯</button><button className="icon-button danger" onClick={()=>deleteEntry(detail)} aria-label="刪除收藏"><Trash2 size={16}/></button></>}</div></div>
        <div className="detail-flow-tabs" role="group" aria-label="STYLE-001 三層式分析">{([ ["reference","01 原始參考＋分析"], ["components","02 元件展示板"], ["variation","03 AI 變體實驗室"] ] as const).map(([mode,label])=><button type="button" key={mode} onClick={()=>{setRequestedComponent(null);setDetailMode(mode);}} className={detailMode===mode?"active":""} aria-pressed={detailMode===mode}>{label}</button>)}</div>
        {detailMode === "reference" ? <><div className="archive-translation-flow"><span>REFERENCE <b>參考截圖</b></span><ArrowRight size={17}/><span>EXTRACTION <b>設計規則</b></span><ArrowRight size={17}/><span>VARIATION <b>全新內容</b></span></div><div className="detail-layout"><div className="detail-primary">
          <div className="detail-preview">{detailImages.length ? <img src={detailImages[Math.min(photo,detailImages.length-1)]} alt={`${detail.title} 原始參考截圖 ${photo+1}`}/> : detail.id === "STYLE-001" ? <Style001Cover large/> : <div className="missing-image">尚未附上來源截圖</div>}</div>
          {detailImages.length>1 && <div className="photo-strip">{detailImages.map((img,i)=><button key={i} className={photo===i?"active":""} aria-label={`查看第 ${i+1} 張截圖`} onClick={()=>setPhoto(i)}><img src={img} alt=""/></button>)}</div>}
          {detail.id === "STYLE-001" && <div className="reference-quick-actions">
            <input hidden ref={referenceImageInput} type="file" accept="image/*" multiple onChange={e=>{void uploadImages(e.target.files,true);e.target.value="";}}/>
            <button type="button" className="secondary-btn" onClick={()=>referenceImageInput.current?.click()}><Upload size={15}/> {referencePhotos.length ? "新增參考圖" : "加入本機參考圖"}</button>
            {referencePhotos.length>0&&<button type="button" className="reference-quick-clear" onClick={()=>{if(confirm("確定清空這個瀏覽器的 STYLE-001 參考圖？")){setReferencePhotos([]);setPhoto(0);}}}>清除圖片</button>}
            <small>參考圖僅保存在此瀏覽器，不會公開或自動同步。</small>
          </div>}
          <div className="content-box"><span className="section-kicker">01 — ABOUT THIS STYLE</span><h2>設計特徵</h2><p>{detail.description}</p><div className="feature-grid">{(detail.features.length?detail.features:[detail.description]).map((s,i)=><span key={i}><Check size={15}/>{s}</span>)}</div></div>
          <div className="content-box"><span className="section-kicker">02 — REUSABLE PATTERNS</span><h2>元件拆解</h2><p>點選任何一列，查看元件預覽、結構及互動規格。</p>{detail.components.length ? <div className="component-list">{detail.components.map((c,i)=>detail.id === "STYLE-001" ? <button type="button" className="component-jump" key={c.name} aria-label={`查看 ${c.name} 的元件展示與規格`} onClick={()=>{setRequestedComponent(`C${String(i+1).padStart(2,"0")}`);setDetailMode("components");window.scrollTo({top:0,behavior:"smooth"});}}><span className="component-index">{String(i+1).padStart(2,"0")}</span><div><strong>{c.name}</strong><p>{c.summary} · {c.useCase}</p></div><ArrowRight size={16}/></button> : <div key={c.name}><span className="component-index">{String(i+1).padStart(2,"0")}</span><div><strong>{c.name}</strong><p>{c.summary} · {c.useCase}</p></div></div>)}</div> : <p>尚未整理可重用元件。</p>}</div>
        </div><div className="detail-aside">
          <div className="aside-card"><span className="section-kicker">COLORS</span><h3>風格色票</h3><p>由截圖視覺推估，非原網站 CSS。</p><div className="swatches">{detail.palette.length?detail.palette.map(c=><button key={c.hex} title={`複製 ${c.hex}`} onClick={()=>copy(c.hex)}><span style={{background:c.hex}}/><div><strong>{c.name}</strong><small>{c.hex}</small></div><ClipboardCopy size={14}/></button>):<small>尚未補充色票</small>}</div></div>
          <div className="aside-card"><span className="section-kicker">REFERENCE</span><h3>來源資料</h3><p>{detail.sourceName}</p>{detail.sourceUrl && <a href={detail.sourceUrl} rel="noreferrer noopener" target="_blank">開啟截圖中辨識的網址 <ExternalLink size={14}/></a>}<small className="note">{detail.sourceVerified ? "來源已驗證" : "截圖中辨識的網址，尚未驗證"}</small></div>
          <div className="aside-card"><span className="section-kicker">PERSONAL NOTES</span><h3>收藏筆記</h3><p>{detail.notes||"尚未新增備註"}</p><div className="note-divider"/><small>明確喜歡的部分</small><p>{detail.favoriteElements.length?detail.favoriteElements.join("、"):"尚未確認；分析特徵不等於已確認偏好。"}</p></div>
          <div className="aside-card"><span className="section-kicker">USE CASES</span><h3>適用情境</h3><div className="tag-list">{detail.applications.map(a=><span key={a}>{a}</span>)}</div></div>
        </div></div></> : detail.id === "STYLE-001" ? detailMode === "components" ? <><div className="archive-translation-flow"><span>REFERENCE <b>參考截圖</b></span><ArrowRight size={17}/><span className="active">EXTRACTION <b>9 個元件</b></span><ArrowRight size={17}/><span>VARIATION <b>換內容</b></span></div><Style001ComponentBoard initialActive={requestedComponent} onCopy={copy}/></> : <><div className="archive-translation-flow"><span>REFERENCE <b>參考截圖</b></span><ArrowRight size={17}/><span>EXTRACTION <b>規則＋元件</b></span><ArrowRight size={17}/><span className="active">VARIATION <b>全新版本</b></span></div><Style001VariationStudio onCopy={copy}/></> : <div className="content-box"><h2>尚未建立這筆收藏的 {detailMode === "components" ? "元件板" : "變體規格"}</h2><p>可先使用上方的「複製 AI Prompt」進行設計轉譯。</p></div>}
      </section> : <>
        <section className="masthead"><div><span className="eyebrow">YOUR PERSONAL DESIGN INDEX</span><h1>{tab==="overview"?<>Collect a style.<br/><em>Make it yours.</em></>:tab==="components"?<>Design as<br/><em>components.</em></>:tab==="variation"?<>New content.<br/><em>Same visual DNA.</em></>:<>Color<br/><em>references.</em></>}</h1><p>儲存你提供的參考，萃取設計語言，畫出可重用元件，再由 AI 換成全新的內容。每種風格獨立管理。</p></div><div className="masthead-meta"><span>COLLECTION INDEX</span><strong>{String(all.length).padStart(2,"0")}</strong><small>STYLES ARCHIVED</small></div></section>
        <div className="section-header"><div><span className="section-kicker">BROWSE YOUR REFERENCES</span><h2>{tab==="overview"?"所有風格":tab==="components"?"元件展示板":tab==="variation"?"AI 內容變體":"配色資料"}</h2></div><button className="primary-btn" onClick={()=>openNew()}><Plus size={17}/> 新增收藏</button></div>
        {tab==="overview"&&<><div className="toolbar"><label className="search-field"><Search size={18}/><input placeholder="搜尋風格、元素或標籤..." value={search} onChange={e=>setSearch(e.target.value)}/></label><span className="result-count">{visible.length} 個結果</span></div><div className="filters">{filters.map(t=><button key={t} className={t===filter?"active":""} onClick={()=>setFilter(t)}>{t}</button>)}</div><div className="card-grid">{visible.map(s=><button key={s.id} className="style-card" onClick={()=>openStyle(s.id)}><div className="card-cover">{s.id === "STYLE-001" ? <Style001Cover/> : s.images.length?<div className="image-stack"><img src={s.images[Math.min(3,s.images.length-1)]} alt="" className="stack-side"/><img src={s.images[0]} alt={`${s.title} 參考圖`} className="stack-front"/><img src={s.images[Math.min(1,s.images.length-1)]} alt="" className="stack-back"/></div>:<div className="empty-cover"><Layers3 size={42}/><small>IMAGE NOT ADDED</small></div>}<span className="card-id">{s.id}</span></div><div className="card-content"><div className="card-title-row"><h3>{s.title}</h3><ArrowRight size={18}/></div><p>{s.description}</p><div className="tag-list">{s.tags.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><small className="source">{s.sourceName||"私人收藏"}</small></div></button>)}<button className="new-card" onClick={()=>openNew()}><span className="new-icon"><Plus size={24}/></span><strong>建立下一筆收藏</strong><small>圖片、網站與設計元件，從這裡開始。</small></button></div>{!visible.length&&<div className="empty-result">找不到符合條件的設計。<button onClick={()=>{setFilter("全部");setSearch("")}}>清除篩選</button></div>}</>}
        {tab==="components"&&<Style001ComponentBoard onCopy={copy}/>}
        {tab==="variation"&&<Style001VariationStudio onCopy={copy}/>}
        {tab==="palettes"&&<div className="palette-gallery">{all.filter(s=>s.palette.length).map(s=><button className="palette-card" key={s.id} onClick={()=>openStyle(s.id)}><div className="palette-bar">{s.palette.map(c=><span key={c.hex} style={{background:c.hex}}/>)}</div><strong>{s.title}</strong><p>{s.id} · 色彩為視覺推估</p></button>)}</div>}
      </>}
      <footer>DESIGN ARCHIVE <span>多風格收藏 · localStorage 本機新增 · 不會自動同步 GitHub</span><span>EST. 2026</span></footer>
    </main>
    {notice&&<div className="toast" role="status"><Check size={17}/>{notice}</div>}
    {showForm&&<div className="modal-backdrop" onClick={()=>setShowForm(false)}><div className="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-title" onClick={e=>e.stopPropagation()}><header><div><span className="section-kicker">DESIGN LIBRARY</span><h2 id="form-title">{editing?"編輯收藏":"新增設計收藏"}</h2></div><button onClick={()=>setShowForm(false)} aria-label="關閉"><X size={22}/></button></header><p className="local-warning">新增內容僅儲存在目前瀏覽器，記得定期匯出 JSON 備份。</p><label>風格名稱 <b>*</b><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="例如：Minimal Editorial Portfolio"/></label><label>來源連結<input value={form.sourceUrl} onChange={e=>setForm({...form,sourceUrl:e.target.value})} placeholder="https://..."/></label><label>簡介<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={2} placeholder="這個風格有什麼特色？"/></label><label>標籤（以逗號分隔）<input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="Minimal, Portfolio, Typography"/></label><label>喜歡的細節／備註<textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={3} placeholder="例如：只喜歡它的導覽列設計"/></label>
      <label>參考截圖（選填，最多 10 張）<input type="file" accept="image/*" multiple onChange={e=>{void uploadImages(e.target.files);e.target.value="";}}/></label>
      {form.images.length>0&&<div className="upload-preview">{form.images.map((src,i)=><div key={i}><img src={src} alt={`新增截圖 ${i+1}`}/><button type="button" aria-label={`移除截圖 ${i+1}`} onClick={()=>setForm(p=>({...p,images:p.images.filter((_,n)=>n!==i)}))}><X size={13}/></button></div>)}</div>}
      <div className="modal-footer"><button className="secondary-btn" onClick={()=>setShowForm(false)}>取消</button><button className="primary-btn" onClick={storeEntry}>儲存收藏 <ArrowRight size={16}/></button></div></div></div>}
  </div>;
}
