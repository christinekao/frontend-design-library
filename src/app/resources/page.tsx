"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Archive, BookImage, Check, ExternalLink, Search, ShieldCheck, Sparkles, SwatchBook } from "lucide-react";
import bannerLibrary from "@/data/resources/RES-001.json";
import putTool from "@/data/resources/RES-002.json";
import impeccable from "@/data/resources/RES-003.json";
import "./resources.css";

type ArchiveResource = {
  id: string;
  title: string;
  url: string;
  kind: string;
  kindLabel: string;
  subtitle: string;
  description: string;
  features: string[];
  useCases: string[];
  tags: string[];
  rightsNote: string;
  reviewedAt: string;
  availability: string;
  originalImagesSaved: boolean;
  sourceType: string;
  relatedUrl?: string;
  displayCover: string;
  layers?: Array<{name: string; detail: string}>;
  commands?: string[];
  architecture?: { owner: string; role: string; independentFramework: boolean; adoptionStatus: string; principle: string };
  snapshot?: {skill: string;cli: string;engine: string;detectorRules: number;commands: number;deprecatedCommands: string[];asOf: string;dynamic: string};
};

const resources: ArchiveResource[] = [bannerLibrary, putTool, impeccable];
const FILTERS = [
  { key: "all", title: "全部資源" },
  { key: "inspiration", title: "靈感圖庫" },
  { key: "prompt-tool", title: "AI 製作與 Prompt" },
  { key: "frontend-qa", title: "Frontend QA" }
];

function ResourceCover({ resource }: { resource: ArchiveResource }) {
  if (resource.kind === "frontend-qa") return (
    <div className="res-cover res-cover-qa" aria-label="Impeccable：Build UI 經過 Detector、Runtime Review、UX Review，最後用 Evidence 驗收">
      <div className="res-cover-top"><span>FRONTEND / QA</span><span>003</span></div>
      <div className="res-qa-visual" aria-hidden="true">
        <div className="res-qa-eyebrow">UI ACCEPTANCE CAPABILITY</div>
        <div className="res-qa-flow">
          <span>BUILD UI</span><b>↓</b><span className="res-qa-spotlight">DETECT <small>Impeccable</small></span>
          <b>↓</b><span>RUNTIME + UX REVIEW</span><b>↓</b><span>RECHECK + EVIDENCE</span>
        </div>
        <p>Rule PASS ≠ UI PASS ≠ UX PASS</p>
      </div>
      <div className="res-cover-bottom">TOOL / PROVIDER <span>↗</span></div>
    </div>
  );
  if (resource.kind === "inspiration") return (
    <div className="res-cover res-cover-gallery" aria-hidden="true">
      <div className="res-cover-top"><span>VISUAL REFERENCES</span><span>001 / 002</span></div>
      <div className="res-poster-set">
        <div className="res-poster res-poster-blue"><span>LOOK</span><b>GOOD<br/>IDEAS.</b><i/></div>
        <div className="res-poster res-poster-peach"><small>CREATIVE / STUDY</small><b>MAKE<br/>IT <em>NEW.</em></b><div className="res-poster-dots">● ● ●</div></div>
        <div className="res-poster res-poster-yellow"><span>INSPIRATION</span><strong>色 × 型 × 排版</strong><div className="res-poster-shape"/></div>
      </div>
      <div className="res-cover-bottom">DESIGN PATTERNS <span>↗</span></div>
    </div>
  );
  return (
    <div className="res-cover res-cover-prompt" aria-hidden="true">
      <div className="res-cover-top"><span>PROMPT &amp; BANNER</span><span>002 / 002</span></div>
      <div className="res-prompt-card">
        <span className="res-prompt-pill">AI VISUAL STUDIO</span>
        <strong>Write an idea.<br/><em>Make a banner.</em></strong>
        <div className="res-prompt-line res-prompt-line-one"/><div className="res-prompt-line res-prompt-line-two"/>
        <div className="res-prompt-colors"><i/><i/><i/><i/></div>
        <div className="res-prompt-generate"><span>GENERATE</span><Sparkles size={14}/></div>
      </div>
      <div className="res-cover-bottom">PROMPT STRUCTURE <span>↗</span></div>
    </div>
  );
}

export default function DesignResourcesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [copied, setCopied] = useState(false);
  async function copyCommands(lines: string[]) {
    try { await navigator.clipboard.writeText(lines.join("\n")); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
    catch { setCopied(false); }
  }
  const visible = useMemo(() => resources.filter(r =>
    (filter === "all" || r.kind === filter) &&
    (r.title + " " + r.description + " " + r.kindLabel + " " + r.tags.join(" ")).toLowerCase().includes(search.toLowerCase().trim())
  ), [search, filter]);

  return <div className="app-shell">
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="返回 Design Archive"><span className="brand-logo">D<span>.</span></span><span>DESIGN<br/>ARCHIVE</span></Link>
      <div className="sidebar-group">
        <span className="sidebar-label">YOUR LIBRARY</span>
        <Link className="side-link" href="/"><Archive size={18}/> 前端風格收藏</Link>
        <Link className="side-link" href="/prompts/"><BookImage size={18}/> AI 繪圖 Prompt</Link>
        <Link className="side-link current" href="/resources/" aria-current="page"><SwatchBook size={18}/> 設計資源 <span className="side-count">{resources.length}</span></Link>
      </div>
    </aside>
    <main className="main-content res-main">
      <div className="topbar"><Link className="res-back" href="/"><ArrowLeft size={16}/> 返回收藏首頁</Link><span className="topbar-status"><span className="status-dot"/> GITHUB VERSIONED</span></div>
      <header className="res-heading">
        <span className="eyebrow">DESIGN ARCHIVE / CURATED RESOURCES</span>
        <div className="res-headline"><div><h1>Find a reference.<br/><em>Make your own.</em></h1><p>設計靈感、可重用 Prompt、前端品質檢查工具與開發工作流程。收藏來源，也保存如何正確使用。</p></div><div className="res-collection-count">{String(resources.length).padStart(2,"0")}<small>RESOURCES SAVED</small></div></div>
      </header>
      <section className="res-controls" aria-label="篩選設計資源">
        <label className="res-search"><Search size={17}/><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜尋工具、主題或標籤" aria-label="搜尋設計資源"/></label>
        <div className="res-filters">{FILTERS.map(f=><button type="button" key={f.key} onClick={()=>setFilter(f.key)} className={filter===f.key?"active":""} aria-pressed={filter===f.key}>{f.title}</button>)}</div>
      </section>
      <section className="res-list" aria-label="設計資源收藏">
        {visible.map(resource=><article key={resource.id} className="res-item">
          <ResourceCover resource={resource}/>
          <div className="res-info">
            <div className="res-item-kicker"><span>{resource.id}</span><span>{resource.kindLabel}</span></div>
            <h2>{resource.title}</h2>
            <h3>{resource.subtitle}</h3>
            <p className="res-description">{resource.description}</p>
            <div className="res-tags">{resource.tags.slice(0,6).map(tag=><span key={tag}>{tag}</span>)}</div>
            <div className="res-features"><strong>可以用來做什麼</strong><ul>{resource.features.map(feature=><li key={feature}><Check size={13}/>{feature}</li>)}</ul></div>
            {resource.kind==="frontend-qa" && <div className="res-qa-detail">
              <div className="res-qa-status">尚未在 Job-Ops／Shared Harness 安裝或執行</div>
              <strong>建議的 UI Acceptance 四層</strong>
              <ol>{resource.layers?.map(layer=><li key={layer.name}><b>{layer.name}</b><span>{layer.detail}</span></li>)}</ol>
              {resource.architecture&&<p><b>架構定位：</b>{resource.architecture.owner}<br/>Impeccable = Tool／Provider，不是架構負責人。</p>}
              {resource.commands&&<div className="res-cli"><div><strong>檢測 CLI</strong><button type="button" onClick={()=>void copyCommands(resource.commands!)}>{copied?"已複製":"複製指令"}</button></div><pre>{resource.commands.join("\n")}</pre></div>}
              {resource.snapshot&&<small>版本快照（{resource.snapshot.asOf}）：Skill {resource.snapshot.skill}、{resource.snapshot.detectorRules} 條規則、{resource.snapshot.commands} 個指令。版本會變動，以官方為準。</small>}
            </div>}
            <div className="res-item-actions"><a href={resource.url} target="_blank" rel="noopener noreferrer" className="res-open">{resource.kind==="frontend-qa"?"前往官方 GitHub":"前往網站"} <ArrowUpRight size={15}/></a>{resource.relatedUrl&&<a className="res-related" href={resource.relatedUrl} target="_blank" rel="noopener noreferrer">{resource.kind==="frontend-qa"?"檢測器文件":"AI Banner Generator"} <ExternalLink size={13}/></a>}</div>
          </div>
          <div className="res-rights"><ShieldCheck size={17}/><span>{resource.rightsNote}</span></div>
        </article>)}
        {visible.length===0&&<div className="res-empty">找不到符合條件的資源。<button type="button" onClick={()=>{setSearch("");setFilter("all");}}>清除篩選</button></div>}
      </section>
      <div className="res-usage-note"><ShieldCheck size={20}/><div><strong>收錄原則</strong><p>設計靈感與第三方素材需尊重原作授權；技術資源需區分「已收藏」、「已評估」與「已實際整合」。Impeccable 目前只是 Frontend QA 候選工具，尚未接入任何現有 Harness。</p></div></div>
      <footer>DESIGN ARCHIVE <span>RESOURCES / 網站與工具收藏 · GitHub JSON</span><span>2026</span></footer>
    </main>
  </div>;
}
