"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Archive, BookImage, Check, ExternalLink, Search, ShieldCheck, Sparkles, SwatchBook } from "lucide-react";
import bannerLibrary from "@/data/resources/RES-001.json";
import putTool from "@/data/resources/RES-002.json";
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
};

const resources: ArchiveResource[] = [bannerLibrary, putTool];
const FILTERS = [
  { key: "all", title: "全部資源" },
  { key: "inspiration", title: "靈感圖庫" },
  { key: "prompt-tool", title: "AI 製作與 Prompt" }
];

function ResourceCover({ resource }: { resource: ArchiveResource }) {
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
        <div className="res-headline"><div><h1>Find a reference.<br/><em>Make your own.</em></h1><p>設計靈感網站、製作工具與可重用 Prompt 資源。收藏來源與使用方式，而不是轉載創作者的作品。</p></div><div className="res-collection-count">{String(resources.length).padStart(2,"0")}<small>RESOURCES SAVED</small></div></div>
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
            <div className="res-item-actions"><a href={resource.url} target="_blank" rel="noopener noreferrer" className="res-open">前往網站 <ArrowUpRight size={15}/></a>{resource.relatedUrl&&<a className="res-related" href={resource.relatedUrl} target="_blank" rel="noopener noreferrer">AI Banner Generator <ExternalLink size={13}/></a>}</div>
          </div>
          <div className="res-rights"><ShieldCheck size={17}/><span>{resource.rightsNote}</span></div>
        </article>)}
        {visible.length===0&&<div className="res-empty">找不到符合條件的資源。<button type="button" onClick={()=>{setSearch("");setFilter("all");}}>清除篩選</button></div>}
      </section>
      <div className="res-usage-note"><ShieldCheck size={20}/><div><strong>收錄原則</strong><p>保留來源連結，研究排版、色彩及視覺層級；不下載或公開複製第三方 Banner 圖片，也不將創作者作品直接餵給 AI。若使用第三方 Prompt 或圖像作為商業素材，需先確認適用的條款與授權。</p></div></div>
      <footer>DESIGN ARCHIVE <span>RESOURCES / 網站與工具收藏 · GitHub JSON</span><span>2026</span></footer>
    </main>
  </div>;
}
