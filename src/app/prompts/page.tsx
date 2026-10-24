"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookImage, Check, Clipboard, Download, FilePlus2, ImagePlus, Layers3, Pencil, Search, Trash2, Upload, X } from "lucide-react";
import { ILLUSTRATION_EXAMPLES, nextDrawingId, type IllustrationPromptEntry } from "@/data/illustration-prompts";
import { IllustrationPreview } from "@/components/illustrations/IllustrationPreview";
import "./prompt-library.css";

const STORAGE_KEY = "design-archive-illustration-prompts-v1";
const blank: Omit<IllustrationPromptEntry, "id" | "origin" | "createdAt"> = {
  title:"", description:"", prompt:"", negativePrompt:"", tags:[], model:"", aspectRatio:"4:3",
  notes:"", imageDataUrl:"", preview:"uploaded", sourceUrl:""
};
const CATEGORIES = ["全部", "Pastel", "Editorial", "Isometric", "Cute", "Collage", "Soft 3D", "我的收藏"];

function isImage(value: unknown): value is string {
  return typeof value === "string" && (/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(value) || value === "");
}
function validate(entry: unknown): entry is IllustrationPromptEntry {
  if (!entry || typeof entry !== "object") return false;
  const x = entry as Partial<IllustrationPromptEntry>;
  return typeof x.id === "string" && /^DRAW-\d+$/.test(x.id) &&
    typeof x.title === "string" && typeof x.prompt === "string" &&
    typeof x.description === "string" && typeof x.negativePrompt === "string" &&
    typeof x.notes === "string" && typeof x.model === "string" &&
    typeof x.aspectRatio === "string" && typeof x.sourceUrl === "string" &&
    Array.isArray(x.tags) && x.tags.every(y=>typeof y==="string") &&
    isImage(x.imageDataUrl);
}
function downloadJson(name: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url = URL.createObjectURL(blob), link = document.createElement("a");
  link.href=url; link.download=name; link.click(); URL.revokeObjectURL(url);
}
async function imageToJpeg(file:File):Promise<string> {
  if (!["image/png","image/jpeg","image/webp"].includes(file.type)) throw Error("只接受 JPG、PNG 或 WebP 圖片");
  if (file.size > 12*1024*1024) throw Error("圖片請小於 12 MB");
  const url=URL.createObjectURL(file);
  try {
    const image=new window.Image(); image.src=url; await image.decode();
    const scale=Math.min(1,1100/Math.max(image.width,image.height));
    const canvas=document.createElement("canvas"); canvas.width=Math.max(1,Math.round(image.width*scale)); canvas.height=Math.max(1,Math.round(image.height*scale));
    const ctx=canvas.getContext("2d"); if(!ctx) throw Error("無法處理圖片");
    ctx.fillStyle="#ffffff"; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.drawImage(image,0,0,canvas.width,canvas.height);
    return canvas.toDataURL("image/jpeg",.72);
  } finally { URL.revokeObjectURL(url); }
}

export default function IllustrationPromptPage() {
  const [personal,setPersonal]=useState<IllustrationPromptEntry[]>([]);
  const [loaded,setLoaded]=useState(false);
  const [search,setSearch]=useState("");
  const [category,setCategory]=useState("全部");
  const [selected,setSelected]=useState<string | null>(null);
  const [editing,setEditing]=useState<string|null>(null);
  const [openForm,setOpenForm]=useState(false);
  const [form,setForm]=useState(blank);
  const [notice,setNotice]=useState("");
  const importInput=useRef<HTMLInputElement>(null);
  const formFileInput=useRef<HTMLInputElement>(null);
  const all=useMemo(()=>[...ILLUSTRATION_EXAMPLES,...personal],[personal]);
  const current=all.find(x=>x.id===selected);
  const visible=all.filter(x=>(category==="全部" || (category==="我的收藏" ? x.origin==="local" : x.tags.includes(category))) &&
    `${x.id} ${x.title} ${x.description} ${x.tags.join(" ")} ${x.prompt}`.toLowerCase().includes(search.trim().toLowerCase()));

  useEffect(()=>{try {
    const stored=localStorage.getItem(STORAGE_KEY);
    if(stored){const value:unknown=JSON.parse(stored);if(Array.isArray(value)) setPersonal(value.filter(validate).filter(x=>x.origin!=="example"&&!ILLUSTRATION_EXAMPLES.some(y=>y.id===x.id)).map(x=>({...x,origin:"local" as const})));}
  }catch{} setLoaded(true);},[]);
  useEffect(()=>{if(!loaded)return;try {localStorage.setItem(STORAGE_KEY,JSON.stringify(personal));}catch{setNotice("瀏覽器儲存空間不足，請匯出備份並減少圖片數量");}},[personal,loaded]);
  useEffect(()=>{if(!notice)return;const timer=window.setTimeout(()=>setNotice(""),4000);return()=>window.clearTimeout(timer);},[notice]);
  useEffect(()=>{if(!openForm)return; const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpenForm(false);};document.addEventListener("keydown",onKey);return()=>document.removeEventListener("keydown",onKey);},[openForm]);

  async function copy(text:string){try{await navigator.clipboard.writeText(text);setNotice("Prompt 已複製");}catch{setNotice("瀏覽器未授權複製，請手動選取文字");}}
  function startNew(sample?:IllustrationPromptEntry){
    setEditing(sample?.origin==="local"?sample.id:null);
    setForm(sample?{title:sample.origin==="example"?sample.title+"（我的版本）":sample.title,description:sample.description,prompt:sample.prompt,negativePrompt:sample.negativePrompt,tags:[...sample.tags],model:sample.model,aspectRatio:sample.aspectRatio,notes:sample.origin==="example"?"":sample.notes,imageDataUrl:sample.origin==="example"?"":sample.imageDataUrl,preview:sample.origin==="example"?sample.preview:sample.preview,sourceUrl:sample.sourceUrl}: {...blank,tags:[]});
    setOpenForm(true);
  }
  function save(){
    if(!form.title.trim()||!form.prompt.trim()){setNotice("請填寫名稱與 Prompt 內容");return;}
    if(form.sourceUrl && !/^https:\/\//i.test(form.sourceUrl)){setNotice("來源連結必須以 https:// 開頭");return;}
    const id=editing||nextDrawingId(all);
    const entry:IllustrationPromptEntry={...form,id,title:form.title.trim(),prompt:form.prompt.trim(),tags:form.tags.filter(Boolean),origin:"local",createdAt:new Date().toISOString().slice(0,10)};
    setPersonal(previous=>editing?previous.map(x=>x.id===editing?entry:x):[...previous,entry]);
    setOpenForm(false);setSelected(id);setCategory("全部");setSearch("");setNotice("已儲存在目前瀏覽器；不會自動同步到 GitHub");
    window.scrollTo({top:0,behavior:"smooth"});
  }
  async function upload(file?:File){if(!file)return;try{const src=await imageToJpeg(file);setForm(s=>({...s,imageDataUrl:src}));setNotice("圖片已加入表單，請按儲存收藏");}catch(e){setNotice(e instanceof Error?e.message:"圖片讀取失敗");}}
  function remove(item:IllustrationPromptEntry){if(item.origin!=="local")return;if(window.confirm(`確定刪除 ${item.id}？`)){setPersonal(p=>p.filter(x=>x.id!==item.id));setSelected(null);setNotice("已刪除本機收藏");}}
  async function importBackup(file?:File){if(!file)return;try{
    if(file.size>20*1024*1024)throw Error("備份檔案過大");
    const value:unknown=JSON.parse(await file.text());const rows=Array.isArray(value)?value:(value&&typeof value==="object"&&(value as {items?:unknown}).items);
    if(!Array.isArray(rows))throw Error("無效的備份格式");
    const imported=rows.filter(validate).filter(x=>!ILLUSTRATION_EXAMPLES.some(y=>y.id===x.id)).map(x=>({...x,origin:"local" as const}));
    if(!imported.length)throw Error("沒有可匯入的個人紀錄");
    setPersonal(previous=>[...previous.filter(x=>!imported.some(y=>y.id===x.id)),...imported]);
    setNotice(`已匯入 ${imported.length} 筆 Prompt`);
  }catch(e){setNotice(e instanceof Error?e.message:"匯入失敗");} if(importInput.current) importInput.current.value="";}
  const previewLabel=(entry:IllustrationPromptEntry)=>entry.imageDataUrl?"使用者提供的實際圖片":"原創 SVG 畫風示意 · 非 AI 生成成品";

  return <div className="app-shell ill-shell">
    <aside className="sidebar">
      <Link className="brand" href="/" aria-label="回 Design Archive 首頁"><span className="brand-logo">D<span>.</span></span><span>DESIGN<br/>ARCHIVE</span></Link>
      <div className="sidebar-group"><span className="sidebar-label">YOUR LIBRARY</span><Link href="/" className="side-link"><Layers3 size={18}/> 前端設計收藏</Link><Link href="/prompts/" className="side-link current" aria-current="page"><BookImage size={18}/> 繪圖 Prompt <span className="side-count">{personal.length}</span></Link></div>
      
    </aside>
    <main className="main-content ill-content">
      <div className="topbar"><Link className="ill-back" href="/"><ArrowLeft size={16}/> 返回設計收藏</Link><span className="topbar-status"><span className="status-dot"/> LOCAL-ONLY DATA</span></div>
      {current ? <>
        <div className="ill-detail-toolbar"><button className="ill-btn" onClick={()=>setSelected(null)}><ArrowLeft size={16}/> 返回 Prompt 收藏</button><div className="ill-buttons"><button className="ill-btn" onClick={()=>void copy(current.prompt)}><Clipboard size={15}/> 複製 Prompt</button><button className="ill-btn" onClick={()=>startNew(current)}><FilePlus2 size={15}/> {current.origin==="example"?"收藏此範例":"編輯紀錄"}</button>{current.origin==="local"&&<button className="ill-btn" onClick={()=>remove(current)}><Trash2 size={15}/> 刪除</button>}</div></div>
        <div className="ill-detail-title"><span className="eyebrow">{current.id} / DRAWING PROMPT RECORD</span><h1>{current.title}</h1><p>{current.description}</p></div>
        <div className="ill-detail-layout"><div>
          <div className="ill-detail-preview"><IllustrationPreview type={current.preview} image={current.imageDataUrl} title={current.title}/><div className="ill-preview-under"><span>{previewLabel(current)}</span><span>{current.aspectRatio}</span></div></div>
          <div className="ill-sheet" style={{marginTop:17}}><span className="section-kicker">VISUAL STYLE / 畫風索引</span><h2>畫風標籤</h2><div className="ill-tags">{current.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="ill-keyline"/><div className="ill-props"><div><b>生成模型</b>{current.model||"未指定"}</div><div><b>畫面比例</b>{current.aspectRatio}</div></div>{current.sourceUrl&&<p>參考連結：<a href={current.sourceUrl} target="_blank" rel="noopener noreferrer">{current.sourceUrl}</a></p>}</div>
        </div><div>
          <div className="ill-sheet"><div className="ill-sheet-header"><span className="section-kicker">MAIN PROMPT</span><button className="ill-btn" onClick={()=>void copy(current.prompt)}><Clipboard size={15}/> 複製</button></div><h2>繪圖提示詞</h2><pre>{current.prompt}</pre><span className="section-kicker">NEGATIVE PROMPT</span><pre>{current.negativePrompt||"未提供"}</pre></div>
          <div className="ill-sheet"><span className="section-kicker">NOTES / 使用心得</span><h2>收藏筆記</h2><p>{current.notes||"尚未補充使用心得或模型參數。"}</p></div>
          {current.origin==="example"&&<div className="ill-alert">這是用來示範 Prompt 如何配對畫風圖片的預設案例。示意插畫為程式繪製的 SVG，不是已執行繪圖模型所產生的結果。你可以按「收藏此範例」，上傳自己的生成圖片並保留對應 Prompt。</div>}
        </div></div>
      </> : <>
        <header className="ill-header"><div><span className="eyebrow">DESIGN ARCHIVE / IMAGE PROMPT COLLECTION</span><h1>Save the prompt.<br/><em>See the style.</em></h1><p>收藏你用過的 AI 繪圖提示詞，配對實際圖片與畫風特徵。方便未來用不同主題重現喜歡的插畫視覺。</p></div><div className="ill-count">{String(personal.length).padStart(2,"0")}<span>MY SAVED PROMPTS</span></div></header>
        <div className="ill-local-note"><ImagePlus size={17}/><span>目前內建 {ILLUSTRATION_EXAMPLES.length} 種原創 SVG 畫風範例，用於展示 Prompt 與圖片樣式的配對，不代表 AI 已生成圖片。你新增的 Prompt 和上傳的成品只保存在這台裝置的瀏覽器；清除網站資料會遺失，請定期匯出 JSON。</span></div>
        <div className="ill-tools"><label className="ill-search"><Search size={17}/><input placeholder="搜尋 Prompt、風格或主題" value={search} onChange={e=>setSearch(e.target.value)} aria-label="搜尋繪圖 Prompt"/></label><div className="ill-buttons"><input ref={importInput} type="file" accept=".json,application/json" hidden onChange={e=>void importBackup(e.target.files?.[0])}/><button className="ill-btn" onClick={()=>importInput.current?.click()}><Upload size={15}/> 匯入</button><button className="ill-btn" onClick={()=>downloadJson("illustration-prompt-backup.json",{version:1,exportedAt:new Date().toISOString(),items:personal})}><Download size={15}/> 匯出</button><button className="ill-btn-primary" onClick={()=>startNew()}><FilePlus2 size={16}/> 新增 Prompt</button></div></div>
        <div className="ill-filter-row">{CATEGORIES.map(cat=><button key={cat} className={`ill-filter ${category===cat?"active":""}`} onClick={()=>setCategory(cat)} aria-pressed={category===cat}>{cat}</button>)}</div>
        <div className="ill-gallery">{visible.map(x=><button key={x.id} className="ill-card" onClick={()=>{setSelected(x.id);window.scrollTo({top:0,behavior:"smooth"});}}><figure><IllustrationPreview type={x.preview} image={x.imageDataUrl} title={x.title}/><span className="ill-preview-label">{x.imageDataUrl?"已附圖片":x.origin==="example"?"原創 SVG 示意":"尚未附圖"}</span></figure><div className="ill-card-inner"><div className="ill-card-meta"><span>{x.id}</span><span>{x.origin==="example"?"示範模板":"我的收藏"} <ArrowRight size={13}/></span></div><h3>{x.title}</h3><p>{x.description}</p><div className="ill-tags">{x.tags.slice(0,4).map(tag=><span key={tag}>{tag}</span>)}</div></div></button>)}
        {!visible.length&&<div className="ill-empty">沒有符合條件的紀錄，請調整搜尋，或建立第一筆 Prompt。</div>}</div>
      </>}
      <footer>DESIGN ARCHIVE <span>繪圖 Prompt 與圖片風格 · 本機儲存，不同步 GitHub</span><span>EST. 2026</span></footer>
    </main>
    {notice&&<div className="ill-toast" role="status"><Check size={13}/> {notice}</div>}
    {openForm&&<div className="ill-dialog-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setOpenForm(false);}}><div className="ill-dialog" role="dialog" aria-modal="true" aria-labelledby="ill-form-title"><div className="ill-dialog-head"><div><span className="section-kicker">PERSONAL PROMPT RECORD</span><h2 id="ill-form-title">{editing?"編輯 Prompt":"新增繪圖 Prompt"}</h2></div><button className="ill-btn" aria-label="關閉" onClick={()=>setOpenForm(false)}><X size={17}/></button></div>
      <label className="ill-dialog-label">名稱 *<input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="例如：手繪童話森林" maxLength={120}/></label>
      <label className="ill-dialog-label">繪圖 Prompt *<textarea rows={6} value={form.prompt} onChange={e=>setForm(p=>({...p,prompt:e.target.value}))} placeholder="輸入可以直接貼給 AI 繪圖模型的提示詞"/></label>
      <label className="ill-dialog-label">避免元素（Negative Prompt）<textarea rows={2} value={form.negativePrompt} onChange={e=>setForm(p=>({...p,negativePrompt:e.target.value}))}/></label>
      <label className="ill-dialog-label">畫風描述／說明<textarea rows={2} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} placeholder="例如：柔和水彩、濕畫法、暖色光"/></label>
      <div className="ill-dialog-grid"><label className="ill-dialog-label">標籤（逗號分隔）<input value={form.tags.join(", ")} onChange={e=>setForm(p=>({...p,tags:e.target.value.split(/[,，]/).map(s=>s.trim())}))} placeholder="Watercolor, Pastel, Storybook"/></label><label className="ill-dialog-label">畫面比例<input value={form.aspectRatio} onChange={e=>setForm(p=>({...p,aspectRatio:e.target.value}))} placeholder="4:3"/></label></div>
      <div className="ill-dialog-grid"><label className="ill-dialog-label">模型／版本<input value={form.model} onChange={e=>setForm(p=>({...p,model:e.target.value}))} placeholder="例如：你使用的繪圖模型"/></label><label className="ill-dialog-label">來源網址（選填）<input value={form.sourceUrl} onChange={e=>setForm(p=>({...p,sourceUrl:e.target.value}))} placeholder="https://..."/></label></div>
      <label className="ill-dialog-label">生成圖片或參考圖（JPG / PNG / WebP）<input ref={formFileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{void upload(e.target.files?.[0]);e.target.value="";}}/><span className="ill-form-help">上傳後會壓縮並儲存在此瀏覽器。畫風預覽優先使用你提供的圖片。</span></label>
      {form.imageDataUrl&&<div className="ill-form-preview"><img src={form.imageDataUrl} alt="準備儲存的圖片"/><button className="ill-btn" onClick={()=>setForm(p=>({...p,imageDataUrl:""}))}>移除圖片</button></div>}
      <label className="ill-dialog-label">使用心得／備註<textarea rows={2} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}/></label>
      <div className="ill-dialog-actions"><button className="ill-btn" onClick={()=>setOpenForm(false)}>取消</button><button className="ill-btn-primary" onClick={save}><Check size={15}/> 儲存 Prompt 與圖片</button></div>
    </div></div>}
  </div>;
}
